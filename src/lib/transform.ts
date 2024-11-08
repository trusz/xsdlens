
export function transform(content: string): string{
	const xsdElement = document.createElement('xsd');
	xsdElement.innerHTML = content;

	const mermaidComponents = []

	const complexTypes = findComplexTypes(xsdElement);
	mermaidComponents.push(convertComplexTypes(complexTypes));


	return `\
classDiagram
	${mermaidComponents.join('\n')}	
`
}


function findElements(xsd: HTMLElement): Element[] {
	const elements = xsd.querySelectorAll('xs\\:element');
	return Array.from(elements)
}

function findComplexTypes(xsd: HTMLElement): Element[] {
	const elements = xsd.querySelectorAll('xs\\:complexType');
	return Array.from(elements)
}

function convertComplexTypes(complexTypes: Element[]): string {
	const mstr = complexTypes.slice(1,10).map((complexType) => {
		const name = complexType.getAttribute('name');
		
		// 
		// Extension / Inheritance
		// eg.: <xs:extension base="eIEC61850-6-100:t6-100LNodeContainer">
		// 
		const extElements = Array.from(complexType.querySelectorAll('xs\\:extension'))
		const extensions = extElements.map( extEl => extEl?.getAttribute('base')?.split(':')[1] )
		const extensionString = extensions.map( ext => `${name} --|> ${ext}`).join('\n')
	
		// 
		// Attributes
		// eg.: <xs:attribute name="type" type="xs:normalizedString" use="optional"/>
		// 
		const attributeElements = Array.from(complexType.querySelectorAll('xs\\:attribute'))
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

