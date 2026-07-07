import { json } from '@sveltejs/kit';
import { getGuideStructure } from '$lib/server/guides';

export async function GET() {
	const structure = getGuideStructure();
	return json(structure);
}
