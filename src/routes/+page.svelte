

<container>
	<header>
		<h1>Welcome to SvelteKit</h1>
		<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
		<Dropzone on:drop={handleFilesSelect} />
	</header>
	<main>
		{#if file}
			<Content {file} />
		{/if}
	</main>
	<sidebar>
		<Sidebar />
	</sidebar>
</container>

<style>
	container {
		display: grid;
		height: 100vh;
		grid-template: auto 1fr auto / auto 1fr auto
	}
	header {
		padding: 2rem;
		grid-column: 1 / 4;
	}
	main {
		grid-column: 2 / 3;
	}
	sidebar{
		grid-column: 3 / 4;
	}

</style>

<script lang="ts">
	import Dropzone from "svelte-file-dropzone";
	import Content from "../lib/content.svelte";
	import Sidebar from "../lib/sidebar.svelte";

	let file: File | undefined = $state(undefined)


  function handleFilesSelect(e: CustomEvent) {
    const { acceptedFiles } = e.detail;
	file = acceptedFiles[0]
  }

</script>