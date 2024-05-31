import "../menu_page/MenuPage.css";
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
import { GetFoodPositionThunk } from "../../../redux/position_reducer/thunks";
import { useAppDispatch } from "../../../hooks/redux";

const PositionsOnTheMainPage = () => {

  const [isPromptOpen, setPromptOpen] = useState(false);
  // const order = useSelector((state: RootState) => state.order);

  const positions = useSelector(
    (state: RootState) => state.foodPositions.positions
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetFoodPositionThunk());
  }, [dispatch]);
  return (
    <div className="page-wrapper">
      <NavBar />

    
      <div className="edit-order__wrapper position-menu-wrapper">
        <div className="edit-order__section">
          <div className="order__title">
            <span>Позиции на главной странице</span>
            <PromptButton onClick={() => setPromptOpen(true)} />
            <Prompt
              isOpen={isPromptOpen}
              onClose={() => setPromptOpen(false)}
              title={"Позиции на главной странице"}
              subtitle={`На главной странице сервиса будут отражаться в случайной выборке позиции из списка тех, которые отмечены включенными. По умолчанию включены все, но вы можете выключить ненужные или оставить 6 позиций. Виден всегда только основной вариант.`}
            />
          </div>

          <div className="edit-order__items position-in-main">
            {positions.map((item) => (
              <PositionCardMenu key={item.id} position={item} isMenu={true} isMain={true} />
            ))}
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default PositionsOnTheMainPage;
