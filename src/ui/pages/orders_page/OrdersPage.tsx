import './OrdersPage.css'
import '../../../assets/styles/fonts.css'
// import '../../../assets/images/OrdersPage/icon-user.svg'
import StandardButton, {
    StandardButtonColor,
    StandardButtonIconPosition,
    StandardButtonIconType
  } from "../../shared_components/buttons/standard_button/StandardButton";
import EditOrder from './edit_order/EditOrder';
import { useState } from 'react';

const OrdersPage = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    return (
        <div className="page-wrapper">
            {/* <div className=''> */}
                <div className="nav-bar">
                    {/* <div className="nav-bar__items"> */}
                        <div className="nav-bar__item mobile-and-desktop-btns">
                            {/* <div className="nav-bar__icon"> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="#5D5E64" stroke-width="2" stroke-linecap="round"/>
                                <path d="M8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10Z" stroke="#5D5E64" stroke-width="2" stroke-linecap="round"/>
                                <path d="M6.35034 19.5C7.65453 17.9502 9.60162 17 11.7202 17H12.2799C14.3985 17 16.3456 17.9502 17.6498 19.5" stroke="#5D5E64" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            {/* </div> */}
                            <div className="nav-bar__title">
                                glebkossov@gmail.com
                            </div>
                        </div>
                        <div className="nav-bar__item mobile-and-desktop-btns active">
                            {/* <div className="nav-bar__icon "> */}
                                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.01281 4.19824C6.00433 4.29764 6 4.39823 6 4.49983C6 6.43282 7.567 7.99983 9.5 7.99983H14.5C16.433 7.99983 18 6.43282 18 4.49983C18 4.39823 17.9957 4.29764 17.9872 4.19824C19.0665 4.88992 19.9061 5.91617 20.3654 7.13658C20.75 8.15835 20.75 9.43892 20.75 12.0001V14.0001C20.75 16.5612 20.75 17.8418 20.3654 18.8636C19.7568 20.4807 18.4806 21.7569 16.8635 22.3655C15.8417 22.7501 14.5612 22.7501 12 22.7501C9.43884 22.7501 8.15826 22.7501 7.1365 22.3655C5.51941 21.7569 4.24319 20.4807 3.63456 18.8636C3.25 17.8418 3.25 16.5612 3.25 14.0001V12.0001C3.25 9.43892 3.25 8.15835 3.63456 7.13658C4.09389 5.91617 4.93345 4.88992 6.01281 4.19824ZM13 12C13 11.5858 13.3358 11.25 13.75 11.25H16.75C17.1642 11.25 17.5 11.5858 17.5 12C17.5 12.4142 17.1642 12.75 16.75 12.75H13.75C13.3358 12.75 13 12.4142 13 12ZM13.75 16.25C13.3358 16.25 13 16.5858 13 17C13 17.4142 13.3358 17.75 13.75 17.75H16.75C17.1642 17.75 17.5 17.4142 17.5 17C17.5 16.5858 17.1642 16.25 16.75 16.25H13.75ZM11.2803 10.9697C11.5732 11.2626 11.5732 11.7374 11.2803 12.0303L10.1642 13.1464C9.38317 13.9275 8.11683 13.9275 7.33579 13.1464L6.71967 12.5303C6.42678 12.2374 6.42678 11.7626 6.71967 11.4697C7.01256 11.1768 7.48744 11.1768 7.78033 11.4697L8.39645 12.0858C8.59171 12.281 8.90829 12.281 9.10355 12.0858L10.2197 10.9697C10.5126 10.6768 10.9874 10.6768 11.2803 10.9697ZM11.2803 17.0303C11.5732 16.7374 11.5732 16.2626 11.2803 15.9697C10.9874 15.6768 10.5126 15.6768 10.2197 15.9697L9.10355 17.0858C8.90829 17.281 8.59171 17.281 8.39645 17.0858L7.78033 16.4697C7.48744 16.1768 7.01256 16.1768 6.71967 16.4697C6.42678 16.7626 6.42678 17.2374 6.71967 17.5303L7.33579 18.1464C8.11683 18.9275 9.38317 18.9275 10.1642 18.1464L11.2803 17.0303Z" fill="#2C2D2E"/>
                                    <path d="M7.25 4C7.25 2.48122 8.48122 1.25 10 1.25H14C15.5188 1.25 16.75 2.48122 16.75 4C16.75 5.51878 15.5188 6.75 14 6.75H10C8.48122 6.75 7.25 5.51878 7.25 4Z" fill="#2C2D2E"/>
                                </svg>
                            {/* </div> */}
                            <div className="nav-bar__title">
                                Заказы
                            </div>
                        </div>
                        <div className="nav-bar__item mobile-and-desktop-btns">
                            {/* <div className="nav-bar__icon"> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M22 12C22 15.2636 22 16.8953 21.4273 18.1677C20.7755 19.616 19.616 20.7755 18.1677 21.4274C16.8953 22 15.2635 22 12 22C8.73646 22 7.10469 22 5.83232 21.4274C4.38401 20.7755 3.22448 19.616 2.57265 18.1677C2 16.8953 2 15.2636 2 12C2 8.73648 2 7.10471 2.57265 5.83233C3.22448 4.38403 4.38401 3.22449 5.83232 2.57267C6.96755 2.06174 8.38888 2.00667 11 2.00073" stroke="#5D5E64" stroke-width="2" stroke-linecap="round"/>
                                <path d="M15.0251 3.63499L9.84148 8.81862C9.27525 9.38485 8.99213 9.66797 8.75453 9.97685C8.21811 10.6742 7.84162 11.481 7.65173 12.3401C7.56763 12.7206 7.53251 13.1195 7.46228 13.9172C7.40899 14.5224 7.38235 14.8249 7.44003 15.0638C7.57209 15.6107 7.99912 16.0378 8.54604 16.1698C8.7849 16.2275 9.0875 16.2009 9.69269 16.1476C10.4904 16.0773 10.8892 16.0422 11.2697 15.9581C12.1288 15.7682 12.9356 15.3917 13.633 14.8553C13.9419 14.6177 14.225 14.3346 14.7912 13.7684L19.9749 8.58474C21.3417 7.2179 21.3417 5.00182 19.9749 3.63499C18.608 2.26815 16.3919 2.26816 15.0251 3.63499Z" stroke="#5D5E64" stroke-width="2"/>
                                <path d="M14 5L18.6508 9.65079" stroke="#5D5E64" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            {/* </div> */}
                            <div className="nav-bar__title">
                                Меню
                            </div>
                        </div>
                        <div className="nav-bar__item mobile-and-desktop-btns">
                            <div className="nav-bar__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="#5D5E64" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 15.5L12 12.5" stroke="#5D5E64" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 8.5L12 8.499" stroke="#2C2D2E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div className="nav-bar__title">
                                Страница заведения
                            </div>
                        </div>
                        <div className="nav-bar__item mobile-and-desktop-btns">
                            {/* <div className="nav-bar__icon"> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M2 17C2 15.6036 2 14.9053 2.19641 14.344C2.5482 13.3387 3.33866 12.5482 4.34402 12.1964C4.90533 12 5.60355 12 7 12C8.39645 12 9.09467 12 9.65598 12.1964C10.6613 12.5482 11.4518 13.3387 11.8036 14.344C12 14.9053 12 15.6036 12 17C12 18.3964 12 19.0947 11.8036 19.656C11.4518 20.6613 10.6613 21.4518 9.65598 21.8036C9.09467 22 8.39645 22 7 22C5.60355 22 4.90533 22 4.34402 21.8036C3.33866 21.4518 2.5482 20.6613 2.19641 19.656C2 19.0947 2 18.3964 2 17Z" stroke="#5D5E64" stroke-width="2"/>
                                <path d="M5 19H6" stroke="#5D5E64" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 17C12 15.6036 12 14.9053 12.1964 14.344C12.5482 13.3387 13.3387 12.5482 14.344 12.1964C14.9053 12 15.6036 12 17 12C18.3964 12 19.0947 12 19.656 12.1964C20.6613 12.5482 21.4518 13.3387 21.8036 14.344C22 14.9053 22 15.6036 22 17C22 18.3964 22 19.0947 21.8036 19.656C21.4518 20.6613 20.6613 21.4518 19.656 21.8036C19.0947 22 18.3964 22 17 22C15.6036 22 14.9053 22 14.344 21.8036C13.3387 21.4518 12.5482 20.6613 12.1964 19.656C12 19.0947 12 18.3964 12 17Z" stroke="#5D5E64" stroke-width="2"/>
                                <path d="M7 7C7 5.60355 7 4.90533 7.19641 4.34402C7.5482 3.33866 8.33866 2.5482 9.34402 2.19641C9.90533 2 10.6036 2 12 2C13.3964 2 14.0947 2 14.656 2.19641C15.6613 2.5482 16.4518 3.33866 16.8036 4.34402C17 4.90533 17 5.60355 17 7C17 8.39645 17 9.09467 16.8036 9.65598C16.4518 10.6613 15.6613 11.4518 14.656 11.8036C14.0947 12 13.3964 12 12 12C10.6036 12 9.90533 12 9.34402 11.8036C8.33866 11.4518 7.5482 10.6613 7.19641 9.65598C7 9.09467 7 8.39645 7 7Z" stroke="#5D5E64" stroke-width="2"/>
                                <path d="M10 9H11" stroke="#5D5E64" stroke-width="2" stroke-linecap="round"/>
                                <path d="M15 19H16" stroke="#5D5E64" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            {/* </div> */}
                            <div className="nav-bar__title">
                                Позиции на главной
                            </div>
                        </div>
                    {/* </div> */}
                </div>
                
                <div className="grey-bg orders-wrapper" >
                    <div className="orders">
                        <div className="order">
                            <div className="order__top f-8">
                                <div className="order__title">
                                Заказ  <span>#1649</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                                    <path d="M1 11L5.29289 6.70711C5.68342 6.31658 5.68342 5.68342 5.29289 5.29289L1 1" stroke="#C6C9D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                </div>
                                <div className='order__status'>Оплата ожидается</div>
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
                                    <div>
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
                                    <div>
                                        Глеб
                                    </div>
                                </div>
                            </div>
                            <div className="order__positions">
                                <div className="order__position">
                                    Чай с малиной и шиповником
                                </div>
                                <div className="order__position">
                                    Борщ
                                </div>
                                <div className="order__position">
                                    Солянка
                                </div>
                                <div className="order__position">
                                    Чай с малиной и шиповником
                                </div>
                                <div className="order__position">
                                    Оливье
                                </div>
                            </div>
                            <div className='order__comments f-6'>
                                <div>Комментарий:</div>
                                <div>Борщ и салат подать первым</div>
                            </div>
                            <div className="order__sum">
                                Сумма 3680 ₽
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
                        <div className="order">
                            <div className="order__top f-8">
                                <div className="order__title">
                                Заказ <span>16:45</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                                    <path d="M1 11L5.29289 6.70711C5.68342 6.31658 5.68342 5.68342 5.29289 5.29289L1 1" stroke="#C6C9D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                </div>
                                <div className='order__status'>Оплата ожидается</div>
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
                                    <div>
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
                                    <div>
                                        Глеб
                                    </div>
                                </div>
                            </div>
                            <div className="order__positions">
                                <div className="order__position">
                                    Чай с малиной и шиповником
                                </div>
                                <div className="order__position">
                                    Борщ
                                </div>
                                <div className="order__position">
                                    Солянка
                                </div>
                                <div className="order__position">
                                    Чай с малиной и шиповником
                                </div>
                                <div className="order__position">
                                    Оливье
                                </div>
                            </div>
                            <div className='order__comments f-6'>
                                <div>Комментарий:</div>
                                <div>Борщ и салат подать первым</div>
                            </div>
                            <div className="order__sum">
                                Сумма 3680 ₽
                            </div>
                            <div className="f-8">
                                <a href="">Изменить заказ</a>
                                <a href="">Принять заказ</a>
                            </div>
                        </div>
                        <div className="order">
                            <div className="order__top f-8">
                                <div className="order__title">
                                Заказ <span>16:45</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                                    <path d="M1 11L5.29289 6.70711C5.68342 6.31658 5.68342 5.68342 5.29289 5.29289L1 1" stroke="#C6C9D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                </div>
                                <div className='order__status'>Оплата ожидается</div>
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
                                    <div>
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
                                    <div>
                                        Глеб
                                    </div>
                                </div>
                            </div>
                            <div className="order__positions">
                                <div className="order__position">
                                    Чай с малиной и шиповником
                                </div>
                                <div className="order__position">
                                    Борщ
                                </div>
                                <div className="order__position">
                                    Солянка
                                </div>
                                <div className="order__position">
                                    Чай с малиной и шиповником
                                </div>
                                <div className="order__position">
                                    Оливье
                                </div>
                            </div>
                            <div className='order__comments f-6'>
                                <div>Комментарий:</div>
                                <div>Борщ и салат подать первым</div>
                            </div>
                            <div className="order__sum">
                                Сумма 3680 ₽
                            </div>
                            <div className="f-8 order__btn">
                                <a href="">Изменить заказ</a>
                                <a href="">Принять заказ</a>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}

export default OrdersPage