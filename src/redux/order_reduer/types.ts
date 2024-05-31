import { Url } from "url";
import { FoodPositionInOrderInfo, FoodPositionInfo } from "../../assets/constants/content_types/FoodInfo";

export type OrderStatus = 'Создан' | 'Принят' | 'Изменен и принят' | 'Оплачен' | 'Отменен';

export interface Order {
    id: number,
    // time
    date: string,
    status: OrderStatus,
    statusId?: number,
    table: string,
    userId?: number, 
    restaurantId?: number,
    name: string,
    positions: OrderPosition[],
    comment: string
    sum: number;

    // positionImg?: Url;
    // positionName?: string;
    // menuSectionTags?: string;
    // foodVariations 
    // price?: number;
}

export interface OrdersState {
    orders: Order[];
}

export interface OrderPosition {
    position: FoodPositionInOrderInfo;
    count: number;
}

export interface UpdateOrderDto {
    orderId: number;
    user: number;
    foodPositions: FoodPositionInOrderInfo[];
    orderStatus: number;
    restaurant: number;
    table: string;
    comment: string;
}
