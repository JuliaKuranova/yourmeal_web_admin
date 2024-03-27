import React, {useEffect} from "react";
import Sheet from "react-modal-sheet";
import {useLocation} from "react-router-dom";
import './OrderWarning.css'
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType
} from "../../buttons/standard_button/StandardButton";
import {useMediaQuery} from "react-responsive";
import CloseButton, {CloseButtonSize} from "../../buttons/close_button/CloseButton";
import { MediaQueries } from "../../../../assets/constants/enums/MediaQueries";

export enum OrderWarningType {
  UNCOMPLETED_ORDER,
  DIFFERENT_RESTAURANT
}

interface OrderWarningProps {
  isOpened: boolean;
  setOpened: (isShown: boolean, type: OrderWarningType) => void;
  onConfirmAction: () => void;
  orderWarningType: OrderWarningType;
}

const OrderWarning: React.FC<OrderWarningProps> = ({ isOpened, setOpened, onConfirmAction, orderWarningType }) => {
  const location = useLocation()
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE })

  useEffect(() => {
    const handleResize = () => {
      setOpened(false, orderWarningType)
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setOpened, orderWarningType]);

  useEffect(() => {
    setOpened(false, orderWarningType)
  }, [location?.pathname, setOpened]);

  const renderMobile = () => {
    return(
      <>
        {isOpened && (
          <div
            style={{ position: 'absolute', top: -1000, left: 0, width: window.innerWidth, height: window.innerHeight * 10, zIndex: 1000000000 }}
            onClick={(e) => {
              e.preventDefault()
              setOpened(false, orderWarningType)
            }}
          />
        )}
        <Sheet
          isOpen={isOpened}
          onClose={() => setOpened(false, orderWarningType)}
          detent={"content-height"}
          snapPoints={[window.innerHeight - 64, 0]}
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content disableDrag={true}>
              <div className={'detailed-food-info-wrapper'}>
                <div className={'mobile-h2 text-primary'}>
                  {orderWarningType === OrderWarningType.UNCOMPLETED_ORDER
                    ? 'Нужно оплатить текущий заказ'
                    : 'Обновить заказ?'
                  }
                </div>
                <div className={'mobile-main-text text-secondary'}>
                  {orderWarningType === OrderWarningType.UNCOMPLETED_ORDER
                    ? 'До оплаты текущего заказа собрать новый не получится :('
                    : 'В вашем заказе уже есть блюда из другого ресторана. Мы можем сбросить список блюд и начать новый заказ здесь'
                  }
                </div>
                <div className={'warning-btns-wrapper'}>
                  <StandardButton
                    onClickAction={() => setOpened(false, orderWarningType)}
                    text={'Отменить'}
                    color={StandardButtonColor.GRAY}
                    iconType={StandardButtonIconType.NO_ICON}
                    iconPosition={StandardButtonIconPosition.AFTER_TEXT}
                  />
                  <StandardButton
                    onClickAction={() => {
                      setOpened(false, orderWarningType)
                      onConfirmAction()
                    }}
                    text={orderWarningType === OrderWarningType.DIFFERENT_RESTAURANT ? 'Да, начать новый заказ' : 'К заказу'}
                    color={StandardButtonColor.GREEN}
                    iconType={StandardButtonIconType.NO_ICON}
                    iconPosition={StandardButtonIconPosition.AFTER_TEXT}
                  />
                </div>
              </div>
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
        className={`restaurant-warning-absolute-wrapper-desktop ${isOpened && 'open'}`}
        onClick={e => {
          if (e.target === e.currentTarget) {
            setOpened(false, orderWarningType)
          }
        }}
      >
        <div
          className={'restaurant-warning-wrapper-desktop'}
          style={{ width: Math.min(window.innerWidth - 350, 768), maxHeight: window.innerHeight - 300 }}
          onClick={e => e.preventDefault()}
        >
          <div className={'header-and-close-wrapper'}>
            <div className={'desktop-h2'}>
              {orderWarningType === OrderWarningType.UNCOMPLETED_ORDER
                ? 'Нужно оплатить текущий заказ'
                : 'Обновить заказ?'
              }
            </div>
            <div style={{ marginLeft: '12px'}}>
              <CloseButton size={CloseButtonSize.BIG} onClickAction={() => setOpened(false, orderWarningType)} defaultColor={'transparent'} />
            </div>
          </div>
          <div className={'desktop-main-text text-secondary'}>
            {orderWarningType === OrderWarningType.UNCOMPLETED_ORDER
              ? 'До оплаты текущего заказа собрать новый не получится :('
              : 'В вашем заказе уже есть блюда из другого ресторана. Мы можем сбросить список блюд и начать новый заказ здесь'
            }
          </div>
          <div className={'btns-wrapper-desktop'}>
            <StandardButton
              onClickAction={() => setOpened(false, orderWarningType)}
              text={'Отменить'}
              color={StandardButtonColor.GRAY}
              iconType={StandardButtonIconType.NO_ICON}
              iconPosition={StandardButtonIconPosition.AFTER_TEXT}
            />
            <StandardButton
              onClickAction={() => {
                setOpened(false, orderWarningType)
                onConfirmAction()
              }}
              text={orderWarningType === OrderWarningType.DIFFERENT_RESTAURANT ? 'Да, начать новый заказ' : 'К заказу'}
              color={StandardButtonColor.GREEN}
              iconType={StandardButtonIconType.NO_ICON}
              iconPosition={StandardButtonIconPosition.AFTER_TEXT}
            />
          </div>
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default OrderWarning