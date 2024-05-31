import React from "react";

export const calculateShouldCaretBeMoved = (
  event: React.MouseEvent<HTMLInputElement>,
  inputRef:  React.RefObject<HTMLInputElement>
): boolean => {
  if (inputRef.current) {
    try {
      const rect = inputRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const computedStyle = window.getComputedStyle(inputRef.current);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);

      if (!(
        x >= paddingLeft &&
        x <= rect.width - paddingRight &&
        y >= paddingTop &&
        y <= rect.height - paddingBottom
      )) {
        return true
      }
    } catch (err) {
      return false
    }
  }

  return false
}

export const moveCaretToEnd = (inputRef:  React.RefObject<HTMLInputElement>) => {
  try {
    if (inputRef?.current) {
      const length = inputRef.current.value.length;
      inputRef.current.selectionStart = length;
      inputRef.current.selectionEnd = length;
    }
  } catch (err) {
    // ignored
  }
}