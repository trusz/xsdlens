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
		set selected_node(value: string) { selected_node = value },
		get xsd() { return xsd },
		set xsd(value: Optional<HTMLElement>) { xsd = value },
	}
}

export let state = createState()
