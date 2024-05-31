import Logo from "../logo/Logo";
import "./HeaderDesktop.css";
// import DesktopProfileButton from "../buttons/desktop_profile_button/DesktopProfileButton";
import DesktopOrderButton from "../buttons/order_button/DesktopOrderButton";
import React, { ReactNode } from "react";
// import SquareButton from "../buttons/square_button/SquareButton";
// import PreferencesButton from "../buttons/preferences_button/PreferencesButton";
import { useLocation } from "react-router-dom";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType,
} from "../buttons/standard_button/StandardButton";
// import {RoutePaths} from "../../../constants/enums/RoutePaths";
// import {SquareButtonIconType} from "../buttons/square_button/SquareButtonIconType";

interface HeaderDesktopProps {
  withBackButton?: boolean;
  withProfileButton?: boolean;
  withPreferencesButton?: boolean;
  withSearchBar?: boolean;
  searchBar?: ReactNode;
}

const HeaderDesktop: React.FC<HeaderDesktopProps> = ({
  withSearchBar,
  searchBar,
  withProfileButton,
  withPreferencesButton,
}) => {
  const location = useLocation();

  return (
    <div className={"top-container-desktop-wrapper"}>
      <div className={"top-container-desktop"}>
        <div
          className={"logo-and-search-desktop-wrapper"}
          style={{
            width: Math.min(
              withPreferencesButton ? 560 : 500,
              window.innerWidth / 1.5
            ),
          }}
        >
          {/* {window.history.length && location.pathname !== RoutePaths.HOME && <SquareButton onClickAction={() => window?.history?.back()} iconType={SquareButtonIconType.ARROW_BACK} />} */}
          <Logo navigateHomeOnClick={true} />
          <div
            className={"search-and-pref-desktop-wrapper"}
            style={{
              width: Math.min(
                withPreferencesButton ? 390 : 340,
                window.innerWidth / 2
              ),
            }}
          >
            {withSearchBar && searchBar}
            {/* {withPreferencesButton && <PreferencesButton/>} */}
          </div>
        </div>
        <div className={"profile-and-order-btns-wrapper-desktop"}>
          <StandardButton
            onClickAction={() => true}
            text={"Связаться с поддержкой"}
            color={StandardButtonColor.GRAY}
            iconType={StandardButtonIconType.NO_ICON}
            iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
            notFullWidth={true}
          />
          {/* {withProfileButton && <DesktopProfileButton/>} */}
          {/* {location.pathname !== RoutePaths.MY_ORDER && <DesktopOrderButton/>} */}
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktop;
