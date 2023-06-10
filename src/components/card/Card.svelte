<script lang="ts">
	import defaultImageUrl from '$asset/card-top.jpg';
	import type { Card } from '$type/Card';
	export let card: Card;
</script>

<div class="max-w-sm rounded overflow-hidden shadow-lg">
	<img class="w-full" src={card?.image || defaultImageUrl} alt="Sunset in the mountains" />
	<div class="px-6 py-4">
		<div class="font-bold text-xl mb-2">{card.title}</div>
		<p class="text-gray-700 text-base">
			{card.brief}
		</p>
	</div>
	<div class="px-6 pt-4 pb-2">
		{#if card.tags.length}
			{#each card.tags as tag}
				<span class="card-tag">#{tag}</span>
			{/each}
		{/if}
	</div>
</div>

<style lang="postcss">
	.card-tag {
		@apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2;
	}
</style>
