import './SearchInput.css'
import React, {useEffect, useRef, useState} from "react";
import {TextField} from "@mui/material";
// import CloseButton, {CloseButtonSize} from "../../buttons/close_button/CloseButton";

interface SearchFieldProps {
  placeholder: string;
  onInputChange: (value: string) => void;
}

const SearchInput: React.FC<SearchFieldProps> = ({ onInputChange, placeholder }) => {
  const [isActive, setIsActive] = useState(false)
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    onInputChange(text)
  }, [onInputChange, text])

  return(
    <div
      className={`custom-search-field-wrapper ${text && 'cropped'} animation-01s-all`}
      style={{
        height: '45px',
        borderColor: isActive
          ? 'var(--main-ym-green, #00DF5F)'
          : 'var(--gray-light, #F3F4F6)',
        zIndex: '9999 !important',
        position: 'relative',
        width: '-webkit-fill-available',
      }}
    >
      <div
        className={'animation-01s-all'}
        style={{
          position: 'absolute',
          top: '11px',
          right: '12px',
          opacity: text ? 1 : 0,
          zIndex: 10
        }}
      >
        {/* <CloseButton
          size={CloseButtonSize.SMALL}
          onClickAction={() => {
            setText('')
            setIsActive(true)
            inputRef?.current?.focus()
          }}
          defaultColor={'transparent'}
        /> */}
      </div>
      <div style={{ position: 'absolute', width: '24px', height: '24px', top: '11px', left: '12px'}} >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_135_811)">
            <path d="M21 22L16 17" stroke="#87898F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 10.5C2 15.1944 5.80558 19 10.5 19C15.1944 19 19 15.1944 19 10.5C19 5.80558 15.1944 2 10.5 2C5.80558 2 2 5.80558 2 10.5Z" stroke="#87898F" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <defs>
            <clipPath id="clip0_135_811">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <TextField
        inputRef={inputRef}
        onBlur={() => setIsActive(false)}
        onClick={() => setIsActive(true)}
        fullWidth={true}
        inputProps={{
          style: {
            fontSize: 18,
            fontFamily: 'Lato-Regular, sans-serif',
            lineHeight: 'normal',
            caretColor: 'var(--main-ym-green, #00DF5F)',
            caret: '5px',
          },
          sx: {
            '&::placeholder': {
              color: 'var(--text-tetriary, #87898F)',
              opacity: 1,
            },
          },

        }}
        onChange={(e) => {
          setText(e.target.value)
        }}
        size="small"
        placeholder={placeholder}
        variant="outlined"
        margin="none"
        multiline={false}
        value={text}
      />
    </div>
  )
}

export default SearchInput