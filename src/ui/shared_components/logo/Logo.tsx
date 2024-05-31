import React from "react";
import {useLocation} from "react-router-dom";
// import {RoutePaths} from "../../../constants/enums/RoutePaths";
import styled from "styled-components";
import { RoutePaths } from "../../../assets/constants/enums/RoutePaths";

interface LogoProps {
  navigateHomeOnClick?: boolean;
}

const StyledLogo =  styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  width: 213px;
  height: 39px;
  background: var(--main-ym-green, #00DF5F);
  box-shadow: 0.263px 0.263px 30px 0 rgba(0, 223, 95, 0.20);
  flex-shrink: 0;

  color: var(--main-white, #FFF);
  font-family: AlegreyaSans-Bold, serif;
  font-size: 26px;
  font-style: normal;
  line-height: normal;
  
  &:hover {
    cursor: pointer;
  }
`

const Logo: React.FC<LogoProps> = ({ navigateHomeOnClick}) => {
  const location = useLocation()

  return(
    <StyledLogo
      as={navigateHomeOnClick && location.pathname !== RoutePaths.AUTHORIZATION ? 'a' : 'div'}
      href={RoutePaths.AUTHORIZATION}
    >
      Yourmeal service
    </StyledLogo>
  )
}

export default Logo