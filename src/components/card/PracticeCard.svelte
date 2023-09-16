<script lang="ts">
	import { goto } from '$app/navigation';
	import defaultImageUrl from '$asset/card-top.jpg';
	import type { PracticeCard } from '$type/Card';
	export let card: PracticeCard;
	const path = `/practices/${card.type}/${card.id}`;
	const go = () => goto(path);
</script>

<div class="rounded shadow-lg flex hover:cursor-pointer" on:click={go} on:keydown={() => {}}>
	<img class="w-1/6" class:object-contain={!!card?.image} src={card?.image || defaultImageUrl} alt="Sunset in the mountains" />

	<div class="w-fill">
		<div class="px-6 pt-4">
			<span class="card-tag">#{card.type}</span>
		</div>
		<div class="px-6 pb-4">
			<a href={path} class="font-bold text-xl mb-2">{card.title}</a>
		</div>
	</div>
</div>

<style lang="postcss">
	.card-tag {
		@apply inline-block bg-emerald-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2;
	}
</style>
