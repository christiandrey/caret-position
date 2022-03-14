/**
 * Sets the caret position in an input or textarea element
 * @param element The element in which the caret is to be set
 * @param caretPosition The offset from the left
 */
export function setCaretPosition(element: HTMLElement, caretPosition?: number) {
	if (caretPosition === null || typeof caretPosition === 'undefined') {
		return;
	}

	if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
		element.focus();
		element.setSelectionRange(caretPosition, caretPosition);
		return;
	}

	if (element.isContentEditable) {
		const selection = window.getSelection();

		if (selection) {
			const range = document.createRange();
			range.setStart(element.childNodes[0], caretPosition);
			range.collapse(true);
			selection.removeAllRanges();
			selection.addRange(range);
			element.focus();
		}
	}
}

/**
 * Gets the caret position in inputs, textareas or contenteditable elements.
 * @param element The element within which the caret position
 * is to be determined.
 */
export function getCaretPosition(element: HTMLElement) {
	let position = 0;

	if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
		position = element.selectionStart ?? 0;
	}

	if (element.isContentEditable) {
		const selection = window.getSelection();

		if (selection?.rangeCount !== 0) {
			const range = window.getSelection()?.getRangeAt(0);

			if (range) {
				const preCaretRange = range.cloneRange();
				preCaretRange.selectNodeContents(element);
				preCaretRange.setEnd(range.endContainer, range.endOffset);
				position = preCaretRange.toString().length;
			}
		}
	}

	return position;
}
