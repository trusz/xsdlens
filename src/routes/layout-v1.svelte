
<container class="grid grid-rows-[auto,1fr] grid-cols-[1fr,450px] h-full w-full overflow-hidden">
	<header class="col-span-2 text-black m-6 mt-3 p-4 pt-0 text-center border-b border-[zinc-500]">
		<h1>Welcome to XSDLens</h1>
		<Dropzone on:drop={handle_drop} />
	</header>
	<main class="overflow-y-hidden p-4">
		{@render children()}
	</main>
	<aside class="text-white max-h-[100%]">
		<Sidebar />
		<!-- Add more sidebar content here -->
	</aside>
</container>


<style>

</style>

<script lang="ts">
	import "../app.css"
	import { states } from "$lib/state.svelte"
	import Dropzone from "svelte-file-dropzone";
	import Sidebar from "$lib/sidebar.svelte";
    import type { Snippet } from "svelte";
	
	type Props ={
		children: Snippet
	}
	let { children }: Props  = $props();

	function handle_drop(e: CustomEvent) {
		const { acceptedFiles } = e.detail;
		states.file = acceptedFiles[0];
  	}
</script>