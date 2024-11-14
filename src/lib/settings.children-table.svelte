{#if children_elements.length > 0}
<Card.Root class="">
	<Card.Header>
		<Card.Title>{name}</Card.Title>
		<!-- <Card.Description>Deploy your new project in one-click.</Card.Description> -->
	</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Caption>Children of {name}</Table.Caption>
				<Table.Header>
					<Table.Row>
					<Table.Head>Name</Table.Head>
					<Table.Head>Type</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each children_elements as child_element }
					<Table.Row>
						<Table.Cell class="font-medium">{child_element.getAttribute("name")}</Table.Cell>
						<Table.Cell>
							<div class="flex gap-2 items-center">
							{strip_name_space(child_element.getAttribute("type"))}
							<a href={`#${ strip_name_space(child_element.getAttribute("type")) }`}><SquareArrowOutUpRight size={16} /></a>
							</div>
						</Table.Cell>
					</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
{:else}
	<div class="text-lg font-semibold text-center">No child elements found</div>
{/if}
	
	<script lang="ts">
		import * as Table from "$lib/components/ui/table/index.js";
		import type { Nullable } from "./util-types";
		import * as Card from "$lib/components/ui/card/index.js";
		import SquareArrowOutUpRight from "lucide-svelte/icons/square-arrow-out-up-right";
	
	
		type Props = {
			name: Nullable<string>,
			children_elements: Element[]
		}
		const {name, children_elements}: Props = $props();

		function strip_name_space(element_name: Nullable<string>): string{
			if(!element_name) { return "" }
			return element_name.split(":")[1]
		}
	</script>