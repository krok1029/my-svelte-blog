<script lang="ts">
  import Card from '$components/card/Card.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

</script>

<div class="container mx-auto p-4">
  <div class="grid grid-cols-4 gap-4">
    {#each data.blogPosts as card} 
      <Card card={card} />
    {/each}
  </div>
</div>
