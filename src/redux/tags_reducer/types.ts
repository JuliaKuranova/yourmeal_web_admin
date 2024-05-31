import { AllergyTag } from "../../assets/constants/content_types/AllergyTag";
import { DietTag } from "../../assets/constants/content_types/DietTag";
import { MediumCheckTag } from "../../assets/constants/content_types/MediumCheckTag";
import { MenuSectionTag } from "../../assets/constants/content_types/MenuSectionTag";
import { RestarauntInfoTag } from "../../assets/constants/content_types/RestarauntInfoTag";

export interface IDietTag {
    id: number;
    tag: DietTag;
}

export interface IAllergyTag {
    id: number;
    tag: AllergyTag;
}

export interface IMenuSectionTag {
    id: number;
    tag: MenuSectionTag;
}

export interface IRestarauntInfoTag {
    id: number;
    tag: RestarauntInfoTag;
}

export interface IMediumCheckTag {
    id: string;
    tag: MediumCheckTag;
}

export interface TagsState {
    dietTags: IDietTag[];
    allergyTags: IAllergyTag[];
    menuSectionTags: IMenuSectionTag[];
    restarauntInfoTags: IRestarauntInfoTag[];
    mediumCheckTags: IMediumCheckTag[];
}