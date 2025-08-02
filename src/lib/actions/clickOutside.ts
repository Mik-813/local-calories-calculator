import type { Action } from "svelte/action";

export const clickOutside: Action<HTMLElement, () => void> = (node, param) => {
	function handleClick(e: MouseEvent) {
		if (!node.contains(e.target as Node)) {
			param();
		}
	}

	window.addEventListener('mousedown', handleClick);

	return {
		destroy() {
			window.removeEventListener('mousedown', handleClick);
		}
	};
}
