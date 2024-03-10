<script lang="ts">
	import { goto } from '$app/navigation';
	export let path: string;
	export let imgPath: string;
	export let projecName: string;

	const go = () => goto(path);
</script>

<div
	class="rounded-xl shadow-lg px-4 py-3 flex bg-slate-700 flex-col hover:cursor-pointer border border-gray-200"
	on:click={go}
	on:keydown={() => {}}
>
	<img class="object-contain w-40 h-40 mx-auto" src={imgPath} alt={projecName} />

	<div class="">
		<a href={path} class="font-bold text-base mb-2 text-gray-100">{projecName}</a>
	</div>
</div>

<style lang="postcss">
</style>
