<script lang="ts">
	import type { Snippet } from "svelte";
	import Bell from "lucide-svelte/icons/bell";
	import ScanSearch from "lucide-svelte/icons/scan-search";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import * as Tabs from "$lib/components/ui/tabs/";
	import { Button } from "$lib/components/ui/button/index.js";
	import Sidebar from "$lib/sidebar.svelte"
    import SearchField from "$lib/components/search-field.svelte";
    import ColorSwitcher from "$lib/components/color-switcher.svelte";
	import { states } from "$lib/state.svelte";	

	type Props = {
		children: Snippet
	}
	let { children }: Props = $props()
</script>
 
<div class="grid min-h-screen w-full md:grid-cols-[400px_1fr] lg:grid-cols-[550px_1fr] scroll-container">
	<div class="bg-muted/40 hidden border-r md:block">
	  <div class="flex h-full max-h-screen flex-col gap-2">
		<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
		  <a href="/" class="flex items-center gap-2 font-semibold">
			<ScanSearch class="h-6 w-6" />
			<span class="">
				XSD Lens
			</span>	
			{#if states.file}
				<ChevronRight class="h-6 w-6"/>
				<span class="text-xs text-muted-foreground"> {states.file?.name} </span>
			{/if}
			
		  </a>
		  <span class="ml-auto h-8 w-8">
			  <ColorSwitcher />
		  </span>
		  <!-- <Button variant="outline" size="icon" class="ml-auto h-8 w-8"> -->
			<!-- <Bell class="h-4 w-4" /> -->
			<!-- <span class="sr-only">Toggle notifications</span> -->
		  <!-- </Button> -->
		</div>
		<aside class="flex-1 overflow-hidden">
			<Sidebar />
		</aside>
	  </div>
	</div>
	<div class="flex flex-col scroll-container">
	  <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
		<div class="flex-1">
		  <form>
			<div class="relative">
			  <!-- <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" /> -->
			  <SearchField />
			  <!-- <Input
				type="search"
				placeholder="Search elements..."
				class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
			  /> -->
			</div>
		  </form>		  
		</div>

		<div class="w-[200px]">
			<Tabs.Root bind:value={states.view_mode} class="max-h-full overflow-hidden tabs-root grid grid-rows-[auto_1fr] h-full">
				<Tabs.List class="grid w-full grid-cols-2">
				  <Tabs.Trigger value="diagram">Diagram</Tabs.Trigger>
				  <Tabs.Trigger value="code">Code</Tabs.Trigger>
				</Tabs.List>
			  </Tabs.Root>
		</div>

	  </header>
	  <content class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 scroll-container" >
		{@render children()}
	  </content>
	</div>
  </div>