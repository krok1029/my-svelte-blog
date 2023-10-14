<!-- Metronome.svelte -->
<script lang="ts">
	import metronome1 from '$asset/audio/metronome1.mp3';
	import metronome2 from '$asset/audio/metronome2.mp3';

	const MIN_TEMPO = 60;
	const MAX_TEMPO = 300;
	const BEAT = 2;
	let beatCount = 0;
	let tempo = 180;
	let isPlaying = false;
	let interval: NodeJS.Timer;

	const mainBeat = new Audio(metronome1);
	const subBeat = new Audio(metronome2);

	mainBeat.preload = 'auto';
	subBeat.preload = 'auto';

	function playSound() {
		beatCount++;
		if (beatCount % BEAT == 0) {
			mainBeat.play();
			console.log('main Tick');
		} else {
			subBeat.play();
			console.log('sub Tick');
		}
	}

	function toggleMetronome() {
		if (isPlaying) {
			clearInterval(interval);
		} else {
			interval = setInterval(() => {
				playSound();
			}, 60000 / tempo);
		}
		isPlaying = !isPlaying;
	}
</script>

<div class="metronome">
	<h1>Metronome</h1>
	<p>Tempo: {tempo} BPM</p>
	<button on:click={toggleMetronome}>
		{isPlaying ? '停止' : '開始'}
	</button>
	<label>
		<input type="number" bind:value={tempo} min={MIN_TEMPO} max={MAX_TEMPO} />
		<input type="range" bind:value={tempo} min={MIN_TEMPO} max={MAX_TEMPO} />
	</label>
</div>

<style>
	/* 在这里添加样式，例如按钮样式 */
</style>
