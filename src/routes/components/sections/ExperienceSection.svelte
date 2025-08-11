<script lang="ts">
	import { Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let showAllExperience = $state(false);

	const experiences = [
		{
			id: 'cyberbiz',
			title: '前端工程師 / Scrum Master',
			company: '順立智慧股份有限公司',
			period: '二月 2021 - 現在',
			location: '台北, 台灣',
			logo: 'https://static.104.com.tw/b_profile/cust_picture/6441/130000000046441/logo.png?v=20230911163752',
			skills: [
				'React',
				'Redux',
				'TypeScript',
				'Vue',
				'Electron',
				'Storybook',
				'Vite',
				'RTK Query',
				'Jest',
				'React Testing Library',
				'Ruby on Rails'
			],
			description: [
				'入職第一年以產品維護為主，處理客戶端回饋與缺陷修復，快速熟悉產品脈絡與代碼基礎。期間使用 jQuery、React、Vue、Liquid、Haml、Backbone 等技術。',
				'其後轉至 POS 團隊，參與線下門市 POS 系統的開發與優化，深化 React 生態與型別化開發（Redux Toolkit、TypeScript、Electron），並處理硬體串接相關需求。',
				'擔任 Scrum Master 後，推動敏捷儀式與流程優化，協調跨部門合作，關注交付節奏與可視透明度（看板／燃盡趨勢）。',
				'參與新產品線「門市助理」行動版 Web App（供門市店員使用），實作會員註冊、LINE 綁定、導購推播與會員權益等流程。專案採前後端分離：後端 Ruby on Rails，前端自 esbuild 遷移至 Vite；導入 Jest 與 React Testing Library，並以 RTK Query 串接 API。',
				'協助打造公司自用 UI 元件庫，統一設計語言並降低重複開發成本；配合 Storybook 建立文件化與視覺回歸基礎，提升跨產品線的一致性與開發效率。'
			],
			isLatest: true
		},
		{
			id: 'iii',
			title: '前端工程師就業養成班第九期',
			company: '資策會',
			period: '七月 2020 - 十一月 2020',
			location: '台北, 台灣',
			logo: 'https://www.iii.org.tw/favicon.ico',
			skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux', 'PHP'],
			description: [
				'在這期間扎實且有系統學習前端技能期間，平時我也會盡可能的教導附近的同學，從一開始 CSS 的 Float / Flex，到後來 Javascript 的 var / let / const、閉包、callback 地獄 / promise / async & await 等重要觀念，在期末的專題製作中，也是扮演技術支援的角色，協助大家debug，同學們的問題主要都是發生在使用串接資料庫的異步處理，以及使用useEffect的生命週期管理上。'
			],
			isLatest: false
		},
		{
			id: 'kenmec',
			title: '軟體工程師',
			company: '廣運機械工程股份有限公司',
			period: '九月 2018 - 五月 2020',
			location: '台北, 台灣',
			logo: 'https://static.104.com.tw/b_profile/cust_picture/1000/4757891000/logo.png?v=20230914104647',
			skills: ['C#', 'MSSQL', 'ROS'],
			description: [
				'主要負責實作客戶所需的自動化倉庫物流及資料流，以Ｃ＃作為主要開發語言來開發.net WinForms 應用，通過讀寫PLC的記憶體來操作設備的運作，另外使用了SQL的store procedure來操作資料庫的資料變化，完成三個新專案及一個維護專案。',
				'並且與凌華科技共同合作，調教使用ROS技術，公司自主研發的載貨自走車。',
				'之後公司決定發展數據中心，開始運用網頁前後端技術，當時是以ASP .NET MVC 為開發工具，接觸網頁程式設計後，認為這是一個很有發展空間的領域，於是決定離職再進修。'
			],
			isLatest: false
		}
	];

	const education = {
		title: '國立成功大學工程科學系',
		subtitle: '資訊工程組',
		period: '2013 - 2018',
		logo: 'https://www.es.ncku.edu.tw/esncku/zh/favicon.ico'
	};

	const toggleExperience = () => {
		showAllExperience = !showAllExperience;
	};

	const getSkillColor = (skill: string) => {
		const colors = {
			React: 'bg-blue-100 text-blue-800',
			Redux: 'bg-purple-100 text-purple-800',
			Vue: 'bg-green-100 text-green-800',
			TypeScript: 'bg-yellow-100 text-yellow-800',
			Electron: 'bg-red-100 text-red-800',
			Storybook: 'bg-indigo-100 text-indigo-800',
			HTML: 'bg-orange-100 text-orange-800',
			CSS: 'bg-blue-100 text-blue-800',
			JavaScript: 'bg-yellow-100 text-yellow-800',
			PHP: 'bg-green-100 text-green-800',
			'C#': 'bg-blue-100 text-blue-800',
			MSSQL: 'bg-green-100 text-green-800',
			ROS: 'bg-red-100 text-red-800'
		};
		return colors[skill as keyof typeof colors] || 'bg-gray-100 text-gray-800';
	};
</script>

<section class="bg-gray-50 py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">工作經歷</h2>
				<p class="text-lg text-gray-600">我的職業發展歷程</p>
			</div>

			<!-- Latest Experience (Always Visible) -->
			{#each experiences.filter((exp) => exp.isLatest) as experience}
				<div class="mb-8 rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
					<div class="flex flex-col gap-6 lg:flex-row">
						<div class="flex-shrink-0">
							<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
								<img
									src={experience.logo}
									alt={experience.company}
									class="h-12 w-12 object-contain"
								/>
							</div>
						</div>
						<div class="flex-1">
							<div class="mb-4 flex flex-col lg:flex-row lg:items-start lg:justify-between">
								<div class="flex-1">
									<h3 class="text-xl font-semibold text-gray-900">{experience.title}</h3>
									<h4 class="text-lg font-medium text-purple-600">{experience.company}</h4>
									<div class="mt-2 flex items-center gap-4 text-gray-600">
										<div class="flex items-center gap-1">
											<Calendar size={16} />
											<span>{experience.period}</span>
										</div>
										<div class="flex items-center gap-1">
											<MapPin size={16} />
											<span>{experience.location}</span>
										</div>
									</div>
								</div>
								<div class="flex-1 mt-4 lg:mt-0">
									<div class="flex flex-wrap gap-2">
										{#each experience.skills as skill}
											<span class="px-3 py-1 {getSkillColor(skill)} rounded-full text-sm"
												>{skill}</span
											>
										{/each}
									</div>
								</div>
							</div>
							<div class="space-y-3 text-gray-700">
								{#each experience.description as paragraph}
									<p>{paragraph}</p>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}

			<!-- Toggle Button -->
			<div class="mb-8 text-center">
				<button
					onclick={toggleExperience}
					class="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
				>
					{showAllExperience ? '收合更多經歷' : '查看更多經歷'}
					{#if showAllExperience}
						<ChevronUp size={20} />
					{:else}
						<ChevronDown size={20} />
					{/if}
				</button>
			</div>

			<!-- Additional Experiences (Collapsible) -->
			{#if showAllExperience}
				<div transition:slide={{ duration: 300 }}>
					<div class="space-y-8">
						{#each experiences.filter((exp) => !exp.isLatest) as experience}
							<div class="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
								<div class="flex flex-col gap-6 lg:flex-row">
									<div class="flex-shrink-0">
										<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
											<img
												src={experience.logo}
												alt={experience.company}
												class="h-12 w-12 object-contain"
											/>
										</div>
									</div>
									<div class="flex-1">
										<div class="mb-4 flex flex-col lg:flex-row lg:items-start lg:justify-between">
											<div>
												<h3 class="text-xl font-semibold text-gray-900">{experience.title}</h3>
												<h4 class="text-lg font-medium text-purple-600">{experience.company}</h4>
												<div class="mt-2 flex items-center gap-4 text-gray-600">
													<div class="flex items-center gap-1">
														<Calendar size={16} />
														<span>{experience.period}</span>
													</div>
													<div class="flex items-center gap-1">
														<MapPin size={16} />
														<span>{experience.location}</span>
													</div>
												</div>
											</div>
											<div class="mt-4 lg:mt-0">
												<div class="flex flex-wrap gap-2">
													{#each experience.skills as skill}
														<span class="px-3 py-1 {getSkillColor(skill)} rounded-full text-sm"
															>{skill}</span
														>
													{/each}
												</div>
											</div>
										</div>
										<div class="space-y-3 text-gray-700">
											{#each experience.description as paragraph}
												<p>{paragraph}</p>
											{/each}
										</div>
									</div>
								</div>
							</div>
						{/each}

						<!-- Education Section -->
						<div class="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
							<div class="mb-6 text-center">
								<h3 class="text-2xl font-bold text-gray-900">教育背景</h3>
							</div>
							<div class="flex flex-col gap-6 lg:flex-row">
								<div class="flex-shrink-0">
									<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
										<img src={education.logo} alt="NCKU" class="h-12 w-12 object-contain" />
									</div>
								</div>
								<div class="flex-1">
									<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
										<div>
											<h4 class="text-xl font-semibold text-gray-900">{education.title}</h4>
											<h5 class="text-lg font-medium text-purple-600">{education.subtitle}</h5>
											<div class="mt-2 flex items-center gap-1 text-gray-600">
												<Calendar size={16} />
												<span>{education.period}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";
</style>
