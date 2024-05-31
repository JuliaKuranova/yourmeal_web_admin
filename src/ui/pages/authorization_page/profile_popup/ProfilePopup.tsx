import "./ProfilePopup.css";
import CloseButton, {
  CloseButtonSize,
} from "../../../shared_components/buttons/close_button/CloseButton";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType,
} from "../../../shared_components/buttons/standard_button/StandardButton";
import ModalWindow from "../../../shared_components/modal_window/ModalWindow";
import { logoutUser } from "../../../../redux/user_info_reducer/UserInfoReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import VerCMS from "../../../shared_components/version_cms/VerCMS";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePopup = (props: ProfilePopupProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ModalWindow isOpen={props.isOpen} onClose={props.onClose}>
      <div className="edit-order__wrapper edit-order__wrapper-profile">
        <div className={"header-profile"}>
          <div className={"desktop-h2"}>Ваш профиль CMS</div>
          <div style={{ marginLeft: "12px" }}>
            <CloseButton
              size={CloseButtonSize.BIG}
              onClickAction={() => props.onClose()}
              defaultColor={"transparent"}
            />
          </div>
        </div>

        <div className="desktop-main-text">
          {JSON.parse(localStorage.getItem("MY_USER") || "{}").email}
        </div>

        <StandardButton
          onClickAction={() => {
            dispatch(logoutUser());
            navigate('/authorization')
          }}
          text={"Выйти из аккаунта"}
          color={StandardButtonColor.GRAY}
          iconType={StandardButtonIconType.BLACK_LOGOUT}
          iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
        />
        <VerCMS />
      </div>
    </ModalWindow>
  );
};

export default ProfilePopup;
