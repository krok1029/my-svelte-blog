<!-- Metronome.svelte -->
<script lang="ts">
	import metronome1 from '$asset/audio/metronome1.mp3';
	import metronome2 from '$asset/audio/metronome2.mp3';

	const MIN_TEMPO = 60;
	const MAX_TEMPO = 300;
	const BEAT = 2;
	let beatCount = 0;
	let tempo = 180;
	let volumn = 1;
	let isPlaying = false;
	let interval: NodeJS.Timer;

	const mainBeat = new Audio(metronome1);
	const subBeat = new Audio(metronome2);

	mainBeat.preload = 'auto';
	subBeat.preload = 'auto';

	function playSound() {
		beatCount++;
		if (beatCount % BEAT == 0) {
			subBeat.pause();
			subBeat.currentTime = 0
			mainBeat.play();
			console.log('main Tick');
		} else {
			mainBeat.pause();
			mainBeat.currentTime = 0
			subBeat.play();
			console.log('sub Tick');
		}
	}

	function toggleMetronome() {
		if (isPlaying) {
			clearInterval(interval);
			beatCount = 0
		} else {
			interval = setInterval(() => {
				playSound();
			}, 60000 / tempo);
		}
		isPlaying = !isPlaying;
	}

	$: {
		mainBeat.volume = volumn;
		subBeat.volume = volumn;
	}
</script>

<div class="metronome">
	<h1>Metronome</h1>
	<p>Tempo: {tempo} BPM</p>
	<div class="flex flex-col gap-3 my-5">
		<button class="w-fit px-4 py-1 bg-gray-600 rounded" on:click={toggleMetronome}>
			{isPlaying ? '停止' : '開始'}
		</button>
		<label>
			<input type="number" bind:value={tempo} min={MIN_TEMPO} max={MAX_TEMPO} />
			<input type="range" bind:value={tempo} min={MIN_TEMPO} max={MAX_TEMPO} />
		</label>
		<label>
			<input type="number" bind:value={volumn} min={0} max={1} step="0.01" />
			<input type="range" bind:value={volumn} min={0} max={1} step="0.01" />
		</label>
	</div>
</div>

<style>
	/* 在这里添加样式，例如按钮样式 */
</style>
