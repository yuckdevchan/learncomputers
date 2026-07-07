<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />

<svelte:head><link rel="icon" href="/favicon.svg" /></svelte:head>
{@render children()}
