<script lang="ts">
	let date = new Date();

	setInterval(() => (date = new Date()), 1000);
</script>

<div class="container bg-slate-600 h-screen w-screen flex items-center justify-center gap-20">
	<div class="section">
		<span class="time">{date.getHours()}</span>
		<span class="title">Hours</span>
	</div>
	<span class="colom">:</span>
	<div class="section">
		<span class="time">{date.getMinutes()}</span>
		<span class="title">Minutes</span>
	</div>
	<span class="colom">:</span>
	<div class="section">
		<span class="time">{date.getSeconds()}</span>
		<span class="title">Seconds</span>
	</div>
</div>

<style lang="postcss">
	.section {
		@apply w-32 bg-sky-700 rounded-3xl flex flex-col items-center justify-center font-mono font-semibold text-white overflow-hidden;
	}
	.time {
		@apply text-8xl p-2;
	}
	.title {
		@apply text-2xl bg-emerald-900 w-full text-center p-3;
	}
	.colom {
		@apply text-black text-5xl font-bold;
	}
</style>
