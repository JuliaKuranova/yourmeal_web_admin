import "./FoodDetailedView.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Sheet from "react-modal-sheet";
import CloseButton, {
  CloseButtonSize,
} from "../buttons/close_button/CloseButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/ReduxStore";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType,
} from "../buttons/standard_button/StandardButton";
import { useLocation, useNavigate } from "react-router-dom";
import InfoValue from "./info_value/InfoValue";
import TagButton, { TagButtonType } from "../buttons/tag_button/TagButton";
import OrderButton from "./order_button/OrderButton";
import OrderWarning, { OrderWarningType } from "./order_warning/OrderWarning";
import { useMediaQuery } from "react-responsive";
import { MediaQueries } from "../../../assets/constants/enums/MediaQueries";
import {
  FoodPositionInOrderInfo,
  FoodPositionInfo,
  FoodVariation,
} from "../../../assets/constants/content_types/FoodInfo";
import {
  checkFoodRestaurantBeforeAdding,
  getProductCountInOrder,
} from "../../../redux/current_order_reducer/OrderOperations";
import { clearDisplayedFood } from "../../../redux/displayed_food_reducer/DisplayedFoodReducer";
import OrderSquareFloatingButton, {
  OrderSquareFloatingButtonType,
} from "../buttons/order_button/OrderSquareFloatingButton";
import RadioButton from "../buttons/radio_button/RadioButton";
import { OrderStatus } from "../../../assets/constants/content_types/OrderStatus";
import {
  clearAndStartNewOrder,
  decrementOrderPositionCount,
  incrementOrderPositionCount,
} from "../../../redux/current_order_reducer/CurrentOrderReducer";
import { RoutePaths } from "../../../assets/constants/enums/RoutePaths";

interface FoodDetailedViewProps {
  isOpen: boolean;
  onClose: () => void;
  position: FoodPositionInOrderInfo | FoodPositionInfo;
  count?: number;
  onDel: () => void;
  onInc: () => void;
  onDec: () => void;
  onChangeVariation?: (variationId: number) => void;
}

const FoodDetailedView = (props: FoodDetailedViewProps) => {
  // service hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: MediaQueries.BIG_MOBILE });

  // variation state
  const [selectedFoodVariation, setSelectedFoodVariation] =
    useState<FoodVariation>(
      props.position.foodVariations.find(
        (v) => v.variationId == (props.position as any)?.selectedVariationId
      ) || props.position.foodVariations[0]
    );

  console.log("selected var", selectedFoodVariation);

  const orderState = useSelector((state: RootState) => state.order.orderState);
  const orderStatus = useSelector(
    (state: RootState) => state.order.orderStatus
  );
  const userState = useSelector((state: RootState) => state.userInfo.userInfo);

  // order/restaurant warning
  const [orderWarningState, setOrderWarningState] = useState({
    isShown: false,
    type: OrderWarningType.UNCOMPLETED_ORDER,
  });
  const setOrderWarningStateProp = useCallback(
    (isShown: boolean, type: OrderWarningType) => {
      setOrderWarningState({ type, isShown });
    },
    [setOrderWarningState]
  );

  useEffect(() => {
    dispatch(clearDisplayedFood());
  }, [location?.pathname]);

  const onClose = () => {
    const newVarId = Number(selectedFoodVariation.variationId);
    const f = props.onChangeVariation || (() => {});
    console.log(newVarId)
    f(newVarId)
    props.onClose()
  }

  const renderMobile = () => {
    return (
      <div>
        {props.position !== undefined && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
              zIndex: 10,
            }}
            onClick={(e) => {
              e.preventDefault();
              dispatch(clearDisplayedFood());
            }}
          />
        )}
        <Sheet
          layoutScroll={false}
          isOpen={props.position !== undefined}
          onClose={onClose}
          detent={"full-height"}
          snapPoints={[Math.min(window.innerHeight - 16, 800), 0]}
        >
          <Sheet.Container>
            <Sheet.Header disableDrag={false} />
            <Sheet.Content disableDrag={true}>
              {props.position && selectedFoodVariation && (
                <div
                  className={"food-detailed-wrapper"}
                  style={{
                    height: `${Math.min(window.innerHeight - 40, 800 - 24)}px`,
                    maxHeight: `${Math.min(
                      window.innerHeight - 40,
                      800 - 24
                    )}px`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "16px",
                      zIndex: 99999999,
                    }}
                  >
                    <CloseButton
                      size={CloseButtonSize.MEDIUM}
                      onClickAction={onClose}
                      defaultColor={"white"}
                    />
                  </div>
                  <OrderSquareFloatingButton
                    type={OrderSquareFloatingButtonType.ON_FOOD_POPUP}
                  />
                  <div
                    className={"food-detailed-absolute-wrapper"}
                    style={{
                      height: `${Math.min(window.innerHeight - 16, 800)}px`,
                      maxHeight: `${Math.min(
                        window.innerHeight - 40,
                        800 - 24
                      )}px`,
                    }}
                  >
                    <img
                      src={props.position.image}
                      alt={"food-img"}
                      style={{
                        width: `${window.innerWidth}px`,
                        aspectRatio: 1,
                      }}
                    />
                    <div
                      className={"detailed-food-info-wrapper animation-02s-all"}
                    >
                      <div className={"mobile-h2 text-primary"}>
                        {props.position.name}
                      </div>
                      {props.position &&
                        props.position?.foodVariations?.length > 1 && (
                          <div className={"food-variants-wrapper"}>
                            {props.position?.foodVariations?.map((fv) => (
                              <RadioButton
                                key={`radio-btn${fv?.variationId}`}
                                onClickAction={() =>
                                  setSelectedFoodVariation(fv)
                                }
                                name={fv?.variationName}
                                isSelected={
                                  fv?.variationId ===
                                  selectedFoodVariation?.variationId
                                }
                              />
                            ))}
                          </div>
                        )}
                      <div className={"price-and-diet-tags-wrapper"}>
                        <div className={"price-and-weight-wrapper"}>
                          <div className={"mobile-h3 text-primary"}>
                            {selectedFoodVariation.price} ₽
                          </div>
                          <div className={"mobile-h3 text-secondary"}>
                            {selectedFoodVariation.weight} г
                          </div>
                        </div>
                        {selectedFoodVariation.allowedDietsTags?.length &&
                        selectedFoodVariation.restrictedAllergyTags?.length ? (
                          <div className={"diet-tags-wrapper-desktop"}>
                            {selectedFoodVariation.allowedDietsTags?.map(
                              (t) => (
                                <TagButton
                                  key={`diet-tag-${t}`}
                                  onClickAction={() => true}
                                  isActive={false}
                                  text={t}
                                  type={TagButtonType.DESKTOP}
                                  disabled={true}
                                />
                              )
                            )}
                            {selectedFoodVariation.restrictedAllergyTags?.map(
                              (t) => (
                                <TagButton
                                  key={`diet-tag-${t}`}
                                  onClickAction={() => true}
                                  isActive={false}
                                  text={t}
                                  type={TagButtonType.DESKTOP}
                                  disabled={true}
                                />
                              )
                            )}
                          </div>
                        ) : null}
                      </div>

                      <div className={"food-all-info-wrapper"}>
                        <div
                          className={"mobile-subtext text-secondary"}
                          style={{ textAlign: "left" }}
                        >
                          Состав: {selectedFoodVariation.ingredients}
                        </div>
                        <div
                          className={"mobile-subtext text-secondary"}
                          style={{ textAlign: "left" }}
                          dangerouslySetInnerHTML={{
                            __html: `КБЖУ на 100г: ${selectedFoodVariation.caloriesHundred} ккал, 
                            ${selectedFoodVariation.proteinsHundred} гр.,
                            ${selectedFoodVariation.fatsHundred} гр., 
                            ${selectedFoodVariation.carbohydratesHundred}, гр.`,
                          }}
                        />
                        <div className={"food-tags-section-wrapper"}>
                          <div
                            className={"mobile-subtext text-secondary"}
                            style={{ textAlign: "left" }}
                          >
                            Всего в блюде:
                          </div>
                          <div className={"food-tags-wrapper"}>
                            <InfoValue
                              value={selectedFoodVariation.calories}
                              measure={"ккал"}
                            />
                            <InfoValue
                              value={selectedFoodVariation.proteins}
                              measure={"белки"}
                              valueSuffix={"г"}
                            />
                            <InfoValue
                              value={selectedFoodVariation.fats}
                              measure={"жиры"}
                              valueSuffix={"г"}
                            />
                            <InfoValue
                              value={selectedFoodVariation.carbohydrates}
                              measure={"углеводы"}
                              valueSuffix={"г"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={"animation-02s-all"}
                      style={{
                        minHeight: props.count === 0 ? "78px" : "132px",
                      }}
                    />
                  </div>
                  <div className={"btns-wrapper"}>
                    <div
                      className={"add-more-wrapper animation-02s-all"}
                      style={{
                        maxHeight: props.count === 0 ? "0px" : "48px",
                        marginBottom: props.count === 0 ? "0px" : "8px",
                      }}
                    >
                      <StandardButton
                        onClickAction={() => {
                          if (props.count === 1) {
                            props.onDel();
                          } else {
                            props.onDec();
                          }
                          // if (
                          //   orderStatus !== OrderStatus.PREPARING &&
                          //   orderStatus
                          // ) {
                          //   setOrderWarningState({
                          //     isShown: true,
                          //     type: OrderWarningType.UNCOMPLETED_ORDER,
                          //   });
                          // } else {
                            // dispatch(
                            //   decrementOrderPositionCount({
                            //     ...props.position,
                            //     selectedVariationId:
                            //       selectedFoodVariation?.variationId,
                            //   })
                            // );
                          // }
                        }}
                        text={
                          props.count === 1 ? "Убрать" : "Убрать одну порцию"
                        }
                        color={StandardButtonColor.GRAY}
                        iconType={StandardButtonIconType.NO_ICON}
                        iconPosition={StandardButtonIconPosition.AFTER_TEXT}
                      />
                    </div>
                    {props.count === 0 ? (
                      <StandardButton
                        onClickAction={() => {
                          if (userState?.bearerToken !== "") {
                            if (
                              orderStatus !== OrderStatus.PREPARING &&
                              orderStatus
                            ) {
                              setOrderWarningState({
                                isShown: true,
                                type: OrderWarningType.UNCOMPLETED_ORDER,
                              });
                            } else if (
                              checkFoodRestaurantBeforeAdding(
                                orderState,
                                props.position?.restaurantId
                              )
                            ) {
                              dispatch(
                                incrementOrderPositionCount({
                                  ...props.position,
                                  selectedVariationId:
                                    selectedFoodVariation?.variationId,
                                })
                              );
                            } else {
                              setOrderWarningState({
                                isShown: true,
                                type: OrderWarningType.DIFFERENT_RESTAURANT,
                              });
                            }
                          } else {
                            navigate(RoutePaths.LOGIN);
                          }
                        }}
                        text={"Добавить в заказ"}
                        color={StandardButtonColor.GREEN}
                        iconType={StandardButtonIconType.WHITE_PLUS}
                        iconPosition={StandardButtonIconPosition.AFTER_TEXT}
                      />
                    ) : (
                      <>
                        <OrderButton
                          onClickAction={() => {
                            if (
                              orderStatus !== OrderStatus.PREPARING &&
                              orderStatus
                            ) {
                              setOrderWarningState({
                                isShown: true,
                                type: OrderWarningType.UNCOMPLETED_ORDER,
                              });
                            } else {
                              props.onInc();
                              // dispatch(
                              //   incrementOrderPositionCount({
                              //     ...props.position,
                              //     selectedVariationId:
                              //       selectedFoodVariation?.variationId,
                              //   })
                              // );
                            }
                          }}
                          productCount={props.count || 0}
                        />
                      </>
                    )}
                    <div
                      className={"bottom-grad"}
                      style={{ width: window.innerWidth - 32 }}
                    />
                  </div>
                  <OrderWarning
                    orderWarningType={orderWarningState.type}
                    isOpened={orderWarningState.isShown}
                    setOpened={setOrderWarningStateProp}
                    onConfirmAction={() => {
                      if (
                        orderWarningState.type ===
                        OrderWarningType.DIFFERENT_RESTAURANT
                      ) {
                        // dispatch(
                        //   clearAndStartNewOrder({
                        //     ...props.position,
                        //     selectedVariationId:
                        //       selectedFoodVariation?.variationId,
                        //   })
                        // );
                      } else {
                        navigate(RoutePaths.ORDERS);
                      }
                    }}
                  />
                </div>
              )}
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      </div>
    );
  };

  const renderDesktop = () => {
    return (
      // <ModalWindow isOpen={props.isOpen} onClose={props.onClose}>
      <div
        className={`food-detailed-absolute-wrapper-desktop ${
          props.isOpen && "open"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* {selectedFoodVariation && ( */}

        {/* <div className="edit-order__wrapper"> */}
        <div
          className={"food-detailed-wrapper-desktop"}
          style={{
            width: Math.min(window.innerWidth - 200, 1168),
            maxHeight: window.innerHeight - 100,
          }}
          onClick={(e) => e.preventDefault()}
        >
          <img
            src={props.position.image}
            alt={"food-img"}
            style={{
              width: `${Math.min((window.innerWidth - 200 - 48) / 3, 360)}px`,
              aspectRatio: 1,
              borderRadius: "16px",
            }}
          />
          <div
            className={"food-info-wrapper-desktop"}
            style={{
              width: `${Math.min(
                ((window.innerWidth - 200 - 48) / 3) * 2,
                720
              )}px`,
            }}
          >
            <div className={"header-and-close-wrapper"}>
              <div className={"header desktop-h2"}>{props.position.name}</div>
              <div style={{ marginLeft: "12px" }}>
                <CloseButton
                  size={CloseButtonSize.BIG}
                  onClickAction={onClose}
                  defaultColor={"transparent"}
                />
              </div>
            </div>
            {props.position && props.position?.foodVariations?.length > 1 && (
              <div className={"food-variants-wrapper-desktop"}>
                {props.position?.foodVariations?.map((fv) => (
                  <RadioButton
                    key={`radio-btn${fv?.variationId}`}
                    onClickAction={() => {
                      setSelectedFoodVariation(fv)
                    }}
                    name={fv?.variationName}
                    isSelected={
                      fv?.variationId == selectedFoodVariation.variationId
                    }
                  />
                ))}
              </div>
            )}
            <div className={"price-and-weight-wrapper-desktop"}>
              <div className={"desktop-h3 text-primary"}>
                {selectedFoodVariation.price} ₽
              </div>
              <div className={"desktop-h3 text-secondary"}>
                {selectedFoodVariation.weight} г
              </div>
            </div>

            {selectedFoodVariation.allowedDietsTags?.length ||
            selectedFoodVariation.restrictedAllergyTags?.length ? (
              <div className={"diet-tags-wrapper-desktop"}>
                {selectedFoodVariation.allowedDietsTags?.map((t) => (
                  <TagButton
                    key={`diet-tag-${t}`}
                    onClickAction={() => true}
                    isActive={false}
                    text={t}
                    type={TagButtonType.DESKTOP}
                    disabled={true}
                  />
                ))}
                {selectedFoodVariation.restrictedAllergyTags?.map((t) => (
                  <TagButton
                    key={`diet-tag-${t}`}
                    onClickAction={() => true}
                    isActive={false}
                    text={t}
                    type={TagButtonType.DESKTOP}
                    disabled={true}
                  />
                ))}
              </div>
            ) : null}

            <div className={"ingr-wrapper-desktop"}>
              <div
                className={"desktop-subtext text-secondary"}
                style={{ textAlign: "left" }}
              >
                Состав: {selectedFoodVariation.ingredients}
              </div>
              <div
                className={"desktop-subtext text-secondary"}
                style={{ textAlign: "left" }}
                dangerouslySetInnerHTML={{
                  __html: `КБЖУ на 100г: ${selectedFoodVariation.caloriesHundred} ккал, 
                    ${selectedFoodVariation.proteinsHundred} гр.,
                    ${selectedFoodVariation.fatsHundred} гр., 
                    ${selectedFoodVariation.carbohydratesHundred}, гр.`,
                }}
              />
            </div>
            <div className={"ingr-wrapper-desktop"}>
              <div
                className={"desktop-subtext text-secondary"}
                style={{ textAlign: "left" }}
              >
                Всего в блюде:
              </div>
              <div className={"food-tags-wrapper-desktop"}>
                <InfoValue
                  value={selectedFoodVariation.calories}
                  measure={"ккал"}
                  notFullWidth
                />
                <InfoValue
                  value={selectedFoodVariation.proteins}
                  measure={"белки"}
                  valueSuffix={"г"}
                  notFullWidth
                />
                <InfoValue
                  value={selectedFoodVariation.fats}
                  measure={"жиры"}
                  valueSuffix={"г"}
                  notFullWidth
                />
                <InfoValue
                  value={selectedFoodVariation.carbohydrates}
                  measure={"углеводы"}
                  valueSuffix={"г"}
                  notFullWidth
                />
              </div>
            </div>
            {props.position && (
              <div className={"food-desktop-btns-wrapper"}>
                {props.count && (
                  <div>
                    <StandardButton
                      onClickAction={() => {
                        if (props.count === 1) {
                          props.onDel();
                        } else {
                          props.onDec();
                        }
                        // if (
                        //   orderStatus !== OrderStatus.PREPARING &&
                        //   orderStatus
                        // ) {
                        //   setOrderWarningState({
                        //     isShown: true,
                        //     type: OrderWarningType.UNCOMPLETED_ORDER,
                        //   });
                        // } else {
                        // dispatch(
                        //   decrementOrderPositionCount({
                        //     ...props.position,
                        //     selectedVariationId:
                        //       selectedFoodVariation?.variationId,
                        //   })
                        // );
                        // }
                      }}
                      text={props.count === 1 ? "Убрать" : "Убрать одну порцию"}
                      color={StandardButtonColor.GRAY}
                      iconType={StandardButtonIconType.NO_ICON}
                      iconPosition={StandardButtonIconPosition.AFTER_TEXT}
                    />
                  </div>
                )}
                {props.count === 0 ? (
                  <div>
                    <StandardButton
                      onClickAction={() => {
                        if (userState?.bearerToken !== "") {
                          if (
                            orderStatus !== OrderStatus.PREPARING &&
                            orderStatus
                          ) {
                            setOrderWarningState({
                              isShown: true,
                              type: OrderWarningType.UNCOMPLETED_ORDER,
                            });
                          } else if (
                            checkFoodRestaurantBeforeAdding(
                              orderState,
                              props.position?.restaurantId
                            )
                          ) {
                            dispatch(
                              incrementOrderPositionCount({
                                ...props.position,
                                selectedVariationId:
                                  selectedFoodVariation?.variationId,
                              })
                            );
                          } else {
                            setOrderWarningState({
                              isShown: true,
                              type: OrderWarningType.DIFFERENT_RESTAURANT,
                            });
                          }
                        } else {
                          navigate(RoutePaths.LOGIN);
                        }
                      }}
                      text={"Добавить в заказ"}
                      color={StandardButtonColor.GREEN}
                      iconType={StandardButtonIconType.WHITE_PLUS}
                      iconPosition={StandardButtonIconPosition.AFTER_TEXT}
                    />
                  </div>
                ) : (
                  <div>
                    <OrderButton
                      onClickAction={() => {
                        if (
                          orderStatus !== OrderStatus.PREPARING &&
                          orderStatus
                        ) {
                          setOrderWarningState({
                            isShown: true,
                            type: OrderWarningType.UNCOMPLETED_ORDER,
                          });
                        } else {
                          props.onInc();
                          // dispatch(
                          //   incrementOrderPositionCount({
                          //     ...props.position,
                          //     selectedVariationId:
                          //       selectedFoodVariation?.variationId,
                          //   })
                          // );
                        }
                      }}
                      productCount={props.count || 0}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {props.position && (
            <OrderWarning
              orderWarningType={orderWarningState.type}
              isOpened={orderWarningState.isShown}
              setOpened={setOrderWarningStateProp}
              onConfirmAction={() => {
                if (
                  orderWarningState.type ===
                  OrderWarningType.DIFFERENT_RESTAURANT
                ) {
                  dispatch(
                    clearAndStartNewOrder({
                      ...props.position,
                      selectedVariationId: selectedFoodVariation?.variationId,
                    })
                  );
                } else {
                  navigate(RoutePaths.ORDERS);
                }
              }}
            />
          )}
        </div>
        {/* </div> */}

        {/* )} */}
      </div>
      // </ModalWindow>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};

export default FoodDetailedView;
