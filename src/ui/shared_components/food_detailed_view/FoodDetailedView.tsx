import './FoodDetailedView.css'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import Sheet from "react-modal-sheet";
import CloseButton, {CloseButtonSize} from "../buttons/close_button/CloseButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/ReduxStore";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType
} from "../buttons/standard_button/StandardButton";
import {useLocation, useNavigate} from "react-router-dom";
import InfoValue from "./info_value/InfoValue";
import TagButton, {TagButtonType} from "../buttons/tag_button/TagButton";
import OrderButton from "./order_button/OrderButton";
import OrderWarning, {OrderWarningType} from "./order_warning/OrderWarning";
import {useMediaQuery} from "react-responsive";
import { MediaQueries } from '../../../assets/constants/enums/MediaQueries';
import { FoodPositionInOrderInfo, FoodVariation } from '../../../assets/constants/content_types/FoodInfo';
import { checkFoodRestaurantBeforeAdding, getProductCountInOrder } from '../../../redux/current_order_reducer/OrderOperations';
import { clearDisplayedFood } from '../../../redux/displayed_food_reducer/DisplayedFoodReducer';
import OrderSquareFloatingButton, { OrderSquareFloatingButtonType } from '../buttons/order_button/OrderSquareFloatingButton';
import RadioButton from '../buttons/radio_button/RadioButton';
import { OrderStatus } from '../../../assets/constants/content_types/OrderStatus';
import { clearAndStartNewOrder, decrementOrderPositionCount, incrementOrderPositionCount } from '../../../redux/current_order_reducer/CurrentOrderReducer';
import { RoutePaths } from '../../../assets/constants/enums/RoutePaths';

const FoodDetailedView: React.FC = () => {
  // service hooks
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE })
  const [resizeTimeouts, setResizeTimeouts] = useState<NodeJS.Timeout[]>([])

  // variation state
  const [selectedFoodVariation, setSelectedFoodVariation] = useState<FoodVariation>()

  // stored states
  const displayedFood = useSelector((state: RootState) => state.displayedFood.food)
  const orderState = useSelector((state: RootState) => state.order.orderState)
  const orderStatus = useSelector((state: RootState) => state.order.orderStatus)
  const userState = useSelector((state: RootState) => state.userInfo.userInfo)
  const countInOrder = useMemo(() => {
    return getProductCountInOrder(orderState, displayedFood?.id, selectedFoodVariation?.variationId)
  }, [orderState, selectedFoodVariation?.variationId, displayedFood?.id])

  // order/restaurant warning
  const [orderWarningState, setOrderWarningState] = useState({
    isShown: false,
    type: OrderWarningType.UNCOMPLETED_ORDER
  });
  const setOrderWarningStateProp = useCallback(
    (isShown: boolean, type: OrderWarningType) => {
      setOrderWarningState({ type, isShown });
    },
    [setOrderWarningState]
  );

  useEffect(() => {
    if (displayedFood && displayedFood?.foodVariations?.length > 0) {
      if ((displayedFood as FoodPositionInOrderInfo)?.selectedVariationId) {
        setSelectedFoodVariation(displayedFood?.foodVariations
          ?.filter(fv => fv?.variationId === (displayedFood as FoodPositionInOrderInfo)?.selectedVariationId)[0]
        )
      } else {
        setSelectedFoodVariation(displayedFood?.foodVariations[0])
      }
    } else {
      dispatch(clearDisplayedFood())
    }
  }, [displayedFood]);

  useEffect(() => {
    const handleResize = () => {
      dispatch(clearDisplayedFood())
    }

    if (displayedFood !== undefined) {
      document.body.classList.add('food-detailed-all-wrapper');
      document.body.classList.add('hidden');
      setResizeTimeouts([...resizeTimeouts, setTimeout(() => {
        if (displayedFood !== undefined) {
          window.addEventListener('resize', handleResize)
        }
      }, 1000)])
    } else {
      document.body.classList.remove('food-detailed-all-wrapper');
      document.body.classList.remove('hidden');
      window.removeEventListener('resize', handleResize);
      resizeTimeouts.forEach(clearTimeout)
    }

    return () => {
      document.body.classList.remove('food-detailed-all-wrapper');
      document.body.classList.remove('hidden');
      window.removeEventListener('resize', handleResize);
      resizeTimeouts.forEach(clearTimeout)
    }
  }, [displayedFood]);

  useEffect(() => {
    dispatch(clearDisplayedFood())
  }, [location?.pathname]);

  const renderMobile = () => {
    return(
      <>
        {displayedFood !== undefined && (
          <div
            style={{ position: 'absolute', top: 0, left: 0, width: window.innerWidth, height: window.innerHeight, zIndex: 10 }}
            onClick={(e) => {
              e.preventDefault()
              dispatch(clearDisplayedFood())
            }}
          />
        )}
        <Sheet
          layoutScroll={false}
          isOpen={displayedFood !== undefined}
          onClose={() => dispatch(clearDisplayedFood())}
          detent={'full-height'}
          snapPoints={[Math.min(window.innerHeight - 16, 800), 0]}
        >
          <Sheet.Container>
            <Sheet.Header disableDrag={false}/>
            <Sheet.Content disableDrag={true}>
              {displayedFood && selectedFoodVariation && (
                <div className={'food-detailed-wrapper'} style={{ height: `${Math.min(window.innerHeight - 40, 800 - 24)}px`, maxHeight: `${Math.min(window.innerHeight - 40, 800 - 24)}px` }}>
                  <div style={{ position: 'absolute', top: '-8px', right: '16px', zIndex: 99999999 }}>
                    <CloseButton
                      size={CloseButtonSize.MEDIUM}
                      onClickAction={() => dispatch(clearDisplayedFood())}
                      defaultColor={'white'}
                    />
                  </div>
                  <OrderSquareFloatingButton type={OrderSquareFloatingButtonType.ON_FOOD_POPUP}/>
                  <div
                    className={'food-detailed-absolute-wrapper'}
                    style={{
                      height: `${Math.min(window.innerHeight - 16, 800)}px`,
                      maxHeight: `${Math.min(window.innerHeight - 40, 800 - 24)}px`,
                    }}
                  >
                    <img
                      src={displayedFood?.image} alt={'food-img'}
                      style={{
                        width: `${window.innerWidth}px`,
                        aspectRatio: 1,
                      }}
                    />
                    <div
                      className={'detailed-food-info-wrapper animation-02s-all'}
                    >
                      <div className={'mobile-h2 text-primary'}>{displayedFood?.name}</div>
                      <div className={'price-and-diet-tags-wrapper'}>
                        <div className={'price-and-weight-wrapper'}>
                          <div className={'mobile-h3 text-primary'}>
                            {selectedFoodVariation.price} ₽
                          </div>
                          <div className={'mobile-h3 text-secondary'}>
                            {selectedFoodVariation.weight} г
                          </div>
                        </div>
                        <div className={'diet-tags-wrapper'}>
                          {selectedFoodVariation.allowedDietsTags?.map(t => (
                            <TagButton
                              key={`diet-tag-${t}`}
                              onClickAction={() => true}
                              isActive={false}
                              text={t}
                              type={TagButtonType.MOBILE}
                              disabled={true}
                            />
                          ))}
                        </div>
                      </div>
                      {displayedFood && displayedFood?.foodVariations?.length > 1 && (
                        <div className={'food-variants-wrapper'}>
                          {displayedFood?.foodVariations?.map(fv => (
                            <RadioButton
                              key={`radio-btn${fv?.variationId}`}
                              onClickAction={() => setSelectedFoodVariation(fv)}
                              name={fv?.variationName}
                              isSelected={fv?.variationId === selectedFoodVariation?.variationId}
                            />
                          ))}
                        </div>
                      )}
                      <div className={'food-all-info-wrapper'}>
                        <div className={'mobile-subtext text-secondary'} style={{ textAlign: 'left'}}>
                          Состав: {selectedFoodVariation.ingredients}
                        </div>
                        <div
                          className={'mobile-subtext text-secondary'} style={{ textAlign: 'left'}}
                          dangerouslySetInnerHTML={{ __html: `${selectedFoodVariation.CFCB}`}}
                        />
                        <div className={'food-tags-section-wrapper'}>
                          <div className={'mobile-subtext text-secondary'} style={{ textAlign: 'left'}}>Всего в блюде:</div>
                          <div className={'food-tags-wrapper'}>
                            <InfoValue value={selectedFoodVariation.calories} measure={'ккал'} />
                            <InfoValue value={selectedFoodVariation.proteins} measure={'белки'} valueSuffix={'г'} />
                            <InfoValue value={selectedFoodVariation.fats} measure={'жиры'} valueSuffix={'г'} />
                            <InfoValue value={selectedFoodVariation.carbohydrates} measure={'углеводы'} valueSuffix={'г'} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={'animation-02s-all'} style={{ minHeight: countInOrder === 0 ? '78px' : '132px'}}/>
                  </div>
                  <div className={'btns-wrapper'}>
                    <div
                      className={'add-more-wrapper animation-02s-all'}
                      style={{ maxHeight: countInOrder === 0 ? '0px' : '48px', marginBottom: countInOrder === 0 ? '0px' : '8px'}}
                    >
                      <StandardButton
                        onClickAction={() => {
                          if ((orderStatus !== OrderStatus.PREPARING) && orderStatus) {
                            setOrderWarningState({isShown: true, type: OrderWarningType.UNCOMPLETED_ORDER })
                          } else {
                            dispatch(decrementOrderPositionCount({
                              ...displayedFood,
                              selectedVariationId: selectedFoodVariation?.variationId,
                            }))
                          }
                        }}
                        text={countInOrder === 1 ? 'Убрать' : 'Убрать одну порцию'}
                        color={StandardButtonColor.GRAY}
                        iconType={StandardButtonIconType.NO_ICON}
                        iconPosition={StandardButtonIconPosition.AFTER_TEXT}
                      />
                    </div>
                    {countInOrder === 0 ? (
                      <StandardButton
                        onClickAction={() => {
                          if (userState?.bearerToken !== '') {
                            if ((orderStatus !== OrderStatus.PREPARING) && orderStatus) {
                              setOrderWarningState({isShown: true, type: OrderWarningType.UNCOMPLETED_ORDER })
                            } else if (checkFoodRestaurantBeforeAdding(orderState, displayedFood?.restaurantId)) {
                              dispatch(incrementOrderPositionCount({
                                ...displayedFood,
                                selectedVariationId: selectedFoodVariation?.variationId,
                              }))
                            } else {
                              setOrderWarningState({isShown: true, type: OrderWarningType.DIFFERENT_RESTAURANT })
                            }
                          } else {
                            navigate(RoutePaths.LOGIN)
                          }
                        }}
                        text={'Добавить в заказ'}
                        color={StandardButtonColor.GREEN}
                        iconType={StandardButtonIconType.WHITE_PLUS}
                        iconPosition={StandardButtonIconPosition.AFTER_TEXT}
                      />
                    ) : (
                      <>
                        <OrderButton
                          onClickAction={() => {
                            if ((orderStatus !== OrderStatus.PREPARING) && orderStatus) {
                              setOrderWarningState({isShown: true, type: OrderWarningType.UNCOMPLETED_ORDER })
                            } else {
                              dispatch(incrementOrderPositionCount({
                                ...displayedFood,
                                selectedVariationId: selectedFoodVariation?.variationId,
                              }))
                            }
                          }}
                          productCount={countInOrder}
                        />
                      </>
                    )}
                    <div className={'bottom-grad'} style={{ width: window.innerWidth - 32}}/>
                  </div>
                  <OrderWarning
                    orderWarningType={orderWarningState.type}
                    isOpened={orderWarningState.isShown}
                    setOpened={setOrderWarningStateProp}
                    onConfirmAction={() => {
                      if (orderWarningState.type === OrderWarningType.DIFFERENT_RESTAURANT) {
                        dispatch(clearAndStartNewOrder({
                          ...displayedFood,
                          selectedVariationId: selectedFoodVariation?.variationId,
                        }))
                      } else {
                        navigate(RoutePaths.ORDERS)
                      }
                    }}
                  />
                </div>
              )}
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop/>
        </Sheet>
      </>
    )
  }

  const renderDesktop = () => {
    return(
      <div
        className={`food-detailed-absolute-wrapper-desktop ${displayedFood !== undefined && 'open'}`}
        onClick={e => {
          if (e.target === e.currentTarget) {
            dispatch(clearDisplayedFood())
          }
        }}
      >
        {selectedFoodVariation && (
          <div
            className={'food-detailed-wrapper-desktop'}
            style={{ width: Math.min(window.innerWidth - 200, 1168), maxHeight: window.innerHeight - 100 }}
            onClick={e => e.preventDefault()}
          >
            <img
              src={displayedFood?.image} alt={'food-img'}
              style={{
                width: `${Math.min((window.innerWidth - 200 - 48) / 3, 360)}px`,
                aspectRatio: 1,
                borderRadius: '16px',
              }}
            />
            <div
              className={'food-info-wrapper-desktop'}
              style={{ width: `${Math.min(((window.innerWidth - 200 - 48) / 3) * 2, 720)}px`}}
            >
              <div className={'header-and-close-wrapper'}>
                <div className={'header desktop-h2'}>
                  {displayedFood?.name}
                </div>
                <div style={{ marginLeft: '12px'}}>
                  <CloseButton
                    size={CloseButtonSize.BIG}
                    onClickAction={() => dispatch(clearDisplayedFood())}
                    defaultColor={'transparent'}
                  />
                </div>
              </div>
              {displayedFood && displayedFood?.foodVariations?.length > 1 && (
                <div className={'food-variants-wrapper-desktop'}>
                  {displayedFood?.foodVariations?.map(fv => (
                    <RadioButton
                      key={`radio-btn${fv?.variationId}`}
                      onClickAction={() => setSelectedFoodVariation(fv)}
                      name={fv?.variationName}
                      isSelected={fv?.variationId === selectedFoodVariation?.variationId}
                    />
                  ))}
                </div>
              )}
              <div className={'price-and-weight-wrapper-desktop'}>
                <div className={'desktop-h3 text-primary'}>
                  {selectedFoodVariation.price} ₽
                </div>
                <div className={'desktop-h3 text-secondary'}>
                  {selectedFoodVariation.weight} г
                </div>
              </div>
              <div className={'diet-tags-wrapper-desktop'}>
                {selectedFoodVariation.allowedDietsTags?.map(t => (
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
              <div className={'ingr-wrapper-desktop'}>
                <div className={'desktop-subtext text-secondary'} style={{ textAlign: 'left'}}>
                  Состав: {selectedFoodVariation.ingredients}
                </div>
                <div
                  className={'desktop-subtext text-secondary'} style={{ textAlign: 'left'}}
                  dangerouslySetInnerHTML={{ __html: `${selectedFoodVariation.CFCB}`}}
                />
              </div>
              <div className={'ingr-wrapper-desktop'}>
                <div className={'desktop-subtext text-secondary'} style={{ textAlign: 'left'}}>Всего в блюде:</div>
                <div className={'food-tags-wrapper-desktop'}>
                  <InfoValue value={selectedFoodVariation.calories} measure={'ккал'} notFullWidth/>
                  <InfoValue value={selectedFoodVariation.proteins} measure={'белки'} valueSuffix={'г'} notFullWidth/>
                  <InfoValue value={selectedFoodVariation.fats} measure={'жиры'} valueSuffix={'г'} notFullWidth/>
                  <InfoValue value={selectedFoodVariation.carbohydrates} measure={'углеводы'} valueSuffix={'г'} notFullWidth/>
                </div>
              </div>
              {displayedFood && (
                <div className={'food-desktop-btns-wrapper'}>
                  {countInOrder > 0 && (
                    <div>
                      <StandardButton
                        onClickAction={() => {
                          if ((orderStatus !== OrderStatus.PREPARING) && orderStatus) {
                            setOrderWarningState({isShown: true, type: OrderWarningType.UNCOMPLETED_ORDER })
                          } else {
                            dispatch(decrementOrderPositionCount({
                              ...displayedFood,
                              selectedVariationId: selectedFoodVariation?.variationId,
                            }))
                          }
                        }}
                        text={countInOrder === 1 ? 'Убрать' : 'Убрать одну порцию'}
                        color={StandardButtonColor.GRAY}
                        iconType={StandardButtonIconType.NO_ICON}
                        iconPosition={StandardButtonIconPosition.AFTER_TEXT}
                      />
                    </div>
                  )}
                  {countInOrder === 0 ? (
                    <div>
                      <StandardButton
                        onClickAction={() => {
                          if (userState?.bearerToken !== '') {
                            if ((orderStatus !== OrderStatus.PREPARING) && orderStatus) {
                              setOrderWarningState({isShown: true, type: OrderWarningType.UNCOMPLETED_ORDER })
                            } else if (checkFoodRestaurantBeforeAdding(orderState, displayedFood?.restaurantId)) {
                              dispatch(incrementOrderPositionCount({
                                ...displayedFood,
                                selectedVariationId: selectedFoodVariation?.variationId,
                              }))
                            } else {
                              setOrderWarningState({isShown: true, type: OrderWarningType.DIFFERENT_RESTAURANT })
                            }
                          } else {
                            navigate(RoutePaths.LOGIN)
                          }
                        }}
                        text={'Добавить в заказ'}
                        color={StandardButtonColor.GREEN}
                        iconType={StandardButtonIconType.WHITE_PLUS}
                        iconPosition={StandardButtonIconPosition.AFTER_TEXT}
                      />
                    </div>
                  ) : (
                    <div>
                      <OrderButton
                        onClickAction={() => {
                          if ((orderStatus !== OrderStatus.PREPARING) && orderStatus) {
                            setOrderWarningState({isShown: true, type: OrderWarningType.UNCOMPLETED_ORDER })
                          } else {
                            dispatch(incrementOrderPositionCount({
                              ...displayedFood,
                              selectedVariationId: selectedFoodVariation?.variationId,
                            }))
                          }
                        }}
                        productCount={countInOrder}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            {displayedFood && (
              <OrderWarning
                orderWarningType={orderWarningState.type}
                isOpened={orderWarningState.isShown}
                setOpened={setOrderWarningStateProp}
                onConfirmAction={() => {
                  if (orderWarningState.type === OrderWarningType.DIFFERENT_RESTAURANT) {
                    dispatch(clearAndStartNewOrder({
                      ...displayedFood,
                      selectedVariationId: selectedFoodVariation?.variationId,
                    }))
                  } else {
                    navigate(RoutePaths.ORDERS)
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default FoodDetailedView;