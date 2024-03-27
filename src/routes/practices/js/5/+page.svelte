<script lang="ts">
	import { fileRepo } from '$lib/repositoryFactory/RepositoryFactory';

	let files: FileList;
	let imgSrc: string;
	const reader = new FileReader();
	$: if (files) {
		for (const file of files) {
			console.log(file);
			console.log(`${file.name}: ${file.size} bytes`);
		}
		reader.readAsDataURL(files[0]);
	}
	reader.onload = (e) => {
		const base64 = e.target?.result;
		if (typeof base64 === 'string') {
			imgSrc = base64;
		}
	};
	const nameTrimer = (name: string): string => name.replace(' ', '_');
	const uploadImgToGithub = async (name: string, content: string) => {
		await fileRepo.createFileContent(nameTrimer(name), content);
		alert('上傳成功');
	};
	let imgArr: Array<{ name: string; path: string }> = [];
	const click = async () => {
		const result = await fileRepo.getAllFileContents();
		imgArr = result;
	};
	const imgClick = (str: string) => {
		navigator.clipboard.writeText(str);
	};
</script>

<div class="grid grid-cols-[1fr_3fr] h-[63vh]">
	<div>
		<input bind:files type="file" name="image" id="image_input " />
		<img src={imgSrc} alt="" srcset="" width={imgSrc && 100} height={imgSrc && 100} />
		{#if files && files[0]}
			<p>
				{files[0].name}
			</p>
		{/if}

		<button
			type="button"
			class="rounded border-blue-700 bg-blue-700 text-slate-100 px-[10px] py-[3px] mt-3"
			on:click={() => uploadImgToGithub(files[0].name, imgSrc)}
		>
			上傳
		</button>
	</div>
	<div class="bg-slate-50">
		<div>title</div>
		<div class="grid grid-cols-3 gap-3">
			{#each imgArr as { name, path }, i}
				<div
					on:keydown={() => {}}
					on:click={() =>
						imgClick(`https://raw.githubusercontent.com/krok1029/my-svelte-blog/image/${path}`)}
				>
					<img
						src={`https://raw.githubusercontent.com/krok1029/my-svelte-blog/image/${path}`}
						alt={name}
					/>
				</div>
			{/each}
		</div>
	</div>
	<button on:click={click}>test</button>
</div>
