<script lang="ts">
	import metronome1 from '$asset/audio/metronome1.mp3';
	import metronome2 from '$asset/audio/metronome2.mp3';
	import { Play, Pause, Volume2, Music } from 'lucide-svelte';

	const MIN_TEMPO = 60;
	const MAX_TEMPO = 300;
	const BEAT = 2;
	let beatCount = 0;
	let tempo = 120;
	let volume = 0.8;
	let isPlaying = false;
	let interval: NodeJS.Timer;
	let currentBeat = 0; // 用於視覺指示

	const mainBeat = new Audio(metronome1);
	const subBeat = new Audio(metronome2);

	mainBeat.preload = 'auto';
	subBeat.preload = 'auto';

	function playSound() {
		beatCount++;
		currentBeat = (currentBeat % 4) + 1; // 視覺節拍指示 1-4

		if (beatCount % BEAT === 0) {
			subBeat.pause();
			subBeat.currentTime = 0;
			mainBeat.play();
		} else {
			mainBeat.pause();
			mainBeat.currentTime = 0;
			subBeat.play();
		}
	}

	function toggleMetronome() {
		if (isPlaying) {
			clearInterval(interval);
			beatCount = 0;
			currentBeat = 0;
		} else {
			interval = setInterval(() => {
				playSound();
			}, 60000 / tempo);
		}
		isPlaying = !isPlaying;
	}

	// 當 tempo 改變時，如果正在播放則重新設定間隔
	$: if (isPlaying && tempo) {
		clearInterval(interval);
		interval = setInterval(() => {
			playSound();
		}, 60000 / tempo);
	}

	$: {
		mainBeat.volume = volume;
		subBeat.volume = volume;
	}

	// 獲取 tempo 的描述
	const getTempoDescription = (bpm: number) => {
		if (bpm < 80) return 'Largo (很慢)';
		if (bpm < 100) return 'Andante (行板)';
		if (bpm < 120) return 'Moderato (中板)';
		if (bpm < 140) return 'Allegro (快板)';
		if (bpm < 180) return 'Vivace (活潑)';
		return 'Presto (急板)';
	};
</script>

<div class="metronome-container">
	<div class="metronome-card">
		<!-- Header -->
		<div class="metronome-header">
			<div class="header-icon">
				<Music size={32} />
			</div>
			<h1 class="metronome-title">節拍器</h1>
			<p class="metronome-subtitle">Simple Metronome</p>
		</div>

		<!-- BPM Display -->
		<div class="bpm-display">
			<div class="bpm-number">{tempo}</div>
			<div class="bpm-label">BPM</div>
			<div class="tempo-description">{getTempoDescription(tempo)}</div>
		</div>

		<!-- Visual Beat Indicator -->
		<div class="beat-indicator">
			{#each Array(4) as _, i}
				<div
					class="beat-dot"
					class:active={currentBeat === i + 1}
					class:main={i === 0 || i === 2}
				/>
			{/each}
		</div>

		<!-- Controls -->
		<div class="controls-section">
			<!-- Play/Pause Button -->
			<button class="play-button" class:playing={isPlaying} on:click={toggleMetronome}>
				{#if isPlaying}
					<Pause size={24} />
					<span>停止</span>
				{:else}
					<Play size={24} />
					<span>開始</span>
				{/if}
			</button>

			<!-- Tempo Control -->
			<div class="control-group">
				<label class="control-label">
					<span>節拍速度</span>
				</label>
				<div class="tempo-controls">
					<input
						type="number"
						bind:value={tempo}
						min={MIN_TEMPO}
						max={MAX_TEMPO}
						class="tempo-input"
					/>
					<input
						type="range"
						bind:value={tempo}
						min={MIN_TEMPO}
						max={MAX_TEMPO}
						class="tempo-slider"
					/>
				</div>
			</div>

			<!-- Volume Control -->
			<div class="control-group">
				<label class="control-label">
					<Volume2 size={16} />
					<span>音量</span>
				</label>
				<div class="volume-controls">
					<input
						type="number"
						bind:value={volume}
						min={0}
						max={1}
						step="0.01"
						class="volume-input"
					/>
					<input
						type="range"
						bind:value={volume}
						min={0}
						max={1}
						step="0.01"
						class="volume-slider"
					/>
				</div>
			</div>
		</div>

		<!-- Quick Tempo Presets -->
		<div class="preset-section">
			<h3 class="preset-title">快速設定</h3>
			<div class="preset-buttons">
				<button class="preset-btn" on:click={() => (tempo = 60)}>60 BPM</button>
				<button class="preset-btn" on:click={() => (tempo = 80)}>80 BPM</button>
				<button class="preset-btn" on:click={() => (tempo = 120)}>120 BPM</button>
				<button class="preset-btn" on:click={() => (tempo = 140)}>140 BPM</button>
			</div>
		</div>
	</div>
</div>

<style>
	.metronome-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
		padding: 20px;
	}

	.metronome-card {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 24px;
		padding: 40px;
		width: 100%;
		max-width: 500px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	.metronome-header {
		text-align: center;
		margin-bottom: 30px;
	}

	.header-icon {
		color: #3730a3;
		margin-bottom: 10px;
	}

	.metronome-title {
		font-size: 2rem;
		font-weight: 700;
		color: #1e293b;
		margin: 0 0 5px 0;
	}

	.metronome-subtitle {
		color: #64748b;
		font-size: 1rem;
		margin: 0;
	}

	.bpm-display {
		text-align: center;
		margin-bottom: 30px;
		padding: 20px;
		background: linear-gradient(145deg, #f8fafc, #e2e8f0);
		border-radius: 16px;
		border: 1px solid #e2e8f0;
	}

	.bpm-number {
		font-size: 4rem;
		font-weight: 800;
		color: #3730a3;
		line-height: 1;
		font-family: 'Courier New', monospace;
	}

	.bpm-label {
		font-size: 1.2rem;
		color: #64748b;
		font-weight: 600;
		margin-top: 5px;
	}

	.tempo-description {
		font-size: 0.9rem;
		color: #64748b;
		margin-top: 8px;
		font-style: italic;
	}

	.beat-indicator {
		display: flex;
		justify-content: center;
		gap: 12px;
		margin-bottom: 30px;
	}

	.beat-dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #e2e8f0;
		transition: all 0.2s ease;
	}

	.beat-dot.active {
		background: #3730a3;
		transform: scale(1.3);
		box-shadow: 0 0 20px rgba(55, 48, 163, 0.5);
	}

	.beat-dot.main.active {
		background: #dc2626;
		box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
	}

	.controls-section {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 30px;
	}

	.play-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		background: linear-gradient(145deg, #3730a3, #1e40af);
		color: white;
		border: none;
		border-radius: 16px;
		padding: 16px 32px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 20px rgba(55, 48, 163, 0.3);
	}

	.play-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(55, 48, 163, 0.4);
	}

	.play-button.playing {
		background: linear-gradient(145deg, #dc2626, #b91c1c);
		box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
	}

	.control-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.control-label {
		display: flex;
		align-items: center;
		gap: 6px;
		font-weight: 600;
		color: #374151;
		font-size: 0.9rem;
	}

	.tempo-controls,
	.volume-controls {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	.tempo-input,
	.volume-input {
		width: 80px;
		padding: 8px 12px;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 0.9rem;
		text-align: center;
	}

	.tempo-input:focus,
	.volume-input:focus {
		outline: none;
		border-color: #3730a3;
		box-shadow: 0 0 0 3px rgba(55, 48, 163, 0.1);
	}

	.tempo-slider,
	.volume-slider {
		flex: 1;
		height: 6px;
		border-radius: 3px;
		background: #e5e7eb;
		outline: none;
		-webkit-appearance: none;
	}

	.tempo-slider::-webkit-slider-thumb,
	.volume-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #3730a3;
		cursor: pointer;
		box-shadow: 0 2px 10px rgba(55, 48, 163, 0.3);
	}

	.preset-section {
		border-top: 1px solid #e5e7eb;
		padding-top: 20px;
	}

	.preset-title {
		font-size: 1rem;
		font-weight: 600;
		color: #374151;
		margin-bottom: 12px;
		text-align: center;
	}

	.preset-buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
	}

	.preset-btn {
		padding: 8px 16px;
		background: #f8fafc;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		font-size: 0.85rem;
		font-weight: 500;
		color: #374151;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.preset-btn:hover {
		background: #e5e7eb;
		border-color: #3730a3;
		color: #3730a3;
	}

	@media (max-width: 768px) {
		.metronome-card {
			padding: 30px 20px;
		}

		.bpm-number {
			font-size: 3rem;
		}

		.tempo-controls,
		.volume-controls {
			flex-direction: column;
			gap: 8px;
		}

		.tempo-input,
		.volume-input {
			width: 100%;
		}

		.preset-buttons {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
