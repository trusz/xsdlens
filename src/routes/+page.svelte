
<container class="h-full">
	{#if !states.file}
		<Dropzone on:drop={handle_drop} containerClasses="h-full" accept=".xsd"/>
	{/if}
	{#if states.file}
	<main class="h-full">
		<Content file={states.file} />
	</main>
	{/if}
</container>

<style>
	
</style>

<script lang="ts">
	import Dropzone from "svelte-file-dropzone";
	import Content from "../lib/content.svelte";
	import {states} from "$lib/state.svelte";

	// const dropzone_accept = 

	function handle_drop(e: CustomEvent) {
		const { acceptedFiles } = e.detail;
		states.file = acceptedFiles[0];
	}

	

</script>