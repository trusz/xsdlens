<script lang="ts">
	import Check from "lucide-svelte/icons/check";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import { tick } from "svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { states } from "$lib/state.svelte";
    import { find_complex_types } from "../transform";

	let nodes = $derived( 
		states.xsd
			? find_complex_types(states.xsd)
				.map(el => el.getAttribute("name"))
				.filter(Boolean)
			: []
		) as string[]
	
	let open = $state(false);
	let value = $state("");
	let triggerRef = $state<HTMLButtonElement>(null!);
	
	$effect(() => {
		window.location.hash = value;
	});

	$effect(() => {
		value = states.selected_node
	});


	// const selected_value = $derived(
	//  nodes.find((node) => node === value)
	// );
	
	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
	 open = false;
	 tick().then(() => {
	  triggerRef.focus();
	 });
	}
   </script>
	
   <Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
	 {#snippet child({ props })}
	  <Button
	   variant="outline"
	   class="w-[400px] justify-between"
	   {...props}
	   role="combobox"
	   aria-expanded={open}
	  >
	   {value || "Select a node..."}
	   <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
	  </Button>
	 {/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[400px] p-0">
	 <Command.Root>
	  <Command.Input placeholder="Search framework..." />
	  <Command.List>
	   <Command.Empty>No node found.</Command.Empty>
	   <Command.Group>
		{#each nodes as node}
		 <Command.Item
		  value={node}
		  onSelect={() => {
		   value = node;
		   closeAndFocusTrigger();
		  }}
		 >
		  <Check
		   class={cn(
			"mr-2 size-4",
			value !== node && "text-transparent"
		   )}
		  />
		  {node}
		 </Command.Item>
		{/each}
	   </Command.Group>
	  </Command.List>
	 </Command.Root>
	</Popover.Content>
   </Popover.Root>