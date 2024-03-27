import "./Prompt.css";
import Sheet from "react-modal-sheet";
import { useDispatch } from "react-redux";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType,
} from "../buttons/standard_button/StandardButton";
import {
  ProfileBottomSheetType,
  hideProfileSheet,
} from "../../../redux/profile_bottom_sheet_reducer/ProfileBottomSheetReducer";
import { useMediaQuery } from "react-responsive";
import { MediaQueries } from "../../../assets/constants/enums/MediaQueries";
import CloseButton, {
  CloseButtonSize,
} from "../buttons/close_button/CloseButton";
import { RootState } from "../../../redux/ReduxStore";
import { useSelector } from "react-redux";
import { useEffect } from "react";

interface PromptProps {
  isOpen: boolean;
  onClose: () => void;
}

const Prompt = (props: PromptProps): JSX.Element => {
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });
  const dispatch = useDispatch();
  //   const greetingState = useSelector(
  //     (state: RootState) => state.profileBottomSheet
  //   );

  useEffect(() => {
    if (props.isOpen) {
      document.body.classList.add('hidden');
    } else {
      document.body.classList.remove('hidden');
    }
  }, [props.isOpen]);

  const renderMobile = () => {
    return (
      <div>
        {props.isOpen !== false && (
          <div
            style={{ position: 'fixed', top: 0, left: 0, width: window.innerWidth, height: window.innerHeight, zIndex: 10 }}
            onClick={(e) => {
              e.preventDefault()
              props.onClose()
            }}
          />
        )}
        <Sheet
          layoutScroll={false}
          isOpen={props.isOpen}
          onClose={props.onClose}
          detent={"content-height"}
          snapPoints={[500, 0]}
        >
          <Sheet.Container>
            <Sheet.Header disableDrag={false}/>
            <Sheet.Content disableDrag={true}>
              <div className={"profile-sheet-wrapper"}>
                <div className={"greetings-sheet-wrapper prompt-wrapper"}>
                  <div className={"mobile-h2"}>
                    Редактирование заказа
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: "8px",
                    }}
                  >
                    <div className="mobile-main-text gray-sec">
                      Вы можете нажать на блюдо, чтоб открыть его конфигурацию
                      и подробную информацию. Так вы можете добавить разные
                      варианты одной позиции. По умолчанию в списке показывается
                      первый созданный в системе вариант.
                    </div>
                  </div>
                  <div className={"btns-wrapper"}>
                    <StandardButton
                      onClickAction={() => props.onClose()}
                      text={"Закрыть подсказку"}
                      color={StandardButtonColor.GREEN}
                      iconType={StandardButtonIconType.NO_ICON}
                      iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                    />
                  </div>
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      </div>
    );
  };

  const renderDesktop = () => {
    return (
      <div
        className={`profile-modal-wrapper-desktop ${
          props.isOpen ? "open" : ""
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            props.onClose();
          }
        }}
      >
        <div
          className={"profile-modal-desktop"}
          style={{
            width: Math.min(window.innerWidth - 200, 784),
            maxHeight: window.innerHeight - 100,
          }}
          onClick={(e) => e.preventDefault()}
        >
          <div className={"header-and-close-wrapper"}>
            <div className={"desktop-h2"}>Редактирование заказа</div>
            <div style={{ marginLeft: "12px" }}>
              <CloseButton
                onClickAction={() => {
                  props.onClose();
                }}
                size={CloseButtonSize.BIG}
                defaultColor={"transparent"}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "8px",
            }}
          >
            <div className={"desktop-main-text text-secondary btn-prompt"}>
              Вы можете нажать на блюдо, чтоб открыть его конфигурацию и
              подробную информацию. Так вы можете добавить разные варианты одной
              позиции. По&nbsp;умолчанию в списке показывается первый созданный в
              системе вариант.
            </div>
          </div>
          <div className={"profile-modal-first-btns-wrapper"}>
            <StandardButton
              onClickAction={() => {
                props.onClose();
              }}
              text={"Закрыть подсказку"}
              color={StandardButtonColor.GREEN}
              iconType={StandardButtonIconType.NO_ICON}
              iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
            />
          </div>
        </div>
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};

export default Prompt;
