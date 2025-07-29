<script lang="ts">
  import Card from './components/BlogCard.svelte';
  import { Search, Filter, Calendar, Tag } from 'lucide-svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  
  let searchQuery = '';
  let selectedTag = '';
  
  // 獲取所有標籤
  $: allTags = [...new Set(data.blogPosts.flatMap(post => post.tags))];
  
  // 過濾文章
  $: filteredPosts = data.blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.brief.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });
</script>

<svelte:head>
  <title>部落格 - 李明峯 | Frontend Developer</title>
  <meta name="description" content="李明峯的技術部落格，分享前端開發經驗與心得" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">技術部落格</h1>
      <p class="text-xl text-gray-600 mb-8">
        分享我在前端開發路上的學習心得與技術見解
      </p>
      
      <!-- Search Bar -->
      <div class="max-w-2xl mx-auto">
        <div class="relative">
          <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="搜尋文章..."
            bind:value={searchQuery}
            class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Filter Section -->
<section class="py-8 bg-white border-b border-gray-100">
  <div class="container mx-auto px-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-2 text-gray-600">
          <Filter size={18} />
          <span class="font-medium">篩選標籤：</span>
        </div>
        
        <button
          on:click={() => selectedTag = ''}
          class="filter-tag {selectedTag === '' ? 'active' : ''}"
        >
          全部
        </button>
        
        {#each allTags as tag}
          <button
            on:click={() => selectedTag = tag}
            class="filter-tag {selectedTag === tag ? 'active' : ''}"
          >
            <Tag size={14} />
            {tag}
          </button>
        {/each}
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        共找到 {filteredPosts.length} 篇文章
      </div>
    </div>
  </div>
</section>

<!-- Blog Posts Grid -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-6xl mx-auto">
      {#if filteredPosts.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each filteredPosts as card}
            <div class="blog-card-wrapper">
              <Card {card} />
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-16">
          <div class="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <Search class="text-gray-400" size={32} />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">找不到相關文章</h3>
          <p class="text-gray-600 mb-6">試試調整搜尋關鍵字或選擇不同的標籤</p>
          <button
            on:click={() => { searchQuery = ''; selectedTag = ''; }}
            class="btn-primary"
          >
            清除篩選條件
          </button>
        </div>
      {/if}
    </div>
  </div>
</section>

<style lang="postcss">
  .filter-tag {
    @apply inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-all;
  }
  
  .filter-tag.active {
    @apply bg-purple-100 border-purple-300 text-purple-700;
  }
  
  .blog-card-wrapper {
    @apply transform transition-all duration-300 hover:-translate-y-2;
  }
</style>
