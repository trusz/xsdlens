<container>

	<h2>
		{$selection$}
	</h2>
	<ul>
		{#if selected_element}
		{#each find_attributes(selected_element) as attr }
			<li>{attr.getAttribute("name")}: {attr.getAttribute("type")}</li>	
		{/each}
		{/if}
	</ul>
</container>


<style>
	header{
		font-size: 1.8rem;
	}
	container{
		width: 400px;
		display: block;
		border-left: 1px solid black;
		height: 100%;
		padding:2rem;
	}

</style>


<script lang="ts">
	import { selection$, xsd$} from "./stores"
	import { find_attributes } from "./transform"
	
	let { children } = $props();

	let selected_element = $derived.by( () => {
		const root = $xsd$
		if(!root) { console.warn("no xsd in store"); return null }
		
		const node_id = $selection$
		if(!node_id) { return null }

		// const selector = `.node[id*="${node_id}"]`
		const selector = `xs\\:complexType[name="${node_id}"]`
		
		const element = root.querySelector(selector)
		console.log({element, root, selector, node_id})
		return element
	})


	$inspect(selected_element)


</script>


