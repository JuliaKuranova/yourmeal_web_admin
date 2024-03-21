import React from "react";
import './assets/styles/colors.css'
import './index.css'
import './App.css'
import './assets/styles/animation_durations.css'
import {Routes, Route} from "react-router-dom";
import OrdersPage from "./ui/pages/orders_page/OrdersPage";
import RestaurantPage from "./ui/pages/restaurant_page/RestaurantPage";
import { RoutePaths } from "./assets/constants/enums/RoutePaths";


const App = () => {
    return (
        <div>
            <Routes>
                <Route path={RoutePaths.ORDERS} element={<OrdersPage />} />
                <Route path={RoutePaths.RESTAURANT} element={<RestaurantPage />} />
            </Routes>
        </div>
    )
}

export default App;