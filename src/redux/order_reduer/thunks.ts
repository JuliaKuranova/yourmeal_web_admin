import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, isAxiosError } from "axios";
import { Order, UpdateOrderDto } from "./types";
import { baseUrl, defaultImage } from "../../assets/constants";
import { FoodPositionInOrderInfo, FoodPositionInfo, FoodVariation } from "../../assets/constants/content_types/FoodInfo";
import { OrderPosition } from "../current_order_reducer/CurrentOrderReducer";


// export const GetOneOrderThunk = createAsyncThunk<Order, { id: string | number }, { rejectValue: string }> (
//     'get/order',
//     async function (conditions: { id: string | number }) {
//         const response = await axios({
//             url: `${baseUrl}/api/orders/${conditions.id}?populate=User,foodPositions,orderStatus,restaurant,foodPositions.foodPosition`,
//             method: 'get'
//         });
//         const data = response.data.data;
//         const attr = data.attributes;
    
//         const result: Order =  {
//             id: data.id,
//             status: attr.status,
//             table: attr.table,
//             name: attr.name,
//             positions: attr.foodPositions.data.map((el: any) => el.attributes.foodPosition.data.attributes.name) ,
//             comment: attr.comment,
//             // sum: attr.sum,
//         };
    
//         return result;
//     }
// );

function convertOrder(el: any) {
    const attr = el.attributes;
    console.log('order attr', attr)
    const order: Order = {
        id: el.id,
        // time
        date: el.attributes.createdAt,
        status: attr.orderStatus.data.attributes.status,
        statusId: attr.orderStatus,
        table: attr.table,
        userId: attr.User.data.id,
        restaurantId: attr.restaurant.data.id,
        name: attr.User.data.attributes.name,
        // positions: attr.foodPositions.data.map((el: any) => el?.attributes?.foodPosition?.data?.attributes?.name),
        positions: attr.foodPositions.data.filter((el: any) => el.attributes.foodPosition.data !== null).map((el: any): OrderPosition | undefined => {
            const pos = el.attributes.foodPosition.data;
            
            const selectedVariationName = pos.attributes.foodVariations?.data?.find((v: any) => v.id == el.attributes.selectedVariationId)?.attributes?.variationName;
            const selectedVariationType = pos.attributes.foodVariations?.data?.find((v: any) => v.id == el.attributes.selectedVariationId)?.attributes?.variationType;
            // const variationSubstr = `(${selectedVariationName})`;

            const selectedVariationPrice = pos.attributes.foodVariations?.data?.find((v: any) => v.id == el.attributes.selectedVariationId)?.attributes?.price;
            
            return {
                // count: attr.foodPositions.data.reduce((acc: number, cur: any) => {
                //     if (cur.attributes.foodPosition.data.id === pos.id && cur.attributes.selectedVariationId === el.attributes.selectedVariationId) {
                //         return acc + 1;
                //     } else {
                //         return acc;
                //     }
                // }, 0),
                count: el.attributes.count,
                position: {
                    id: pos.id,
                    positionInOrderId: el.id,
                    selectedVariationId: el.attributes.selectedVariationId,
                    name: `${pos.attributes.name}`,
                    selectedVariationName,
                    selectedVariationType,
                    price: selectedVariationPrice,
                    image: pos.attributes.image?.data ? `${baseUrl}${pos.attributes.image.data.attributes.url}` : defaultImage,
                    restaurantId: '1',
                    menuSectionTags: pos.attributes.menuSectionTags?.data?.map((t: any) => t.attributes.tag) || [],
                    foodVariations: pos.attributes.foodVariations?.data?.map((v: any): FoodVariation => ({
                        variationId: v.id,
                        variationName: v.attributes.variationName,
                        variationType: v.attributes.variationType,
                        price: v.attributes.price,
                        weight: v.attributes.weight,
                        ingredients: v.attributes.ingredients,
                        description: v.attributes.description,
                        proteinsHundred: v.attributes.proteinsHundred,
                        fatsHundred: v.attributes.fatsHundred,
                        carbohydratesHundred: v.attributes.carbohydratesHundred,
                        caloriesHundred: v.attributes.caloriesHundred,
                        proteins: v.attributes.proteins,
                        fats: v.attributes.fats,
                        carbohydrates: v.attributes.carbohydrates,
                        calories: v.attributes.calories,
                        CFCB: v.attributes.CFCB,
                        restrictedAllergyTags: v.attributes?.restrictedAllergyTags?.data?.map((t: any) => t.attributes.tag) || [],
                        allowedDietsTags: v.attributes?.allowedDietsTags?.data?.map((t: any) => t.attributes.tag) || [],
                    })),
                }
            }
        }),
        comment: attr.comment,
        sum: 0,

        // positionImg?: el.attributes.image?.data ? `${baseUrl}${el.attributes.image.data.attributes.url}` : defaultImage,
        // // positionName?: el.attributes.name,
        // menuSectionTags?: el.attributes.menuSectionTags?.data?.map((t: any) => t.attributes.tag) || [],
        // // foodVariations 
        // price?: attributes.price,
    };

    order.sum = order.positions.reduce((acc, cur) => acc + (cur.position?.price || 0) * cur.count, 0);

    return order;
}

async function getOneOrder(id: number): Promise<Order> {
    const response = await axios({
        url: `${baseUrl}/api/orders/${id}?populate=User,foodPositions,orderStatus,restaurant,foodPositions.foodPosition,foodPositions.foodPosition.image,foodPositions.foodPosition.menuSectionTags,foodPositions.foodPosition.foodVariations.allowedDietsTags,foodPositions.foodPosition.foodVariations.restrictedAllergyTags`,
        method: 'get'
    });
    const data = response.data.data;

    const result = convertOrder(data);

    return result;
}

export const GetOrdersThunk = createAsyncThunk<Order[], undefined, { rejectValue: string }> (
    'get/orders',
    async function () {
        const response = await axios({
            url: `${baseUrl}/api/orders/?populate=User,foodPositions,orderStatus,restaurant,foodPositions.foodPosition,foodPositions.foodPosition.image,foodPositions.foodPosition.menuSectionTags,foodPositions.foodPosition.foodVariations.allowedDietsTags,foodPositions.foodPosition.foodVariations.restrictedAllergyTags`,
            method: 'get'
        });
        const data = response.data.data;
        // const attr = data.attributes;
    
        const result: Order[] =  data.map((el: any) => convertOrder(el));

        result.forEach((order, i) => {
            result[i].sum = order.positions.reduce((acc, cur) => acc + (cur.position?.price || 0) * cur.count, 0)
        })
    
        return result;
    }
);

export const DeleteOrderItemThunk = createAsyncThunk<number, number, { rejectValue: string }> (
    'delete/orders',
    async function (conditions, { rejectWithValue }): Promise<number> {
        console.log('delete order', conditions)
        await axios({
            url: `${baseUrl}/api/orders/${conditions}`,
            method: 'delete'
        });

        return conditions;
    }
)


async function savePositionInOrder(position: FoodPositionInOrderInfo): Promise<number> {
    let hasCandidate: boolean = false;

    if (position.positionInOrderId) {
        try {
            await axios({
                url: `${baseUrl}/api/food-position-in-orders/${position.positionInOrderId}`
            });

            hasCandidate = true;
        } catch (err: any) {
            hasCandidate = false;
        }
    }

    
    const response = await axios({
        url: `${baseUrl}/api/food-position-in-orders/${hasCandidate ? position.positionInOrderId : ''}`,
        method: hasCandidate ? 'put' : 'post',
        data: {
            data: {
                foodPosition: position.id,
                selectedVariationId: position.selectedVariationId.toString(),
                count: position.count,
            }
        }
    });

    return response.data.data.id;
}

// SaveOrderDto

export const UpdateOrderThunk = createAsyncThunk<Order, UpdateOrderDto, { rejectValue: string }> (
    'update/orders',
    async function (conditions, { rejectWithValue }): Promise<Order> {
        console.log('update order dto', conditions)
        const positionInOrderIds = [];
        for (let position of conditions.foodPositions) {
            const id = await savePositionInOrder(position);
            positionInOrderIds.push(id);
        }

        await axios({
            url: `${baseUrl}/api/orders/${conditions.orderId}`,
            method: 'put',
            data: {
                data: {
                    User: conditions.user,
                    orderStatus: conditions.orderStatus,
                    restaurant: conditions.restaurant,
                    table: conditions.table,
                    comment: conditions.comment,
                    foodPositions: positionInOrderIds
                }
            }
        });

        const updatedOrder = getOneOrder(conditions.orderId);

        return updatedOrder;
    }
);
