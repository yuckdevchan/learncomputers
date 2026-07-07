import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const guidesDir = resolve(__dirname, '../../../guides');

export interface GuideNode {
	title: string;
	slug: string;
	path: string;
	children?: GuideNode[];
}

const pathMap = new Map<string, string>();

function slugify(name: string): string {
	return name
		.replace(/\.md$/, '')
		.toLowerCase()
		.replace(/\+\+/g, 'pp')
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

function titleFromContent(content: string, fallback: string): string {
	const match = content.match(/^#\s+(.+)/m);
	if (match) return match[1].trim();
	return fallback.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function sortOrderFromContent(content: string): number | null {
	const firstLine = content.split('\n')[0].trim();
	if (/^\d+$/.test(firstLine)) return parseInt(firstLine, 10);
	return null;
}

type RawNode = GuideNode & { order?: number | null };

function stripOrder(n: RawNode): GuideNode {
	const { order: _, ...rest } = n;
	return rest;
}

function readTree(dir: string, cleanBase: string, realBase: string): RawNode[] {
	const entries = readdirSync(dir, { withFileTypes: true });
	const rawNodes: RawNode[] = [];

	for (const entry of entries) {
		if (!entry.isDirectory()) continue;
		const orderMatch = entry.name.match(/^(\d+)\.\s+(.*)$/);
		const order = orderMatch ? parseInt(orderMatch[1], 10) : null;
		const cleanName = orderMatch ? orderMatch[2] : entry.name;
		const slugged = slugify(cleanName);
		const cleanPath = cleanBase ? `${cleanBase}/${slugged}` : slugged;
		const realPath = realBase ? `${realBase}/${entry.name}` : entry.name;
		pathMap.set(cleanPath, realPath);
		const children = readTree(join(dir, entry.name), cleanPath, realPath);
		if (children.length > 0) {
			rawNodes.push({
				title: cleanName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
				slug: slugged,
				path: cleanPath,
				order,
				children: children.map(stripOrder)
			});
		}
	}

	for (const entry of entries) {
		if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
		const content = readFileSync(join(dir, entry.name), 'utf-8');
		const slug = slugify(entry.name);
		const cleanPath = cleanBase ? `${cleanBase}/${slug}` : slug;
		const realPath = realBase ? `${realBase}/${slugify(entry.name)}` : slugify(entry.name);
		pathMap.set(cleanPath, realPath);
		rawNodes.push({
			title: titleFromContent(content, slug),
			slug,
			path: cleanPath,
			order: sortOrderFromContent(content)
		});
	}

	rawNodes.sort((a, b) => {
		if (a.order != null && b.order != null) return a.order - b.order;
		if (a.order != null) return -1;
		if (b.order != null) return 1;
		return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
	});

	return rawNodes;
}

export function getGuideStructure(): GuideNode[] {
	if (!existsSync(guidesDir)) return [];
	pathMap.clear();
	return readTree(guidesDir, '', '').map(stripOrder);
}

export function getGuideContent(relativePath: string): string | null {
	if (pathMap.size === 0) {
		getGuideStructure();
	}
	const realPath = pathMap.get(relativePath) || relativePath;
	const filePath = join(guidesDir, `${realPath}.md`);
	if (existsSync(filePath)) return readFileSync(filePath, 'utf-8');
	return null;
}

export function getGuideRealPath(relativePath: string): string | null {
	if (pathMap.size === 0) {
		getGuideStructure();
	}
	return pathMap.get(relativePath) || null;
}
