/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95'
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif']
			},
			animation: {
				'fade-in-up': 'fadeInUp 0.6s ease-out',
				'bounce-slow': 'bounce 2s infinite'
			},
			backdropBlur: {
				xs: '2px'
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		function({ addUtilities }) {
			addUtilities({
				'.line-clamp-1': {
					display: '-webkit-box',
					'-webkit-line-clamp': '1',
					'-webkit-box-orient': 'vertical',
					overflow: 'hidden',
				},
				'.line-clamp-2': {
					display: '-webkit-box',
					'-webkit-line-clamp': '2',
					'-webkit-box-orient': 'vertical',
					overflow: 'hidden',
				},
				'.line-clamp-3': {
					display: '-webkit-box',
					'-webkit-line-clamp': '3',
					'-webkit-box-orient': 'vertical',
					overflow: 'hidden',
				},
				'.line-clamp-4': {
					display: '-webkit-box',
					'-webkit-line-clamp': '4',
					'-webkit-box-orient': 'vertical',
					overflow: 'hidden',
				},
			})
		}
	]
};
