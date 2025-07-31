<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, User, AlertCircle } from 'lucide-svelte';
	import type { ActionData } from './$types';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	let showPassword = $state(false);
	let isLoading = $state(false);

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	const goToRegister = () => {
		goto('/register');
	};
</script>

<svelte:head>
	<title>登入 - 李明峯的部落格</title>
	<meta name="description" content="登入李明峯的部落格管理系統" />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
		<!-- Left Side - Branding -->
		<div class="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
			<!-- Background Pattern -->
			<div class="absolute inset-0 opacity-30" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"></div>
			
			<div class="relative z-10">
				<div class="text-center mb-10">
					<div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5 backdrop-blur-sm">
						<User size={40} />
					</div>
					<h1 class="text-3xl font-bold mb-2">李明峯</h1>
					<p class="text-purple-100 text-lg">Frontend Developer</p>
				</div>

				<div class="mb-10">
					<h2 class="text-2xl font-semibold mb-3">歡迎回來</h2>
					<p class="text-purple-100 leading-relaxed">登入您的帳號以管理部落格內容和查看統計資料</p>
				</div>

				<div class="flex flex-col gap-4">
					<div class="flex items-center gap-3 text-purple-100">
						<div class="text-xl">✨</div>
						<span>管理部落格文章</span>
					</div>
					<div class="flex items-center gap-3 text-purple-100">
						<div class="text-xl">📊</div>
						<span>查看訪問統計</span>
					</div>
					<div class="flex items-center gap-3 text-purple-100">
						<div class="text-xl">🎨</div>
						<span>自訂網站設定</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Side - Login Form -->
		<div class="p-8 lg:p-12 flex items-center justify-center">
			<div class="w-full max-w-sm">
				<div class="text-center mb-10">
					<h2 class="text-2xl font-bold text-gray-900 mb-2">登入帳號</h2>
					<p class="text-gray-600">請輸入您的登入資訊</p>
				</div>

				<form
					class="flex flex-col gap-6"
					method="POST"
					use:enhance={() => {
						isLoading = true;
						return async ({ update }) => {
							isLoading = false;
							await update();
						};
					}}
				>
					<!-- Email Input -->
					<div class="flex flex-col gap-2">
						<label for="email" class="font-semibold text-gray-700 text-sm">Email 地址</label>
						<div class="relative flex items-center">
							<Mail size={20} class="absolute left-4 text-gray-400" />
							<input
								id="email"
								name="email"
								type="email"
								placeholder="請輸入您的 Email"
								class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 disabled:bg-gray-50 disabled:cursor-not-allowed"
								value={form?.email ?? ''}
								disabled={isLoading}
								required
							/>
						</div>
					</div>

					<!-- Password Input -->
					<div class="flex flex-col gap-2">
						<label for="password" class="font-semibold text-gray-700 text-sm">密碼</label>
						<div class="relative flex items-center">
							<Lock size={20} class="absolute left-4 text-gray-400" />
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="請輸入您的密碼"
								class="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 disabled:bg-gray-50 disabled:cursor-not-allowed"
								disabled={isLoading}
								required
							/>
							<button
								type="button"
								class="absolute right-4 text-gray-400 hover:text-gray-600 p-1 rounded transition-colors disabled:cursor-not-allowed disabled:opacity-50"
								onclick={togglePasswordVisibility}
								disabled={isLoading}
							>
								{#if showPassword}
									<EyeOff size={20} />
								{:else}
									<Eye size={20} />
								{/if}
							</button>
						</div>
					</div>

					<!-- Error Message -->
					{#if form?.message}
						<div class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
							<AlertCircle size={16} />
							<span>{form.message}</span>
						</div>
					{/if}

					<!-- Submit Button -->
					<button 
						type="submit" 
						class="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white border-none rounded-xl py-4 px-6 text-base font-semibold cursor-pointer transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
						disabled={isLoading}
					>
						{#if isLoading}
							<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
							<span>登入中...</span>
						{:else}
							<LogIn size={20} />
							<span>登入</span>
						{/if}
					</button>

					<!-- Register Link -->
					<div class="text-center pt-5 border-t border-gray-200">
						<span class="text-gray-600 text-sm">還沒有帳號？</span>
						<button
							type="button"
							class="inline-flex items-center gap-1 bg-none border-none text-blue-500 font-semibold cursor-pointer transition-colors hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ml-1"
							onclick={goToRegister}
							disabled={isLoading}
						>
							立即註冊
							<ArrowRight size={14} />
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
