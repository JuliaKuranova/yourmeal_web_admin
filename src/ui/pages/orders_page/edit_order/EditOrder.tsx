import './EditOrder.css'
// import EditOrderPopupPic from '../../../../assets/images/OrdersPage/EditOrderPopupPic.png'
import FriesImage from '../../../../assets/images/Fries-image.png'
import TagButton, { TagButtonType } from '../../../shared_components/buttons/tag_button/TagButton';
import { MediaQueries } from '../../../../assets/constants/enums/MediaQueries';
import { useMediaQuery } from 'react-responsive';
import SearchInput from '../../../shared_components/inputs/search_input/SearchInput';
import StandardButton, { StandardButtonColor, StandardButtonIconPosition, StandardButtonIconType } from '../../../shared_components/buttons/standard_button/StandardButton';




interface EditOrderProps {
    isOpen: boolean;
    onClose: () => void;
  }

const EditOrder = (props: EditOrderProps) => {
    // const EditOrderPopup = 
    // const test1 = 'test0';
    const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE})

    return (
        <div className={`edit-order ${props.isOpen ? 'active' : ''}`}>
            {/* <img src={EditOrderPopupPic} alt="EditOrderPopupPic" /> */}

            <div className='edit-order__wrapper'>
                <div className='edit-order__top'>
                    <div>Заказ #1649</div>
                    <svg className='btn_close' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" onClick={props.onClose}>
                        <path d="M1.33325 1.33337L14.6666 14.6667" stroke="#87898F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.6666 1.33337L1.33325 14.6667" stroke="#87898F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>

                <div className='g-8'>
                    <div className='f-c-g-8'>В заказе:
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="#F3F4F6"/>
                            <path d="M10.8047 14.8257V14.0171C10.8047 13.4077 10.8838 12.9272 11.042 12.5757C11.2002 12.2241 11.4316 11.9282 11.7363 11.688C12.041 11.4478 12.4102 11.1899 12.8438 10.9146C13.3066 10.6099 13.6348 10.2905 13.8281 9.95654C14.0273 9.6167 14.127 9.26807 14.127 8.91064C14.127 8.37158 13.9424 7.94385 13.5732 7.62744C13.2041 7.31104 12.7061 7.15283 12.0791 7.15283C11.3877 7.15283 10.8457 7.35791 10.4531 7.76807C10.0605 8.17236 9.86426 8.73193 9.86426 9.44678H7.68457C7.68457 8.62061 7.86914 7.89404 8.23828 7.26709C8.60742 6.64014 9.12305 6.15088 9.78516 5.79932C10.4473 5.44775 11.2178 5.27197 12.0967 5.27197C12.9229 5.27197 13.6523 5.42139 14.2852 5.72021C14.9238 6.01904 15.4219 6.4292 15.7793 6.95068C16.1367 7.47217 16.3154 8.07275 16.3154 8.75244C16.3154 10.0708 15.7148 11.1343 14.5137 11.9429C14.1387 12.1948 13.8281 12.4233 13.582 12.6284C13.3418 12.8276 13.1631 13.0474 13.0459 13.2876C12.9287 13.522 12.8701 13.8179 12.8701 14.1753V14.8257H10.8047ZM11.8594 18.728C11.4785 18.728 11.1562 18.5962 10.8926 18.3325C10.6289 18.063 10.4971 17.7407 10.4971 17.3657C10.4971 16.9849 10.6289 16.6626 10.8926 16.3989C11.1562 16.1353 11.4785 16.0034 11.8594 16.0034C12.2344 16.0034 12.5537 16.1353 12.8174 16.3989C13.0811 16.6626 13.2129 16.9849 13.2129 17.3657C13.2129 17.7407 13.0811 18.063 12.8174 18.3325C12.5537 18.5962 12.2344 18.728 11.8594 18.728Z" fill="#87898F"/>
                        </svg>
                    </div>

                    <div className="edit-order__items">
                        <div className="edit-order__item">
                            <img className='order-img' src={FriesImage} alt="FriesImage" />
                            <div className='edit-order__item-cont'>
                                <div className='edit-order__item-text'>
                                    <div className='edit-order__item-title'>Картофель фри (с трюфельным маслом)</div>
                                    <div className='edit-order__item-info'>
                                        <div  className='no-wrap'>Основное меню</div>
                                        <div>700 ₽</div>
                                    </div>
                                </div>
                                <div className='edit-order__item-btns f-c-g-8'>
                                    <TagButton
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'Убрать'}
                                    withCross={true}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    fullWidth={isMobile}
                                    />
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'+1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'-1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="edit-order__item">
                            <img className='order-img' src={FriesImage} alt="FriesImage" />
                            <div className='edit-order__item-cont'>
                                <div className='edit-order__item-text'>
                                    <div className='edit-order__item-title'>Свежий салат с помидорами и куриной грудкой</div>
                                    <div className='edit-order__item-info'>
                                        <div className='no-wrap'>Рекомендуется, основное меню</div>
                                        <div>700 ₽</div>
                                    </div>
                                </div>
                                <div className='edit-order__item-btns f-c-g-8'>
                                    <TagButton
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'Убрать'}
                                    withCross={true}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    fullWidth={isMobile}
                                    />
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'+1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'-1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="edit-order__item">
                            <img className='order-img' src={FriesImage} alt="FriesImage" />
                            <div className='edit-order__item-cont'>
                                <div className='edit-order__item-text'>
                                    <div className='edit-order__item-title'>Картофель фри (с трюфельным маслом)</div>
                                    <div className='edit-order__item-info'>
                                        <div  className='no-wrap'>Основное меню</div>
                                        <div>700 ₽</div>
                                    </div>
                                </div>
                                <div className='edit-order__item-btns f-c-g-8'>
                                    <TagButton
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'Убрать'}
                                    withCross={true}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    fullWidth={isMobile}
                                    />
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'+1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'-1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="edit-order__item">
                            <img className='order-img' src={FriesImage} alt="FriesImage" />
                            <div className='edit-order__item-cont'>
                                <div className='edit-order__item-text'>
                                    <div className='edit-order__item-title'>Картофель фри (с трюфельным маслом)</div>
                                    <div className='edit-order__item-info'>
                                        <div  className='no-wrap'>Основное меню</div>
                                        <div>700 ₽</div>
                                    </div>
                                </div>
                                <div className='edit-order__item-btns f-c-g-8'>
                                    <TagButton
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'Убрать'}
                                    withCross={true}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    fullWidth={isMobile}
                                    />
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'+1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'-1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="edit-order__item">
                            <img className='order-img' src={FriesImage} alt="FriesImage" />
                            <div className='edit-order__item-cont'>
                                <div className='edit-order__item-text'>
                                    <div className='edit-order__item-title'>Картофель фри (с трюфельным маслом)</div>
                                    <div className='edit-order__item-info'>
                                        <div  className='no-wrap'>Основное меню</div>
                                        <div>700 ₽</div>
                                    </div>
                                </div>
                                <div className='edit-order__item-btns f-c-g-8'>
                                    <TagButton
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'Убрать'}
                                    withCross={true}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    fullWidth={isMobile}
                                    />
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'+1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'-1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='g-8'>
                    <div>Можно добавить:
                    </div>

                    <SearchInput onInputChange={() => true} placeholder={'Блюдо...'} />

                    <div className="edit-order__items">
                        <div className="edit-order__item">
                            <img className='order-img' src={FriesImage} alt="FriesImage" />
                            <div className='edit-order__item-cont'>
                                <div className='edit-order__item-text'>
                                    <div className='edit-order__item-title'>Картофель фри (с трюфельным маслом)</div>
                                    <div className='edit-order__item-info'>
                                        <div  className='no-wrap'>Основное меню</div>
                                        <div>700 ₽</div>
                                    </div>
                                </div>
                                <div className='edit-order__item-btns f-c-g-8'>
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'+1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="edit-order__item">
                            <img className='order-img' src={FriesImage} alt="FriesImage" />
                            <div className='edit-order__item-cont'>
                                <div className='edit-order__item-text'>
                                    <div className='edit-order__item-title'>Картофель фри (с трюфельным маслом)</div>
                                    <div className='edit-order__item-info'>
                                        <div  className='no-wrap'>Основное меню</div>
                                        <div>700 ₽</div>
                                    </div>
                                </div>
                                <div className='edit-order__item-btns f-c-g-8'>
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'+1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="edit-order__item">
                            <img className='order-img' src={FriesImage} alt="FriesImage" />
                            <div className='edit-order__item-cont'>
                                <div className='edit-order__item-text'>
                                    <div className='edit-order__item-title'>Картофель фри (с трюфельным маслом)</div>
                                    <div className='edit-order__item-info'>
                                        <div  className='no-wrap'>Основное меню</div>
                                        <div>700 ₽</div>
                                    </div>
                                </div>
                                <div className='edit-order__item-btns f-c-g-8'>
                                    <TagButton 
                                    onClickAction={() => {}}
                                    isActive={false}
                                    text={'+1'}
                                    type={isMobile ? TagButtonType.MOBILE : TagButtonType.DESKTOP}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className='edit-order__btns'>
                        <StandardButton
                            onClickAction={() => true}
                            text={'Отменить и вернуться'}
                            color={StandardButtonColor.GRAY}
                            iconType={StandardButtonIconType.NO_ICON}
                            iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                            notFullWidth={true}
                        />
                        <StandardButton
                            onClickAction={() => true}
                            text={'Сохранить изменения'}
                            color={StandardButtonColor.GREEN}
                            iconType={StandardButtonIconType.NO_ICON}
                            iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                            notFullWidth={true}
                        />
                </div>

            </div>

        </div>
    )
}

export default EditOrder