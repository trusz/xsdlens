import type { Nullable } from "./util-types";

export function transform(
	xsd_element?: HTMLElement, 
	filter?: Converter_Filter, 
	color_mode?: string
): string{

	if(!xsd_element){ return "" };

	const mermaid_components = []

	const complex_types = find_complex_types(xsd_element);
	mermaid_components.push(convert_complex_types(complex_types, xsd_element, filter));

	const dark_mode = color_mode === "dark"
	console.log({dark_mode, color_mode})

	return `\
${theme({dark_mode})}
classDiagram
direction LR
	${mermaid_components.join('\n')}	
`
}


function findElements(xsd: HTMLElement): Element[] {
	const elements = xsd.querySelectorAll('xs\\:element');
	return Array.from(elements)
}

export function find_complex_types(xsd: HTMLElement): Element[] {
	const elements = xsd.querySelectorAll('xs\\:complexType');
	return Array.from(elements)
}

export type Converter_Filter = {
	node_name?: string,
	show_children?: boolean,
	show_extensions?: boolean,
}
function convert_complex_types(complexTypes: Element[], root:HTMLElement, filter?:Converter_Filter): string {


	let all_related_nodes: string[] = [
		filter?.node_name ?? "",
	].filter(Boolean) as string[]

	console.log({filter})

	const full_mermaid_text = complexTypes.map((complex_type) => {
		const name = complex_type.getAttribute('name');
		if(!name){ return "" }

		
		// 
		// Extension / Inheritance
		// eg.: <xs:extension base="eIEC61850-6-100:t6-100LNodeContainer">
		// 
		let ext_elements: Element[] = []
		if(filter?.show_extensions){
			ext_elements = Array.from(complex_type.querySelectorAll('xs\\:extension'))
		}
		const extensions = ext_elements.map( extEl => extEl?.getAttribute('base')?.split(':')[1] )
		const extension_string = extensions.map( ext => `${name} --|> ${ext}`).join('\n')
	
		// 
		// Attributes
		// eg.: <xs:attribute name="type" type="xs:normalizedString" use="optional"/>
		// 
		const attribute_elements = find_attributes(complex_type)
		const attributes = attribute_elements.map( attrEl => {
			return {
				name: attrEl.getAttribute('name'),
				type: attrEl.getAttribute('type')?.split(':')[1],
				// TODO: optionality is missing
			}
		})
		const attribute_string = attributes.map( attr => `${name} : +${attr.type} ${attr.name} `).join('\n')

		// 
		// Children
		// 
		let child_elements: Element[] = []
		if(filter?.show_children){
			child_elements = find_children_elements(complex_type)
		}
		const child_connections = child_elements.map( child => `${name} --> ${child.getAttribute('type')}`).join('\n')
		const child_attributes = child_elements.map( child => `${name} : ${child.getAttribute('type')?.split(':')[1] }[] ${child.getAttribute('name')}`).join('\n')

		// 
		// Related Nodes
		// 
		const is_current_node_related = filter?.node_name === "" || all_related_nodes.includes(name??"")
		if(is_current_node_related){
			const parent_elements = find_parent_elements(complex_type, root)
			all_related_nodes.push(name)
			all_related_nodes.push(...child_elements.map( el => el.getAttribute('type')?.split(':')[1] ?? ""))
			all_related_nodes.push(...ext_elements.map( el => el?.getAttribute('base')?.split(':')[1] ?? ""))
			all_related_nodes.push(...parent_elements.map( el => el.getAttribute('name') ?? ""))
		}

		// callback Shape "callbackFunction" "This is a tooltip for a callback"
		return [
			`class ${name}`,
			// `note for ${name} "This is a note for a class"`,
			`click ${name} href "${name}"`,
			`${extension_string}`,
			`${attribute_string}`,
			`${child_connections}`,
			`${child_attributes}`,
		].join('\n')


	}).join('\n');

	// @ts-expect-error
	window.full_mermaid_text = full_mermaid_text

	const line_regex = new RegExp(`(${all_related_nodes.join("|")})`, 'g')
	console.log({line_regex})
	let filtered_mermaid_text = full_mermaid_text
	if(filter?.node_name !== ""){
		filtered_mermaid_text = filtered_mermaid_text
			.split("\n")
			.filter(Boolean)
			.filter( line => line_regex.test(line))
			.join("\n")
	}

	return filtered_mermaid_text
}

export function find_attributes(xsd: Element): Element[] {
	const elements = xsd.querySelectorAll('xs\\:attribute');
	return Array.from(elements)
}

export function find_inherited_attributes(xsd: Element): Element[] {
	const elements = xsd.querySelectorAll('xs\\:attribute');
	return Array.from(elements)
}

export function find_extensions_recursive(root: Element, xs: Element): Element[] {
	const all_extensions: Element [] = []
	let extensions =  find_extensions(root, xs)
	while(extensions.length > 0){
		all_extensions.push(...extensions)
		extensions = extensions.map( ext => find_extensions(root, ext) ).flat()
	}
	return all_extensions
}

function find_extensions(root: Element, xs: Element): Element[] {
	const extElements = Array.from(xs.querySelectorAll('xs\\:extension'))
	const base_names = extElements
		.map( extEl => extEl?.getAttribute('base')
		?.split(':')[1] )
		.filter(Boolean) as string[]
	const extensions = base_names
		.map( base_name => find_complex_type_by_name(root, base_name) )
		.filter(Boolean) as Element[]
	
	return extensions
}

export function find_children_elements(xs: Element): Element[] {
	const children = Array.from(xs.querySelectorAll('xs\\:sequence > xs\\:element'))
	return children
}

export function find_parent_elements(xs: Element, root:HTMLElement): Element[] {
	const name = xs.getAttribute('name') ?? "error_name_not_found"
	const selector = `xs\\:complexType:has(xs\\:element[type*='${name}'])`

	console.log({selector})
	const parents = Array.from(root.querySelectorAll(selector))
	return parents
}

function find_complex_type_by_name(root:Element, name:string): Nullable<Element> {
	const selector = `xs\\:complexType[name="${name}"]`
	const element = root.querySelector(selector);
	return element as Nullable<Element>
}


function theme({dark_mode}: {dark_mode: boolean}): string {
	if(dark_mode){
		return theme_dark
	} else {
		return theme_light
	}
}

const theme_light = `
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
      'primaryColor': 'hsl(0 0% 100%)',
      'primaryTextColor': 'hsl(240 10% 3.9%)',
      'primaryBorderColor': 'hsl(240 5.9% 90%)',
      'lineColor': 'hsl(240 5.9% 10%)',
      'secondaryColor': '#006100',
      'tertiaryColor': '#fff',
	  'fontFamily': 'monospace'
    }
  }
}%%
`

const theme_dark = `
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
      'primaryColor': 'hsl(240, 4%, 16%)',
      'primaryTextColor': 'hsl(240, 6%, 90%)',
      'primaryBorderColor': 'hsl(240, 10%, 4%)',
      'lineColor': 'hsl(240, 5%, 84%)',
      'secondaryColor': '#006100',
      'tertiaryColor': '#fff',
	  'fontFamily': 'monospace'
    }
  }
}%%
`