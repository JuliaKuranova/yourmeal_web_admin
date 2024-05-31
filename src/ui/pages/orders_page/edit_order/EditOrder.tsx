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
// import { mockFood1 } from "../../restaurant_page/MockRestaurantPageData";
import Prompt from "../../../shared_components/prompt/Prompt";
import { useEffect, useState } from "react";
import PromptButton from "../../../shared_components/buttons/prompt_button/PromptButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/ReduxStore";
import { Order, UpdateOrderDto } from "../../../../redux/order_reduer/types";
import { useFormik } from "formik";
import {
  FoodPositionInOrderInfo,
  FoodPositionInfo,
  FoodVariation,
} from "../../../../assets/constants/content_types/FoodInfo";
import { useAppDispatch } from "../../../../hooks/redux";
import { UpdateOrderThunk } from "../../../../redux/order_reduer/thunks";

interface EditOrderProps {
  isOpen: boolean;
  onClose: () => void;
  // isPositionOpen: boolean;
  order: Order;
  suggestedPositions: FoodPositionInfo[];
}

const EditOrder = (props: EditOrderProps) => {
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });
  const [isPromptOpen, setPromptOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState('');

  const editForm = useFormik({
    initialValues: {
      selectedPositions: props.order.positions.map((position) => {
        return {
          positionId: position.position.id,
          selectedVariationId: position.position.selectedVariationId,
          count: position.count,
          position: position.position,
        };
      }),
    },
    onSubmit: () => {
      console.log('selected positions', editForm.values.selectedPositions)
      const updateOrderDto: UpdateOrderDto = {
        orderId: props.order.id,
        user: props.order.userId || 1,
        foodPositions: editForm.values.selectedPositions.map((pos): FoodPositionInOrderInfo => {
          return {
            ...pos.position,
            selectedVariationId: pos.selectedVariationId,
            count: pos.count
          };
        }),
        orderStatus: props.order.statusId || 1,
        restaurant: props.order.restaurantId || 1,
        table: props.order.table,
        comment: props.order.comment,
      }

      dispatch(UpdateOrderThunk(updateOrderDto));

      props.onClose()
    },
  });

  return (
    <ModalWindow isOpen={props.isOpen} onClose={props.onClose}>
      <div className="edit-order__wrapper">
        <div className="edit-order__items">
          <div className="edit-order__top">
            <div className="h2">
              <span>Заказ #{props.order.id}</span>
              {/* <span>{`${props.order.date.split('T')[0]} ${props.order.date.split('T')[1].split(':').slice(0, 2).join(':')}`}</span> */}
              <span>{`${props.order.date.split('T')[1].split(':').slice(0, 2).join(':')}`}</span>
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
                title={"Редактирование заказа"}
                subtitle={`Вы можете нажать на блюдо, чтоб открыть его конфигурацию и подробную информацию. Так вы можете добавить разные варианты одной позиции. По умолчанию в списке показывается первый созданный в системе вариант.`}
              />
            </div>

            <div className="edit-order__items">
              {editForm.values.selectedPositions.map((position, i) => (
                <PositionCard
                  key={`${position.positionId}-${position.selectedVariationId}`}
                  position={position.position}
                  count={position.count}
                  onChangeVariation={(variationId: number) => {
                    editForm.setFieldValue(
                      `selectedPositions[${i}].selectedVariationId`,
                      variationId
                    )
                  }}
                  onInc={() =>
                    editForm.setFieldValue(
                      `selectedPositions[${i}].count`,
                      position.count + 1
                    )
                  }
                  onDec={() => {
                    if (position.count > 1) {
                      editForm.setFieldValue(
                        `selectedPositions[${i}].count`,
                        position.count - 1
                      );
                    } else {
                      editForm.setFieldValue(
                        "selectedPositions",
                        editForm.values.selectedPositions.filter(
                          (el) =>
                            el.positionId !== position.positionId ||
                            el.selectedVariationId !==
                              position.selectedVariationId
                        )
                      );
                    }
                  }}
                  onDel={() => {
                    // console.log('del pos', position.positionId, position.selectedVariationId)
                    editForm.setFieldValue(
                      "selectedPositions",
                      editForm.values.selectedPositions.filter(
                        (el) =>
                          el.positionId !== position.positionId ||
                          el.selectedVariationId !== position.selectedVariationId
                      )
                    );
                  }}
                />
              ))}
            </div>
          </div>

          <div className="edit-order__section">
            <div className="order__title">
              <span>Можно добавить:</span>
            </div>

            <SearchInput onInputChange={(value) => setSearchString(value)} placeholder={"Блюдо..."} />

            <div className="edit-order__items">
              {props.suggestedPositions.map((position) => {
                const candidate = editForm.values.selectedPositions.find(
                  (selPos) => selPos.positionId == position.id
                );
                return candidate || !position.name.toLowerCase().includes(searchString.toLowerCase()) ? null : (
                  <PositionCard
                    key={position.id}
                    position={position}
                    add={() => {
                      console.log('adding', {
                        positionId: position.id,
                        selectedVariationId: position.foodVariations[0].variationId,
                        count: 1,
                        position: position
                      });
                      editForm.setFieldValue('selectedPositions', [...editForm.values.selectedPositions, {
                        positionId: position.id,
                        selectedVariationId: position.foodVariations[0].variationId,
                        count: 1,
                        position: position
                      }])
                    }}
                  />
                );
              })}
            </div>
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
              // className="x"
              onClickAction={editForm.handleSubmit}
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
