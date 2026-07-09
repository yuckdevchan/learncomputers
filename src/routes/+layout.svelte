<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	let { children } = $props();
</script>

<ModeWatcher />
<Toaster />

<svelte:head
	><link rel="icon" href="/favicon.svg" />
	<title>liteguide</title>
	<meta name="title" content="liteguide - BEST WAY TO LEARN SOFTWARE+HARDWARE+MORE" />
	<meta name="description" content="LEARN SUPER FAST+FUN, ALL FREE, NO SIGN UP" />
	<meta name="color-scheme" content="dark light" />
	<meta name="theme-color" content="#016630" />
	
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://liteguide.vercel.app/" />
	<meta property="og:title" content="liteguide - BEST WAY TO LEARN SOFTWARE+HARDWARE+MORE" />
	<meta property="og:description" content="LEARN SUPER FAST+FUN, ALL FREE, NO SIGN UP" />
	<meta property="og:image" content="/banner.webp" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://liteguide.vercel.app/" />
	<meta property="twitter:title" content="liteguide - BEST WAY TO LEARN SOFTWARE+HARDWARE+MORE" />
	<meta property="twitter:description" content="LEARN SUPER FAST+FUN, ALL FREE, NO SIGN UP" />
	<meta property="twitter:image" content="/banner.webp" />
</svelte:head>
{@render children()}
