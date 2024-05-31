import { useFormik } from "formik";
import {
  RestaurantInfo,
  UpdateRestaurantInfoDto,
} from "../../../redux/restaurant_info_reducer/types";
import CustomInput from "../inputs/plain_input/CustomInput";
import DropDown, { Option } from "../dropdown/DropDown";
import CustomCheckBox from "../buttons/checkbox/CustomCheckBox";
import PromptButton from "../buttons/prompt_button/PromptButton";
import Prompt from "../prompt/Prompt";
import { useEffect, useState } from "react";
import TagList from "../checkboxes/tag-list/TagList";
import Photo from "../photo/Photo";
import { defaultImage, workingTime } from "../../../assets/constants";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType,
} from "../buttons/standard_button/StandardButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/ReduxStore";
import {
  GetMediumCheckTagsThunk,
  GetRestarauntInfoTagsThunk,
} from "../../../redux/tags_reducer/thunks";
import { useAppDispatch } from "../../../hooks/redux";
import { UpdateRestaurantInfoThunk } from "../../../redux/restaurant_info_reducer/thunks";

interface EditRestaurantFormProps {
  restaurantInfo: RestaurantInfo;
}

export default function EditRestaurantForm(props: EditRestaurantFormProps) {
  const editRestaurantForm = useFormik({
    initialValues: {
      // id: restaurantInfo.id,
      name: props.restaurantInfo?.name || "",
      address: props.restaurantInfo?.address || "",
      openingTime: props.restaurantInfo?.openingTime || "",
      closingTime: props.restaurantInfo?.closingTime || "",
      // aroundTheClock: props.restaurantInfo?.aroundTheClock || "",
      mediumCheck: props.restaurantInfo?.mediumCheck || "",
      description: props.restaurantInfo?.description || "",
      restaurantInfoTags: props.restaurantInfo?.restaurantInfoTags || "",
      // photoRestaraunt: restarauntInfo.image,
      isPublic: props.restaurantInfo?.isPublic || false,
      image: null,
    },

    // validationSchema: Yup.object().shape({}),

    onSubmit: () => {
      console.log("submiting...");
      const dto: UpdateRestaurantInfoDto = {
        ...editRestaurantForm.values,
        mediumCheck: Number(
          mediumChecks.find(
            (check) => check.tag === editRestaurantForm.values.mediumCheck
          )?.id
        ),
        restaurantInfoTags: editRestaurantForm.values.restaurantInfoTags
          .map((tagName) => tags.find((el) => el.tag === tagName)?.id)
          .filter((el) => el !== undefined) as number[],
        id: Number(props.restaurantInfo.id),
        // mediumCheck: 1
      };
      console.log("dto", dto);
      dispatch(UpdateRestaurantInfoThunk(dto));
    },
  });

  const [isPromptOpen, setPromptOpen] = useState(false);
  const tags = useSelector((state: RootState) => state.tags.restarauntInfoTags);
  const mediumChecks = useSelector(
    (state: RootState) => state.tags.mediumCheckTags
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetRestarauntInfoTagsThunk());
    dispatch(GetMediumCheckTagsThunk());
  }, [dispatch]);
  console.log(editRestaurantForm.values);
  console.log(editRestaurantForm.errors);

  return (
    <div className="edit-order__wrapper position-menu-wrapper">
      <div className="edit-order__section">
        <div className="order__title">
          <span>Информация о заведении</span>
        </div>

        <div className="section-edit-input">
          <CustomInput
            id={"name"}
            value={editRestaurantForm.values.name}
            onChange={editRestaurantForm.handleChange}
            error={
              editRestaurantForm.touched.name && editRestaurantForm.errors.name
                ? editRestaurantForm.errors.name
                : undefined
            }
            onBlur={editRestaurantForm.handleBlur}
            placeholder={"Название заведения"}
            material={true}
          />

          <CustomInput
            id={"address"}
            value={editRestaurantForm.values.address}
            onChange={editRestaurantForm.handleChange}
            error={
              editRestaurantForm.touched.address &&
              editRestaurantForm.errors.address
                ? editRestaurantForm.errors.address
                : undefined
            }
            onBlur={editRestaurantForm.handleBlur}
            placeholder={"Адрес заведения"}
            material={true}
          />

          <div className="wrapp-dropdown">
            <DropDown
              id="openingTime"
              selectedOption={workingTime.find(
                (option) =>
                  option.value === editRestaurantForm.values.openingTime
              )}
              options={workingTime}
              onSelect={(option: Option) => {
                editRestaurantForm.setFieldValue("openingTime", option.value);
              }}
              title={"Время работы, от "}
            />
            <DropDown
              id="closingTime"
              selectedOption={workingTime.find(
                (option) =>
                  option.value === editRestaurantForm.values.closingTime
              )}
              options={workingTime}
              onSelect={(option: Option) => {
                editRestaurantForm.setFieldValue("closingTime", option.value);
              }}
              title={"Время работы, до "}
            />
          </div>

          <CustomCheckBox
            id="aroundTheClock"
            checked={
              editRestaurantForm.values.openingTime === "00:00:00" &&
              editRestaurantForm.values.closingTime === "23:59:59"
            }
            onChange={() => {
              editRestaurantForm.setFieldValue("openingTime", "00:00:00");
              editRestaurantForm.setFieldValue("closingTime", "23:59:59");
            }}
            text="Круглосуточно"
          />

          <DropDown
            id="mediumCheck"
            selectedOption={(() => {
              const selected = mediumChecks.find(
                (check) => check.tag === editRestaurantForm.values.mediumCheck
              );
              return selected
                ? { label: selected.tag, value: selected.tag }
                : undefined;
            })()}
            // onChange={editRestaurantForm.handleChange}
            options={mediumChecks.map((check) => {
              return {
                label: check.tag,
                value: check.tag,
              };
            })}
            onSelect={(option: Option) => {
              editRestaurantForm.setFieldValue("mediumCheck", option.value);
            }}
            title={"Средний чек"}
          />

          <CustomInput
            id={"description"}
            value={editRestaurantForm.values.description}
            onChange={editRestaurantForm.handleChange}
            error={
              editRestaurantForm.touched.description &&
              editRestaurantForm.errors.address
                ? editRestaurantForm.errors.description
                : undefined
            }
            onBlur={editRestaurantForm.handleBlur}
            placeholder={"Короткое описание"}
            material={true}
            multiline={true}
          />

          <CustomCheckBox
            id="isPublic"
            // checked={editRestaurantForm.values.isPublic}
            checked={editRestaurantForm.values.isPublic}
            onChange={() =>
              editRestaurantForm.setFieldValue(
                "isPublic",
                !editRestaurantForm.values.isPublic
              )
            }
            text="Показывать заведение в публичном доступе"
          />
        </div>
      </div>

      <div className="edit-order__section">
        <div className="order__title">
          <span>Тэги для заведения</span>
          <PromptButton onClick={() => setPromptOpen(true)} />
          <Prompt
            isOpen={isPromptOpen}
            onClose={() => setPromptOpen(false)}
            title={"Что такое тэги заведения?"}
            subtitle={`В YourMeal есть перечень основных фильтров, которые помогают клиенту быстро найти то, что нужно. Проставляйте тэги осознанно, не отмечая все сразу. Несколько активных тэгов привлекут больше внимания к вашему заведению.`}
          />
        </div>

        <div className="tags-wrapper">
          {tags.map((item) => (
            <TagList
              checked={editRestaurantForm.values.restaurantInfoTags.includes(
                item.tag
              )}
              id={item.id}
              value={item.tag}
              onChange={(value) => {
                const selectedTags =
                  editRestaurantForm.values.restaurantInfoTags;
                selectedTags.includes(value)
                  ? editRestaurantForm.setFieldValue(
                      "restaurantInfoTags",
                      selectedTags.filter((tag) => tag !== value)
                    )
                  : editRestaurantForm.setFieldValue("restaurantInfoTags", [
                      ...selectedTags,
                      value,
                    ]);
              }}
            />
          ))}
        </div>
      </div>

      <div className="edit-order__section">
        <Photo
          id={"photoRestaraunt"}
          onChange={(event) => {
            if (event.currentTarget.files) {
              editRestaurantForm.setFieldValue(
                "image",
                event.currentTarget.files[0]
              );
            }
          }}
          promptSubtitle={
            "Эта фотография будет размещена на странице вашего заведения. Рекомендуем выкладывать качественное, четкое фото, убедившись, что оно хорошо вписывается в квадрат. Нельзя выкладывать фотографии, не имеющие отношения к вашему заведению, или посторонние картинки."
          }
          img={
            editRestaurantForm.values.image
              ? URL.createObjectURL(editRestaurantForm.values.image)
              : props.restaurantInfo.image
          }
        />
      </div>

      <div className="btn-w-right">
        <StandardButton
          onClickAction={editRestaurantForm.handleSubmit}
          text={"Сохранить изменения"}
          color={StandardButtonColor.GREEN}
          iconType={StandardButtonIconType.NO_ICON}
          iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
          notFullWidth={true}
        />
      </div>
    </div>
  );
}
