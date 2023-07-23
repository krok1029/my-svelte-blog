<!-- src/routes/login/+page.svelte -->

<script lang="ts">
	import { goto } from '$app/navigation';

	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { firebaseAuth } from '$lib/firebase';
	import { authUser } from '$lib/authStore';

	let email: string;
	let password: string;

	let success: boolean | undefined = undefined;

	const login = () => {
		signInWithEmailAndPassword(firebaseAuth, email, password)
			.then((userCredentials) => {
				$authUser = {
					uid: userCredentials.user.uid,
					email: userCredentials.user.email || ''
				};

				goto('/admin');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);

				success = false;
			});
	};
</script>

<div class="login-form flex justify-center p-4 pt-24">
	<form
		class="flex flex-col gap-4 p-8 bg-slate-400 sm:w-4/12 rounded"
		on:submit|preventDefault={login}
	>
		<label for="email" class="text-gray-100">Email</label>
		<input
			type="email"
			placeholder="Email"
			class="px-4 py-2 border border-gray-300 rounded-md"
			required
			bind:value={email}
		/>
		<label for="password" class="text-gray-100">Password</label>
		<input
			type="password"
			placeholder="Password"
			class="px-4 py-2 border border-gray-300 rounded-md"
			required
			bind:value={password}
		/>

		<button type="submit" class="default-action bg-slate-100 rounded-md py-2 hover:bg-slate-300"
			>Login</button
		>
	</form>
</div>
