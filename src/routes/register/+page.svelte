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

	export let form: ActionData;

	let password: string = '';
	let confirmPassword: string = '';
	let showPassword = false;
	let showConfirmPassword = false;
	let isLoading = false;

	// 密碼強度檢查
	$: passwordStrength = checkPasswordStrength(password);
	$: passwordsMatch = password && confirmPassword && password === confirmPassword;

	function checkPasswordStrength(pwd: string) {
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
	}

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	const toggleConfirmPasswordVisibility = () => {
		showConfirmPassword = !showConfirmPassword;
	};

	const goToLogin = () => {
		goto('/login');
	};
</script>

<svelte:head>
	<title>註冊 - 李明峯的部落格</title>
	<meta name="description" content="註冊李明峯的部落格管理系統帳號" />
</svelte:head>

<div class="register-container">
	<div class="register-wrapper">
		<!-- Left Side - Branding -->
		<div class="branding-section">
			<div class="branding-content">
				<div class="logo-section">
					<div class="logo-icon">
						<UserPlus size={40} />
					</div>
					<h1 class="brand-title">加入我們</h1>
					<p class="brand-subtitle">創建您的專屬帳號</p>
				</div>

				<div class="welcome-text">
					<h2 class="welcome-title">開始您的旅程</h2>
					<p class="welcome-description">註冊帳號以獲得完整的部落格管理功能和個人化體驗</p>
				</div>

				<div class="benefits-list">
					<div class="benefit-item">
						<div class="benefit-icon">
							<Shield size={20} />
						</div>
						<div class="benefit-content">
							<h4>安全保護</h4>
							<p>您的資料受到完整保護</p>
						</div>
					</div>
					<div class="benefit-item">
						<div class="benefit-icon">
							<CheckCircle size={20} />
						</div>
						<div class="benefit-content">
							<h4>完整功能</h4>
							<p>享受所有管理功能</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Side - Register Form -->
		<div class="form-section">
			<div class="form-container">
				<div class="form-header">
					<h2 class="form-title">建立新帳號</h2>
					<p class="form-subtitle">請填寫以下資訊完成註冊</p>
				</div>

				<form
					class="register-form"
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
							<Mail class="input-icon" size={20} />
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
							<Lock class="input-icon" size={20} />
							{#if showPassword}
								<input
									id="password"
									name="password"
									type="text"
									bind:value={password}
									placeholder="請輸入密碼"
									class="form-input"
								/>
							{:else}
								<input
									id="password"
									name="password"
									type="password"
									bind:value={password}
									placeholder="請輸入密碼"
									class="form-input"
								/>
							{/if}

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

						<!-- Password Strength Indicator -->
						{#if password}
							<div class="password-strength">
								<div class="strength-bar">
									<div
										class="strength-fill"
										style="width: {(passwordStrength.score / 5) *
											100}%; background-color: {passwordStrength.color}"
									/>
								</div>
								<div class="strength-text" style="color: {passwordStrength.color}">
									密碼強度: {passwordStrength.text}
								</div>
								{#if passwordStrength.feedback.length > 0}
									<div class="strength-feedback">
										<p>建議改進:</p>
										<ul>
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
					<div class="input-group">
						<label for="confirmPassword" class="input-label">確認密碼</label>
						<div class="input-wrapper">
							<Lock class="input-icon" size={20} />

							{#if showConfirmPassword}
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="text"
									placeholder="請再次輸入密碼"
									class="form-input"
									class:error={confirmPassword && !passwordsMatch}
									class:success={confirmPassword && passwordsMatch}
									bind:value={confirmPassword}
									disabled={isLoading}
									required
								/>
							{:else}
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									placeholder="請再次輸入密碼"
									class="form-input"
									class:error={confirmPassword && !passwordsMatch}
									class:success={confirmPassword && passwordsMatch}
									bind:value={confirmPassword}
									disabled={isLoading}
									required
								/>
							{/if}

							<button
								type="button"
								class="password-toggle"
								on:click={toggleConfirmPasswordVisibility}
								disabled={isLoading}
							>
								{#if showConfirmPassword}
									<EyeOff size={20} />
								{:else}
									<Eye size={20} />
								{/if}
							</button>
						</div>

						{#if confirmPassword}
							<div class="password-match">
								{#if passwordsMatch}
									<div class="match-success">
										<CheckCircle size={16} />
										<span>密碼一致</span>
									</div>
								{:else}
									<div class="match-error">
										<AlertCircle size={16} />
										<span>密碼不一致</span>
									</div>
								{/if}
							</div>
						{/if}
					</div>

					<!-- Error Message -->
					{#if form?.message}
						<div class="error-message">
							<AlertCircle size={16} />
							<span>{form.message}</span>
						</div>
					{/if}

					<!-- Submit Button -->
					<button
						type="submit"
						class="submit-button"
						disabled={isLoading ||
							!password ||
							!confirmPassword ||
							!passwordsMatch ||
							passwordStrength.score < 3}
					>
						{#if isLoading}
							<div class="loading-spinner" />
							<span>註冊中...</span>
						{:else}
							<UserPlus size={20} />
							<span>建立帳號</span>
						{/if}
					</button>

					<!-- Login Link -->
					<div class="form-footer">
						<p class="login-prompt">
							已經有帳號了？
							<button type="button" class="login-link" on:click={goToLogin} disabled={isLoading}>
								<ArrowLeft size={16} />
								返回登入
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.register-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.register-wrapper {
		background: white;
		border-radius: 24px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		width: 100%;
		max-width: 1000px;
		min-height: 700px;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.branding-section {
		background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
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
		background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30l15-15v30l-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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

	.benefits-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.benefit-item {
		display: flex;
		align-items: flex-start;
		gap: 16px;
	}

	.benefit-icon {
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.benefit-content h4 {
		font-weight: 600;
		margin-bottom: 4px;
	}

	.benefit-content p {
		opacity: 0.9;
		font-size: 0.9rem;
	}

	.form-section {
		padding: 60px 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow-y: auto;
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

	.register-form {
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

	.input-icon {
		position: absolute;
		left: 16px;
		color: #9ca3af;
		z-index: 1;
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
		border-color: #10b981;
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
	}

	.form-input.error {
		border-color: #ef4444;
	}

	.form-input.success {
		border-color: #10b981;
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

	.password-strength {
		margin-top: 8px;
	}

	.strength-bar {
		width: 100%;
		height: 4px;
		background: #e5e7eb;
		border-radius: 2px;
		overflow: hidden;
		margin-bottom: 8px;
	}

	.strength-fill {
		height: 100%;
		transition: all 0.3s ease;
	}

	.strength-text {
		font-size: 0.8rem;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.strength-feedback {
		font-size: 0.8rem;
		color: #6b7280;
	}

	.strength-feedback p {
		margin-bottom: 4px;
		font-weight: 500;
	}

	.strength-feedback ul {
		margin: 0;
		padding-left: 16px;
	}

	.strength-feedback li {
		margin-bottom: 2px;
	}

	.password-match {
		margin-top: 8px;
	}

	.match-success,
	.match-error {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.match-success {
		color: #10b981;
	}

	.match-error {
		color: #ef4444;
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

	.success-message {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
		border-radius: 8px;
		color: #16a34a;
		font-size: 0.9rem;
	}

	.submit-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		background: linear-gradient(45deg, #10b981, #059669);
		color: white;
		border: none;
		border-radius: 12px;
		padding: 16px 24px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
	}

	.submit-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
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

	.login-prompt {
		color: #64748b;
		font-size: 0.9rem;
	}

	.login-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		background: none;
		border: none;
		color: #10b981;
		font-weight: 600;
		cursor: pointer;
		transition: color 0.2s ease;
		margin-left: 4px;
	}

	.login-link:hover:not(:disabled) {
		color: #059669;
	}

	.login-link:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.register-wrapper {
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

		.benefits-list {
			gap: 16px;
		}
	}
</style>
