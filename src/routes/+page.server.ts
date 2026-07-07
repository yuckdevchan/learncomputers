import { getGuideStructure } from '$lib/server/guides';

export function load() {
	const structure = getGuideStructure();
	return { structure };
}
