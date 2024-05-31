import "./OrdersPage.css";
import "../../../assets/styles/fonts.css";
import NavBar from "../../shared_components/nav_bar/NavBar";
import OrderItem from "./order/OrderItem";
import { RootState } from "../../../redux/ReduxStore";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/redux";
import { useEffect } from "react";
import { GetOrdersThunk } from "../../../redux/order_reduer/thunks";
import { GetFoodPositionThunk } from "../../../redux/position_reducer/thunks";

const OrdersPage = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetOrdersThunk());
    dispatch(GetFoodPositionThunk());
  }, [dispatch]);

  const suggestedPositions = useSelector(
    (state: RootState) => state.foodPositions.positions
  );

  console.log('orders', orders)

  return (
    

    <div className="page-wrapper">
      <NavBar />

      <div className="orders-wrapper">
        <div className="orders">
          {orders.map((order) => {
            return (
              <OrderItem
                order={order}
                suggestedPositions={suggestedPositions}
                key={order.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
