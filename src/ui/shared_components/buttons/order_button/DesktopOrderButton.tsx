import React, {useMemo, useState} from "react";
import {useMediaQuery} from "react-responsive";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/ReduxStore";
import {getTotalProductCountInOrder} from "../../../../redux/current_order_reducer/OrderOperations";
import NumberTag, {NumberTagColor} from "../number_tag/NumberTag";
import { MediaQueries } from "../../../../assets/constants/enums/MediaQueries";
import { RoutePaths } from "../../../../assets/constants/enums/RoutePaths";

const DesktopOrderButton: React.FC = () => {
  const [isHovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const isTouchable = useMediaQuery({ query: MediaQueries.TOUCHABLE });
  const orderState = useSelector((state: RootState) => state.order.orderState)
  const navigate = useNavigate()
  const location = useLocation()

  const totalCountInOrder = useMemo(() => {
    return getTotalProductCountInOrder(orderState)
  }, [orderState])

  return(
    <div
      className={'animation-01s-all'}
      style={{ maxWidth: totalCountInOrder === 0 ? 0 : 300, overflow: "hidden"}}
    >
      <div
        className={'animation-02s-all standard-btn-wrapper'}
        onClick={() => {
          if (location?.pathname !== RoutePaths?.ORDERS) {
            navigate(RoutePaths.ORDERS)
          }
        }}
        onMouseEnter={() => {
          if (!isTouchable) {
            setHovered(true)
          }
        }}
        onMouseLeave={() => {
          if (!isTouchable) {
            setHovered(false)
            setClicked(false)
          }
        }}
        onTouchStart={() => setClicked(true)}
        onTouchEnd={() => setClicked(false)}
        onTouchCancel={() => setClicked(false)}
        onMouseDown={() => {
          if (!isTouchable) {
            setClicked(true)
          }
        }}
        onMouseUp={() => {
          if (!isTouchable) {
            setClicked(false)
          }
        }}
        style={{
          width: '100%',
          flexDirection: 'row',
          cursor: isClicked || isHovered ? 'pointer' : undefined,
          backgroundColor: isClicked
            ? 'var(--on-click-ym-green, #00B54D)'
            : isHovered
              ? 'var(--on-hover-ym-green, #00C956)'
              : 'var(--main-ym-green, #00DF5F)'
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_101_5580)">
            <path d="M8 4.17871C7.6869 4.24093 7.4095 4.32476 7.15057 4.43773C5.93661 4.96738 4.96769 5.93629 4.43805 7.15025C4 8.15427 4 9.43607 4 11.9997V13.9997C4 16.5633 4 17.8451 4.43805 18.8491C4.96769 20.0631 5.93661 21.032 7.15057 21.5616C8.15458 21.9997 9.43639 21.9997 12 21.9997C14.5636 21.9997 15.8454 21.9997 16.8494 21.5616C18.0634 21.032 19.0323 20.0631 19.562 18.8491C20 17.8451 20 16.5633 20 13.9997V11.9997C20 9.43607 20 8.15427 19.562 7.15025C19.0323 5.93629 18.0634 4.96738 16.8494 4.43773C16.5905 4.32476 16.3131 4.24093 16 4.17871" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M8 4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4C16 5.10457 15.1046 6 14 6H10C8.89543 6 8 5.10457 8 4Z" stroke="white" strokeWidth="2"/>
            <path d="M7.25 12L7.86612 12.6161C8.35427 13.1043 9.14573 13.1043 9.63388 12.6161L10.75 11.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7.25 17L7.86612 17.6161C8.35427 18.1043 9.14573 18.1043 9.63388 17.6161L10.75 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M13.75 12H16.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M13.75 17H16.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <defs>
            <clipPath id="clip0_101_5580">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <div className={`mobile-and-desktop-btns noselect white`} style={{ flexShrink: 0 }}>
          Мой заказ
        </div>
        <NumberTag
          color={NumberTagColor.WHITE}
          number={totalCountInOrder}
          disableAnimation={true}
        />
      </div>
    </div>
  )
}

export default DesktopOrderButton