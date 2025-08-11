<script>
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import { Separator } from '$lib/components/ui/separator';
	import {
		react,
		html5,
		css3,
		javascript,
		typescript,
		redux,
		storybook,
		webpack,
		vue,
		vite,
		electorn,
		esbuild
	} from '$asset/logo/index';

	const iconMap = {
		HTML5: { src: html5, alt: 'HTML5' },
		CSS3: { src: css3, alt: 'CSS3' },
		JavaScript: { src: javascript, alt: 'JavaScript' },
		TypeScript: { src: typescript, alt: 'TypeScript' },
		React: { src: react, alt: 'React' },
		Redux: { src: redux, alt: 'Redux' },
		Storybook: { src: storybook, alt: 'Storybook' },
		Webpack: { src: webpack, alt: 'Webpack' },
		Vue: { src: vue, alt: 'Vue' },
		Vite: { src: vite, alt: 'Vite' },
		Electorn: { src: electorn, alt: 'Electron' },
		Esbuild: { src: esbuild, alt: 'esbuild' }
	};

	// 只保留兩大組，避免失焦
	const groups = [
		{
			title: 'Web 前端',
			items: [
				{
					title: 'React',
					summary: 'Hooks、效能、Router、表單',
					details: [
						'Hooks：useState / useEffect / useMemo / useCallback / useRef',
						'效能：Memoization、避免重渲染、Lazy Loading / Code Splitting',
						'路由：React Router、Next.js App Router 基本觀念',
						'表單：react-hook-form + zod（型別安全驗證）'
					],
					iconKey: 'React'
				},
				{
					title: '狀態與資料',
					summary: 'Redux / Zustand / SWR / React Query',
					details: [
						'Redux Toolkit、RTK Query（資料快取與同步）',
						'Zustand（slice、middleware、persist）',
						'SWR / React Query（快取策略、錯誤與載入狀態）'
					],
					iconKey: 'Redux'
				},
				{
					title: 'Vue（含遷移經驗）',
					summary: 'Vue 2 → 3 遷移、Composition API',
					details: [
						'實務：協助公司 Vue 2 → 3 遷移（逐步替換、相容層處理）',
						'Options API → Composition API 重構',
						'Vue Router 3 → 4、Vuex → Pinia 的對應改造',
						'元件拆分與型別導入（Vue + TS 基本型別策略）'
					],
					iconKey: 'Vue'
				},
				{
					title: 'UI / 樣式',
					summary: 'Tailwind CSS / Bootstrap / shadcn/ui',
					details: [
						'Tailwind：設計 token、暗色模式、客製化 plugin',
						'Bootstrap：格線系統與元件客製化、RWD 實務',
						'shadcn/ui：Radix primitives、可存取性與可組合元件',
						'Tailwind + shadcn 在專案的整合與樣式一致性'
					],
					iconKey: 'CSS3'
				},
				{
					title: '測試與文件',
					summary: 'RTL / Jest / Playwright / Storybook',
					details: [
						'React Testing Library + Jest（單元/元件）',
						'Playwright（端對端、CI 瀏覽器測試）',
						'Storybook（Docs/Controls/A11y，搭配 MSW 模擬 API）'
					],
					iconKey: 'Storybook'
				}
			]
		},
		{
			title: '建置 / 平台與實戰',
			items: [
				{
					title: 'Vite',
					summary: '極速開發、HMR、Rollup 打包',
					details: [
						'Dev Server / HMR、環境切換與多入口',
						'rollupOptions 設定、別名/資源處理',
						'實戰：CRA → Vite 搬家（env、腳本、別名、相容性）'
					],
					iconKey: 'Vite'
				},
				{
					title: 'Webpack',
					summary: '分包、快取、產線優化',
					details: [
						'Code Splitting / Dynamic Import / Lazy Loading',
						'快取與雜湊、Terser/CSS Minify、持久化快取',
						'Bundle 分析與拆分策略'
					],
					iconKey: 'Webpack'
				},
				{
					title: 'esbuild',
					summary: '高速轉譯與壓縮、工具鏈基礎',
					details: [
						'Transpile / Minify（TS/JSX）',
						'在 Vite / Tauri 等工具中的角色',
						'速度優化與整合實務'
					],
					iconKey: 'Esbuild'
				},
				{
					title: 'Electron / Tauri',
					summary: '跨平台桌面應用',
					details: [
						'Electron：主/渲染程序、IPC、系統 API、electron-builder',
						'Tauri：Rust 後端、Commands、權限安全、打包與更新',
						'前端框架與桌面殼層的整合與部署'
					],
					iconKey: 'Electorn'
				},
				{
					title: '遷移實戰',
					summary: 'CRA → Vite、Vue 2 → 3',
					details: [
						'CRA → Vite：腳本替換、.env、絕對路徑、資源處理',
						'Vue 2 → 3：相容層、Composition API、Router/Vuex 替換',
						'風險控管：漸進式遷移、回歸測試與觀測'
					]
				}
			]
		}
	];
</script>

<section class="bg-white py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-6xl">
			<!-- 標題區域 -->
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">技術技能</h2>
				<p class="text-lg text-gray-600">兩大領域，點擊即可看到我在各技術的具體能力</p>
			</div>

			<!-- 技能組別 -->
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
				{#each groups as group}
					<div class="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
						<h3 class="mb-6 text-xl font-semibold text-gray-900">{group.title}</h3>

						<div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
							{#each group.items as item}
								<Popover>
									<PopoverTrigger>
										<div
											class="group relative flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-purple-300 hover:bg-purple-50/30"
										>
											<div class="flex flex-col items-center gap-2 text-center">
												{#if item.iconKey && iconMap[item.iconKey]}
													<img
														src={iconMap[item.iconKey].src}
														alt={iconMap[item.iconKey].alt}
														class="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
														loading="lazy"
													/>
												{:else}
													<div
														class="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-blue-600 transition-transform duration-200 group-hover:scale-110"
													>
														<span class="text-xs font-bold text-white">
															{item.title.slice(0, 2)}
														</span>
													</div>
												{/if}

												<span
													class="text-sm leading-tight font-medium text-gray-700 group-hover:text-gray-900"
												>
													{item.title}
												</span>
											</div>
										</div>
									</PopoverTrigger>

									<PopoverContent class="w-80 p-0" align="center">
										<div class="p-4">
											<!-- 標題區域 -->
											<div class="mb-3 flex items-center gap-3">
												{#if item.iconKey && iconMap[item.iconKey]}
													<img
														src={iconMap[item.iconKey].src}
														alt={iconMap[item.iconKey].alt}
														class="h-8 w-8"
													/>
												{:else}
													<div
														class="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-blue-600"
													>
														<span class="text-sm font-bold text-white">
															{item.title.slice(0, 2)}
														</span>
													</div>
												{/if}
												<div class="flex-1">
													<h4 class="font-semibold text-gray-900">{item.title}</h4>
													<p class="text-sm text-muted-foreground">{group.title}</p>
												</div>
											</div>

											<!-- 簡介 -->
											<p class="mb-3 text-sm text-gray-600">{item.summary}</p>

											<Separator class="my-3" />

											<!-- 詳細技能 -->
											<div class="space-y-2">
												<h5 class="text-sm font-medium text-gray-900">具體技能</h5>
												<ul class="space-y-1.5">
													{#each item.details as detail}
														<li
															class="flex items-start gap-2 text-sm leading-relaxed text-gray-600"
														>
															<span class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
															></span>
															<span>{detail}</span>
														</li>
													{/each}
												</ul>
											</div>
										</div>
									</PopoverContent>
								</Popover>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";
</style>
