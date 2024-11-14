import type { Optional } from "./util-types"



// class State {
// 	file = $state<Optional<File>>(undefined);
// 	selected_node = $state<string>("");
// 	xsd = $state<Optional<HTMLElement>>(undefined);
	
// 	constructor(){
// 		$effect(() => {
// 			if(!this.file){ return }
// 			this.file.text().then( text => {
// 				const xsd_element = document.createElement('xsd');
// 				xsd_element.innerHTML = text
// 				this.xsd = xsd_element
// 			})
// 		})
// 	}

// }

export function createState(){
	let file = $state<Optional<File>>(undefined);
	let selected_node = $state<string>("");
	let xsd = $state<Optional<HTMLElement>>(undefined);

	return {
		get file() { return file },
		set file(value: Optional<File>) { file = value },
		get selected_node() { return selected_node },
		get xsd() { return xsd },
		set xsd(value: Optional<HTMLElement>) { xsd = value },
		set_selected_node(value: string) { 
			window.location.hash = value
		 },
		init_url_state_sync(){
			window.addEventListener("popstate", (e: unknown) => {
				const node_id = document.location.hash.replace("#", "")
				console.log("navigate", node_id)	
				selected_node = node_id
			})
		},
	}
}

export let states = createState()


