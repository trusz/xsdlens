<diagram-content bind:this={ref_root}>
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
	import { transform, type Converter_Filter } from "./transform";
    import createPanZoom, {type PanZoom} from "panzoom";
	import { states } from "$lib/state.svelte"
    import type { Nullable, Optional } from "./util-types";
	import { onMount } from "svelte";
	import { mode } from "mode-watcher";

	interface Props {
		file: File
	}
	let { file }: Props = $props();

	let ref_view_port: Nullable<HTMLElement> = $state(null)
	let ref_root: Nullable<HTMLElement> = $state(null)
	let panzoom: Optional<PanZoom> = $state();
	let converter_filter: Converter_Filter = $derived.by( () => {
		const filter: Converter_Filter = {
			show_children: states.settings.show_children,
			show_extensions: states.settings.show_extensions,
		}
		if( states.settings.focus_mode && states.selected_node){
			filter.node_name = states.selected_node
		}

		return filter
	})
	$effect(() => {
		states.diagram_code = transform(states.xsd, converter_filter, $mode)
	})
	let svg_promise = $derived( render_diagram(states.diagram_code) );

	
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

	$effect( () => {
		if(!states.selected_node) { return }

		zoom_to_element(states.selected_node)
	})
	function zoom_to_element(name:string){
		const selector = `a[*|href="${name}"]`
		const element = document?.querySelector(selector)
		if(!element || !ref_root) { return }

		const root_rects = ref_root.getClientRects()[0]
		const root_middle_x = root_rects.x + root_rects.width / 2;
		const root_middle_y = root_rects.y + root_rects.height / 2;

		const element_rects = element.getClientRects()[0]
		const element_middle_x = element_rects.x + element_rects.width / 2;
		const element_middle_y = element_rects.y + element_rects.height / 2;

		const dx = root_middle_x - element_middle_x
		const dy = root_middle_y - element_middle_y

		// console.log({root_middle_x, root_middle_y, element_middle_x, element_middle_y, dx, dy})

		panzoom?.moveBy(dx,dy,true)
	
	}
    
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
		
		const node_id = link?.getAttribute("xlink:href")
		if(!node_id) { return }

		set_selection_in_diagram(node_id)
		states.set_selected_node(node_id)
	}

	function set_selection_in_diagram(node_id: string){
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
	})

	$effect(() => {
		if(!states.file){ return }
		states.file.text().then( text => {
			const xsd_element = document.createElement('xsd');
			xsd_element.innerHTML = text
			states.xsd = xsd_element
		})
	})

	function add_interactivity(svg_host: HTMLElement) {
		const svg_canvas = svg_host.querySelector("#mermaid") as HTMLElement;
		
		if(!svg_canvas) { return }
		
		const view_port = svg_canvas.querySelector<HTMLElement>("g")
		if(!view_port) { return }
		
		panzoom = createPanZoom(svg_canvas)
			
	}

	
</script>