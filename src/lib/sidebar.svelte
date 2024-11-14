<Sidebar.Root side="left" variant="floating" collapsible="none" class="max-h-full overflow-hidden">
	<Sidebar.Content class="max-h-full overflow-hidden">
	<Sidebar.Group class="max-h-full overflow-hidden">
	  <Sidebar.GroupLabel>
		<h4 class="scroll-m-20 text-xl font-semibold tracking-tight mb-2">Settings</h4>
	  </Sidebar.GroupLabel>
	  <Sidebar.GroupContent class="max-h-full overflow-hidden">
		<Tabs.Root value="attributes" class="max-h-full overflow-hidden tabs-root grid grid-rows-[auto_1fr] h-full">
			<Tabs.List class="grid w-full grid-cols-3">
			  <Tabs.Trigger value="attributes">Attributes</Tabs.Trigger>
			  <Tabs.Trigger value="children">Children</Tabs.Trigger>
			  <Tabs.Trigger value="document">Document</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="attributes" class="max-h-full overflow-auto tabs-content ring-0">
				<SettingsElement />
			</Tabs.Content>
			<Tabs.Content value="children" class="max-h-full overflow-auto tabs-content">
				<SettingsChildren />
			</Tabs.Content>
			<Tabs.Content value="document" class="max-h-full overflow-auto tabs-content">
			 Document Settings
			</Tabs.Content>
		  </Tabs.Root>
	   </Sidebar.GroupContent>
	 </Sidebar.Group>
	</Sidebar.Content>
   </Sidebar.Root>

<style>

</style>


<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import SettingsElement from "./settings.element.svelte"
	import SettingsChildren from "./settings.children.svelte"

	// let { children } = $props();
</script>


