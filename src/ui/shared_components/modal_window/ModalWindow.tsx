import { useEffect } from "react";
import "./ModalWindow.css";

interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const ModalWindow = (props: ModalWindowProps) => {
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
      console.log(targetEls);
      for (let i = 0; i < targetEls.length - 1; i++) {
        targetEls[i].classList.add("hidden");
      }
      if (targetEls.length) {
        targetEls[targetEls.length - 1].classList.remove("hidden");
      }
    }, 10);
  }, [props.isOpen]);

  return (
    <div 
      className={`madal-window mod ${props.isOpen ? "active-modal" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
        }
      }}
    >
      {props.children}
    </div>
    // <div
    //   className={`profile-modal-wrapper-desktop mod ${
    //     props.isOpen ? "open" : ""
    //   }`}
    //   onClick={(e) => {
    //     if (e.target === e.currentTarget) {
    //       // props.onClose();
    //     }
    //   }}
    // >
    //   {props.children}
    // </div>
  );
};

export default ModalWindow;
