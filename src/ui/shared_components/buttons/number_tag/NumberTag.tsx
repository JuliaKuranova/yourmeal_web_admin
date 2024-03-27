import './NumberTag.css'
import React from "react";

export enum NumberTagColor {
  WHITE,
  GREEN
}

interface NumberTagProps {
  color: NumberTagColor;
  number: number;
  disableAnimation?: boolean;
}
const NumberTag: React.FC<NumberTagProps> = ({ color, number, disableAnimation }) => {
  return(
    <div
      className={`
        ${!disableAnimation && 'animation-02s-all'}
        number-tag-wrapper 
        ${color === NumberTagColor.WHITE ? 'num-white' : 'num-green'} 
        mobile-and-desktop-btns
        ${color === NumberTagColor.WHITE ? 'text-secondary' : 'text-white'}`
      }
    >
      {number}
    </div>
  )
}

export default NumberTag