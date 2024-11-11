<Sidebar.Root side="left" variant="floating" collapsible="none" class="max-h-[100%]">
	<Sidebar.Content>
		<Sidebar.Group>
	  <Sidebar.GroupLabel>
		<h4 class="scroll-m-20 text-xl font-semibold tracking-tight mb-2">Settings</h4>
	  </Sidebar.GroupLabel>
	  <Sidebar.GroupContent>
		<Tabs.Root value="element" class="w-[100%]">
			<Tabs.List class="grid w-full grid-cols-2">
			  <Tabs.Trigger value="element">Element</Tabs.Trigger>
			  <Tabs.Trigger value="document">Document</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="element">
				<SettingsElement />
			</Tabs.Content>
			<Tabs.Content value="document">
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
	import { state } from "$lib/state.svelte"
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import SettingsElement from "./settings.element.svelte"

	// let { children } = $props();


</script>


