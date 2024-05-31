// import {DietTag} from "../../constants/content_types/DietTag";
import { AllergyTag } from "../assets/constants/content_types/AllergyTag";
import { DietTag } from "../assets/constants/content_types/DietTag";
// import {AllergyTag} from "../../constants/content_types/AllergyTag";

export enum LocalStorageDietPreferencesFields {
  USER_PREFERENCES = 'USER_PREFERENCES'
}

export interface PreferencesState {
  diet: DietTag[]
  allergy: AllergyTag[]
}

enum PreferencesActionTypes {
  ADD_DIET_TAG = 'ADD_DIET_TAG',
  REMOVE_DIET_TAG = 'REMOVE_DIET_TAG',
  CLEAR_ALL_DIET_TAGS = 'CLEAR_ALL_DIET_TAGS',
  ADD_ALLERGY_TAG = 'ADD_ALLERGY_TAG',
  REMOVE_ALLERGY_TAG = 'REMOVE_ALLERGY_TAG',
  CLEAR_ALL_ALLERGY_TAGS = 'CLEAR_ALL_ALLERGY_TAGS',
  CLEAR_ALL_PREFERENCES_TAGS = 'CLEAR_ALL_PREFERENCES_TAGS'
}

const storedPreferences = localStorage.getItem(LocalStorageDietPreferencesFields.USER_PREFERENCES);
const initialState: PreferencesState = JSON.parse(storedPreferences || JSON.stringify({ diet: [], allergy: [] }))

export const addDietTag = (newTag: DietTag) => ({
  type: PreferencesActionTypes.ADD_DIET_TAG,
  newTag: newTag
});

export const removeDietTag = (tagToRemove: DietTag) => ({
  type: PreferencesActionTypes.REMOVE_DIET_TAG,
  tagToRemove: tagToRemove
});

export const clearAllDietTags = () => ({
  type: PreferencesActionTypes.CLEAR_ALL_DIET_TAGS,
});

export const addAllergyTag = (newTag: AllergyTag) => ({
  type: PreferencesActionTypes.ADD_ALLERGY_TAG,
  newTag: newTag
});

export const removeAllergyTag = (tagToRemove: AllergyTag) => ({
  type: PreferencesActionTypes.REMOVE_ALLERGY_TAG,
  tagToRemove: tagToRemove
});

export const clearAllAllergyTags = () => ({
  type: PreferencesActionTypes.CLEAR_ALL_ALLERGY_TAGS,
});

export const clearAllPreferencesTags = () => ({
  type: PreferencesActionTypes.CLEAR_ALL_PREFERENCES_TAGS,
});


const preferencesReducer = (
  state = initialState,
  action: ReturnType<typeof addDietTag>
    | ReturnType<typeof removeDietTag>
    | ReturnType<typeof clearAllDietTags>
    | ReturnType<typeof addAllergyTag>
    | ReturnType<typeof removeAllergyTag>
    | ReturnType<typeof clearAllAllergyTags>
    | ReturnType<typeof clearAllPreferencesTags>
): PreferencesState => {
  let newState: PreferencesState

  switch (action.type) {
    case PreferencesActionTypes.ADD_DIET_TAG:
      newState = { ...state, diet: Array.from(new Set([...state.diet, ...[(action as ReturnType<typeof addDietTag>).newTag]])) }
      break
    case PreferencesActionTypes.REMOVE_DIET_TAG:
      newState = { ...state, diet: state.diet.filter(p => p !== (action as ReturnType<typeof removeDietTag>).tagToRemove) }
      break
    case PreferencesActionTypes.CLEAR_ALL_DIET_TAGS:
      newState = { ...state, diet: [] }
      break
    case PreferencesActionTypes.ADD_ALLERGY_TAG:
      newState = { ...state, allergy: Array.from(new Set([...state.allergy, ...[(action as ReturnType<typeof addAllergyTag>).newTag]])) }
      break
    case PreferencesActionTypes.REMOVE_ALLERGY_TAG:
      newState = { ...state, allergy: state.allergy.filter(p => p !== (action as ReturnType<typeof removeAllergyTag>).tagToRemove) }
      break
    case PreferencesActionTypes.CLEAR_ALL_ALLERGY_TAGS:
      newState = { ...state, allergy: [] }
      break
    case PreferencesActionTypes.CLEAR_ALL_PREFERENCES_TAGS:
      newState = { diet: [], allergy: [] }
      break
    default:
      return state
  }

  localStorage.setItem(LocalStorageDietPreferencesFields.USER_PREFERENCES, JSON.stringify(newState));
  return newState
};

export default preferencesReducer
