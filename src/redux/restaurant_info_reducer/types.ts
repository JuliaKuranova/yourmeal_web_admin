export interface RestaurantInfo {
    id?: number;
    name: string;
    address: string;
    openingTime: string;
    closingTime: string;
    // aroundTheClock:string[];
    mediumCheck: string;
    description: string;
    restaurantInfoTags: string[];
    image: string;
    isPublic: boolean; 
    // rate
    // foodPositions
    // menuSectionsTags
    // positionsOnHome
    // orders
}


export interface RestaurantInfoState {
    restaurantInfo?: RestaurantInfo;
}


export interface UpdateRestaurantInfoDto {
    id: number;
    name: string;
    address: string;
    openingTime: string;
    closingTime: string;
    mediumCheck: number;
    description: string;
    restaurantInfoTags: number[];
    image: File | null;
    isPublic: boolean;
}