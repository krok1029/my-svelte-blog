<script lang="ts">
</script>

<div class="body flex justify-center items-center flex-col gap-[10px] bg-[#1d2b3a]">
	<div class="inputBox relative w-[250px]">
		<input
			class="peer w-full p-[10px] border border-gray-700 bg-[#1d2b3a] rounded outline-none text-white text-base focus:border-blue-500 valid:border-blue-500"
			type="text"
			required
		/>
		<span
			class="input_span peer-focus:bg-[#1d2b3a] peer-valid:bg-[#1d2b3a] peer-focus:text-blue-500 peer-valid:text-blue-500"
			>First Name</span
		>
	</div>
	<div class="inputBox relative w-[250px]">
		<input
			class="peer w-full p-[10px] border border-gray-700 bg-[#1d2b3a] rounded outline-none text-white text-base focus:border-blue-500 valid:border-blue-500"
			type="text"
			required
		/>
		<span
			class="input_span peer-focus:bg-blue-500 peer-valid:bg-blue-500 peer-focus:text-[#1d2b3a] peer-valid:text-[#1d2b3a]"
			>Last Name</span
		>
	</div>
</div>

<style lang="postcss">
	* {
		margin: 0;
		box-sizing: border-box;
	}
	.body {
		min-height: 100vh;
		background-color: #1d2b3a;
	}
	.input_span {
		@apply uppercase rounded peer-focus:text-sm peer-focus:px-[5px] peer-focus:py-[0px] peer-focus:translate-x-[10px] peer-focus:-translate-y-[7px] transition-all duration-300 peer-valid:text-sm peer-valid:px-[10px] peer-valid:py-[0px]  peer-valid:translate-x-[10px] peer-valid:-translate-y-[7px]   absolute left-0 p-[10px] pointer-events-none text-base text-gray-700;
	}
</style>
