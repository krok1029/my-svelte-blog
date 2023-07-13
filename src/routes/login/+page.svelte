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

        goto('/protected');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        success = false;
      });
  };
</script>

<form
  class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-10/12"
  on:submit|preventDefault={login}
>
  <input
    type="email"
    placeholder="Email"
    class="px-4 py-2 border border-gray-300 rounded-md"
    required
    bind:value={email}
  />
  <input
    type="password"
    placeholder="Password"
    class="px-4 py-2 border border-gray-300 rounded-md"
    required
    bind:value={password}
  />

  <button type="submit" class="default-action">Login</button>
</form>