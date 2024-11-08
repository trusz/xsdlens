
	
{#await svg_promise then svg}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<span
		bind:this={svg_host}
		onclickcapture={handleOnclick}
		role="document"
	>
		{@html svg}
	</span>
{/await}
	

<script lang="ts">
	 import mermaid from "mermaid";
	 import { transform } from "./transform";

	interface Props {
		file: File
	}
	let { file }: Props = $props();

	let svg_host: HTMLSpanElement | null = $state(null)
	let content = $state("");
	$effect( () => {
		file.text().then( text => content = text )
	})
		
	
	let diagram = $derived( transform(content) );
	let svg_promise = $derived( renderDiagram(diagram) );
	let svgEl = $state<SVGElement | null |undefined>(null)
	$effect( () => {
		if(!svg_host) { return }

		console.log({svgHost: svg_host})
		svgEl = svg_host?.querySelector('svg')
		console.log({msg1: svgEl})
		const config = { attributes: true, childList: true, subtree: true };
		const callback = () => {
			console.log("MutationObserver callback")
			svgEl = svg_host?.querySelector('svg')
			console.log({msg2:svgEl})
		};
		const observer = new MutationObserver(callback);
		observer.observe(svg_host, config);


		return () => observer.disconnect();
	})

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
    
	async function renderDiagram(diagram_def: string): Promise<string> {
		if(diagram_def === "") { return "" }
		const {svg} = await mermaid.render('mermaid', diagram_def)
		return svg
    }

	function handleOnclick(e: MouseEvent) {
		e.preventDefault()
		e.stopImmediatePropagation()
		e.stopPropagation()

		const target = e.target as HTMLElement
		const link = target.closest("a")
		const node_id = link?.getAttribute("xlink:href")
		
		console.log("inspecting element: ", node_id)
	}

	
</script>