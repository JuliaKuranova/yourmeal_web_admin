import React, {useMemo, useState} from "react";
import {useMediaQuery} from "react-responsive";
import { MediaQueries } from "../../../../assets/constants/enums/MediaQueries";
import './TagButton.css'


export enum TagButtonType {
  DESKTOP,
  MOBILE
}

interface TagButtonProps {
  onClickAction: () => void;
  isActive: boolean;
  text: string;
  type: TagButtonType;
  disabled?: boolean;
  fullWidth?: boolean;
  transparent?: boolean;
  white?: boolean;
  withCross?: boolean;
  withArrow?: boolean;
}

const TagButton: React.FC<TagButtonProps> = ({ onClickAction, isActive, text, type, disabled, transparent, fullWidth, white, withCross, withArrow}) => {
  const [isHovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const isTouchable = useMediaQuery({ query: MediaQueries.TOUCHABLE });

  const backgroundColor = useMemo(() => {
    if (transparent) {
      return 'transparent'
    }

    if (isClicked) {
      return 'var(--on-click-gray-light, #CFD2DB)'
    }

    if (isHovered) {
      return 'var(--on-hover-gray-light, #E7E9F0)'
    }

    if (isActive) {
      return 'var(--main-ym-green, #00DF5F)'
    }

    return 'var(--gray-light, #F3F4F6)'
  }, [isActive, isClicked, isHovered, transparent])

  return(
    <div
      className={'animation-02s-all tag-button-wrapper mobile-tags'}
      onClick={() => {
        if (!disabled) {
          onClickAction()
        }
      }}
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
        padding: type === TagButtonType.MOBILE ? '4px 12px' : '4px 16px',
        boxSizing: 'border-box',
        color: !disabled ? (isActive ? 'var(--main-white, #FFF)' : 'var(--text-primary, #2C2D2E)') : 'var(--text-secondary, #5D5E64)',
        cursor: (!disabled && (isClicked || isHovered)) ? 'pointer' : undefined,
        backgroundColor: white ? 'white' : disabled ? transparent ? 'transparent' : 'var(--gray-light, #F3F4F6)' : backgroundColor,
        // width: fullWidth ? '100%' : undefined,
        width: fullWidth ? '100%' : 'min-content',
        flex: fullWidth ? '1 0 0' : undefined,
        display: 'flex',
        gap: '4px',
      }}
    >
      {text}
      {withCross && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 7L17 17" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 7L7 17" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {withArrow && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H19.5M19.5 12L12.5 5M19.5 12L12.5 19" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  )
}

export default TagButton