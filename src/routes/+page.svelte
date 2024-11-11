
<main class="h-full">
	{#if state.file}
		<Content file={state.file} />
	{/if}
</main>

<style>
	
</style>

<script lang="ts">
	import Dropzone from "svelte-file-dropzone";
	import Content from "../lib/content.svelte";
	import Sidebar from "../lib/sidebar.svelte";
	import {state} from "$lib/state.svelte";

	

</script>