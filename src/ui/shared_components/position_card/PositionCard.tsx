import "./PositionCard.css";
import { useMediaQuery } from "react-responsive";
import TagButton, { TagButtonType } from "../buttons/tag_button/TagButton";
import { MediaQueries } from "../../../assets/constants/enums/MediaQueries";
import {
  FoodPositionInfo,
  FoodPositionInOrderInfo,
} from "../../../assets/constants/content_types/FoodInfo";
import { useDispatch } from "react-redux";
import { setDisplayedFood } from "../../../redux/displayed_food_reducer/DisplayedFoodReducer";
import {
  decrementOrderPositionCount,
  incrementOrderPositionCount,
  OrderPosition,
  removeOrderPosition,
} from "../../../redux/current_order_reducer/CurrentOrderReducer";

interface PositionCardProps {
  orderPosition: OrderPosition;
  inOrder: boolean;
}

const PositionCard = (props: PositionCardProps) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });
  console.log(props.orderPosition);

  return (
    <div className="edit-order__item">
      <img
        className="order-img"
        src={props.orderPosition.position.image}
        alt={props.orderPosition.position.name}
        onClick={() => {
          dispatch(setDisplayedFood(props.orderPosition.position));
        }}
      />
      <div className="edit-order__item-cont">
        <div
          className="edit-order__item-text"
          onClick={() => {
            dispatch(setDisplayedFood(props.orderPosition.position));
          }}
        >
          <div className="edit-order__item-title">
            {props.orderPosition.position.name}
          </div>
          <div className="edit-order__item-info">
            <div className="no-wrap">Основное меню</div>
            <div>{props.orderPosition.position.foodVariations[0].price} ₽</div>
          </div>
        </div>
        <div className="edit-order__item-btns">
          {props.orderPosition.count}
          {props.inOrder ? (
            <TagButton
              onClickAction={() => {
                dispatch(removeOrderPosition(props.orderPosition.position));
              }}
              isActive={false}
              text={"Убрать"}
              withCross={true}
              type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
              fullWidth={isMobile}
            />
          ) : null}
          <TagButton
            onClickAction={() => {
              dispatch(
                incrementOrderPositionCount(props.orderPosition.position)
              );
            }}
            isActive={false}
            text={"+1"}
            type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
          />
          {props.inOrder ? (
            <TagButton
              onClickAction={() => {
                dispatch(
                  decrementOrderPositionCount(props.orderPosition.position)
                );
              }}
              isActive={false}
              text={"-1"}
              type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PositionCard;
