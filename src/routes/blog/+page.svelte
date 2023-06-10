<script lang="ts">
  import Card from '$components/card/Card.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

</script>

<div class="container mx-auto p-4">
	<h1 class="text-3xl font-bold underline mb-4">Hello world!</h1>
  <div class="grid grid-cols-4 gap-4">
    {#each data.testCards as card} 
      <Card card={card} />
    {/each}
  </div>
</div>
