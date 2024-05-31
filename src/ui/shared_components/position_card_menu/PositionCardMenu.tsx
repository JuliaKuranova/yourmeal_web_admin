import "../position_card/PositionCard.css";
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
  addOrderPosition,
  decrementOrderPositionCount,
  incrementOrderPositionCount,
  OrderPosition,
  removeOrderPosition,
} from "../../../redux/current_order_reducer/CurrentOrderReducer";
import Toggle from "../toggle/Toggle";
import PositionEditing from "../position_editing/PositionEditing";
import { useEffect, useState } from "react";
import { RootState } from "../../../redux/ReduxStore";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/redux";
import { GetMenuSectionTagsThunk } from "../../../redux/tags_reducer/thunks";
import {
  ChangeFoodPositionTogglersThunk,
  DeleteFoodPositionThunk,
} from "../../../redux/position_reducer/thunks";

interface PositionCardMenuProps {
  // orderPosition: OrderPosition | FoodPositionInfo;
  position: FoodPositionInfo;
  count?: number;
  // showVariationCount?: boolean;
  isMenu?: boolean;
  isMain?: boolean;
  // valueInput
}

const PositionCardMenu = (props: PositionCardMenuProps) => {
  // console.log('Position card menu')
  const [toggleValue, setToggleValue] = useState(
    props.isMain
      ? props.position.onMain || false
      : props.position.inMenu || false
  );

  const menuSectionTags = useSelector(
    (state: RootState) => state.tags.menuSectionTags
  );
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });
  const inOrder = props.count && props.count > 0;
  const [selectedPosition, setSelectedPosition] = useState<
    FoodPositionInfo | undefined
  >();
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

  useEffect(() => {
    dispatch(GetMenuSectionTagsThunk());
  }, [dispatch]);

  const [isPopupOpen, setPopupOpen] = useState(false);

  // console.log('menuSectionTags', props.position)

  return (
    <div className="edit-order__item">
      {!!selectedPosition ? (
        <PositionEditing
          isOpen={!!selectedPosition}
          position={selectedPosition}
          onClose={() => setSelectedPosition(undefined)}
        />
      ) : null}

      <img
        className="order-img"
        src={props.position.image}
        alt={props.position.name}
        onClick={() => setSelectedPosition(props.position)}
      />
      <div className="edit-order__item-text">
        <div
          className="position-title"
          onClick={() => setSelectedPosition(props.position)}
        >
          {props.position.name}
        </div>

        <div
          className="no-wrap"
          onClick={() => setSelectedPosition(props.position)}
        >
            {`${props.position.groupPosition}`}
            {(props.position.additionalGroup !== "") ? 
            `, ${props.position.additionalGroup}` : null}
        </div>

        <div className="position-menu__info">
          <div
            className="position-menu__info-text"
            onClick={() => setSelectedPosition(props.position)}
          >
            <div className="position-variation">
              {foodVariationsLength(props.position.foodVariations.length)}
            </div>
            <div>
              {props.position.foodVariations[0].price} ₽{" "}
              {props.count && props.count > 1
                ? `* ${props.count} шт. = ${
                    props.position.foodVariations[0].price * props.count
                  } ₽`
                : ""}
            </div>
          </div>
          <div className="toggle-w">
            <div
              className="delete-position-btn"
              onClick={() =>
                dispatch(DeleteFoodPositionThunk(Number(props.position.id)))
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7.83331 7.83325L16.1666 16.1666"
                  stroke="#C6C9D1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.1666 7.83325L7.83331 16.1666"
                  stroke="#C6C9D1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Toggle
              value={toggleValue}
              onChange={(event: any) => {
                setToggleValue((prev) => {
                  dispatch(
                    ChangeFoodPositionTogglersThunk({
                      id: Number(props.position.id),
                      inMenu: !props.isMain ? !prev : undefined,
                      onMain: props.isMain ? !prev : undefined,
                    })
                  );
                  return !prev;
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionCardMenu;
