<!-- <h1 class="text-3xl font-bold underline">Hello world!</h1> -->
<script lang="ts">
	import { react, html5, css3, javascript, typescript, redux, storybook, webpack } from '$asset/logo/index';
	import ImageBlock from '$components/ImageBlock.svelte';
</script>

<div class="container mx-auto p-4">
	<!-- <div class="bg-gray-700">pic</div> -->
	<section>
		<p class="col-span-3">
			嗨!我是李明峯，我熱愛將想法轉化為動態且具有吸引力的網頁應用程序。在過去的三年中，我積極參與了各種前端項目，從簡單的網站到複雜的
			Web 應用程式，我都有豐富的實踐經驗。我喜歡追求技術的最新趨勢，並將其應用於我的工作中。我對於
			JavaScript、HTML 和 CSS 的熟悉程度幫助我不斷提升用戶體驗，並保持代碼的高質量和可維護性。
		</p>
	</section>
	<section>
		<h2 class="my-3">My Skills</h2>
		<div class="flex gap-1 my-3">
			<ImageBlock src={html5} alt="HTML5" />
			<ImageBlock src={css3} alt="CSS3" />
			<ImageBlock src={javascript} alt="javascript" />
			<ImageBlock src={typescript} alt="typescript" />
			<ImageBlock src={react} alt="react" />
			<ImageBlock src={redux} alt="redux" />
			<ImageBlock src={storybook} alt="storybook" />
			<ImageBlock src={webpack} alt="webpack" />
		</div>
	</section>
</div>
