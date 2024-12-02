
<div class="h-full overflow-auto">
	<div class="code-container bg-neutral-800 text-white rounded overflow-hidden">
		<div class="line-numbers bg-neutral-900 text-neutral-400 py-4 px-2" id="lineNumbers" bind:this={line_numbers}></div>
		<pre class="bg-neutral-800 py-4" id="codeBlock" bind:this={code_block}>
			<code>
				{@html states.diagram_code}
			</code>
		</pre>
	</div>
</div>

<!-- <pre class="overflow-auto h-full">
	<code>
	{@html states.diagram_code}
	</code>
</pre>
 -->

<style>
	.code-container {
		display: flex;
		position: relative;
	}
	.line-numbers {
		text-align: right;
		padding-right: 1rem;
		user-select: none;
		border-right: 1px solid #ddd;
	}
	pre {
		margin: 0;
		padding-left: 1rem;
		overflow-x: auto;
	}
</style>


<script lang="ts">
	import { states } from "$lib/state.svelte"
    import type { Nullable } from "../util-types";

	let code_block = $state<Nullable<HTMLElement>>(null);
	let line_numbers = $state<Nullable<HTMLElement>>(null);

	$effect(() => {
		if(!code_block || !line_numbers) { return }

		const code_text = code_block.textContent
		if(!code_text) { return }

		const lines = code_text.split('\n').length;
		
		let line_numbers_html = '';
        for (let i = 1; i <= lines; i++) {
            line_numbers_html += i + '<br>';
        }
        line_numbers.innerHTML = line_numbers_html;
	})

</script>