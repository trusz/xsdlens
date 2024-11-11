<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	
	
   </script>
	
   <Sidebar.Root side="left" variant="sidebar" collapsible="none">
	<Sidebar.Content>
	 <Sidebar.Group>
	  <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
	  <Sidebar.GroupContent>
		<Tabs.Root value="element" class="w-[100%]">
			<Tabs.List class="grid w-full grid-cols-2">
			  <Tabs.Trigger value="element">Element</Tabs.Trigger>
			  <Tabs.Trigger value="document">Document</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="element">
			  Element Settings
			</Tabs.Content>
			<Tabs.Content value="document">
			 Document Settings
			</Tabs.Content>
		  </Tabs.Root>
	   </Sidebar.GroupContent>
	 </Sidebar.Group>
	</Sidebar.Content>
   </Sidebar.Root>