export function onClickOutside<T extends HTMLElement>(node: T, param: (node: T) => void) {
	function handleClick(e: MouseEvent) {
		if (!node.contains(e.target as Node)) {
			param(node);
		}
	}

	window.addEventListener('mousedown', handleClick);

	return {
		destroy() {
			window.removeEventListener('mousedown', handleClick);
		}
	};
}
