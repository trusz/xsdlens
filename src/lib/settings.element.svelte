<settings-element class="mt-6 grid gap-2 overflow-scroll w-auto">
	{#if selected_element && states.xsd}
		<SettingsAttributeTable 
			name={selected_element.getAttribute("name")} 
			attr_elements={find_attributes(selected_element)}
		/>
			
		
		{#if extensions.length > 0}
		
		<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
			Inherited Attributes
		</h4>

		{#each extensions as extension}
			<SettingsAttributeTable 
				name={extension.getAttribute("name")} 
				attr_elements={find_attributes(extension)}
			/>
		{/each}
		{/if}

	{/if}

</settings-element>

<script lang="ts">
	import { states } from "./state.svelte"
	import { find_attributes, find_extensions_recursive } from "./transform"
	import SettingsAttributeTable from "./settings.attribute-table.svelte"


	const extensions = $derived.by( () => {
		if(!states.xsd || !selected_element) { return [] }
		
		return find_extensions_recursive(states.xsd, selected_element)
	})

	
	let selected_element = $derived.by( () => {
		const root = states.xsd
		if(!root) { console.warn("no xsd in store"); return null }
		
		const node_id = states.selected_node
		if(!node_id) { return null }

		// const selector = `.node[id*="${node_id}"]`
		const selector = `xs\\:complexType[name="${node_id}"]`
		
		const element = root.querySelector(selector)
		console.log({element, root, selector, node_id})
		return element
	})


</script>

