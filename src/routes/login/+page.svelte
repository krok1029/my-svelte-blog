<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, User } from 'lucide-svelte';
	import type { ActionData } from './$types';

	// shadcn/ui components
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

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

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">
		<!-- Left Side - Branding -->
		<div
			class="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 text-white lg:p-12"
		>
			<!-- Background Pattern -->
			<div
				class="absolute inset-0 opacity-30"
				style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"
			></div>

			<div class="relative z-10">
				<div class="mb-10 text-center">
					<div
						class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
					>
						<User size={40} />
					</div>
					<h1 class="mb-2 text-3xl font-bold">李明峯</h1>
					<p class="text-lg text-purple-100">Frontend Developer</p>
				</div>

				<div class="mb-10">
					<h2 class="mb-3 text-2xl font-semibold">歡迎回來</h2>
					<p class="leading-relaxed text-purple-100">登入您的帳號以管理部落格內容和查看統計資料</p>
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
		<div class="flex items-center justify-center p-8 lg:p-12">
			<Card class="w-full max-w-sm border-0 shadow-none">
				<CardHeader class="pb-6 text-center">
					<CardTitle class="text-2xl font-bold text-gray-900">登入帳號</CardTitle>
					<CardDescription class="text-gray-600">請輸入您的登入資訊</CardDescription>
				</CardHeader>

				<CardContent>
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
							<Label for="email" class="text-sm font-semibold text-gray-700">Email 地址</Label>
							<div class="relative flex items-center">
								<Mail size={20} class="absolute left-4 z-10 text-gray-400" />
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="請輸入您的 Email"
									class="py-4 pl-12 text-base"
									value={form?.email ?? ''}
									disabled={isLoading}
									required
								/>
							</div>
						</div>

						<!-- Password Input -->
						<div class="flex flex-col gap-2">
							<Label for="password" class="text-sm font-semibold text-gray-700">密碼</Label>
							<div class="relative flex items-center">
								<Lock size={20} class="absolute left-4 z-10 text-gray-400" />
								<Input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="請輸入您的密碼"
									class="py-4 pr-12 pl-12 text-base"
									disabled={isLoading}
									required
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									class="absolute right-2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
									onclick={togglePasswordVisibility}
									disabled={isLoading}
								>
									{#if showPassword}
										<EyeOff size={20} />
									{:else}
										<Eye size={20} />
									{/if}
								</Button>
							</div>
						</div>

						<!-- Error Message -->
						{#if form?.message}
							<Alert variant="destructive">
								<AlertDescription>{form.message}</AlertDescription>
							</Alert>
						{/if}

						<!-- Submit Button -->
						<Button
							type="submit"
							class="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-4 text-base font-semibold shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/40"
							disabled={isLoading}
						>
							{#if isLoading}
								<div
									class="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
								></div>
								<span>登入中...</span>
							{:else}
								<LogIn size={20} class="mr-2" />
								<span>登入</span>
							{/if}
						</Button>

						<!-- Register Link -->
						<div class="border-t border-gray-200 pt-5 text-center">
							<span class="text-sm text-gray-600">還沒有帳號？</span>
							<Button
								type="button"
								variant="link"
								class="h-auto p-0 font-semibold text-blue-500 hover:text-blue-700"
								onclick={goToRegister}
								disabled={isLoading}
							>
								立即註冊
								<ArrowRight size={14} class="ml-1" />
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
