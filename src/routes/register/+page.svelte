<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import {
		Mail,
		Lock,
		Eye,
		EyeOff,
		UserPlus,
		ArrowLeft,
		Shield,
		AlertCircle,
		CheckCircle
	} from 'lucide-svelte';
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

	let password = $state('');
	let confirmPassword = $state('');
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let isLoading = $state(false);

	const checkPasswordStrength = (pwd: string) => {
		if (!pwd) return { score: 0, text: '', color: '' };

		let score = 0;
		let feedback = [];

		if (pwd.length >= 8) score += 1;
		else feedback.push('至少 8 個字符');

		if (/[a-z]/.test(pwd)) score += 1;
		else feedback.push('包含小寫字母');

		if (/[A-Z]/.test(pwd)) score += 1;
		else feedback.push('包含大寫字母');

		if (/\d/.test(pwd)) score += 1;
		else feedback.push('包含數字');

		if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score += 1;
		else feedback.push('包含特殊字符');

		const strengthLevels = [
			{ text: '很弱', color: '#ef4444' },
			{ text: '弱', color: '#f97316' },
			{ text: '一般', color: '#eab308' },
			{ text: '強', color: '#22c55e' },
			{ text: '很強', color: '#16a34a' }
		];

		return {
			score,
			text: strengthLevels[score - 1]?.text || '很弱',
			color: strengthLevels[score - 1]?.color || '#ef4444',
			feedback
		};
	};

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	const toggleConfirmPasswordVisibility = () => {
		showConfirmPassword = !showConfirmPassword;
	};

	const goToLogin = () => {
		goto('/login');
	};
	// 密碼強度檢查
	let passwordStrength = $derived(checkPasswordStrength(password));
	let passwordsMatch = $derived(password && confirmPassword && password === confirmPassword);
</script>

<svelte:head>
	<title>註冊 - 李明峯的部落格</title>
	<meta name="description" content="註冊李明峯的部落格管理系統帳號" />
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-5"
>
	<div
		class="grid min-h-[700px] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2"
	>
		<!-- Left Side - Branding -->
		<div
			class="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-12 text-white lg:p-16"
		>
			<!-- Background Pattern -->
			<div
				class="absolute inset-0 opacity-30"
				style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30l15-15v30l-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"
			></div>

			<div class="relative z-10">
				<div class="mb-10 text-center">
					<div
						class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
					>
						<UserPlus size={40} />
					</div>
					<h1 class="mb-2 text-3xl font-bold">加入我們</h1>
					<p class="text-lg text-emerald-100">創建您的專屬帳號</p>
				</div>

				<div class="mb-10">
					<h2 class="mb-3 text-2xl font-semibold">開始您的旅程</h2>
					<p class="leading-relaxed text-emerald-100">
						註冊帳號以獲得完整的部落格管理功能和個人化體驗
					</p>
				</div>

				<div class="flex flex-col gap-5">
					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20"
						>
							<Shield size={20} />
						</div>
						<div>
							<h4 class="mb-1 font-semibold">安全保護</h4>
							<p class="text-sm text-emerald-100">您的資料受到完整保護</p>
						</div>
					</div>
					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20"
						>
							<CheckCircle size={20} />
						</div>
						<div>
							<h4 class="mb-1 font-semibold">完整功能</h4>
							<p class="text-sm text-emerald-100">享受所有管理功能</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Side - Register Form -->
		<div class="flex items-center justify-center overflow-y-auto p-12 lg:p-16">
			<Card class="w-full max-w-md border-0 shadow-none">
				<CardHeader class="pb-8 text-center">
					<CardTitle class="text-2xl font-bold text-gray-900">建立新帳號</CardTitle>
					<CardDescription class="text-gray-600">請填寫以下資訊完成註冊</CardDescription>
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
									placeholder="請輸入密碼"
									class="py-4 pr-12 pl-12 text-base"
									bind:value={password}
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

							<!-- Password Strength Indicator -->
							{#if password}
								<div class="mt-2">
									<div class="mb-2 h-1 w-full overflow-hidden rounded-full bg-gray-200">
										<div
											class="h-full transition-all duration-300"
											style="width: {(passwordStrength.score / 5) *
												100}%; background-color: {passwordStrength.color}"
										></div>
									</div>
									<div class="text-xs font-medium" style="color: {passwordStrength.color}">
										密碼強度: {passwordStrength.text}
									</div>
									{#if passwordStrength.feedback.length > 0}
										<div class="mt-2 text-xs text-gray-600">
											<p class="mb-1 font-medium">建議改進:</p>
											<ul class="list-inside list-disc space-y-0.5">
												{#each passwordStrength.feedback as tip}
													<li>{tip}</li>
												{/each}
											</ul>
										</div>
									{/if}
								</div>
							{/if}
						</div>

						<!-- Confirm Password Input -->
						<div class="flex flex-col gap-2">
							<Label for="confirmPassword" class="text-sm font-semibold text-gray-700"
								>確認密碼</Label
							>
							<div class="relative flex items-center">
								<Lock size={20} class="absolute left-4 z-10 text-gray-400" />
								<Input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder="請再次輸入密碼"
									class="py-4 pr-12 pl-12 text-base {confirmPassword && !passwordsMatch
										? 'border-red-500 focus:border-red-500'
										: ''} {confirmPassword && passwordsMatch
										? 'border-green-500 focus:border-green-500'
										: ''}"
									bind:value={confirmPassword}
									disabled={isLoading}
									required
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									class="absolute right-2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
									onclick={toggleConfirmPasswordVisibility}
									disabled={isLoading}
								>
									{#if showConfirmPassword}
										<EyeOff size={20} />
									{:else}
										<Eye size={20} />
									{/if}
								</Button>
							</div>

							{#if confirmPassword}
								<div class="mt-2">
									{#if passwordsMatch}
										<div class="flex items-center gap-2 text-sm font-medium text-green-600">
											<CheckCircle size={16} />
											<span>密碼一致</span>
										</div>
									{:else}
										<div class="flex items-center gap-2 text-sm font-medium text-red-600">
											<AlertCircle size={16} />
											<span>密碼不一致</span>
										</div>
									{/if}
								</div>
							{/if}
						</div>

						<!-- Error Message -->
						{#if form?.message}
							<Alert variant="destructive">
								<AlertCircle size={16} />
								<AlertDescription>{form.message}</AlertDescription>
							</Alert>
						{/if}

						<!-- Submit Button -->
						<Button
							type="submit"
							class="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 py-4 text-base font-semibold shadow-lg shadow-emerald-500/30 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:shadow-emerald-500/40"
							disabled={isLoading ||
								!password ||
								!confirmPassword ||
								!passwordsMatch ||
								passwordStrength.score < 3}
						>
							{#if isLoading}
								<div
									class="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
								></div>
								<span>註冊中...</span>
							{:else}
								<UserPlus size={20} class="mr-2" />
								<span>建立帳號</span>
							{/if}
						</Button>

						<!-- Login Link -->
						<div class="border-t border-gray-200 pt-5 text-center">
							<p class="text-sm text-gray-600">
								已經有帳號了？
								<Button
									type="button"
									variant="link"
									class="h-auto p-0 font-semibold text-emerald-600 hover:text-emerald-700"
									onclick={goToLogin}
									disabled={isLoading}
								>
									<ArrowLeft size={16} class="mr-1" />
									返回登入
								</Button>
							</p>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
