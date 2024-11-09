<diagram-content>
{#await svg_promise then svg}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<container
		use:add_interactivity
		onclickcapture={handle_onclick}
		role="document"
	>
		<view-port>
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
</style>

<script lang="ts">
	import mermaid from "mermaid";
	import { transform } from "./transform";
    import createPanZoom from "panzoom";
	import { selection$, xsd$ } from "./stores"

	interface Props {
		file: File
	}
	let { file }: Props = $props();

	// let root: HTMLElement | null = null
	// let svg_host: HTMLSpanElement | null = $state(null)
	// let content = $state("");
	$effect( () => {
		file.text().then( text => {
			const xsd_element = document.createElement('xsd');
			xsd_element.innerHTML = text
			xsd$.set(xsd_element)
			// xsdElement.innerHTML = content;
			// content = text
		})
	})
	
	let diagram = $derived( transform($xsd$) );
	let svg_promise = $derived( render_diagram(diagram) );

	mermaid.initialize({
			startOnLoad: false,
			securityLevel: 'loose',
			theme: 'default',
			// layout: 'LR',
			elk: {
				nodePlacementStrategy: "BRANDES_KOEPF",
			},
			// deterministicIds: true,
			// deterministicIDSeed: "123",
			themeVariables: {
				fontFamily: 'monospace',
				fontSize: '16px',
				fontWeight: 'normal',
				// fontColor: '#000000',
				// lineColor: '#000000',
				// fillColor: '#ffffff',
				// textColor: '#000000',
				// primaryColor: '#000000',
				// primaryBorderColor: '#000000',
				// secondaryColor: '#000000',
				// secondaryBorderColor: '#000000',
				// tertiaryColor: '#000000',
				// tertiaryBorderColor: '#000000',
			},
			logLevel: 5
		})
    
	async function render_diagram(diagram_def: string): Promise<string> {
		if(diagram_def === "") { return "" }
		console.log({diagram_def})
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
		
		console.log("inspecting element: ", node_id)
		if(!node_id) { return }

		selection$.set(node_id)
	}

	// $effect( () => add_interactivity(root, svg_promise) )
	function add_interactivity(svg_host: HTMLElement) {
		const svg_canvas = svg_host.querySelector("#mermaid");
		
		if(!svg_canvas) { return }
		
		// const view_port = svg_host.querySelector<HTMLElement>("view-port")
		const view_port = svg_canvas.querySelector<HTMLElement>("g")
		if(!view_port) { return }
		
		createPanZoom(view_port)
		
	}

	
</script>