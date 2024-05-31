import React, {ChangeEvent, useRef, useState} from "react";
import styled from "styled-components";
// import {calculateShouldCaretBeMoved, moveCaretToEnd} from "../utils/InputUtils";
// import {inputColors, inputFonts} from "../utils/InputStyles";
import useHover from "../../../../utils/hooks/UseHoverHook";
import { inputColors, inputFonts } from "../utils/InputStyles";
import { calculateShouldCaretBeMoved, moveCaretToEnd } from "../utils/InputUtils";

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

const InputAndPlaceholderWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`

const StyledInput = styled.input<{
  $material?: boolean,
  $disabled?: boolean,
  $hovered?: boolean,
  $focused?: boolean,
  $error?: boolean,
  $multiline?: boolean,
  $multilineHeight?: number;
  $password?: boolean;
  $hidden?: boolean;
  $empty?: boolean;
}>`
  // colors
  background: ${props => props?.$disabled
          ? inputColors.backgroundDisabled 
          : props?.$focused
                  ? inputColors.backgroundFocused
                  : props?.$error 
                          ? inputColors.errorBackground 
                          : props?.$hovered 
                                  ? inputColors.backgroundOnHover 
                                  : inputColors.backgroundDefault
  } !important;
  border-color: ${props => props?.$disabled 
          ? inputColors.borderDisabled 
          : props?.$focused
                ? inputColors?.borderFocused
                : props?.$error 
                        ? inputColors.errorMain 
                        : props?.$hovered 
                                ? inputColors.borderOnHover 
                                : inputColors.backgroundDefault
  } !important;
  color: ${props => props?.$disabled ? inputColors.textDisabled : inputColors.textDefault};
  caret-color: ${inputColors.caret};
  
  // fonts
  letter-spacing: ${props => props?.$hidden && !props?.$empty && '2px'};
  font-size: ${props => props?.$hidden && !props?.$empty ? 16 : 18}px !important;
  font-family: ${props => props?.$hidden && !props?.$empty 
          ? '"Lucida Console", Monaco, monospace' 
          : inputFonts.mainFont
  };

  // sizing
  height: ${props => props?.$multiline ? props?.$multilineHeight ? props?.$multilineHeight : 96 : 48}px;
  margin: 0;
  padding: 
          ${props => props?.$material ? 16 : 12}px 
          ${props => props?.$password ? 40 : 12}px 
          ${props => props?.$material ? 4 : 12}px 
          12px;
  width: 100%;
  box-sizing: border-box;
  
  // border
  border-width: 1.5px;
  border-style: solid;
  border-radius: 12px;
  
  // other
  pointer-events: ${props => props?.$disabled && 'none'};
  transition: 
          color 0.2s ease-in-out, 
          background-color 0.2s ease-in-out, 
          opacity 0.2s ease-in-out, 
          box-shadow 0.2s ease-in-out, 
          border 0.2s ease-in-out;
  appearance: none;
  position: relative;
  resize: none !important;

  &:hover {
    border-color: ${inputColors?.borderOnHover};
  }

  &:focus {
    outline: none !important;
    border-color: ${inputColors?.borderFocused};
  }
  
  &::placeholder {
    color: ${inputColors.hint};
    font-family: ${inputFonts.mainFont};
  }

  &:-webkit-autofill,
  &:-webkit-autofill::first-line,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  & textarea:-webkit-autofill,
  & textarea:-webkit-autofill:hover,
  & textarea:-webkit-autofill:focus,
  & textarea:-webkit-autofill::first-line,
  & select:-webkit-autofill,
  & select:-webkit-autofill:hover,
  & select:-webkit-autofill:focus,
  & select:-webkit-autofill::first-line,
  & input:-internal-autofill-selected {
    -webkit-box-shadow: 0 0 0 30px ${props => props?.$focused
        ? inputColors.backgroundFocused
        : props?.$error
            ? inputColors.errorBackground
            : props?.$hovered
                ? inputColors.backgroundOnHover
                : inputColors.borderDefault
    } inset !important;
    font-size: 18px !important;
    font-family: Consolas, sans-serif !important;
    animation: 0.2s all ease-in-out !important;
    color: ${inputColors.textDefault} !important;
  }
`

const PlaceholderWrapper = styled.div<{
  $collapsed: boolean,
  $animated: boolean
}>`
  display: flex;
  position: absolute;
  font-size: ${props => props?.$collapsed ? '12px' : '18px'};
  left: ${props => props?.$collapsed ? '13px' : '12px'};
  top: ${props => props?.$collapsed ? '5px' : '12px'};
  font-family: ${inputFonts?.mainFont};
  color: ${inputColors.hint};
  overflow: hidden;
  text-align: left;
  transition: ${props => props?.$animated ? '0.2s all ease-in-out' : 'none'};
  user-focus: none;
  user-select: none;
`

const ErrorWrapper = styled.div<{ $isShown: boolean }>`
  display: flex;
  max-height: ${props => props?.$isShown ? '17px' : '0px'};
  min-height: ${props => props?.$isShown ? '17px' : '0px'};
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  color: ${inputColors?.errorMain};
  text-align: left;
  font-size: 12px;
  transition: 0.2s all ease-in-out;
`

const EyeWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  
  &:hover {
    cursor: pointer;
  }
`

interface CustomInputProps {
  // mandatory
  id: string;
  value: string | number;
  placeholder: string;

  // optional
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  material?: boolean;
  multiline?: boolean;
  multilineHeight?: number;
  password?: boolean;
  containerStyle?: React.CSSProperties;
  type?: 'text' | 'email' | 'number' | 'password';
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const {
    id,
    value,
    placeholder,
    onChange,
    onBlur,
    error,
    disabled,
    material,
    multiline,
    multilineHeight,
    password,
    type,
    containerStyle
  } = props
  const [isFocused, setIsFocused] = useState(false);
  const {isHovered, ...eventHandlers} = useHover()
  const [isHidden, setIsHidden] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null);

  return(
    <StyledInputWrapper style={containerStyle}>
      <ErrorWrapper $isShown={error !== undefined && !isFocused && !disabled}>
        {error}
      </ErrorWrapper>
      <InputAndPlaceholderWrapper>
        <StyledInput
          // styled props
          as={multiline ? 'textarea' : 'input'}
          className={multiline ? 'multiline-input' : 'input'}
          $material={material}
          $disabled={disabled}
          $hovered={isHovered}
          $focused={isFocused}
          $error={error !== undefined && !isFocused && !disabled}
          $multiline={multiline}
          $multilineHeight={multilineHeight}
          // $password={type === 'password'}
          $hidden={type === 'password' && isHidden}
          $empty={!value || value.toString()?.length === 0}

          // other props
          id={id}
          // type={password && isHidden ? 'password' : 'text'}
          type={type === 'password' && !isHidden ? 'text' : (type || 'text')}
          ref={inputRef}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (typeof onChange === 'function') {
              onChange(event)
            }
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false)
            if (onBlur) {
              onBlur(e)
            }
          }}
          onFocus={() => {
            if (!disabled) {
              setIsFocused(true)
              setTimeout(() => moveCaretToEnd(inputRef), 0)
            }
          }}
          onClick={(event: React.MouseEvent<HTMLInputElement>) => {
            if (calculateShouldCaretBeMoved(event, inputRef)) {
              moveCaretToEnd(inputRef)
            }
          }}
          multiple={multiline}
          placeholder={!material ? placeholder : undefined}
          {...eventHandlers}
        />
        {material && (
          <PlaceholderWrapper
            $collapsed={value.toString()?.length > 0 || isFocused}
            $animated={value.toString()?.length === 0 || isHovered || isFocused}
          >
            {placeholder}
          </PlaceholderWrapper>
        )}


        {type === 'password' && (
          <EyeWrapper
            onClick={() => {
              setIsHidden(prev => !prev)
              inputRef?.current?.focus()
            }}
            onMouseEnter={eventHandlers.onMouseEnter}
          >
            {isHidden ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.46479 13.2576C5.57734 22.1038 18.0818 22.1328 21.4807 13.3926C21.8267 12.503 21.8267 11.497 21.4807 10.6073C18.0818 1.8672 5.57734 1.8962 2.46479 10.7424C2.1784 11.5563 2.1784 12.4437 2.46479 13.2576Z" stroke="#87898F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 12C8.5 13.933 10.067 15.5 12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12Z" stroke="#87898F" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_126_4791)">
                  <path d="M20.6992 9C20.9954 9.49801 21.2577 10.0338 21.4807 10.6073C21.8267 11.497 21.8267 12.503 21.4807 13.3926C19.5113 18.4568 14.4851 20.577 10 19.7438" stroke="#87898F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 5.68873C12.4034 2.43568 4.79718 4.11349 2.46479 10.7424C2.1784 11.5563 2.1784 12.4437 2.46479 13.2576C3.11894 15.1167 4.18791 16.5864 5.5 17.6672" stroke="#87898F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 3L3 21" stroke="#87898F" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9.12734 14C8.73191 13.4331 8.5 12.7436 8.5 12C8.5 10.067 10.067 8.5 12 8.5C12.7436 8.5 13.4331 8.73191 14 9.12734" stroke="#87898F" strokeWidth="2" strokeLinecap="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_126_4791">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            )}
          </EyeWrapper>
        )}
      </InputAndPlaceholderWrapper>
    </StyledInputWrapper>
  )
}

export default CustomInput