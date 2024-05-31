import React, {useMemo, useState} from "react";
import './StandardButton.css'
import {useMediaQuery} from "react-responsive";
import { MediaQueries } from "../../../../assets/constants/enums/MediaQueries";
// import Avatar, {AvatarType} from "../../avatar/Avatar";


export enum StandardButtonIconType {
  NO_ICON,
  DARK_CROSS,
  WHITE_CROSS,
  WHITE_RIGHT_ARROW,
  WHITE_LEFT_ARROW,
  WHITE_DOWN_ARROW,
  BLACK_LEFT_ARROW,
  WHITE_PLUS,
  DARK_PLUS,
  BLACK_USER_SQUARE_ICON,
  BLACK_USER_ROUND_ICON,
  TRASH,
  BLACK_LOGOUT,
  // AVATAR
}

export enum StandardButtonIconPosition {
  BEFORE_TEXT,
  AFTER_TEXT
}

export enum StandardButtonColor {
  GRAY,
  GREEN
}

interface StandardButtonProps {
  onClickAction: () => void;
  text: string;
  color: StandardButtonColor;
  iconType: StandardButtonIconType;
  iconPosition: StandardButtonIconPosition;
  notFullWidth?: boolean;
  className?: string;
  type?: any;
}
const StandardButton: React.FC<StandardButtonProps> = ({ onClickAction, iconType, iconPosition, color, text, notFullWidth, className }) => {
  const [isHovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const isTouchable = useMediaQuery({ query: MediaQueries.TOUCHABLE });

  const resolvedIcon = useMemo(() => {
    switch (iconType) {
      case StandardButtonIconType.DARK_CROSS:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 7L17 17" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 7L7 17" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case StandardButtonIconType.WHITE_CROSS:
        return (
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 7L17.5 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 7L7.5 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case StandardButtonIconType.WHITE_RIGHT_ARROW:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H19.5M19.5 12L12.5 5M19.5 12L12.5 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case StandardButtonIconType.WHITE_PLUS:
        return (
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11.5" y="5" width="2" height="14" rx="1" fill="white"/>
            <rect x="5.5" y="13" width="2" height="14" rx="1" transform="rotate(-90 5.5 13)" fill="white"/>
          </svg>
        )
        case StandardButtonIconType.DARK_PLUS:
        return (
          <svg width="25" height="24" viewBox="0 0 25 24" fill="2C2D2E" xmlns="http://www.w3.org/2000/svg">
            <rect x="11.5" y="5" width="2" height="14" rx="1" fill="2C2D2E"/>
            <rect x="5.5" y="13" width="2" height="14" rx="1" transform="rotate(-90 5.5 13)" fill="2C2D2E"/>
          </svg>
        )
      case StandardButtonIconType.WHITE_DOWN_ARROW:
        return (
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.75 3.75V20.25M11.75 20.25L18.75 13.25M11.75 20.25L4.75 13.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case StandardButtonIconType.BLACK_LEFT_ARROW:
        return (
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 12.7145L3 12.7145M3 12.7145L10 19.7145M3 12.7145L10 5.71448" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case StandardButtonIconType.WHITE_LEFT_ARROW:
        return (
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12L3.5 12M3.5 12L10.5 19M3.5 12L10.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case StandardButtonIconType.BLACK_USER_SQUARE_ICON:
        return (
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_417_8603)">
              <path d="M2.5 12C2.5 8.73646 2.5 7.10469 3.07265 5.83232C3.72448 4.38401 4.88401 3.22448 6.33232 2.57265C7.60469 2 9.23646 2 12.5 2C15.7635 2 17.3953 2 18.6677 2.57265C20.116 3.22448 21.2755 4.38401 21.9273 5.83232C22.5 7.10469 22.5 8.73646 22.5 12C22.5 15.2635 22.5 16.8953 21.9273 18.1677C21.2755 19.616 20.116 20.7755 18.6677 21.4273C17.3953 22 15.7635 22 12.5 22C9.23646 22 7.60469 22 6.33232 21.4273C4.88401 20.7755 3.72448 19.616 3.07265 18.1677C2.5 16.8953 2.5 15.2635 2.5 12Z" stroke="#2C2D2E" strokeWidth="2"/>
              <path d="M8.5 10C8.5 12.2091 10.2909 14 12.5 14C14.7091 14 16.5 12.2091 16.5 10C16.5 7.79086 14.7091 6 12.5 6C10.2909 6 8.5 7.79086 8.5 10Z" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5.88525 21C7.0337 18.5852 9.48397 17 12.2204 17H12.7801C15.5165 17 17.9667 18.5852 19.1152 21" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_417_8603">
                <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
              </clipPath>
            </defs>
          </svg>
        )
      case StandardButtonIconType.TRASH:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_417_11182)">
              <path d="M4.79492 11L5.2766 15.9043C5.42271 17.392 5.49576 18.1358 5.72272 18.7452C6.28945 20.2668 7.55974 21.4184 9.12943 21.8337C9.75803 22 10.5054 22 12.0003 22C13.4951 22 14.2425 22 14.8711 21.8337C16.4408 21.4184 17.7111 20.2667 18.2778 18.7452C18.5048 18.1358 18.5778 17.392 18.7239 15.9043L19.2056 11" stroke="#F74061" strokeWidth="2" strokeLinecap="round"/>
              <path d="M10 12L10 16" stroke="#F74061" strokeWidth="2" strokeLinecap="round"/>
              <path d="M14 12V16" stroke="#F74061" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 7.00001L5.42404 6.596C9.77799 5.87034 14.222 5.87034 18.576 6.596L21 7.00001" stroke="#F74061" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6" stroke="#F74061" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_417_11182">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        )
      case StandardButtonIconType.BLACK_LOGOUT:
        return (
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12L4.00001 12M4.00001 12L11 19M4.00001 12L11 5" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 5.5H19C20.1046 5.5 21 6.39543 21 7.5V16.5C21 17.6046 20.1046 18.5 19 18.5H17" stroke="#2C2D2E" strokeWidth="2"/>
          </svg>
        )
      case StandardButtonIconType.BLACK_USER_ROUND_ICON:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_442_8514)">
              <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10Z" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6.3501 19.5C7.65429 17.9502 9.60137 17 11.72 17H12.2797C14.3983 17 16.3454 17.9502 17.6495 19.5" stroke="#2C2D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_442_8514">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        )
      // case StandardButtonIconType.AVATAR:
      //   return (
      //     <Avatar type={AvatarType.DESKTOP_PROFILE_BTN} />
      //   )
      default:
        return ''
    }
  }, [iconType])

  return(
    <div
      className={`animation-02s-all standard-btn-wrapper ${className}`}
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
        width: notFullWidth ? undefined : '100%',
        flexDirection: iconPosition === StandardButtonIconPosition.AFTER_TEXT ? 'row-reverse' : 'row',
        cursor: isClicked || isHovered ? 'pointer' : undefined,
        backgroundColor: isClicked
          ? (color === StandardButtonColor.GRAY ? 'var(--on-click-gray-light, #CFD2DB)' : 'var(--on-click-ym-green, #00B54D)')
          : isHovered
            ? (color === StandardButtonColor.GRAY ? 'var(--on-hover-gray-light, #E7E9F0)' : 'var(--on-hover-ym-green, #00C956)')
            : (color === StandardButtonColor.GRAY ? 'var(--gray-light, #F3F4F6)' : 'var(--main-ym-green, #00DF5F)')
      }}
    >
      {resolvedIcon}
      <div className={`mobile-and-desktop-btns noselect ${color === StandardButtonColor.GRAY ? 'gray' : 'white'}`}>
        {text}
      </div>
    </div>
  )
}

export default StandardButton