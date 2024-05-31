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
  title: string;
  subtitle: string;
  twoBtn?: boolean;
  titleGRAYbtn?: string;
  titleGREENbtn?: string;
  onConfirm?: () => void;
}

const Prompt = (props: PromptProps): JSX.Element => {
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });
  const dispatch = useDispatch();
  // let twoBtn = false;
  //   const greetingState = useSelector(
  //     (state: RootState) => state.profileBottomSheet
  //   );

  useEffect(() => {
    setTimeout(() => {
      const modals: Element[] = Array.prototype.slice
        .call(document.getElementsByClassName("mod"))
        .filter(
          (el) =>
            el &&
            (el.classList.contains("active-modal") ||
              el.classList.contains("open") ||
              el.classList.contains("op"))
        );
      const targetEls = [document.body, ...modals];
      // console.log(targetEls);
      for (let i = 0; i < targetEls.length - 1; i++) {
        targetEls[i].classList.add("hidden");
      }
      if (targetEls.length) {
        targetEls[targetEls.length - 1].classList.remove("hidden");
      }
    }, 10);
  }, [props.isOpen]);

  const renderMobile = () => {
    return (
      <div className={`mod ${props.isOpen ? "op" : ""}`}>
        {props.isOpen !== false && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: window.innerWidth,
              // height: window.innerHeight,
              bottom: 0,
              zIndex: 10,
              opacity: 1,
              backdropFilter: "blur(1px) opacity(1)",
            }}
            onClick={(e) => {
              e.preventDefault();
              props.onClose();
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
            <Sheet.Header disableDrag={false} />
            <Sheet.Content disableDrag={true}>
              <div className={"profile-sheet-wrapper"}>
                <div className={"greetings-sheet-wrapper prompt-wrapper"}>
                  <div className={"mobile-h2"}>{props.title}</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: "8px",
                    }}
                  >
                    <div className="mobile-main-text gray-text">
                      {props.subtitle}
                    </div>
                  </div>
                  <div className={"btns-wrapper"}>
                    {props.twoBtn ? (
                      <div className="f-8 order__btns">
                        <StandardButton
                          className="order__btn"
                          onClickAction={() => props.onClose()}
                          text={props.titleGRAYbtn || ""}
                          color={StandardButtonColor.GRAY}
                          iconType={StandardButtonIconType.NO_ICON}
                          iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                          notFullWidth={true}
                        />
                        <StandardButton
                          className="order__btn"
                          onClickAction={() => props.onClose()}
                          text={props.titleGREENbtn || ""}
                          color={StandardButtonColor.GREEN}
                          iconType={StandardButtonIconType.NO_ICON}
                          iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                          notFullWidth={true}
                        />
                      </div>
                    ) : (
                      <StandardButton
                        onClickAction={() => props.onClose()}
                        text={"Закрыть подсказку"}
                        color={StandardButtonColor.GREEN}
                        iconType={StandardButtonIconType.NO_ICON}
                        iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                      />
                    )}
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
        className={`profile-modal-wrapper-desktop mod ${
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
            <div className={"desktop-h2"}>{props.title}</div>
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
              {props.subtitle}
            </div>
          </div>

          <div className={"profile-modal-first-btns-wrapper"}>
            {props.twoBtn ? (
              <div className="f-8 order__btns">
                <StandardButton
                  className="order__btn"
                  onClickAction={() => {
                    if (props.onConfirm) {
                      props.onConfirm();
                    }
                    props.onClose();
                  }}
                  text={props.titleGRAYbtn || ""}
                  color={StandardButtonColor.GRAY}
                  iconType={StandardButtonIconType.NO_ICON}
                  iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                  notFullWidth={true}
                />
                <StandardButton
                  className="order__btn"
                  onClickAction={() => props.onClose()}
                  text={props.titleGREENbtn || ""}
                  color={StandardButtonColor.GREEN}
                  iconType={StandardButtonIconType.NO_ICON}
                  iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                  notFullWidth={true}
                />
              </div>
            ) : (
              <StandardButton
                onClickAction={() => props.onClose()}
                text={"Закрыть подсказку"}
                color={StandardButtonColor.GREEN}
                iconType={StandardButtonIconType.NO_ICON}
                iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};

export default Prompt;
