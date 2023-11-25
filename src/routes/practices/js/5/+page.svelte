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

	const uploadImgToGithub = (name: string, content: string) =>
		fileRepo.createFileContent(name, content);
</script>

<input bind:files type="file" name="image" id="image_input " />
<img src={imgSrc} alt="" srcset="" width={imgSrc && 100} height={imgSrc && 100} />
{#if files && files[0]}
	<p>
		{files[0].name}
	</p>
{/if}

<div>dsfijdlsaifj</div>
<button
	type="button"
	class="rounded border-blue-700 bg-blue-700 text-slate-100 px-[10px] py-[3px] mt-3"
	on:click={() => uploadImgToGithub(files[0].name, imgSrc)}
>
	上傳
</button>

<div>dsfasfsdfasf</div>
