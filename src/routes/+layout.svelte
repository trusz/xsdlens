
<container class="grid grid-rows-[auto,1fr] grid-cols-[1fr,400px] h-full w-full overflow-hidden">
	<header class="col-span-2 text-black m-6 mt-3 p-4 pt-0 text-center border-b border-[zinc-500]">
		<h1>Welcome to XSDLens</h1>
		<Dropzone on:drop={handle_drop} />
	</header>
	<main class="overflow-y-hidden p-4">
		{@render children()}
	</main>
	<aside class=" text-white">
		<Sidebar />
		<!-- Add more sidebar content here -->
	</aside>
</container>


<style>

</style>

<script lang="ts">
	import "../app.css"
	import { state } from "$lib/state.svelte"
	import Dropzone from "svelte-file-dropzone";
	import Sidebar from "$lib/sidebar.svelte";
	
	let { children } = $props();

	function handle_drop(e: CustomEvent) {
    const { acceptedFiles } = e.detail;
	state.file = acceptedFiles[0];
  }
</script>