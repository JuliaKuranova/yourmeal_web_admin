import React, {useMemo, useState} from "react";
import useRipple from "use-ripple-hook";
import './RadioButton.css'
import {useMediaQuery} from "react-responsive";
import { MediaQueries } from "../../../../assets/constants/enums/MediaQueries";

interface RadioButtonProps {
  onClickAction: () => void;
  name: string;
  isSelected: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({ onClickAction, isSelected, name}) => {
  const [isHovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const isTouchable = useMediaQuery({ query: MediaQueries.TOUCHABLE });

  const [ripple, event] = useRipple({
    duration: 1000,
    color: "rgba(138,138,138,0.09)",
    cancelAutomatically: true,
  });

  const determinedColor = useMemo(() => {
    return isSelected
      ? (isHovered || isClicked) ? '#CCF9DF' : 'transparent'
      : (isHovered || isClicked) ? '#F3F4F6' : 'transparent'
  }, [isHovered, isClicked, isSelected])

  return(
    <div
      className={'radio-btn-wrapper'}
      onClick={onClickAction}
      onMouseEnter={() => {
        if (!isTouchable) {
          setHovered(true)
        }
      }}
      onMouseLeave={() => {
        if (!isTouchable) {
          setHovered(false)
          setClicked(false)
        }
      }}
      onTouchStart={() => setClicked(true)}
      onTouchEnd={() => setClicked(false)}
      onTouchCancel={() => setClicked(false)}
      onMouseDown={() => {
        if (!isTouchable) {
          setClicked(true)
        }
      }}
      onMouseUp={() => {
        if (!isTouchable) {
          setClicked(false)
        }
      }}
    >
      <div
        ref={ripple}
        onPointerDown={event}
        className='radio-circle'
        style={{ backgroundColor: determinedColor }}
      >
        {isSelected ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className={'animation-01s-all'} cx="12" cy="12" r="8.5" stroke={isClicked ? '#00B54D' : isHovered ? '#00C956' : '#00DF5F'} strokeWidth="7"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className={'animation-01s-all'} cx="12" cy="12" r="10.5" stroke={'#DADDE6'} strokeWidth="3"/>
          </svg>
        )}
      </div>
      <div className={'mobile-and-desktop-selectors text-primary'}>{name}</div>
    </div>
  )
}

export default RadioButton