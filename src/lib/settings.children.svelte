<settings-element class="mt-6 grid gap-2 overflow-scroll w-auto">
	{#if selected_element && states.xsd}
		<ChildrenTable 
			name={selected_element.getAttribute("name")} 
			children_elements={children}
		/>
			
	{/if}

</settings-element>

<script lang="ts">
	import { states } from "./state.svelte"
	import { find_children_elements } from "./transform"
	import ChildrenTable from "./settings.children-table.svelte"

	const children = $derived.by( () => {
		if(!states.xsd || !selected_element) { return [] }
		
		// return find_children_elements(states.xsd, selected_element)
		return find_children_elements(selected_element)
	})

	
	let selected_element = $derived.by( () => {
		const root = states.xsd
		if(!root) { console.warn("no xsd in store"); return null }
		
		const node_id = states.selected_node
		if(!node_id) { return null }

		// const selector = `.node[id*="${node_id}"]`
		const selector = `xs\\:complexType[name="${node_id}"]`
		
		const element = root.querySelector(selector)
		return element
	})


</script>

