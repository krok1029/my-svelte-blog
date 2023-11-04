<script lang="ts">
	let value1 = 10;
	let value2 = 65;
	let value3 = 90;
	const level = (value: number) => {
		if (value > 80) {
			return `#fd0a54`;
		} else if (value > 60) {
			return `#ffbc11`;
		} else {
			return `#0de5a8`;
		}
	};
	const label = (value: number) => `${value}%`;
	const items = ['AAA', 'BBB', 'CCC'];
	const values = [value1, value2, value3];
</script>

<div class="body">
	<div class="container">
		{#each items as item, index}
			<div class="box" style:--i={label(values[index])} style:--clr={level(values[index])}>
				<div class="circle"><h2>{values[index]}<small>%</small></h2></div>
				<h3>{item}</h3>
			</div>
		{/each}
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.body {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background-color: #1a252c;
	}
	.container {
		position: relative;
		display: flex;
		gap: 30px;
		justify-content: center;
		align-items: center;
	}
	.container .box {
		position: relative;
		width: 240px;
		padding: 40px 0;
		background-color: #1a252c;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.container .box .circle {
		position: relative;
		width: 150px;
		height: 150px;
		background: conic-gradient(
			from 0deg,
			var(--clr) 0%,
			var(--clr) 0% var(--i),
			#333 var(--i),
			#333 100%
		);
		border-radius: 50%;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container .box .circle::before {
		content: '';
		position: absolute;
		inset: 10px;
		background-color: #1a252c;
		border-radius: 50%;
	}
	.container .box h2 {
		position: relative;
		text-align: center;
		font-size: 2.5em;
		color: #fff;
		font-weight: 600;
	}
	.container .box h2 small {
		font-size: 0.5em;
		font-weight: 300;
	}
	.container .box h3 {
		color: #fff;
		text-transform: uppercase;
		margin-top: 20px;
		font-weight: 500;
		letter-spacing: 0.1em;
	}
</style>
