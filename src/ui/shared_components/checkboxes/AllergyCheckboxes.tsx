import "./Checkboxes.css";
// import React, {useEffect, useMemo, useState} from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/ReduxStore";
import { useMediaQuery } from "react-responsive";
import { MediaQueries } from "../../../assets/constants/enums/MediaQueries";
import useHoverAndClick from "../../../utils/hooks/UseHoverAndClick";
import { useEffect, useState } from "react";
import CustomCheckBox from "../buttons/checkbox/CustomCheckBox";
import { useAppDispatch } from "../../../hooks/redux";
import { GetAllergyTagsThunk } from "../../../redux/tags_reducer/thunks";
import { AllergyTag } from "../../../assets/constants/content_types/AllergyTag";

interface AllergyCheckboxesProps {
  name: string;
  selected: AllergyTag[];
  onChange: any;
}

const AllergyCheckboxes = (props: AllergyCheckboxesProps) => {
  const { isHovered, isClicked, ...eventHandlers } = useHoverAndClick();
  const [isOpened, setOpened] = useState(false);

  // const isTouchable = useMediaQuery({ query: MediaQueries.TOUCHABLE });
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });

  const preferences = useSelector((state: RootState) => state.preferences);
  const allergyTags = useSelector((state: RootState) => state.tags.allergyTags);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(GetAllergyTagsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!isOpened) {
      document.body.classList.remove("hidden");
      document.body.classList.remove("pref-btn-all-wrapper");
    } else {
      document.body.classList.add("hidden");
      document.body.classList.add("pref-btn-all-wrapper");
    }

    return () => {
      document.body.classList.add("pref-btn-all-wrapper");
      document.body.classList.remove("hidden");
    };
  }, [isOpened]);

  useEffect(() => {
    const handleResize = () => {
      setOpened(false);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setOpened(false);
  }, [location?.pathname]);

  const renderAllergyCheckboxes = () => {
    return allergyTags.map((el) => {
      const val = el.tag;
      return (
        <CustomCheckBox
          key={`${val}-checkbox`}
          // onChange={(isChecked: any) => {
          //   if (isChecked) {
          //     dispatch(addAllergyTag(val));
          //   } else {
          //     dispatch(removeAllergyTag(val));
          //   }
          // }}
          // checked={preferences?.allergy?.includes(val)}
          onChange={() => props.onChange(val)}
          checked={props.selected.includes(val)}
          text={val}
          value={val}
          name={props.name}
        />
      );
    });
  };

  // const renderClearAllButton = () => {
  //   return(
  //     <StandardButton
  //       onClickAction={() => {
  //         dispatch(clearAllPreferencesTags())
  //         setOpened(false)
  //       }}
  //       text={'Сбросить фильтрацию'}
  //       color={StandardButtonColor.GRAY}
  //       iconType={StandardButtonIconType.DARK_CROSS}
  //       iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
  //     />
  //   )
  // }

  const renderMobile = () => {
    return (
      <div className={"diet-sheet-wrapper"} id={"diet-sheet-wrapper"}>
        <div
          className={"diet-tags-wrapper"}
          style={{ maxHeight: window.innerHeight - 280 }}
        >
          {renderAllergyCheckboxes()}
        </div>
      </div>
    );
  };

  const renderDesktop = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "8px",
          }}
        >
          {renderAllergyCheckboxes()}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <div
            className={"animation-01s-all"}
            style={{
              overflow: "hidden",
              maxWidth:
                preferences?.diet?.length > 0 ||
                preferences?.allergy?.length > 0
                  ? "300px"
                  : 0,
            }}
          >
            {/* {renderClearAllButton()} */}
          </div>
          <div>{/* {renderShowVariantsButtonWrapper()} */}</div>
        </div>
      </>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};

export default AllergyCheckboxes;
