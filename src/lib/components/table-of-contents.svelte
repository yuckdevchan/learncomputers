<script lang="ts">
	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	let { headings }: { headings: Heading[] } = $props();

	let activeId = $state('');

	$effect(() => {
		activeId = '';
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				}
			},
			{ rootMargin: '-80px 0px -70% 0px' }
		);

		const elements = headings
			.map((h) => document.getElementById(h.id))
			.filter(Boolean) as HTMLElement[];
		for (const el of elements) observer.observe(el);

		return () => observer.disconnect();
	});
</script>

<nav class="sticky top-20 hidden w-56 shrink-0 lg:block">
	<h2 class="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
		On this page
	</h2>
	<ul class="space-y-1 text-sm">
		{#each headings as heading}
			<li>
				<a
					href="#{heading.id}"
					class="block rounded px-2 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground {activeId ===
					heading.id
						? 'bg-muted text-foreground font-medium'
						: ''} text-zinc-400!"
					style="padding-left: {0.75 + (heading.level - 1) * 0.75}rem"
				>
					{heading.text}
				</a>
			</li>
		{/each}
	</ul>
</nav>
