import type { Timestamp } from 'firebase/firestore';

/**
 * 統一的日期格式化函數
 * 支援 string、Date、Firestore Timestamp 三種輸入格式
 */
export function formatDate(
	dateInput: string | Date | Timestamp | undefined | null,
	options: {
		includeTime?: boolean;
		locale?: string;
		fallback?: string;
	} = {}
): string {
	const { includeTime = false, locale = 'zh-TW', fallback = '' } = options;

	if (!dateInput) return fallback;

	let date: Date;

	try {
		// Handle Firestore Timestamp
		if (
			typeof dateInput === 'object' &&
			'toDate' in dateInput &&
			typeof dateInput.toDate === 'function'
		) {
			date = dateInput.toDate();
		}
		// Handle Date object
		else if (dateInput instanceof Date) {
			date = dateInput;
		}
		// Handle string
		else if (typeof dateInput === 'string') {
			date = new Date(dateInput);
		} else {
			return fallback;
		}

		// Check if date is valid
		if (isNaN(date.getTime())) {
			return fallback;
		}

		// Format options
		const formatOptions: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};

		if (includeTime) {
			formatOptions.hour = '2-digit';
			formatOptions.minute = '2-digit';
		}

		return date.toLocaleDateString(locale, formatOptions);
	} catch (error) {
		console.warn('formatDate error:', error);
		return fallback;
	}
}

/**
 * 格式化日期為短格式（用於列表顯示）
 */
export function formatDateShort(dateInput: string | Date | Timestamp | undefined | null): string {
	return formatDate(dateInput, {
		locale: 'zh-TW',
		fallback: '-'
	});
}

/**
 * 格式化日期包含時間（用於詳細頁面）
 */
export function formatDateWithTime(
	dateInput: string | Date | Timestamp | undefined | null
): string {
	return formatDate(dateInput, {
		includeTime: true,
		locale: 'zh-TW',
		fallback: '-'
	});
}
