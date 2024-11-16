<script>
	import '../app.postcss';
	import {browser} from "$app/environment";

	let { children } = $props();
$effect(() => {
  AOS.init({
	duration: 1750, // Animation duration
	
  });
  AOS.refresh(); // Ensures AOS is aware of any new content in the component
});
</script>

	<div class="flex flex-col justify-items-center text-center justify-center">
		{@render children()}
	</div>
 