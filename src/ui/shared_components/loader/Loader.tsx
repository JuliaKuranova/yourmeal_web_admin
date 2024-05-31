import React from "react";
import MDSpinner from "react-md-spinner";
import styled from "styled-components";

const StyledLoaderContainer = styled.div<{ $height?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${props => props?.$height && `height: ${props?.$height}`}
`

interface LoaderProps {
  height?: string;
  containerAdditionalStyle?: React.CSSProperties;
}

const Loader: React.FC<LoaderProps> = ({ height, containerAdditionalStyle}) => {
  return(
    <StyledLoaderContainer
      $height={height}
      style={containerAdditionalStyle}
    >
      <MDSpinner singleColor={'#00DF5F'} size={44} />
    </StyledLoaderContainer>
  )
}

export default Loader