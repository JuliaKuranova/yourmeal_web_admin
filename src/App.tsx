import React, { useEffect } from "react";
import './assets/styles/colors.css'
import './index.css'
import './App.css'
import './assets/styles/animation_durations.css'
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import OrdersPage from "./ui/pages/orders_page/OrdersPage";
import RestaurantPage from "./ui/pages/restaurant_page/RestaurantPage";
import { RoutePaths } from "./assets/constants/enums/RoutePaths";
import FoodDetailedView from "./ui/shared_components/food_detailed_view/FoodDetailedView";
import MenuPage from "./ui/pages/menu_page/MenuPage";
import './assets/styles/fonts.css'
import PositionsOnTheMainPage from "./ui/pages/positions_on_the_main_page/PositionsOnTheMainPage";
import { useFormik } from "formik";
import AuthorizationPage from "./ui/pages/authorization_page/AuthorizationPage";

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (localStorage.getItem('MY_USER') === null && location.pathname !== '/authorization') {
            console.log('redirect to auth')
            navigate('/authorization')
        }
    }, [])

    return (
        <div>
            <Routes>
                <Route path={RoutePaths.AUTHORIZATION} element={<AuthorizationPage />} />
                <Route path={RoutePaths.ORDERS} element={<OrdersPage />} />
                <Route path={RoutePaths.MENU} element={<MenuPage />} />
                <Route path={RoutePaths.RESTAURANT} element={<RestaurantPage />} />
                <Route path={RoutePaths.POSITIONS} element={<PositionsOnTheMainPage />} />
            </Routes>
            
        </div>
    )
}

export default App;