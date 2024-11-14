<diagram-content>
{#await svg_promise then svg}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<container
		use:add_interactivity
		onclickcapture={handle_onclick}
		role="document"
	>
		<view-port bind:this={ref_view_port}>
			{@html svg}
		</view-port>
	</container>
{/await}
</diagram-content>

<style>
	diagram-content {
		height: 100%;
		width: 100%;
		display: block;
	}
	container { 
		display: flex;
		height: 100%;
		overflow: hidden;
	}
	view-port {
		display: flex;
		width: 100%;
		height: 100%;
	}
	diagram-content :global(svg){
		flex: 1;
  		height: auto;
	}

	:global(view-port #mermaid a.selected  .basic > path) {
		@apply stroke-blue-500 stroke-2
	}
</style>


<script lang="ts">
	import mermaid from "mermaid";
	import { transform } from "./transform";
    import createPanZoom from "panzoom";
	import { states } from "$lib/state.svelte"
    import type { Nullable } from "./util-types";
	import { onMount } from "svelte";
    import type { NavigationEvent } from "@sveltejs/kit";

	interface Props {
		file: File
	}
	let { file }: Props = $props();
	
	let ref_view_port: Nullable<HTMLElement> = null
	let diagram = $derived( transform(states.xsd) );
	let svg_promise = $derived( render_diagram(diagram) );

	onMount( () => {
		mermaid.initialize({
			startOnLoad: false,
			securityLevel: 'loose',
			elk: {
				nodePlacementStrategy: "BRANDES_KOEPF",
			},
			logLevel: 5
		})

		states.init_url_state_sync()
	})

	
    
	async function render_diagram(diagram_def: string): Promise<string> {
		if(diagram_def === "") { return "" }
		const {svg} = await mermaid.render('mermaid', diagram_def)
		return svg
    }

	function handle_onclick(e: MouseEvent) {
		e.preventDefault()
		e.stopImmediatePropagation()
		e.stopPropagation()

		const target = e.target as HTMLElement
		const link = target.closest("a")
		
		// ref_view_port?.querySelectorAll("a").forEach( a => a.classList.remove("selected") )
		// link?.classList.add("selected")

		const node_id = link?.getAttribute("xlink:href")
		if(!node_id) { return }

		set_selection_in_diagram(node_id)
		states.set_selected_node(node_id)
	}

	function set_selection_in_diagram(node_id: string){
		debugger;
		ref_view_port?.querySelectorAll("a").forEach( a => a.classList.remove("selected") )

		// because of it is a xlink:href, where the xlink is the namespace
		// we have to query differently
		// See: https://stackoverflow.com/questions/23034283/is-it-possible-to-use-htmls-queryselector-to-select-by-xlink-attribute-in-an
		const selector = `a[*|href="${node_id}"]`
		const new_selected_node = ref_view_port?.querySelector(selector)
		new_selected_node?.classList.add("selected")
	}

	$effect(() => {
		if(!states.selected_node){ return }
		set_selection_in_diagram(states.selected_node)
		// const selected_node = ref_view_port?.querySelector(`a[xlink\\:href="${states.selected_node}"]`)
		// selected_node?.classList.add("selected")
	})

	$effect(() => {
		if(!states.file){ return }
		states.file.text().then( text => {
			const xsd_element = document.createElement('xsd');
			xsd_element.innerHTML = text
			states.xsd = xsd_element
		})
	})

	// $effect( () => add_interactivity(root, svg_promise) )
	function add_interactivity(svg_host: HTMLElement) {
		const svg_canvas = svg_host.querySelector("#mermaid") as HTMLElement;
		
		if(!svg_canvas) { return }
		
		// const view_port = svg_host.querySelector<HTMLElement>("view-port")
		const view_port = svg_canvas.querySelector<HTMLElement>("g")
		if(!view_port) { return }
		
		// window.pz = createPanZoom(view_port)
		window.pz = createPanZoom(svg_canvas)
		
		// setTimeout(() => {
		// 	pz.moveTo(202, 2555)	
		// 	// pz.zoomAbs(0, 0, 1)
		// }, 2_000)

		
	}

	
</script>