<script lang="ts">
	import inagea from '$asset/image/pokemon/001_妙蛙種子.png';
	import inageb from '$asset/image/pokemon/004_小火龍.png';
	import inagec from '$asset/image/pokemon/007_傑尼龜.png';
	import inaged from '$asset/image/pokemon/010_綠毛蟲.png';
	import inagee from '$asset/image/pokemon/013_獨角蟲.png';
</script>

<div class="body">
	<div class="container">
		<div class="box">
			<img class="border border-cyan-50" src={inagea} alt="001_妙蛙種子" />
		</div>
		<div class="box">
			<img class="border border-cyan-50" src={inageb} alt="004_小火龍" />
		</div>
		<div class="box">
			<img class="border border-cyan-50" src={inagec} alt="007_傑尼龜" />
		</div>
		<div class="box">
			<img class="border border-cyan-50" src={inaged} alt="010_綠毛蟲" />
		</div>
		<div class="box">
			<img class="border border-cyan-50" src={inagee} alt="013_獨角蟲" />
		</div>
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
		justify-content: center;
		align-items: center;
		transform-style: preserve-3d;
	}
	.container .box {
		position: relative;
		width: 120px;
		height: 120px;
		transition: 0.5s;
		-webkit-box-reflect: below 1px linear-gradient(transparent, #0002);
	}
	.container .box img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.container:hover > :not(:hover) {
		margin: 0 -20px;
		filter: drop-shadow(0 0 25px, #000) drop-shadow(0 0 45px, #000);
		transform: perspective(500px) rotateY(45deg) scale(0.95);
	}
	.container .box:hover ~ .box {
		transform: perspective(500px) rotateY(-45deg) scale(0.95);
	}
	.container .box:hover {
		transform: perspective(500px) rotateY(0) scale(1.5);
	}
</style>
