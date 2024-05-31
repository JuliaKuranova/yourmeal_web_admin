import React from "react";
import styled from "styled-components";
import useHoverAndClick from "../../../../utils/hooks/UseHoverAndClick";

const checkBoxColors = {
  backgroundDefaultUnchecked: 'rgba(243, 244, 246, 1)',
  borderDefaultUnchecked: 'rgba(243, 244, 246, 1)',

  backgroundOnHoverUnchecked: 'rgba(243, 244, 246, 1)',
  borderOnHoverUnchecked: 'rgba(218, 221, 230, 1)',

  backgroundClickedUnchecked: 'rgba(243, 244, 246, 1)',
  borderClickedUnchecked: 'rgba(198, 201, 209, 1)',

  backgroundDefaultChecked: 'rgba(0, 223, 95, 1)',
  borderDefaultChecked: 'rgba(0, 223, 95, 1)',

  backgroundOnHoverChecked: 'rgba(0, 201, 86, 1)',
  borderOnHoverChecked: 'rgba(0, 201, 86, 1)',

  backgroundClickedChecked: 'rgba(0, 181, 77, 1)',
  borderClickedChecked: 'rgba(0, 181, 77, 1)',

  textDefault: 'rgba(44, 45, 46, 1)',
}

const StyledCheckBoxWrapper = styled.div<{
  $hovered?: boolean,
  $clicked?: boolean,
}>`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  cursor: ${props => props?.$clicked || props?.$hovered ? 'pointer' : undefined};
`

const StyledBoxWrapper = styled.div`
  position: relative;
`

const StyledCheckBox = styled.input.attrs({ type: 'checkbox'})<{
  $hovered?: boolean,
  $clicked?: boolean,
  $checked?: boolean,
}>`
  // colors
  background: ${props => !props?.$checked 
          ? props?.$clicked 
                  ? checkBoxColors.backgroundClickedUnchecked
                  : props?.$hovered 
                          ? checkBoxColors.backgroundOnHoverUnchecked
                          : checkBoxColors.backgroundDefaultUnchecked
          : props?.$clicked
                  ? checkBoxColors.backgroundClickedChecked
                  : props?.$hovered
                          ? checkBoxColors.backgroundOnHoverChecked
                          : checkBoxColors.backgroundDefaultChecked
  } !important;
  border-color: ${props => !props?.$checked
          ? props?.$clicked
                  ? checkBoxColors.borderClickedUnchecked
                  : props?.$hovered
                          ? checkBoxColors.borderOnHoverUnchecked
                          : checkBoxColors.borderDefaultUnchecked
          : props?.$clicked
                  ? checkBoxColors.borderClickedChecked
                  : props?.$hovered
                          ? checkBoxColors.borderOnHoverChecked
                          : checkBoxColors.borderDefaultChecked
  } !important;
  cursor: ${props => props?.$clicked || props?.$hovered ? 'pointer' : undefined};

  appearance: none;
  margin: 0;
  display: flex;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
  border-radius: 6px;
  transition: 0.2s all ease-in-out;

  &:hover {
    border-color: ${props => props?.$checked 
            ? checkBoxColors.borderOnHoverChecked 
            : checkBoxColors.borderOnHoverUnchecked
    };
  }

  &:focus {
    outline: none !important;
    border-color: ${props => props?.$checked
            ? checkBoxColors.borderClickedChecked
            : checkBoxColors.borderClickedUnchecked
    };
  }
`

const StyledText = styled.div`
  font-size: 18px;
  user-select: none;
`

interface CheckBoxProps {
  id?: string;
  checked: boolean;
  onChange: any;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  text: string;
  containerStyle?: React.CSSProperties
  name?: string;
  value?: string;
}

const CustomCheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, text, containerStyle, name, value }) => {
  const {isHovered, isClicked, ...eventHandlers} = useHoverAndClick()

  return(
    <StyledCheckBoxWrapper
      style={containerStyle}
      {...eventHandlers}
      $hovered={isHovered}
      $clicked={isClicked}
      onClick={() => onChange(!checked)}
    >
      <StyledBoxWrapper>
        <StyledCheckBox
          $hovered={isHovered}
          $clicked={isClicked}
          $checked={checked}
          name={name}
          value={value}
        />
        <svg
          style={{
            transition: '0.2s all ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: checked ? 1 : 0
          }}
          width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.25 12.5L9.75 16L17.75 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </StyledBoxWrapper>
      <StyledText className={'mobile-and-desktop-selectors'}>
        {text}
      </StyledText>
    </StyledCheckBoxWrapper>
  )
}

export default CustomCheckBox