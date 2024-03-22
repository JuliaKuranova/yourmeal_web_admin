import './Order.css'
import '../../../../assets/styles/fonts.css'
// import '../../../assets/images/OrdersPage/icon-user.svg'
import { useState } from 'react';
import EditOrder from '../edit_order/EditOrder';
import StandardButton, { 
    StandardButtonColor, 
    StandardButtonIconPosition, StandardButtonIconType } 
    from '../../../shared_components/buttons/standard_button/StandardButton';
// import TagButton from '../../../shared_components/buttons/tag_button/TagButton';

const Order = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    return (
        <div className="order">
            <div className="order__top f-8">
                <div className="order__title">
                    <span>Заказ</span>
                    <span>#1649</span>
                    <span>16:45</span>
                    <span>22.03.2024</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="12" viewBox="0 0 7 12" fill="none">
                        <path d="M1 11L5.29289 6.70711C5.68342 6.31658 5.68342 5.68342 5.29289 5.29289L1 1" stroke="#C6C9D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className='order__status tags-text'>
                    Оплата ожидается
                </div>
                {/* <TagButton
                key={`${rt}-tag-rest`}
                onClickAction={() => true}
                isActive={false}
                text={rt}
                type={TagButtonType.DESKTOP}
                disabled={true}
                transparent={true}
              /> */}
            </div>
            <div className="order__info">
                <div className='order__table'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2901_17158)">
                        <path d="M7.90904 20.0716L5.09127 16.6561C0.272014 10.8146 4.42711 2 12 2C19.5729 2 23.728 10.8146 18.9087 16.6561L16.091 20.0716C15.0835 21.2927 13.5831 22 12 22C10.4169 22 8.91651 21.2928 7.90904 20.0716Z" stroke="#2C2D2E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11Z" stroke="#2C2D2E" stroke-width="2" stroke-linecap="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2901_17158">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div className='main-text'>
                        Стол 16
                    </div>
                </div>
                <div className='order__name-client'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2901_15469)">
                        <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="#5D5E64" stroke-width="2" stroke-linecap="round"/>
                        <path d="M8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10Z" stroke="#5D5E64" stroke-width="2" stroke-linecap="round"/>
                        <path d="M6.35028 19.5C7.65447 17.9502 9.60155 17 11.7202 17H12.2799C14.3985 17 16.3455 17.9502 17.6497 19.5" stroke="#5D5E64" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2901_15469">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div className='main-text'>
                        Глеб
                    </div>
                </div>
            </div>
            <div className="order__positions">
                <div className="order__position tags-text">
                    Борщ (2)
                </div>
                <div className="order__position tags-text">
                Салат оливье с красной икрой
                </div>
                <div className="order__position tags-text">
                Латте с ванилью
                </div>
                <div className="order__position tags-text">
                    Чай с малиной и шиповником
                </div>
                <div className="order__position tags-text">
                    Оливье
                </div>
            </div>
            <div className='order__comments'>
                <div className='subtext'>Комментарий:</div>
                <div className='subtext'>Борщ и салат подать первым</div>
            </div>
            <div className="order__sum h4">
                <span>Сумма</span> 
                <span>3680</span>
                <span>₽</span>
            </div>
            <div className="f-8 order__btn">
            <EditOrder 
                isOpen = {isPopupOpen}
                onClose={() => setPopupOpen(false)}
            />
            <StandardButton
                onClickAction={() => setPopupOpen(true)}
                text={'Изменить заказ'}
                color={StandardButtonColor.GRAY}
                iconType={StandardButtonIconType.NO_ICON}
                iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                notFullWidth={true}
            />
                <StandardButton
                onClickAction={() => true}
                text={'Принять заказ'}
                color={StandardButtonColor.GREEN}
                iconType={StandardButtonIconType.NO_ICON}
                iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                notFullWidth={true}
            />
            </div>
            
        </div>               
    )
}

export default Order