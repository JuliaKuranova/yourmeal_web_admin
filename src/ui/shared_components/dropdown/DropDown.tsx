import React, { useState } from "react";
import styled from "styled-components";
import { inputColors, inputFonts } from "../inputs/utils/InputStyles";

export interface Option {
  label: string;
  value: string;
}

const DropDownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: -webkit-fill-available;`;

const ToggleButton = styled.button

<{
  $disabled?: boolean,
  $focused?: boolean,
  $error?: boolean,
  $hovered?: boolean,
  $hidden?: boolean;
  $empty?: boolean;
  $multiline?: boolean,
  $multilineHeight?: number;
  $material?: boolean,
  $password?: boolean;
}>`
  background-color: #f0f0f0;
  color: #333;
  padding: inherit;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;



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
  // padding: 
  //         ${props => props?.$material ? 16 : 12}px 
  //         ${props => props?.$password ? 40 : 12}px 
  //         ${props => props?.$material ? 4 : 12}px 
  //         12px;
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


  `;

const DropDownList = styled.ul`
  position: absolute;
  left: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #00DF5F;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
  z-index: 2;
`;

const DropDownListItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 12px;

  &:hover {
    background-color: #F2F4F5;
  }
`;

const ChevronIcon = styled.span<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s ease-in-out;
  height: 24px;
  margin-right: 12px;
`;

interface DropDownProps {
  id: string;
  selectedOption?: Option;
  options: Option[];
  onSelect: (option: Option) => void;
  title: string;
}

const DropDown: React.FC<DropDownProps> = (props: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState<Option | null>(
  //   options.find(option => option.value === value) || null
  // );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    // setSelectedOption(option);
    props.onSelect(option);
    setIsOpen(false);
  };

  return (
    <DropDownContainer>
      <ToggleButton onClick={handleToggle}>
        <div className="sc-dmyCSP jhEjGN"
        style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'column',}}>
          {props.selectedOption ? <span className="sc-hLQSwg cIpzpQ">{props.title}</span> : null}
          {props.selectedOption ? props.selectedOption.label : <span className="sc-hLQSwg bAWnAC">{props.title}</span>}
        </div>
        <ChevronIcon isOpen={isOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.5 9.5L11.7929 13.7929C12.1834 14.1834 12.8166 14.1834 13.2071 13.7929L17.5 9.5"
              stroke="#87898F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </ChevronIcon>
      </ToggleButton>
      {isOpen && (
        <DropDownList>
          {props.options.map((option) => (
            <DropDownListItem
              key={option.value}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </DropDownListItem>
          ))}
        </DropDownList>
      )}
    </DropDownContainer>
  );
};

export default DropDown;
