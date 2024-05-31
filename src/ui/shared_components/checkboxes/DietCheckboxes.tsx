import "./Checkboxes.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/ReduxStore";
import { useMediaQuery } from "react-responsive";
import { MediaQueries } from "../../../assets/constants/enums/MediaQueries";
import useHoverAndClick from "../../../utils/hooks/UseHoverAndClick";
import { useEffect, useState } from "react";
import CustomCheckBox from "../buttons/checkbox/CustomCheckBox";
import { GetDietTagsThunk } from "../../../redux/tags_reducer/thunks";
import { useAppDispatch } from "../../../hooks/redux";
import { DietTag } from "../../../assets/constants/content_types/DietTag";

interface DietCheckboxesProps {
  name: string;
  selected: DietTag[];
  onChange: any;
}

const DietCheckboxes = (props: DietCheckboxesProps) => {
  const { isHovered, isClicked, ...eventHandlers } = useHoverAndClick();
  const [isOpened, setOpened] = useState(false);

  // const isTouchable = useMediaQuery({ query: MediaQueries.TOUCHABLE });
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });

  // const preferences = useSelector((state: RootState) => state.preferences);
  const dietTags = useSelector((state: RootState) => state.tags.dietTags);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(GetDietTagsThunk());
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

  const renderDietCheckboxes = () => {
    return dietTags.map((el) => {
      const val = el.tag;
      return (
        <CustomCheckBox
          key={`${val}-checkbox`}
          // onChange={(isChecked) => {
          //   if (isChecked) {
          //     dispatch(addDietTag(val));
          //   } else {
          //     dispatch(removeDietTag(val));
          //   }
          // }}
          onChange={() => props.onChange(val)}
          checked={props.selected.includes(val)}
          text={val}
          value={val}
          name={props.name}
        />
      );
    });
  };

  const renderMobile = () => {
    return (
      <div className={"diet-sheet-wrapper"} id={"diet-sheet-wrapper"}>
        <div
          className={"diet-tags-wrapper"}
          style={{ maxHeight: window.innerHeight - 280 }}
        >
          {renderDietCheckboxes()}
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
          {renderDietCheckboxes()}
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
                props.selected.length > 0
                //  || preferences?.allergy?.length > 0
                  ? "300px"
                  : 0,
            }}
          >
            {/* {renderClearAllButton()} */}
          </div>
          <div></div>
        </div>
      </>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};

export default DietCheckboxes;
