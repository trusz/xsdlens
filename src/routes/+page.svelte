<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Dropzone on:drop={handleFilesSelect} />
{#if file}
<Content {file} />
{/if}

<script lang="ts">
	import Dropzone from "svelte-file-dropzone";
	import Content from "../lib/content.svelte";

	let file: File | undefined = $state(undefined)


  function handleFilesSelect(e: CustomEvent) {
    const { acceptedFiles } = e.detail;
	file = acceptedFiles[0]
  }

</script>