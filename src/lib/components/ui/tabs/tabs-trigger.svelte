<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.TriggerProps = $props();
</script>

<TabsPrimitive.Trigger
	bind:ref
	class={cn(
		`
		ring-offset-background 
		focus-visible:ring-ring
		data-[state=active]:bg-background 
		data-[state=active]:text-foreground 
		inline-flex 
		items-center 
		justify-center 
		whitespace-nowrap 
		rounded-sm 
		px-1
		py-1 
		text-m 
		font-medium 
		transition-all 
		focus-visible:outline-none 
		focus-visible:ring-1 
		focus-visible:ring-offset-1
		disabled:pointer-events-none 
		disabled:opacity-50 
		data-[state=active]:shadow-sm`,
		className
	)}
	{...restProps}
/>
