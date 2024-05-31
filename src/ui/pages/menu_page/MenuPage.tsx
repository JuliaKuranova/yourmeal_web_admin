import "./MenuPage.css";
import "../../../assets/styles/fonts.css";
import PromptButton from "../../shared_components/buttons/prompt_button/PromptButton";
import Prompt from "../../shared_components/prompt/Prompt";
import { useEffect, useState } from "react";
import PositionCard from "../../shared_components/position_card/PositionCard";
import { RootState } from "../../../redux/ReduxStore";
import { useSelector } from "react-redux";
import NavBar from "../../shared_components/nav_bar/NavBar";
// import { mockFood1 } from "../restaurant_page/MockRestaurantPageData";

import PositionCardMenu from "../../shared_components/position_card_menu/PositionCardMenu";
import { useAppDispatch } from "../../../hooks/redux";
import { GetFoodPositionThunk } from "../../../redux/position_reducer/thunks";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType,
} from "../../shared_components/buttons/standard_button/StandardButton";
import PositionEditing from "../../shared_components/position_editing/PositionEditing";
import { FoodPositionInfo, VariationType } from "../../../assets/constants/content_types/FoodInfo";
import { defaultImage } from "../../../assets/constants";

const defaultFoodPosition: FoodPositionInfo = {
  id: '',
  name: '',
  inMenu: false,
  image: defaultImage,
  restaurantId: '1',
  foodVariations: [{
    variationId: "",
    variationName: "",
    price: 123,
    weight: 323,
    caloriesHundred: 2312,
    proteinsHundred: 1231,
    fatsHundred: 2323,
    carbohydratesHundred: 123123,
    calories: 2323,
    proteins: 12323,
    fats: 123123,
    carbohydrates: 231,
    description: "выафыва",
    ingredients: "фыа",
    CFCB: "132",
    variationType: VariationType.STANDARD,
    restrictedAllergyTags: [],
    allowedDietsTags: [],
  }],
  menuSectionTags: []
}

const MenuPage = () => {
  console.log('Menu page')
  const [isPromptOpen, setPromptOpen] = useState(false);

  const positions = useSelector(
    (state: RootState) => state.foodPositions.positions
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetFoodPositionThunk());
  }, [dispatch]);


  const [selectedPosition, setSelectedPosition] = useState<
  FoodPositionInfo | undefined
>();

  return (
    <div className="page-wrapper">
      <NavBar />

      <div className="content-wrapper">
        <div className="white-card-wrapper edit-order__section">
          <div className="order__title">
            <span>Список позиций в меню</span>
            <PromptButton onClick={() => setPromptOpen(true)} />
            <Prompt
              isOpen={isPromptOpen}
              onClose={() => setPromptOpen(false)}
              title={"Меню заведения"}
              subtitle={`Здесь вы можете отключить позицию из показа – тогда она сохранится в базе, но пропадет из общего доступа для гостей. Нажмите на позицию в списке, чтобы отредактировать ее, добавить или удалить варианты.
              Варианты используются, когда нужно представить одно блюдо, но с незначительной разницей в ингредиентах.
              Чтобы удалить позицию навсегда, наведите курсор на элемент списка и нажмите крестик.`}
            />
          </div>

          <div className="edit-order__items">
            {positions.map((item) => (
              <PositionCardMenu key={item.id} position={item} isMenu={true} />
            ))}
          </div>
        </div>

        <div className="edit-order__btns">
            {!!selectedPosition ? (
            <PositionEditing
              isOpen={!!selectedPosition}
              position={selectedPosition}
              onClose={() => setSelectedPosition(undefined)}
            />
          ) : null}
          <StandardButton
            className="bottom-btn"
            onClickAction={() => setSelectedPosition(defaultFoodPosition)}
            text={"Создать блюдо"}
            color={StandardButtonColor.GREEN}
            iconType={StandardButtonIconType.WHITE_PLUS}
            iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
            notFullWidth={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
