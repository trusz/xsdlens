import type { Nullable } from "./util-types";

export function transform(xsd_element?: HTMLElement): string{
	if(!xsd_element){ return "" };

	const mermaid_components = []

	const complex_types = find_complex_types(xsd_element);
	mermaid_components.push(convert_complex_types(complex_types));


	return `\
${theme}
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

function convert_complex_types(complexTypes: Element[]): string {
	const mstr = complexTypes.slice(1,10000).map((complex_type) => {
		const name = complex_type.getAttribute('name');
		
		// 
		// Extension / Inheritance
		// eg.: <xs:extension base="eIEC61850-6-100:t6-100LNodeContainer">
		// 
		const extElements = Array.from(complex_type.querySelectorAll('xs\\:extension'))
		const extensions = extElements.map( extEl => extEl?.getAttribute('base')?.split(':')[1] )
		const extensionString = extensions.map( ext => `${name} --|> ${ext}`).join('\n')
	
		// 
		// Attributes
		// eg.: <xs:attribute name="type" type="xs:normalizedString" use="optional"/>
		// 
		const attributeElements = find_attributes(complex_type)
		const attributes = attributeElements.map( attrEl => {
			return {
				name: attrEl.getAttribute('name'),
				type: attrEl.getAttribute('type')?.split(':')[1],
				// TODO: optionality is missing
			}
		})
		const attributeString = attributes.map( attr => `${name} : +${attr.type} ${attr.name} `).join('\n')


		// callback Shape "callbackFunction" "This is a tooltip for a callback"
		return [
			`class ${name}`,
			// `note for ${name} "This is a note for a class"`,
			`click ${name} href "${name}"`,
			`${extensionString}`,
			`${attributeString}`,
		].join('\n')
	}).join('\n');

	return mstr
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

export function find_children_elements(root: Element, xs: Element): Element[] {
	const children = Array.from(xs.querySelectorAll('xs\\:sequence > xs\\:element'))
	return children
}

function find_complex_type_by_name(root:Element, name:string): Nullable<Element> {
	const selector = `xs\\:complexType[name="${name}"]`
	const element = root.querySelector(selector);
	return element as Nullable<Element>
}


const theme = `
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