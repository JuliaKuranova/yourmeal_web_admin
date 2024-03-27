import './OrderButton.css'
import React, {useState} from "react";
import {useMediaQuery} from "react-responsive";
import NumberTag, {NumberTagColor} from "../../buttons/number_tag/NumberTag";
import { MediaQueries } from '../../../../assets/constants/enums/MediaQueries';

interface OrderButtonProps {
  onClickAction: () => void;
  productCount: number;
}

const OrderButton: React.FC<OrderButtonProps> = ({ onClickAction, productCount }) => {
  const [isHovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const isTouchable = useMediaQuery({ query: MediaQueries.TOUCHABLE });

  return(
    <div
      className={'animation-02s-all order-btn-wrapper'}
      onClick={onClickAction}
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
        cursor: isClicked || isHovered ? 'pointer' : undefined,
        backgroundColor: isClicked
          ? 'var(--on-click-gray-light, #CFD2DB)'
          : isHovered
            ? 'var(--on-hover-gray-light, #E7E9F0)'
            : 'var(--gray-light, #F3F4F6)'
      }}
    >
      <div className={'order-info-wrapper'}>
        <div className={'mobile-and-desktop-btns text-tetriary'}>В заказе:</div>
        <NumberTag color={NumberTagColor.GREEN} number={productCount} />
      </div>
      <div className={'mobile-and-desktop-btns text-primary'}>Добавить еще?</div>
    </div>
  )
}

export default OrderButton