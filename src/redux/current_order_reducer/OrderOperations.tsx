import {OrderPosition} from "./CurrentOrderReducer";

export const getProductCountInOrder = (
  orderState: OrderPosition[],
  productId: string | undefined,
  variationId: string | undefined
): number => {
  const product = orderState.find(
    (orderPos) =>
      orderPos.position?.id === productId &&
      orderPos.position?.selectedVariationId === variationId
  );

  return product ? product.count : 0;
};

export const getAllProductVariationsCountInOrder = (orderState: OrderPosition[], productId: string | undefined,): number => {
  if (!productId) {
    return 0
  }

  return orderState
    ?.filter(p => p.position.id === productId)
    .map(p => p.count)
    .reduce((acc, current) => acc + current, 0);
}

export const getTotalProductCountInOrder = (orderState: OrderPosition[]): number => {
  return orderState.reduce((totalCount, orderPos) => totalCount + orderPos.count, 0);
};

export const getTotalOrderPrice = (orderState: OrderPosition[]): number => {
  return orderState.reduce((totalCount, orderPos) =>
    totalCount + ((orderPos?.count || 0) * (orderPos?.position?.foodVariations
      .filter(fv => fv.variationId === orderPos?.position?.selectedVariationId)[0]?.price || 0)), 0
  );
};

export const checkFoodRestaurantBeforeAdding = (orderState: OrderPosition[], foodRestaurantId: string): boolean => {
  return orderState?.length === 0 || new Set([...orderState?.map(p => p?.position?.restaurantId), foodRestaurantId]).size === 1
}

export const formatOrderType = (timestamp: number): string => {
  const dateObject = new Date(timestamp);
  const dateString = dateObject.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const timeString = dateObject.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${dateString}, ${timeString}`.replaceAll('/', '.');
}
