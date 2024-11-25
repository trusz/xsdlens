<Card.Root>
	<Card.Header>
		<Card.Title>Document Settings</Card.Title>
		<Card.Description>Change how your document is displayed</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Show Children</span>
				<span class="text-muted-foreground text-xs font-normal leading-snug">
					Shows parent-child relationships.
				</span>
			</Label>
			<Switch id="necessary" aria-label="Necessary" bind:checked={states.settings.show_children} />
		</div>
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Show Extensions</span>
				<span class="text-muted-foreground text-xs font-normal leading-snug">
					Shows extension relationships.
				</span>
			</Label>
			<Switch id="necessary" aria-label="Necessary" bind:checked={states.settings.show_extensions} />
		</div>
		<div class="flex items-center justify-between space-x-2">
			<Label for="necessary" class="flex flex-col space-y-1">
				<span>Focus mode</span>
				<span class="text-muted-foreground text-xs font-normal leading-snug">
					If a node is selected, show only related nodes
				</span>
			</Label>
			<Switch id="necessary" aria-label="Necessary" bind:checked={states.settings.focus_mode} />
		</div>
		
	</Card.Content>
</Card.Root>


<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Switch } from "$lib/components/ui/switch/index.js";

	import {states} from "$lib/state.svelte";

	
</script>