<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, User, AlertCircle } from 'lucide-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let showPassword = false;
	let isLoading = false;

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

<div class="login-container">
	<div class="login-wrapper">
		<!-- Left Side - Branding -->
		<div class="branding-section">
			<div class="branding-content">
				<div class="logo-section">
					<div class="logo-icon">
						<User size={40} />
					</div>
					<h1 class="brand-title">李明峯</h1>
					<p class="brand-subtitle">Frontend Developer</p>
				</div>

				<div class="welcome-text">
					<h2 class="welcome-title">歡迎回來</h2>
					<p class="welcome-description">登入您的帳號以管理部落格內容和查看統計資料</p>
				</div>

				<div class="features-list">
					<div class="feature-item">
						<div class="feature-icon">✨</div>
						<span>管理部落格文章</span>
					</div>
					<div class="feature-item">
						<div class="feature-icon">📊</div>
						<span>查看訪問統計</span>
					</div>
					<div class="feature-item">
						<div class="feature-icon">🎨</div>
						<span>自訂網站設定</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Side - Login Form -->
		<div class="form-section">
			<div class="form-container">
				<div class="form-header">
					<h2 class="form-title">登入帳號</h2>
					<p class="form-subtitle">請輸入您的登入資訊</p>
				</div>

				<form 
					class="login-form" 
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
					<div class="input-group">
						<label for="email" class="input-label">Email 地址</label>
						<div class="input-wrapper">
							<Mail size={20} />
							<input
								id="email"
								name="email"
								type="email"
								placeholder="請輸入您的 Email"
								class="form-input"
								value={form?.email ?? ''}
								disabled={isLoading}
								required
							/>
						</div>
					</div>

					<!-- Password Input -->
					<div class="input-group">
						<label for="password" class="input-label">密碼</label>
						<div class="input-wrapper">
							<Lock size={20} />
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="請輸入您的密碼"
								class="form-input"
								disabled={isLoading}
								required
							/>
							<button
								type="button"
								class="password-toggle"
								on:click={togglePasswordVisibility}
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
						<div class="error-message">
							<AlertCircle size={16} />
							<span>{form.message}</span>
						</div>
					{/if}

					<!-- Submit Button -->
					<button type="submit" class="submit-button" disabled={isLoading}>
						{#if isLoading}
							<div class="loading-spinner" />
							<span>登入中...</span>
						{:else}
							<LogIn size={20} />
							<span>登入</span>
						{/if}
					</button>

					<!-- Register Link -->
					<div class="form-footer">
						<p class="register-prompt">
							還沒有帳號？
							<button
								type="button"
								class="register-link"
								on:click={goToRegister}
								disabled={isLoading}
							>
								立即註冊
								<ArrowRight size={16} />
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.login-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.login-wrapper {
		background: white;
		border-radius: 24px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		width: 100%;
		max-width: 1000px;
		min-height: 600px;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.branding-section {
		background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
		padding: 60px 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: white;
		position: relative;
		overflow: hidden;
	}

	.branding-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		opacity: 0.3;
	}

	.branding-content {
		position: relative;
		z-index: 1;
	}

	.logo-section {
		text-align: center;
		margin-bottom: 40px;
	}

	.logo-icon {
		width: 80px;
		height: 80px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 20px;
		backdrop-filter: blur(10px);
	}

	.brand-title {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 8px;
	}

	.brand-subtitle {
		opacity: 0.9;
		font-size: 1.1rem;
	}

	.welcome-text {
		margin-bottom: 40px;
	}

	.welcome-title {
		font-size: 1.8rem;
		font-weight: 600;
		margin-bottom: 12px;
	}

	.welcome-description {
		opacity: 0.9;
		line-height: 1.6;
	}

	.features-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.feature-item {
		display: flex;
		align-items: center;
		gap: 12px;
		opacity: 0.9;
	}

	.feature-icon {
		font-size: 1.2rem;
	}

	.form-section {
		padding: 60px 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.form-container {
		width: 100%;
		max-width: 400px;
	}

	.form-header {
		text-align: center;
		margin-bottom: 40px;
	}

	.form-title {
		font-size: 2rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 8px;
	}

	.form-subtitle {
		color: #64748b;
		font-size: 1rem;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.input-label {
		font-weight: 600;
		color: #374151;
		font-size: 0.9rem;
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.form-input {
		width: 100%;
		padding: 16px 16px 16px 48px;
		border: 2px solid #e5e7eb;
		border-radius: 12px;
		font-size: 1rem;
		transition: all 0.3s ease;
		background: white;
	}

	.form-input:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.form-input:disabled {
		background: #f9fafb;
		cursor: not-allowed;
	}

	.password-toggle {
		position: absolute;
		right: 16px;
		background: none;
		border: none;
		color: #9ca3af;
		cursor: pointer;
		padding: 4px;
		border-radius: 4px;
		transition: color 0.2s ease;
	}

	.password-toggle:hover:not(:disabled) {
		color: #6b7280;
	}

	.password-toggle:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 8px;
		color: #dc2626;
		font-size: 0.9rem;
	}

	.submit-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		background: linear-gradient(45deg, #3b82f6, #1d4ed8);
		color: white;
		border: none;
		border-radius: 12px;
		padding: 16px 24px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
	}

	.submit-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
	}

	.submit-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.loading-spinner {
		width: 20px;
		height: 20px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.form-footer {
		text-align: center;
		padding-top: 20px;
		border-top: 1px solid #e5e7eb;
	}

	.register-prompt {
		color: #64748b;
		font-size: 0.9rem;
	}

	.register-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		background: none;
		border: none;
		color: #3b82f6;
		font-weight: 600;
		cursor: pointer;
		transition: color 0.2s ease;
		margin-left: 4px;
	}

	.register-link:hover:not(:disabled) {
		color: #1d4ed8;
	}

	.register-link:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.login-wrapper {
			grid-template-columns: 1fr;
			max-width: 500px;
		}

		.branding-section {
			padding: 40px 30px;
		}

		.form-section {
			padding: 40px 30px;
		}

		.welcome-title {
			font-size: 1.5rem;
		}

		.form-title {
			font-size: 1.5rem;
		}
	}
</style>
