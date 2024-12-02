import type { Optional } from "./util-types"

export function createState(){
	let file = $state<Optional<File>>(undefined);
	let selected_node = $state<string>("");
	let xsd = $state<Optional<HTMLElement>>(undefined);
	let view_mode = $state<"diagram" | "code">("diagram")
	let diagram_code = $state<string>("")
	let settings = $state({
		focus_mode: false,
		show_children: true,
		show_extensions: true,
	})

	return {
		get file() { return file },
		set file(value: Optional<File>) { file = value },
		get selected_node() { return selected_node },
		get xsd() { return xsd },
		set xsd(value: Optional<HTMLElement>) { 
			xsd = value; 
			// @ts-expect-error
			window.xsd = value
		},
		get view_mode() { return view_mode },
		set view_mode(value: "diagram" | "code") { view_mode = value },
		get diagram_code() { return diagram_code },
		set diagram_code(value: string) { diagram_code = value },
		get settings() { return settings },
		set settings(value: any) { settings = value },
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


