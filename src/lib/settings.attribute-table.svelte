
<Card.Root class="">
<Card.Header>
	<Card.Title>{name}</Card.Title>
	<!-- <Card.Description>Deploy your new project in one-click.</Card.Description> -->
</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Caption>Attributes of {name}</Table.Caption>
			<Table.Header>
				<Table.Row>
				<Table.Head class="">Name</Table.Head>
				<Table.Head>Type</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each attr_elements as attr }
				<Table.Row>
					<Table.Cell class="font-medium">{attr.getAttribute("name")}</Table.Cell>
					<Table.Cell>{attr.getAttribute("type")}</Table.Cell>
				</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>

<script lang="ts">
	import * as Table from "$lib/components/ui/table/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import type { Nullable } from "./util-types";
	import * as Card from "$lib/components/ui/card/index.js";
		


	type Props = {
		name: Nullable<string>,
		attr_elements: Element[]
	}
	const {name, attr_elements}: Props = $props();
</script>