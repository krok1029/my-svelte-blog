<script lang="ts">
	import Card from '$components/card/PracticeCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto p-4">
  <div class="">
    {#each data.practice as card} 
      <Card card={card} />
    {/each}
  </div>
</div>
