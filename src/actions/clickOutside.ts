import { onMount, onDestroy } from 'svelte';

interface ClickOutsideProps {
	node: HTMLElement;
	dispatch: (event: CustomEvent) => void;
}

export function clickOutside({ node, dispatch }: ClickOutsideProps) {
	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node)) {
			dispatch(new CustomEvent("outclick"));
		}
	};

	onMount(() => {
		document.addEventListener("click", handleClick, true);
	});

	onDestroy(() => {
		document.removeEventListener("click", handleClick, true);
	});

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		}
	};
}