
<container class="h-full scroll-container" 
	role="document" 
	ondragstart={handle_on_dragstart} 
	ondragend={handle_on_dragend} 
	ondragenter={handle_on_dragstart} 
	ondragleave={handle_on_dragend}
	ondrop={handle_on_drop}
>
	
	{#if states.view_mode === "diagram"}
		
		{#if !states.file || user_dragging}
			<Dropzone on:drop={handle_drop} containerClasses="h-full !bg-zinc-900" accept=".xsd"/>
		{/if}
		{#if states.file && !user_dragging}
			<main class="h-full">
				<Content file={states.file} />
			</main>
		{/if}

	{/if}

	{#if states.view_mode === "code"}
		<CodeEditor />
	{/if}
	
</container>

<style>
	
</style>

<script lang="ts">
	import Dropzone from "svelte-file-dropzone";
	import Content from "../lib/content.svelte";
	import CodeEditor from "$lib/components/code-editor.svelte";
	import {states} from "$lib/state.svelte";

	let user_dragging = $state(false);

	function handle_drop(e: CustomEvent) {
		const { acceptedFiles } = e.detail;
		states.file = acceptedFiles[0];
	}

	function handle_on_dragstart() {
		user_dragging = true;
	}
	function handle_on_dragend() {
		user_dragging = false;
	}

	function handle_on_drop(){
		user_dragging = false;
	}


	$inspect(user_dragging)

	

</script>