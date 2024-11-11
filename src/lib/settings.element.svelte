<settings-element class="mt-6 grid gap-2 overflow-scroll w-auto">
	{#if selected_element && state.xsd}
		<SettingsAttributeTable 
			name={selected_element.getAttribute("name")} 
			attr_elements={find_attributes(selected_element)}
		/>
			
		<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
			Inherited Attributes
		</h4>
		
		{#each find_extensions_recursive(state.xsd, selected_element) as extension}
			<SettingsAttributeTable 
				name={extension.getAttribute("name")} 
				attr_elements={find_attributes(extension)}
			/>
		{/each}

	{/if}

</settings-element>

<script lang="ts">
	import { state } from "./state.svelte"
	import { find_attributes, find_extensions_recursive } from "./transform"
	import SettingsAttributeTable from "./settings.attribute-table.svelte"

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

