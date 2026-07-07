<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import TableOfContents from '$lib/components/table-of-contents.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Pencil from '@lucide/svelte/icons/pencil';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title} - learn computers</title>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar structure={data.structure} activePath={data.path} />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ms-1" />
			<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					{@const parts = data.path.split('/')}
					{#each parts as part, i}
						{#if i > 0}<Breadcrumb.Separator class="hidden md:block" />{/if}
						<Breadcrumb.Item>
							{#if i < parts.length - 1}
								{part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
							{:else}
								<Breadcrumb.Page>{data.title}</Breadcrumb.Page>
							{/if}
						</Breadcrumb.Item>
					{/each}
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<div class="flex flex-1 gap-4 p-4">
			<div class="mx-auto w-full min-w-0 max-w-4xl gap-3 flex flex-col">
				<div class="flex justify-between gap-4 flex-row items-center">
					<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						{data.title}
					</h1>
					<Button variant="outline" class="rounded-full"
						><Pencil class="h-4 w-4" />edit this page</Button
					>
				</div>
				<div class="prose prose-lg dark:prose-invert">
					{@html data.html}
				</div>
			</div>
			{#if data.headings.length > 0}
				<TableOfContents headings={data.headings} />
			{/if}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
