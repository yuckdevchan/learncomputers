<script lang="ts">
	import SidebarTree from './sidebar-tree.svelte';
	import SidebarFolder from './sidebar-folder.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	interface GuideNode {
		title: string;
		slug: string;
		path: string;
		children?: GuideNode[];
	}

	let {
		nodes = [] as GuideNode[],
		depth = 0,
		activePath = ''
	}: {
		nodes: GuideNode[];
		depth?: number;
		activePath?: string;
	} = $props();
</script>

{#each nodes as node (node.path)}
	{@const isFolder = !!node.children}
	{#if isFolder}
		<SidebarFolder {node} {depth} {activePath} />
	{:else if depth === 0}
		<Sidebar.MenuItem>
			<Sidebar.MenuButton isActive={activePath === node.path}>
				{#snippet child({ props })}
					<a href="/guides/{node.path}" {...props}><span class="truncate min-w-0">{node.title}</span></a>
				{/snippet}
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	{:else}
		<Sidebar.MenuSubItem>
			<Sidebar.MenuSubButton isActive={activePath === node.path}>
				{#snippet child({ props })}
					<a href="/guides/{node.path}" {...props}><span class="truncate min-w-0">{node.title}</span></a>
				{/snippet}
			</Sidebar.MenuSubButton>
		</Sidebar.MenuSubItem>
	{/if}
{/each}
