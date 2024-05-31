// import {FoodPositionInOrderInfo} from "../../constants/content_types/FoodInfo";
import { FoodPositionInOrderInfo, FoodPositionInfo } from "../../assets/constants/content_types/FoodInfo";
import { OrderStatus } from "../../assets/constants/content_types/OrderStatus";
import { mockFood3 } from "../../ui/pages/restaurant_page/MockRestaurantPageData";
// import {OrderStatus} from "../../constants/content_types/OrderStatus";

export const LocalStorageOrderFields = {
  ORDER_STATE: 'ORDER_STATE_V3'
}

export interface OrderPosition {
  position: FoodPositionInOrderInfo;
  count: number;
}

export interface OrderState {
  restaurantId: string | undefined;
  restaurantName: string | undefined;
  restaurantAddress: string | undefined;
  orderStatus: OrderStatus;
  timestamp: number;
  orderState: OrderPosition[];
}

enum OrderActionTypes {
  INCREMENT_ORDER_POSITION_COUNT = 'INCREMENT_ORDER_POSITION_COUNT',
  DECREMENT_ORDER_POSITION_COUNT = 'DECREMENT_ORDER_POSITION_COUNT',
  REMOVE_ORDER_POSITION = 'REMOVE_ORDER_POSITION',
  CLEAR_ALL_ORDER_POSITIONS = 'CLEAR_ALL_ORDER_POSITIONS',
  CLEAR_AND_START_NEW_ORDER = 'CLEAR_AND_START_NEW_ORDER',
  SET_NEW_ORDER_STATUS = 'SET_NEW_ORDER_STATUS',
  SET_ORDER_RESTAURANT_INFO = 'SET_ORDER_RESTAURANT_INFO',
  ADD_ORDER_POSITION = 'ADD_ORDER_POSITION'
}

// const storedOrderState = localStorage.getItem(LocalStorageOrderFields.ORDER_STATE);
const storedOrderState = undefined;
const initialState: OrderState = JSON.parse(storedOrderState || JSON.stringify({
  orderState: mockFood3.map((position) => ({
    position,
    count: 1
  })),
  orderStatus: OrderStatus.PREPARING,
  timestamp: new Date(),
  restaurantId: undefined,
  restaurantName: undefined,
  restaurantAddress: undefined
}));

export const incrementOrderPositionCount = (position: FoodPositionInOrderInfo) => ({
  type: OrderActionTypes.INCREMENT_ORDER_POSITION_COUNT,
  position: position
});

export const decrementOrderPositionCount = (position: FoodPositionInOrderInfo) => ({
  type: OrderActionTypes.DECREMENT_ORDER_POSITION_COUNT,
  position: position
});

export const removeOrderPosition = (position: FoodPositionInOrderInfo) => ({
  type: OrderActionTypes.REMOVE_ORDER_POSITION,
  position: position
});

export const addOrderPosition = (position: FoodPositionInfo) => ({
  type: OrderActionTypes.ADD_ORDER_POSITION,
  position: position
});

export const clearAllOrderPositions = () => ({
  type: OrderActionTypes.CLEAR_ALL_ORDER_POSITIONS,
});

export const clearAndStartNewOrder = (position: FoodPositionInOrderInfo) => ({
  type: OrderActionTypes.CLEAR_AND_START_NEW_ORDER,
  position: position
});

export const setNewOrderStatus = (newStatus: OrderStatus) => ({
  type: OrderActionTypes.SET_NEW_ORDER_STATUS,
  newStatus: newStatus
});

export const setOrderRestaurantInfo = (restaurantName: string, restaurantAddress: string) => ({
  type: OrderActionTypes.SET_ORDER_RESTAURANT_INFO,
  restaurantName: restaurantName,
  restaurantAddress: restaurantAddress
});

const orderReducer = (
  state = initialState,
  action: ReturnType<typeof incrementOrderPositionCount>
    | ReturnType<typeof decrementOrderPositionCount>
    | ReturnType<typeof clearAllOrderPositions>
    | ReturnType<typeof removeOrderPosition>
    | ReturnType<typeof addOrderPosition>
    | ReturnType<typeof clearAndStartNewOrder>
    | ReturnType<typeof setNewOrderStatus>
    | ReturnType<typeof setOrderRestaurantInfo>
): OrderState => {
  let newState: OrderState

  switch (action.type) {
    case OrderActionTypes.INCREMENT_ORDER_POSITION_COUNT:
      const castedIncrementAction = action as ReturnType<typeof incrementOrderPositionCount>

      const existingProduct = state.orderState.find(
        (orderPos) =>
          orderPos?.position?.id === castedIncrementAction.position?.id &&
          orderPos?.position?.selectedVariationId ===
            castedIncrementAction.position?.selectedVariationId
      );

      newState = {
        ...state,
        restaurantId: castedIncrementAction?.position?.restaurantId,
        orderStatus: OrderStatus.PREPARING,
        orderState: existingProduct
          ? state.orderState.map((orderPos) => {
            if (orderPos?.position?.id === castedIncrementAction.position?.id &&
                orderPos?.position?.selectedVariationId ===
                  castedIncrementAction.position?.selectedVariationId) {
              return {
                ...orderPos,
                count: orderPos.count + 1,
              };
            }
            return orderPos;
          })
          : [...state.orderState, { position: castedIncrementAction.position, count: 1 }],
      };
      break;

    case OrderActionTypes.DECREMENT_ORDER_POSITION_COUNT:
      const castedDecrementAction = action as ReturnType<typeof decrementOrderPositionCount>

      newState = {
        ...state,
        restaurantId: castedDecrementAction?.position?.restaurantId,
        orderStatus: OrderStatus.PREPARING,
        orderState: state.orderState.reduce((acc, orderPos) => {
          const isMatched =
            orderPos?.position?.id === castedDecrementAction.position?.id &&
            orderPos?.position?.selectedVariationId ===
              castedDecrementAction?.position?.selectedVariationId

          if (isMatched) {
            const updatedCount = orderPos.count - 1;
            if (updatedCount > 0) {
              acc.push({ ...orderPos, count: updatedCount });
            }
          } else {
            acc.push(orderPos);
          }
          return acc;
        }, [] as OrderPosition[]),
      };
      break;

    case OrderActionTypes.REMOVE_ORDER_POSITION:
      const castedRemovePositionAction = action as ReturnType<typeof removeOrderPosition>;

      newState = {
        ...state,
        restaurantId: castedRemovePositionAction?.position?.restaurantId,
        orderStatus: OrderStatus.PREPARING,
        orderState: state.orderState.filter((orderPos) => {
          return orderPos?.position?.id !== castedRemovePositionAction.position?.id ||
            orderPos?.position?.selectedVariationId !==
            castedRemovePositionAction.position?.selectedVariationId;
        }),
      };
      break;

      case OrderActionTypes.ADD_ORDER_POSITION:
        const castedAddPositionAction = action as ReturnType<typeof addOrderPosition>;
  
        newState = {
          ...state,
          restaurantId: castedAddPositionAction?.position?.restaurantId,
          orderStatus: OrderStatus.PREPARING,
          orderState: [
            ...state.orderState,
            {
              position: {
                ...castedAddPositionAction.position,
                selectedVariationId: '1'
              },
              count: 1
            }
          ],
        };
        break;

    case OrderActionTypes.CLEAR_ALL_ORDER_POSITIONS:
      newState = {
        restaurantAddress: undefined,
        restaurantName:  undefined,
        restaurantId: undefined,
        orderState: [],
        orderStatus: OrderStatus.PREPARING,
        timestamp: state.timestamp ,
      }
      break

    case OrderActionTypes.CLEAR_AND_START_NEW_ORDER:
      const castedClearAndStartNewOrderAction = action as ReturnType<typeof clearAndStartNewOrder>;

      newState = {
        ...state,
        restaurantId: castedClearAndStartNewOrderAction?.position?.restaurantId,
        orderState: [{ position: castedClearAndStartNewOrderAction.position, count: 1 }],
        orderStatus: OrderStatus.PREPARING,
        timestamp: new Date().getTime()
      }
      break

    case OrderActionTypes.SET_NEW_ORDER_STATUS:
      const castedSetNewOrderStatusAction = action as ReturnType<typeof setNewOrderStatus>;

      newState = {
        ...state,
        orderState: state.orderState,
        orderStatus: castedSetNewOrderStatusAction.newStatus,
        timestamp: new Date().getTime()
      }
      break

    case OrderActionTypes.SET_ORDER_RESTAURANT_INFO:
      const castedSetOrderRestaurantInfoAction = action as ReturnType<typeof setOrderRestaurantInfo>;

      newState = {
        ...state,
        restaurantAddress: castedSetOrderRestaurantInfoAction.restaurantAddress,
        restaurantName: castedSetOrderRestaurantInfoAction.restaurantName,
      }
      break

    default:
      return state
  }

  localStorage.setItem(LocalStorageOrderFields.ORDER_STATE, JSON.stringify(newState));
  return newState
};

export default orderReducer