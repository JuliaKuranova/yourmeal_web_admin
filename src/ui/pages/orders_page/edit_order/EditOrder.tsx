import "./EditOrder.css";
import FriesImage from "../../../../assets/images/Fries-image.png";
import TagButton, {
  TagButtonType,
} from "../../../shared_components/buttons/tag_button/TagButton";
import { MediaQueries } from "../../../../assets/constants/enums/MediaQueries";
import { useMediaQuery } from "react-responsive";
import SearchInput from "../../../shared_components/inputs/search_input/SearchInput";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType,
} from "../../../shared_components/buttons/standard_button/StandardButton";
import CloseButton, {
  CloseButtonSize,
} from "../../../shared_components/buttons/close_button/CloseButton";
import ModalWindow from "../../../shared_components/modal_window/ModalWindow";
import PositionCard from "../../../shared_components/position_card/PositionCard";
import { mockFood3 } from "../../restaurant_page/MockRestaurantPageData";
import Prompt from "../../../shared_components/prompt/Prompt";
import { useEffect, useState } from "react";
import PromptButton from "../../../shared_components/buttons/prompt_button/PromptButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/ReduxStore";

interface EditOrderProps {
  isOpen: boolean;
  onClose: () => void;
  // isPositionOpen: boolean;
}

const EditOrder = (props: EditOrderProps) => {
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });
  const order = useSelector((state: RootState) => state.order);

  const [isPromptOpen, setPromptOpen] = useState(false);

  useEffect(() => {
    if (props.isOpen) {
      document.body.classList.add('hidden');
    } else {
      document.body.classList.remove('hidden');
    }
  }, [props.isOpen]);

  return (
    <ModalWindow isOpen={props.isOpen}>
      <div className="edit-order__wrapper">
        <div className="edit-order__top">
          <div className="h2">
            <span>Заказ</span>
            <span>#1649</span>
            <span>16:45</span>
            <span>22.03.2024</span>
          </div>
          <div onClick={props.onClose} className="edit-order__close-btn">
            <CloseButton
              size={CloseButtonSize.BIG}
              onClickAction={() => {}}
              defaultColor={"transparent"}
            />
          </div>
        </div>

        <div className="edit-order__section">
          <div className="order__title">
            <span>В заказе:</span>
            <PromptButton onClick={() => setPromptOpen(true)} />
            <Prompt
              isOpen={isPromptOpen}
              onClose={() => setPromptOpen(false)}
            />
          </div>

          <div className="edit-order__items">
            {order.orderState.map((item) => (
              <PositionCard key={item.position.id} orderPosition={item} inOrder={true} />
            ))}
          </div>
        </div>

        <div className="edit-order__section">
          <div className="order__title">
            <span>Можно добавить:</span>
          </div>

          <SearchInput onInputChange={() => true} placeholder={"Блюдо..."} />

          <div className="edit-order__items">
            {order.orderState.map((item) => (
              <PositionCard key={item.position.id} orderPosition={item} inOrder={false} />
            ))}
          </div>
        </div>

        <div className="edit-order__btns" onClick={props.onClose}>
          <div className="first">
            <StandardButton
              onClickAction={() => true}
              text={"Отменить и вернуться"}
              color={StandardButtonColor.GRAY}
              iconType={StandardButtonIconType.NO_ICON}
              iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
              notFullWidth={true}
            />
          </div>
          <div className="last">
            <StandardButton
              onClickAction={() => true}
              text={"Сохранить изменения"}
              color={StandardButtonColor.GREEN}
              iconType={StandardButtonIconType.NO_ICON}
              iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
              notFullWidth={true}
            />
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

export default EditOrder;
