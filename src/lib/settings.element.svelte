<settings-element class="mt-6">
	<h4 class="">{state.selected_node}</h4>
	<ul>
		{#if selected_element}
		{#each find_attributes(selected_element) as attr }
			<li>{attr.getAttribute("name")}: {attr.getAttribute("type")}</li>	
		{/each}
		{/if}
</ul>
</settings-element>

<script lang="ts">
	import { state } from "./state.svelte"
	import { find_attributes } from "./transform"

	let selected_element = $derived.by( () => {
		const root = state.xsd
		if(!root) { console.warn("no xsd in store"); return null }
		
		const node_id = state.selected_node
		if(!node_id) { return null }

		// const selector = `.node[id*="${node_id}"]`
		const selector = `xs\\:complexType[name="${node_id}"]`
		
		const element = root.querySelector(selector)
		console.log({element, root, selector, node_id})
		return element
	})


	$inspect(selected_element)

</script>

