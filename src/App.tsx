import React from "react";
import './assets/styles/colors.css'
import './index.css'
import './App.css'
import './assets/styles/animation_durations.css'
import {Routes, Route} from "react-router-dom";
import OrdersPage from "./ui/pages/orders_page/OrdersPage";
import RestaurantPage from "./ui/pages/restaurant_page/RestaurantPage";
import { RoutePaths } from "./assets/constants/enums/RoutePaths";
import FoodDetailedView from "./ui/shared_components/food_detailed_view/FoodDetailedView";
import MenuPage from "./ui/pages/menu_page/MenuPage";



const App = () => {
    return (
        <div className='grey-bg'>
            <Routes>
                {/* <Route path={RoutePaths.ORDERS} element={<OrdersPage />} /> */}
                <Route path={'/'} element={<div>test</div>} />
                <Route path={RoutePaths.ORDERS} element={<OrdersPage />} />
                <Route path={RoutePaths.MENU} element={<MenuPage />} />
                <Route path={RoutePaths.RESTAURANT} element={<RestaurantPage />} />
            </Routes>
            <FoodDetailedView />
        </div>
    )
}

export default App;