import "./Order.css";
import "../../../../assets/styles/fonts.css";
import { useState } from "react";
import EditOrder from "../edit_order/EditOrder";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType,
} from "../../../shared_components/buttons/standard_button/StandardButton";
import Status from "../status/Status";
import { Order, OrderStatus } from "../../../../redux/order_reduer/types";
import Prompt from "../../../shared_components/prompt/Prompt";
import { useAppDispatch } from "../../../../hooks/redux";
import { DeleteOrderItemThunk } from "../../../../redux/order_reduer/thunks";
import { FoodPositionInfo } from "../../../../assets/constants/content_types/FoodInfo";

interface OrderProps {
  order: Order;
  suggestedPositions: FoodPositionInfo[];
}

const OrderItem = (props: OrderProps) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPromptOpen, setPromptOpen] = useState(false);

  const dispatch = useAppDispatch();

  // console.log("status:", props.order.status);

  return (
    <div className="order">
      <EditOrder
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        order={props.order}
        suggestedPositions={props.suggestedPositions}
      />

      <div className="order__top f-8">
        <div onClick={() => setPopupOpen(true)} className="order__title">
          <span>Заказ #{props.order.id}</span>
          <span>{`${props.order.date.split('T')[1].split(':').slice(0, 2).join(':')}`}</span>
          {/* <span>16:45</span> */}
          {/* <span>22.03.2024</span> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
          >
            <path
              d="M1 11L5.29289 6.70711C5.68342 6.31658 5.68342 5.68342 5.29289 5.29289L1 1"
              stroke="#C6C9D1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Status status={props.order.status} />
      </div>
      <div className="order__info">
        <div className="order__table">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.9091 20.0716L5.09133 16.6561C0.272075 10.8146 4.42717 2 12.0001 2C19.5729 2 23.728 10.8146 18.9088 16.6561L16.091 20.0716C15.0835 21.2927 13.5832 22 12.0001 22C10.4169 22 8.91657 21.2928 7.9091 20.0716Z"
              stroke="#2C2D2E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11Z"
              stroke="#2C2D2E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="main-text">Стол {props.order.table}</div>
        </div>
        <div className="order__name-client">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z"
              stroke="#2C2D2E"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10Z"
              stroke="#2C2D2E"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6.35022 19.5C7.65441 17.9502 9.60149 17 11.7201 17H12.2798C14.3984 17 16.3455 17.9502 17.6497 19.5"
              stroke="#2C2D2E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="main-text">{props.order.name}</div>
        </div>
      </div>
      <div className="order__positions">
        {props.order.positions.map((el) => (
          <div className="order__position tags-text">
            {el.position.name}
            {(el.position.selectedVariationType !== 'STANDARD' && el.position.selectedVariationName) ? `(${el.position.selectedVariationName})` : ''}
            {el.count > 1 ? `/${el.count}шт.` : null}
          </div>
        ))}
      </div>
      <div className="order__comments">
        <div className="subtext">Комментарий:</div>
        <div className="subtext">{props.order.comment}</div>
      </div>
      <div className="order__sum h4">
        <span>Сумма</span>
        <span>{props.order.sum}</span>
        <span>₽</span>
      </div>

      {props.order.status === "Создан" ? (
        <div className="f-8 order__btns">
          <StandardButton
            className="order__btn"
            onClickAction={() => setPromptOpen(true)}
            text={"Отменить"}
            color={StandardButtonColor.GRAY}
            iconType={StandardButtonIconType.NO_ICON}
            iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
            notFullWidth={true}
          />
          <Prompt
            isOpen={isPromptOpen}
            onClose={() => setPromptOpen(false)}
            onConfirm={() => dispatch(DeleteOrderItemThunk(props.order.id))}
            title={"Отменить заказ?"}
            subtitle={`После отмены вернуть заказ будет невозможно. Гостю понадобится собирать его заново`}
            twoBtn={true}
            titleGRAYbtn="Да, отменить"
            titleGREENbtn="Пока оставить"
          />
          <StandardButton
            className="order__btn"
            onClickAction={() => setPopupOpen(true)}
            text={"Изменить заказ"}
            color={StandardButtonColor.GRAY}
            iconType={StandardButtonIconType.NO_ICON}
            iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
            notFullWidth={true}
          />
          <StandardButton
            className="order__btn"
            onClickAction={() => setPopupOpen(true)}
            text={"Принять заказ"}
            color={StandardButtonColor.GREEN}
            iconType={StandardButtonIconType.NO_ICON}
            iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
            notFullWidth={true}
          />
        </div>
      ) : null}
    </div>
  );
};

export default OrderItem;
