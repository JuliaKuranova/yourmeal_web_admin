// import { Link, useLocation } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
// import "./NavBar.css";
import { useMediaQuery } from "react-responsive";
import { MediaQueries } from "../../../assets/constants/enums/MediaQueries";
import React from "react";

interface NavBarItemProps {
    title: string,
    active?: boolean,
    iconDefault: JSX.Element,
    iconActiveMobile: JSX.Element,
    iconActiveDesktop: JSX.Element,
    onClick?: any,
}



const NavBarItem: React.FC<NavBarItemProps> = (props: NavBarItemProps) => {

    const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });

    const iconActive = isMobile ? props.iconActiveMobile : props.iconActiveDesktop;

        return (
    
            <div className={`nav-bar__item ${props.active ? 'active' : ''}`} onClick={props.onClick}>
                {props.active ? iconActive : props.iconDefault}
                <span className="nav-bar__title mobile-and-desktop-btns">
                    {props.title}
                </span>
            </div>
        
    
      );
};

export default NavBarItem;
