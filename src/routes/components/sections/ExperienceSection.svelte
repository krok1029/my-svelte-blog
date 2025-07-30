<script>
	import { Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let showAllExperience = false;

	const experiences = [
		{
			id: 'cyberbiz',
			title: '前端工程師',
			company: '順立智慧股份有限公司',
			period: '二月 2021 - 現在',
			location: '台北, 台灣',
			logo: 'https://static.104.com.tw/b_profile/cust_picture/6441/130000000046441/logo.png?v=20230911163752',
			skills: ['React', 'Redux', 'Vue', 'TypeScript', 'Electron', 'Storybook'],
			description: [
				'當我加入公司的第一年，我的主要職責是產品維護。我專注於解決客戶端回饋的問題，同時積極學習和掌握公司的產品。在這段期間，我廣泛運用了多種技術，包括jQuery、React、Vue、Liquid、Haml、Backbone等。',
				'隨後，我轉到POS團隊，開始參與開發工作。我的工作範疇包括開發和優化線下商店POS系統。在這個過程中，我逐漸深入研究前端開發技術，包括Redux/Toolkit、TypeScript、Electron.js，並掌握了一些硬體串接的技巧。',
				'此外，在POS團隊工作一年多後，我擔任了Scrum團隊的Scrum Master角色，開始積極學習如何更有效地推動團隊的開發流程，以確保順暢的團隊合作和高效的產品交付。'
			],
			isLatest: true
		},
		{
			id: 'iii',
			title: '前端工程師就業養成班第九期',
			company: '資策會',
			period: '七月 2020 - 十一月 2020',
			location: '台北, 台灣',
			logo: 'data:image/png;base64,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',
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
				'主要負責實作客戶所需的自動化倉庫物流及資料流，以Ｃ＃作為主要開發語言，通過讀寫PLC的記憶體來操作設備的運作，另外使用了SQL的store procedure來操作資料庫的資料變化，完成三個新專案及一個維護專案。',
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
		logo: 'https://www.ncku.edu.tw/var/file/0/1000/plugin/mobile/title/hln_4480_3767086_48566.png'
	};

	function toggleExperience() {
		showAllExperience = !showAllExperience;
	}

	function getSkillColor(skill) {
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
		return colors[skill] || 'bg-gray-100 text-gray-800';
	}
</script>

<section class="py-20 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">工作經歷</h2>
				<p class="text-lg text-gray-600">我的職業發展歷程</p>
			</div>

			<!-- Latest Experience (Always Visible) -->
			{#each experiences.filter((exp) => exp.isLatest) as experience}
				<div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
					<div class="flex flex-col lg:flex-row gap-6">
						<div class="flex-shrink-0">
							<div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
								<img
									src={experience.logo}
									alt={experience.company}
									class="w-12 h-12 object-contain"
								/>
							</div>
						</div>
						<div class="flex-1">
							<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
								<div>
									<h3 class="text-xl font-semibold text-gray-900">{experience.title}</h3>
									<h4 class="text-lg text-purple-600 font-medium">{experience.company}</h4>
									<div class="flex items-center gap-4 mt-2 text-gray-600">
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
											<span class="px-3 py-1 {getSkillColor(skill)} text-sm rounded-full"
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
			<div class="text-center mb-8">
				<button
					on:click={toggleExperience}
					class="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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
							<div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
								<div class="flex flex-col lg:flex-row gap-6">
									<div class="flex-shrink-0">
										<div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
											<img
												src={experience.logo}
												alt={experience.company}
												class="w-12 h-12 object-contain"
											/>
										</div>
									</div>
									<div class="flex-1">
										<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
											<div>
												<h3 class="text-xl font-semibold text-gray-900">{experience.title}</h3>
												<h4 class="text-lg text-purple-600 font-medium">{experience.company}</h4>
												<div class="flex items-center gap-4 mt-2 text-gray-600">
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
														<span class="px-3 py-1 {getSkillColor(skill)} text-sm rounded-full"
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
						<div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
							<div class="text-center mb-6">
								<h3 class="text-2xl font-bold text-gray-900">教育背景</h3>
							</div>
							<div class="flex flex-col lg:flex-row gap-6">
								<div class="flex-shrink-0">
									<div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
										<img src={education.logo} alt="NCKU" class="w-12 h-12 object-contain" />
									</div>
								</div>
								<div class="flex-1">
									<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
										<div>
											<h4 class="text-xl font-semibold text-gray-900">{education.title}</h4>
											<h5 class="text-lg text-purple-600 font-medium">{education.subtitle}</h5>
											<div class="flex items-center gap-1 mt-2 text-gray-600">
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
