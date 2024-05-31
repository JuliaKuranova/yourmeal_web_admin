import { useState } from "react";
import CloseButton, {
  CloseButtonSize,
} from "../buttons/close_button/CloseButton";
import PromptButton from "../buttons/prompt_button/PromptButton";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType,
} from "../buttons/standard_button/StandardButton";
import ModalWindow from "../modal_window/ModalWindow";
import Prompt from "../prompt/Prompt";
import "./PositionEditing.css";
// import PreferencesButton from "../buttons/preferences_button/PreferencesButton";
import DietCheckboxes from "../checkboxes/DietCheckboxes";
import AllergyCheckboxes from "../checkboxes/AllergyCheckboxes";
import CustomInput from "../inputs/plain_input/CustomInput";
import {
  FoodPositionInOrderInfo,
  FoodPositionInfo,
  FoodVariation,
  VariationType,
} from "../../../assets/constants/content_types/FoodInfo";
import * as Yup from "yup";
import { useFormik, getIn } from "formik";
import axios from "axios";
import ImageUploader from "../inputs/uploader/ImageUploader";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/ReduxStore";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../hooks/redux";
import {
  SaveFoodPositionThunk,
  UpdateFoodPositionThunk,
} from "../../../redux/position_reducer/thunks";
import {
  UpdateFoodPositionDto,
  UpdateFoodVariationDto,
} from "../../../redux/position_reducer/types";
import Photo from "../photo/Photo";
import { DietTag } from "../../../assets/constants/content_types/DietTag";
import { AllergyTag } from "../../../assets/constants/content_types/AllergyTag";

interface PositionEditingProps {
  isOpen: boolean;
  position: FoodPositionInfo | undefined;
  onClose: () => void;
}

const defaultVariation = {
  variationId: "",
  optionName: "",
  price: "123",
  weight: "323",
  caloriesHundred: "2312",
  proteinsHundred: "1231",
  fatsHundred: "2323",
  carbohydratesHundred: "123123",
  caloriesAll: "2323",
  proteinsAll: "12323",
  fatsAll: "123123",
  carbohydratesAll: "231",
  description: "выафыва",
  ingredients: "фыа",
  CFCB: "132",
  variationType: "STANDARD",
  restrictedAllergyTags: [],
  allowedDietsTags: [],
};

const PositionEditing = (props: PositionEditingProps) => {
  const [isLoading, setLoading] = useState(false);
  const [isPromptOpen, setPromptOpen] = useState(false);
  const [isPromptOpen2, setPromptOpen2] = useState(false);
  const [isPromptOpen3, setPromptOpen3] = useState(false);
  const [isPromptOpen4, setPromptOpen4] = useState(false);
  const [isPromptOpen5, setPromptOpen5] = useState(false);

  const dietTags = useSelector((state: RootState) => state.tags.dietTags);
  const allergyTags = useSelector((state: RootState) => state.tags.allergyTags);
  const dispatch = useAppDispatch();

  // console.log("position", props.position);

  // const variationForms = props.position?.foodVariations?.map((variation) => {
  //   return useFormik({});
  // });

  const editForm = useFormik({
    initialValues: {
      id: props.position?.id || "",
      positionName: props.position?.name || "",
      // groupPosition: props.position?.menuSectionTags[0] || "",
      groupPosition: props.position?.groupPosition || '',
      // additionalGroup: props.position?.menuSectionTags.slice(1).join(", ") || "",
      additionalGroup: props.position?.additionalGroup || '',
      image: undefined,
      inMenu: props.position?.inMenu,

      foodVariations:
        props.position?.foodVariations?.map((variation) => ({
          variationId: variation.variationId,
          optionName: variation.variationName || "",
          price: variation.price || "123",
          weight: variation.weight || "123",
          caloriesHundred: variation.caloriesHundred || "231",
          proteinsHundred: variation.proteinsHundred || "123",
          fatsHundred: variation.fatsHundred || "123",
          carbohydratesHundred: variation.carbohydratesHundred || "323",
          caloriesAll: variation.calories || "123",
          proteinsAll: variation.proteins || "32",
          fatsAll: variation.fats || "132",
          carbohydratesAll: variation.carbohydrates || "3213",
          description: variation.description || "фывафыва",
          ingredients: variation.ingredients || "фывафыа",
          CFCB: variation.CFCB,
          variationType: variation.variationType,
          restrictedAllergyTags: variation.restrictedAllergyTags || [],
          allowedDietsTags: variation.allowedDietsTags || [],
        })) || [],
    },
    validationSchema: Yup.object().shape({
      // id: Yup.number().required(),
      positionName: Yup.string()
        .required("Обязательное поле")
        .min(3, "Имя должно быть длиннее 1 символа"),
      groupPosition: Yup.string()
        .required("Обязательное поле")
        .min(3, "Имя должно быть длиннее 1 символа"),

      foodVariations: Yup.array().of(
        Yup.object({
          optionName: Yup.string()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          price: Yup.number()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          weight: Yup.number()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          caloriesHundred: Yup.number()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          proteinsHundred: Yup.number()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          fatsHundred: Yup.number()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          caloriesAll: Yup.number()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          proteinsAll: Yup.number()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          fatsAll: Yup.number()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          carbohydratesAll: Yup.number()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          carbohydratesHundred: Yup.number()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
          description: Yup.string()
            .required("Обязательное поле")
            .min(3, "Имя должно быть длиннее 1 символа"),
        })
      ),
    }),
    onSubmit: () => {
      setLoading(true);
      console.log("Sending request...");
      const updateVariationDtos: UpdateFoodVariationDto[] =
        editForm.values.foodVariations.map((variation, index) => {
          return {
            ...variation,
            price: Number(variation.price),
            weight: Number(variation.weight),
            variationName: variation.optionName,
            proteins: Number(variation.proteinsAll),
            fats: Number(variation.fatsAll),
            carbohydrates: Number(variation.carbohydratesAll),
            calories: Number(variation.caloriesAll),
            proteinsHundred: Number(variation.proteinsHundred),
            fatsHundred: Number(variation.fatsHundred),
            carbohydratesHundred: Number(variation.carbohydratesHundred),
            caloriesHundred: Number(variation.caloriesHundred),
            CFCB: variation.CFCB,
            variationType: index === 0 ? VariationType.STANDARD : VariationType.CUSTOM,
            allowedDietsTags: variation.allowedDietsTags
              .map((tagName) => dietTags.find((el) => el.tag === tagName)?.id)
              .filter((el) => el !== undefined) as number[],
            restrictedAllergyTags: variation.restrictedAllergyTags
              .map(
                (tagName) => allergyTags.find((el) => el.tag === tagName)?.id
              )
              .filter((el) => el !== undefined) as number[],
          };
        });
      const dto: UpdateFoodPositionDto = {
        ...editForm.values,
        name: editForm.values.positionName,
        restaurantId: props.position?.restaurantId || "1",
        foodVariations: updateVariationDtos,
        inMenu: editForm.values.inMenu || false,
        // menuSectionTags: [editForm.values.groupPosition, ...editForm.values.additionalGroup.split(',')]
      };
      console.log("update dto", dto);
      dispatch(SaveFoodPositionThunk(dto));
      props.onClose();
      setTimeout(() => setLoading(false), 2000);
    },
  });

  const removeVariation = ((variationId: number) => {
    const filtred = editForm.values.foodVariations.filter((v: any) => Number(v.variationId) != variationId);
    editForm.setFieldValue('foodVariations', filtred);
  });

  if (!props.position) {
    return <></>;
  }

  return (
    <ModalWindow isOpen={props.isOpen} onClose={props.onClose}>
      <div className="edit-order__wrapper">
        <div className="edit-order__top">
          <div className="h2">
            <span>Позиция</span>
            <span>#{props.position.id}</span>
          </div>

          <div onClick={props.onClose} className="edit-order__close-btn">
            <CloseButton
              size={CloseButtonSize.BIG}
              onClickAction={() => {}}
              defaultColor={"transparent"}
            />
          </div>
        </div>

        <form onSubmit={editForm.handleSubmit} className="edit-section">
          <div className="edit-section">
            <div className="order__title">
              <span>Название и категория</span>
              <PromptButton onClick={() => setPromptOpen(true)} />
              <Prompt
                isOpen={isPromptOpen}
                onClose={() => setPromptOpen(false)}
                title={"Название и категория"}
                subtitle={`Название будет общее для всех вариантов. Варианты гостю отражаются отдельным списком для выбора. По умолчанию любая позиция — это один Основной вариант, а список появляется, если вы создадите второй и более.
              <br>
              Группировка позволяет рассортировать меню по тэгам: основные блюда, десерты, напитки, пицца, выпечка… Смотря, как организовано в вашем заведении. Если позиция в нескольких группах (например, «Сезонное меню» и «Десерты», вы можете добавить её несколько раз.`}
              />
            </div>

            <div className="section-edit-input">
              <CustomInput
                id={"positionName"}
                value={editForm.values.positionName}
                onChange={editForm.handleChange}
                error={
                  editForm.touched.positionName && editForm.errors.positionName
                    ? editForm.errors.positionName
                    : undefined
                }
                onBlur={editForm.handleBlur}
                placeholder={"Название позиции"}
                material={true}
              />
              <CustomInput
                id={"groupPosition"}
                value={editForm.values.groupPosition}
                onChange={editForm.handleChange}
                error={
                  editForm.touched.groupPosition &&
                  editForm.errors.groupPosition
                    ? editForm.errors.groupPosition
                    : undefined
                }
                onBlur={editForm.handleBlur}
                placeholder={`Группа позиции (тэг сортировки в меню)`}
                material={true}
              />
              <CustomInput
                id={"additionalGroup"}
                value={editForm.values.additionalGroup}
                onChange={editForm.handleChange}
                error={
                  editForm.touched.groupPosition &&
                  editForm.errors.groupPosition
                    ? editForm.errors.groupPosition
                    : undefined
                }
                placeholder={"Доп. группа (не обязательно)"}
                material={true}
              />
            </div>
          </div>

          {editForm.values.foodVariations?.map((variation, index) => (
            <div key={variation.variationId} className="edit-section">
              <div className="edit-section">
                <div className="order__title">
                  <span>
                    {index === 0 ? "Основной " : ""}вариант{" "}
                    {index > 0 ? index + 1 : ""}
                  </span>
                  <PromptButton onClick={() => setPromptOpen2(true)} />
                  <Prompt
                    isOpen={isPromptOpen2}
                    onClose={() => setPromptOpen2(false)}
                    title={"Информация о позиции"}
                    subtitle={`Первый вариант по умолчанию называется стандартным (даже если он один и дополнительных вариантов нет). Вы можете изменить название, но показано оно будет только если вы создадите несколько вариантов.
                    
                    Для каждого варианта укажите стоимость и данные КБЖУ.
                    
                    Описание должно быть кратким и информативным.
                    
                    Пожалуйста, проставляйте галочки фильтров внимательно: это очень важная информация, помогающая людям со специальными запросами.`}
                  />
                </div>

                <div className="section-edit-input">
                  <CustomInput
                    id={`foodVariations[${index}].optionName`}
                    value={variation.optionName}
                    onChange={editForm.handleChange}
                    error={
                      getIn(
                        editForm.touched,
                        `foodVariations[${index}].optionName`,
                        false
                      ) &&
                      getIn(
                        editForm.errors,
                        `foodVariations[${index}].optionName`,
                        false
                      )
                        ? getIn(
                            editForm.errors,
                            `foodVariations[${index}].optionName`
                          )
                        : undefined
                    }
                    onBlur={editForm.handleBlur}
                    placeholder={"Название варианта"}
                    material={true}
                  />

                  <CustomInput
                    id={`foodVariations[${index}].price`}
                    value={variation.price}
                    onChange={editForm.handleChange}
                    error={
                      getIn(
                        editForm.touched,
                        `foodVariations[${index}].price`,
                        false
                      ) &&
                      getIn(
                        editForm.errors,
                        `foodVariations[${index}].price`,
                        false
                      )
                        ? getIn(
                            editForm.errors,
                            `foodVariations[${index}].price`
                          )
                        : undefined
                    }
                    onBlur={editForm.handleBlur}
                    placeholder={"Цена, руб"}
                    material={true}
                    type="number"
                  />
                </div>

                <div className="section-edit-input">
                  <CustomInput
                    id={`foodVariations[${index}].weight`}
                    value={variation.weight}
                    onChange={editForm.handleChange}
                    error={
                      getIn(
                        editForm.touched,
                        `foodVariations[${index}].weight`,
                        false
                      ) &&
                      getIn(
                        editForm.errors,
                        `foodVariations[${index}].weight`,
                        false
                      )
                        ? getIn(
                            editForm.errors,
                            `foodVariations[${index}].weight`
                          )
                        : undefined
                    }
                    onBlur={editForm.handleBlur}
                    placeholder={"Вес, граммов"}
                    material={true}
                    type="number"
                  />

                  <div className="section-edit-input_CFCB">
                    <CustomInput
                      id={`foodVariations[${index}].caloriesHundred`}
                      value={variation.caloriesHundred}
                      onChange={editForm.handleChange}
                      error={
                        getIn(
                          editForm.touched,
                          `foodVariations[${index}].caloriesHundred`,
                          false
                        ) &&
                        getIn(
                          editForm.errors,
                          `foodVariations[${index}].caloriesHundred`,
                          false
                        )
                          ? getIn(
                              editForm.errors,
                              `foodVariations[${index}].caloriesHundred`
                            )
                          : undefined
                      }
                      onBlur={editForm.handleBlur}
                      placeholder={"Калории на 100 г"}
                      material={true}
                      type="number"
                    />
                    <CustomInput
                      id={`foodVariations[${index}].proteinsHundred`}
                      value={variation.proteinsHundred}
                      onChange={editForm.handleChange}
                      error={
                        getIn(
                          editForm.touched,
                          `foodVariations[${index}].proteinsHundred`,
                          false
                        ) &&
                        getIn(
                          editForm.errors,
                          `foodVariations[${index}].proteinsHundred`,
                          false
                        )
                          ? getIn(
                              editForm.errors,
                              `foodVariations[${index}].proteinsHundred`
                            )
                          : undefined
                      }
                      onBlur={editForm.handleBlur}
                      placeholder={"Белки на 100 г"}
                      material={true}
                      type="number"
                    />
                    <CustomInput
                      id={`foodVariations[${index}].fatsHundred`}
                      value={variation.fatsHundred}
                      onChange={editForm.handleChange}
                      error={
                        getIn(
                          editForm.touched,
                          `foodVariations[${index}].fatsHundred`,
                          false
                        ) &&
                        getIn(
                          editForm.errors,
                          `foodVariations[${index}].fatsHundred`,
                          false
                        )
                          ? getIn(
                              editForm.errors,
                              `foodVariations[${index}].fatsHundred`
                            )
                          : undefined
                      }
                      onBlur={editForm.handleBlur}
                      placeholder={"Жиры на 100 г"}
                      material={true}
                      type="number"
                    />
                    <CustomInput
                      id={`foodVariations[${index}].carbohydratesHundred`}
                      value={variation.carbohydratesHundred}
                      onChange={editForm.handleChange}
                      error={
                        getIn(
                          editForm.touched,
                          `foodVariations[${index}].carbohydratesHundred`,
                          false
                        ) &&
                        getIn(
                          editForm.errors,
                          `foodVariations[${index}].carbohydratesHundred`,
                          false
                        )
                          ? getIn(
                              editForm.errors,
                              `foodVariations[${index}].carbohydratesHundred`
                            )
                          : undefined
                      }
                      onBlur={editForm.handleBlur}
                      placeholder={"Углеводы на 100 г"}
                      material={true}
                      type="number"
                    />
                    <CustomInput
                      id={`foodVariations[${index}].caloriesAll`}
                      value={variation.caloriesAll}
                      onChange={editForm.handleChange}
                      error={
                        getIn(
                          editForm.touched,
                          `foodVariations[${index}].caloriesAll`,
                          false
                        ) &&
                        getIn(
                          editForm.errors,
                          `foodVariations[${index}].caloriesAll`,
                          false
                        )
                          ? getIn(
                              editForm.errors,
                              `foodVariations[${index}].caloriesAll`
                            )
                          : undefined
                      }
                      onBlur={editForm.handleBlur}
                      placeholder={"Калории суммарно"}
                      material={true}
                      type="number"
                    />

                    <CustomInput
                      id={`foodVariations[${index}].proteinsAll`}
                      value={variation.proteinsAll}
                      onChange={editForm.handleChange}
                      error={
                        getIn(
                          editForm.touched,
                          `foodVariations[${index}].proteinsAll`,
                          false
                        ) &&
                        getIn(
                          editForm.errors,
                          `foodVariations[${index}].proteinsAll`,
                          false
                        )
                          ? getIn(
                              editForm.errors,
                              `foodVariations[${index}].proteinsAll`
                            )
                          : undefined
                      }
                      onBlur={editForm.handleBlur}
                      placeholder={"Белки суммарно"}
                      material={true}
                      type="number"
                    />
                    <CustomInput
                      id={`foodVariations[${index}].fatsAll`}
                      value={variation.fatsAll}
                      onChange={editForm.handleChange}
                      error={
                        getIn(
                          editForm.touched,
                          `foodVariations[${index}].fatsAll`,
                          false
                        ) &&
                        getIn(
                          editForm.errors,
                          `foodVariations[${index}].fatsAll`,
                          false
                        )
                          ? getIn(
                              editForm.errors,
                              `foodVariations[${index}].fatsAll`
                            )
                          : undefined
                      }
                      onBlur={editForm.handleBlur}
                      placeholder={"Жиры суммарно"}
                      material={true}
                      type="number"
                    />
                    <CustomInput
                      id={`foodVariations[${index}].carbohydratesAll`}
                      value={variation.carbohydratesAll}
                      onChange={editForm.handleChange}
                      error={
                        getIn(
                          editForm.touched,
                          `foodVariations[${index}].carbohydratesAll`,
                          false
                        ) &&
                        getIn(
                          editForm.errors,
                          `foodVariations[${index}].carbohydratesAll`,
                          false
                        )
                          ? getIn(
                              editForm.errors,
                              `foodVariations[${index}].carbohydratesAll`
                            )
                          : undefined
                      }
                      onBlur={editForm.handleBlur}
                      placeholder={"Углеводы суммарно"}
                      material={true}
                      type="number"
                    />
                  </div>
                </div>
                <CustomInput
                  id={`foodVariations[${index}].description`}
                  // value={`В вихре современных вкусов и стильного дизайна заслуживает внимания наш модный ресторан, где гастрономические изыски и эстетика сочетаются в гармонии. Отпустите свои чувства на волнение инноваций, наслаждаясь изысканными блюдами, созданными нашим талантливым шеф-поваром, чьи кулинарные творения становятся настоящим произведением искусства.`}
                  value={variation.description}
                  // onChange={editForm.description}
                  onChange={editForm.handleChange}
                  error={
                    getIn(
                      editForm.touched,
                      `foodVariations[${index}].description`,
                      false
                    ) &&
                    getIn(
                      editForm.errors,
                      `foodVariations[${index}].description`,
                      false
                    )
                      ? getIn(
                          editForm.errors,
                          `foodVariations[${index}].description`
                        )
                      : undefined
                  }
                  // onBlur={editForm.description}
                  placeholder={"Короткое описание"}
                  material={true}
                  multiline={true}
                />
                <CustomInput
                  id={`foodVariations[${index}].ingredients`}
                  value={variation.ingredients}
                  // onChange={editForm.ingredients}
                  onChange={editForm.handleChange}
                  error={
                    getIn(
                      editForm.touched,
                      `foodVariations[${index}].ingredients`,
                      false
                    ) &&
                    getIn(
                      editForm.errors,
                      `foodVariations[${index}].ingredients`,
                      false
                    )
                      ? getIn(
                          editForm.errors,
                          `foodVariations[${index}].ingredients`
                        )
                      : undefined
                  }
                  // onBlur={editForm.ingredients}
                  placeholder={"Состав (ингредиенты)"}
                  material={true}
                  multiline={true}
                />
                {/* <textarea id="story" name="story" value={"Хрустящий и сочный картофель фри на выбор – с трюфельным маслом или с сыром."}></textarea> */}
              </div>

              <div className="edit-section">
                <div className="order__title">
                  <span>Показывать в фильтрах</span>
                  <PromptButton onClick={() => setPromptOpen3(true)} />
                  <Prompt
                    isOpen={isPromptOpen3}
                    onClose={() => setPromptOpen3(false)}
                    title={"gdrbgd"}
                    subtitle={`dnndn`}
                  />
                </div>

                <div>
                  <DietCheckboxes
                    name="allowedDietsTags"
                    selected={variation.allowedDietsTags}
                    onChange={(value: DietTag) => {
                      const selectedTags = variation.allowedDietsTags;
                      selectedTags.includes(value)
                        ? editForm.setFieldValue(
                            `foodVariations[${index}].allowedDietsTags`,
                            selectedTags.filter((tag) => tag !== value)
                          )
                        : editForm.setFieldValue(
                            `foodVariations[${index}].allowedDietsTags`,
                            [...selectedTags, value]
                          );
                    }}
                  />
                </div>
              </div>

              <div className="edit-section">
                <div className="order__title">
                  <span>Содержит аллергены</span>
                  <PromptButton onClick={() => setPromptOpen4(true)} />
                  <Prompt
                    isOpen={isPromptOpen4}
                    onClose={() => setPromptOpen4(false)}
                    title={"gdrbgd"}
                    subtitle={`dnndn`}
                  />
                </div>

                <div>
                  <AllergyCheckboxes
                    name="restrictedAllergyTags"
                    selected={variation.restrictedAllergyTags}
                    onChange={(value: AllergyTag) => {
                      const selectedTags = variation.restrictedAllergyTags;
                      selectedTags.includes(value)
                        ? editForm.setFieldValue(
                            `foodVariations[${index}].restrictedAllergyTags`,
                            selectedTags.filter((tag) => tag !== value)
                          )
                        : editForm.setFieldValue(
                            `foodVariations[${index}].restrictedAllergyTags`,
                            [...selectedTags, value]
                          );
                    }}
                  />
                </div>

                {(index !== 0) ? (
                  <div className="btn-w-right">
                    <StandardButton
                      onClickAction={() => removeVariation(Number(variation.variationId))}
                      text={"Удалить вариант"}
                      color={StandardButtonColor.GRAY}
                      iconType={StandardButtonIconType.TRASH}
                      iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                    />
                  </div>
              ) : null }
              </div>
            </div>


          ))}

          <div className="btn-w-right">
             
            <StandardButton
              onClickAction={() =>
                editForm.setFieldValue("foodVariations", [
                  ...editForm.values.foodVariations,
                  defaultVariation,
                ])
              }
              text={"Создать ещё вариант"}
              color={StandardButtonColor.GRAY}
              iconType={StandardButtonIconType.DARK_PLUS}
              iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
            />
          </div>
          {/* 
          <div className="edit-section">
            <div className="order__title">
              <span>Фотография</span>
              <PromptButton onClick={() => setPromptOpen5(true)} />
              <Prompt
                isOpen={isPromptOpen5}
                onClose={() => setPromptOpen5(false)}
                title={"gdrbgd"}
                subtitle={`dnndn`}
              />
            </div>

            <img src={props.position.image} />

            <div className="btn-w-right">
              <ImageUploader 
                isImageLoaded={false}
                onChange={event => editForm.setFieldValue('image', event.currentTarget.files ? event.currentTarget.files[0] : undefined)}
                onSubmit={() => {}}
              />
              <StandardButton
                onClickAction={editForm.handleSubmit}
                text={"Сохранить"}
                color={StandardButtonColor.GREEN}
                iconType={StandardButtonIconType.NO_ICON}
                iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
              />
            </div>
          </div> */}
          {/* <button type="submit">Save</button> */}

          <div className="edit-order__section">
            <Photo
              id={"photoPosition"}
              onChange={(event) => {
                if (event.currentTarget.files) {
                  editForm.setFieldValue("image", event.currentTarget.files[0]);
                }
              }}
              promptSubtitle={
                "Фотография должна быть чёткая, непосредственно демонстрирующая блюдо, подходящая под обрезку с квадратным соотношением сторон."
              }
              img={
                editForm.values.image
                  ? URL.createObjectURL(editForm.values.image)
                  : props.position.image
              }
            />
          </div>

            <div className="btn-w-right">
              <StandardButton
                onClickAction={editForm.handleSubmit}
                text={"Сохранить изменения"}
                color={StandardButtonColor.GREEN}
                iconType={StandardButtonIconType.NO_ICON}
                iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
                notFullWidth={true}
              />
            </div>

        </form>
        {/* 
        <div className="edit-order__btns" onClick={props.onClose}>
          <div className="first">
            <StandardButton
              onClickAction={() => true}
              text={"Отменить и вернуться"}
              color={StandardButtonColor.GRAY}
              iconType={StandardButtonIconType.NO_ICON}
              iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
              notFullWidth={true}
            />
          </div>
          <div className="last">
            <StandardButton
              onClickAction={() => true}
              text={"Сохранить изменения"}
              color={StandardButtonColor.GREEN}
              iconType={StandardButtonIconType.NO_ICON}
              iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
              notFullWidth={true}
            />
          </div>
        </div> */}
      </div>
    </ModalWindow>
  );
};

export default PositionEditing;
