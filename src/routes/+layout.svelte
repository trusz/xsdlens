<!-- <LayoutV1>
	{@render children()}
</LayoutV1> -->

<ModeWatcher />
<LayoutV2>
	{@render children()}
</LayoutV2>


<style>

</style>

<script lang="ts">
	import "../app.css"
	import LayoutV1 from "./layout-v1.svelte";
	import LayoutV2 from "./layout-v2.svelte";
	import { ModeWatcher } from "mode-watcher";
	
	let { children } = $props();
</script>