import React, {useState} from "react";
import {useMediaQuery} from "react-responsive";
import './../../../../assets/styles/animation_durations.css'
import { MediaQueries } from "../../../../assets/constants/enums/MediaQueries";

export enum CloseButtonSize {
  SMALL,
  MEDIUM,
  BIG
}

interface CloseButtonProps {
  size: CloseButtonSize;
  onClickAction: () => void;
  defaultColor: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ size, onClickAction, defaultColor}) => {
  const [isHovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const isTouchable = useMediaQuery({ query: MediaQueries.TOUCHABLE });

  return(
    <div
      className={'animation-02s-all'}
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
      style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing:'border-box',
        width: size === CloseButtonSize.BIG
          ? '48px'
          : size === CloseButtonSize.MEDIUM ? '36px' : '24px',
        height: size === CloseButtonSize.BIG
          ? '48px'
          : size === CloseButtonSize.MEDIUM ? '36px' : '24px',
        borderRadius: size === CloseButtonSize.BIG
          ? '24px'
          : size === CloseButtonSize.MEDIUM ? '18px' : '12px',
        backgroundColor: isClicked
          ? 'var(--on-click-gray-light, #CFD2DB)'
          : isHovered ? 'var(--on-hover-gray-light, #E7E9F0)' : defaultColor,
        cursor: isClicked || isHovered ? 'pointer' : undefined
      }}
    >
      {size === CloseButtonSize.SMALL && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L11 11" stroke="#87898F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 1L1 11" stroke="#87898F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {size === CloseButtonSize.MEDIUM && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 7L17 17" stroke="#87898F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 7L7 17" stroke="#87898F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {size === CloseButtonSize.BIG && (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.3335 9.33334L22.6668 22.6667" stroke="#87898F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.6668 9.33334L9.3335 22.6667" stroke="#87898F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  )
}

export default CloseButton