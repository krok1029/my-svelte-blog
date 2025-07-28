<script>
	import { Calendar, MapPin, ExternalLink } from 'lucide-svelte';
</script>

<svelte:head>
	<title>關於我 - 李明峯 | Frontend Developer</title>
	<meta name="description" content="了解更多關於李明峯的工作經歷、技能和教育背景" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto text-center">
			<h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">關於我</h1>
			<p class="text-xl text-gray-600 leading-relaxed">
				一位熱愛技術創新的前端工程師，專注於創造優質的使用者體驗
			</p>
		</div>
	</div>
</section>

<!-- Experience Section -->
<section class="py-20 bg-white">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">工作經歷</h2>
			
			<!-- Experience Cards -->
			<div class="space-y-8">
				<!-- Cyberbiz Experience -->
				<div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
					<div class="flex flex-col lg:flex-row gap-6">
						<div class="flex-shrink-0">
							<div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
								<img
									src="https://static.104.com.tw/b_profile/cust_picture/6441/130000000046441/logo.png?v=20230911163752"
									alt="Cyberbiz"
									class="w-12 h-12 object-contain"
								/>
							</div>
						</div>
						<div class="flex-1">
							<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
								<div>
									<h3 class="text-xl font-semibold text-gray-900">前端工程師</h3>
									<h4 class="text-lg text-purple-600 font-medium">順立智慧股份有限公司</h4>
									<div class="flex items-center gap-4 mt-2 text-gray-600">
										<div class="flex items-center gap-1">
											<Calendar size={16} />
											<span>二月 2021 - 現在</span>
										</div>
										<div class="flex items-center gap-1">
											<MapPin size={16} />
											<span>台北, 台灣</span>
										</div>
									</div>
								</div>
								<div class="mt-4 lg:mt-0">
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">React</span>
										<span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Redux</span>
										<span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Vue</span>
										<span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">TypeScript</span>
										<span class="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">Electron</span>
										<span class="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">Storybook</span>
									</div>
								</div>
							</div>
							<div class="space-y-3 text-gray-700">
								<p>
									當我加入公司的第一年，我的主要職責是產品維護。我專注於解決客戶端回饋的問題，同時積極學習和掌握公司的產品。在這段期間，我廣泛運用了多種技術，包括jQuery、React、Vue、Liquid、Haml、Backbone等。
								</p>
								<p>
									隨後，我轉到POS團隊，開始參與開發工作。我的工作範疇包括開發和優化線下商店POS系統。在這個過程中，我逐漸深入研究前端開發技術，包括Redux/Toolkit、TypeScript、Electron.js，並掌握了一些硬體串接的技巧。
								</p>
								<p>
									此外，在POS團隊工作一年多後，我擔任了Scrum團隊的Scrum Master角色，開始積極學習如何更有效地推動團隊的開發流程，以確保順暢的團隊合作和高效的產品交付。
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- III Experience -->
				<div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
					<div class="flex flex-col lg:flex-row gap-6">
						<div class="flex-shrink-0">
							<div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
								<img
									src="data:image/png;base64,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"
									alt="III"
									class="w-12 h-12 object-contain"
								/>
							</div>
						</div>
						<div class="flex-1">
							<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
								<div>
									<h3 class="text-xl font-semibold text-gray-900">前端工程師就業養成班第九期</h3>
									<h4 class="text-lg text-purple-600 font-medium">資策會</h4>
									<div class="flex items-center gap-4 mt-2 text-gray-600">
										<div class="flex items-center gap-1">
											<Calendar size={16} />
											<span>七月 2020 - 十一月 2020</span>
										</div>
										<div class="flex items-center gap-1">
											<MapPin size={16} />
											<span>台北, 台灣</span>
										</div>
									</div>
								</div>
								<div class="mt-4 lg:mt-0">
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">HTML</span>
										<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">CSS</span>
										<span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">JavaScript</span>
										<span class="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">React</span>
										<span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Redux</span>
										<span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">PHP</span>
									</div>
								</div>
							</div>
							<div class="text-gray-700">
								<p>
									在這期間扎實且有系統學習前端技能期間，平時我也會盡可能的教導附近的同學，從一開始 CSS 的 Float / Flex，到後來 Javascript 的 var / let / const、閉包、callback 地獄 / promise / async & await 等重要觀念，在期末的專題製作中，也是扮演技術支援的角色，協助大家debug，同學們的問題主要都是發生在使用串接資料庫的異步處理，以及使用useEffect的生命週期管理上。
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Kenmec Experience -->
				<div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
					<div class="flex flex-col lg:flex-row gap-6">
						<div class="flex-shrink-0">
							<div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
								<img
									src="https://static.104.com.tw/b_profile/cust_picture/1000/4757891000/logo.png?v=20230914104647"
									alt="kenmec"
									class="w-12 h-12 object-contain"
								/>
							</div>
						</div>
						<div class="flex-1">
							<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
								<div>
									<h3 class="text-xl font-semibold text-gray-900">軟體工程師</h3>
									<h4 class="text-lg text-purple-600 font-medium">廣運機械工程股份有限公司</h4>
									<div class="flex items-center gap-4 mt-2 text-gray-600">
										<div class="flex items-center gap-1">
											<Calendar size={16} />
											<span>九月 2018 - 五月 2020</span>
										</div>
										<div class="flex items-center gap-1">
											<MapPin size={16} />
											<span>台北, 台灣</span>
										</div>
									</div>
								</div>
								<div class="mt-4 lg:mt-0">
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">C#</span>
										<span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">MSSQL</span>
										<span class="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">ROS</span>
									</div>
								</div>
							</div>
							<div class="space-y-3 text-gray-700">
								<p>
									主要負責實作客戶所需的自動化倉庫物流及資料流，以Ｃ＃作為主要開發語言，通過讀寫PLC的記憶體來操作設備的運作，另外使用了SQL的store procedure來操作資料庫的資料變化，完成三個新專案及一個維護專案。
								</p>
								<p>並且與凌華科技共同合作，調教使用ROS技術，公司自主研發的載貨自走車。</p>
								<p>
									之後公司決定發展數據中心，開始運用網頁前後端技術，當時是以ASP .NET MVC 為開發工具，接觸網頁程式設計後，認為這是一個很有發展空間的領域，於是決定離職再進修。
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Education Section -->
<section class="py-20 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">教育背景</h2>
			
			<div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
				<div class="flex flex-col lg:flex-row gap-6">
					<div class="flex-shrink-0">
						<div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
							<img
								alt="NCKU"
								src="https://www.ncku.edu.tw/var/file/0/1000/plugin/mobile/title/hln_4480_3767086_48566.png"
								class="w-12 h-12 object-contain"
							/>
						</div>
					</div>
					<div class="flex-1">
						<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
							<div>
								<h3 class="text-xl font-semibold text-gray-900">國立成功大學工程科學系</h3>
								<h4 class="text-lg text-purple-600 font-medium">資訊工程組</h4>
								<div class="flex items-center gap-1 mt-2 text-gray-600">
									<Calendar size={16} />
									<span>2013 - 2018</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
