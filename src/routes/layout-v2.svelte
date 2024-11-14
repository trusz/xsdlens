<script lang="ts">
	import type { Snippet } from "svelte";
	import Bell from "lucide-svelte/icons/bell";
	import ScanSearch from "lucide-svelte/icons/scan-search";
	
	import { Button } from "$lib/components/ui/button/index.js";
	import Sidebar from "$lib/sidebar.svelte"
    import SearchField from "$lib/components/search-field.svelte";

	type Props = {
		children: Snippet
	}
	let { children }: Props = $props()
</script>
 
<div class="grid min-h-screen w-full md:grid-cols-[400px_1fr] lg:grid-cols-[550px_1fr]">
	<div class="bg-muted/40 hidden border-r md:block">
	  <div class="flex h-full max-h-screen flex-col gap-2">
		<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
		  <a href="/" class="flex items-center gap-2 font-semibold">
			<ScanSearch class="h-6 w-6" />
			<span class="">XSD Lens</span>	
		  </a>
		  <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
			<Bell class="h-4 w-4" />
			<span class="sr-only">Toggle notifications</span>
		  </Button>
		</div>
		<aside class="flex-1 overflow-hidden">
			<Sidebar />
		</aside>
	  </div>
	</div>
	<div class="flex flex-col">
	  <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
		<div class="w-full flex-1">
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
	  </header>
	  <content class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
		{@render children()}
	  </content>
	</div>
  </div>