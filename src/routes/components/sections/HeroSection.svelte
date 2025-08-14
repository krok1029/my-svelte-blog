<script lang="ts">
  import { Calendar, MapPin } from 'lucide-svelte';

  // === 基本資訊 ===
  const NAME = '李明峯';
  const YEARS_TOTAL = 6;
  const YEARS_FE = 4; // Cyberbiz
  const YEARS_BE = 2; // Kenmec

  // === 經歷（對齊 ExperienceSection 的呈現方式） ===
  const experiences = [
    {
      id: 'cyberbiz',
      company: '順立智慧股份有限公司（Cyberbiz）',
      title: '前端工程師 / Scrum Master',
      period: '二月 2021 - 現在',
      location: '台北, 台灣',
      logo: 'https://static.104.com.tw/b_profile/cust_picture/6441/130000000046441/logo.png?v=20230911163752',
      skills: ['React', 'Redux', 'TypeScript', 'Vue', 'Electron', 'Storybook'],
      points: [
        '主力負責電商與 POS 前端開發與維護，推動效能優化（分包、Lazy Loading、快取策略）',
        '導入 TypeScript 與元件化設計，建立 Storybook 文件與可及性檢核流程',
        '擔任 Scrum Master：儀式推動、燃盡圖/看板可視化、跨部門協作落地'
      ]
    },
    {
      id: 'kenmec',
      company: '廣運機械工程股份有限公司（Kenmec）',
      title: '.NET Developer',
      period: '九月 2018 - 五月 2020',
      location: '台北, 台灣',
      logo: 'https://static.104.com.tw/b_profile/cust_picture/1000/4757891000/logo.png?v=20230914104647',
      skills: ['C#', 'MSSQL', 'ASP.NET MVC'],
      points: [
        '內部工具與後端 API 開發，配合資料模型與商業流程落地',
        '使用 SQL Stored Procedure 處理資料流；與設備/系統整合'
      ]
    }
  ];

  // === 個人標籤 ===
  const tags = [
    '前端為主',
    '樂於嘗試後端',
    'React / Vue',
    'Vite / Webpack / esbuild',
    'Tailwind / Bootstrap / shadcn',
    'Electron / Tauri',
    'Scrum Master'
  ];

  // 與 ExperienceSection 一致的技能顏色（找不到則走灰色）
  const getSkillColor = (skill: string) => {
    const colors = {
      React: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      Redux: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      Vue: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      TypeScript: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      Electron: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      Storybook: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
      'C#': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      MSSQL: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'ASP.NET MVC': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    } as const;
    return (colors as any)[skill] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  };
</script>

<section id="hero" class="bg-white dark:bg-gray-900">
  <div class="container mx-auto px-4 py-20">
    <div class="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 md:grid-cols-2">
      <!-- 左：主標與敘事 -->
      <div>
        <p class="mb-2 text-sm tracking-wider text-purple-700 dark:text-purple-400">Hi，我是</p>
        <h1 class="mb-2 text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          <span class="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {NAME}
          </span>
        </h1>
        <h2 class="mb-5 text-2xl font-bold text-gray-800 dark:text-gray-200">
          資深前端工程師 · {YEARS_TOTAL} 年軟體開發經驗
        </h2>

        <p class="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          目前以前端為主（<strong>4 年</strong>，Cyberbiz），
          也有 <strong>.NET 後端 2 年</strong>（Kenmec）經驗。
          在 Cyberbiz 擔任過 <strong>Scrum Master</strong>，
          關注產品交付節奏、品質與跨部門協作。
          我熱愛打造穩定、可擴充、好維護的使用者體驗，
          同時也樂於嘗試並承擔更多後端與平台相關工作。
        </p>

        <!-- 標籤 -->
        <ul class="mb-8 flex flex-wrap gap-2">
          {#each tags as t}
            <li class="rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1 text-xs text-gray-700 dark:text-gray-300">{t}</li>
          {/each}
        </ul>

        <!-- CTA -->
        <div class="flex flex-wrap gap-3">
          <a
            href="#projects"
            class="inline-flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-700 px-5 py-3 text-sm font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="查看作品專案"
            >查看作品</a
          >
          <a
            href="#contact"
            class="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="與我聯絡"
            >與我聯絡</a
          >
        </div>
      </div>

      <!-- 右：迷你經歷卡（沿用 ExperienceSection 的視覺） -->
      <div class="space-y-6">
        {#each experiences as exp}
          <div class="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg">
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                <img src={exp.logo} alt={exp.company} class="h-10 w-10 object-contain" />
              </div>
              <div class="flex-1">
                <div class="mb-2 flex flex-col gap-1">
                  <p class="text-base font-semibold text-gray-900 dark:text-gray-100">{exp.title}</p>
                  <p class="text-sm font-medium text-purple-600 dark:text-purple-400">{exp.company}</p>
                </div>

                <div class="mb-3 flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div class="flex items-center gap-1">
                    <Calendar size={16} />
                    <span class="text-xs">{exp.period}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <MapPin size={16} />
                    <span class="text-xs">{exp.location}</span>
                  </div>
                </div>

                <div class="mb-3 flex flex-wrap gap-2">
                  {#each exp.skills as s}
                    <span class="rounded-full px-3 py-1 text-xs {getSkillColor(s)}">{s}</span>
                  {/each}
                </div>

                <ul class="ml-4 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {#each exp.points as p}
                    <li>{p}</li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        {/each}

        <!-- 目標句 -->
        <div class="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-sm text-white">
          目前<strong>以前端為主</strong>，並持續投入<strong>後端 / 平台</strong>（Vite、架構遷移、Electron、Tauri）等領域的實務。
        </div>
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  @reference "tailwindcss";
</style>
