import "./PositionCard.css";
import { useMediaQuery } from "react-responsive";
import TagButton, { TagButtonType } from "../buttons/tag_button/TagButton";
import { MediaQueries } from "../../../assets/constants/enums/MediaQueries";
import {
  FoodPositionInfo,
  FoodPositionInOrderInfo,
} from "../../../assets/constants/content_types/FoodInfo";
import { useDispatch } from "react-redux";
import Toggle from "../toggle/Toggle";
import FoodDetailedView from "../food_detailed_view/FoodDetailedView";
import { useState } from "react";

interface PositionCardProps {
  // orderPosition: OrderPosition | FoodPositionInfo;
  position: FoodPositionInOrderInfo | FoodPositionInfo;
  count?: number;
  // showVariationCount?: boolean;
  isMenu?: boolean;
  onDel?: () => void;
  onInc?: () => void;
  onDec?: () => void;
  add?: () =>  void;
  onChangeVariation?: (variationId: number) => void;
}

const PositionCard = (props: PositionCardProps) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });
  const inOrder = props.count && props.count > 0;
  function foodVariationsLength(count: number) {
    if (!props.isMenu) {
      return null;
    }
    if (count > 1) {
      return count + " вариантa";
    } else {
      return count + " вариант";
    }
  }

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(GetFoodPositionThunk());
  // }, [dispatch]);

  const [selectedPosition, setSelectedPosition] = useState<
    FoodPositionInfo | undefined
  >();

  return (
    <div className="edit-order__item">
      {!!selectedPosition ? (
        <FoodDetailedView
          onDel={props.onDel || (() => {})}
          onInc={props.onInc || (() => {})}
          onDec={props.onDec || (() => {})}
          isOpen={!!selectedPosition}
          position={selectedPosition}
          onClose={() => setSelectedPosition(undefined)}
          count={props.count}
          onChangeVariation={props.onChangeVariation}
        />
      ) : null}

      <img
        className="order-img"
        src={props.position.image}
        alt={props.position.name}
        onClick={() => {
          setSelectedPosition(props.position);
        }}
      />
      <div className="edit-order__item-cont">
        <div
          className="edit-order__item-text"
          onClick={() => {
            setSelectedPosition(props.position);
          }}
        >
          <span className="position-title">
            {props.position.name}
            {props.position.selectedVariationType !== "STANDARD" && props.position.selectedVariationName
              ? `(${props.position.selectedVariationName})`
              : ""}
          </span>
          <div className="edit-order__item-info subtext">
            <div className="no-wrap">{props.position.menuSectionTags.join(', ')}</div>
            <div>
              <div>
                {foodVariationsLength(props.position.foodVariations.length)}
              </div>
              <div>
                {(props.position as any)?.price || props.position.foodVariations[0].price} ₽{" "}
                {props.count && props.count > 1
                  ? `* ${props.count} шт. = ${
                      ((props.position as any)?.price || props.position.foodVariations[0].price) * props.count
                    } ₽`
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="edit-order__item-btns">
          {inOrder ? (
            <TagButton
              onClickAction={props.onDel || (() => {})}
              isActive={false}
              text={"Убрать"}
              withCross={true}
              type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
              fullWidth={isMobile}
            />
          ) : null}
          {!props.isMenu ? (
            <TagButton
              onClickAction={
              (inOrder ? props.onInc : props.add) || (() => {})
              }
              isActive={false}
              text={"+1"}
              type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
            />
          ) : (
            <Toggle
              value={false}
              onChange={() => {}}
            />
          )}
          {inOrder ? (
            <TagButton
              onClickAction={props.onDec || (() => {})}
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
