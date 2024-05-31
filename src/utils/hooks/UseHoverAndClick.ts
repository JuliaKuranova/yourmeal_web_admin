import {useState} from 'react';
import {useMediaQuery} from 'react-responsive';
import { MediaQueries } from '../../assets/constants/enums/MediaQueries';
// import {MediaQueries} from "../../constants/enums/MediaQueries";

const useHoverAndClick = () => {
  const [isHovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const isTouchable = useMediaQuery({ query: MediaQueries.TOUCHABLE });

  const hoverHandlers = {
    onMouseEnter: () => {
      if (!isTouchable) {
        setHovered(true);
      }
    },
    onMouseLeave: () => {
      if (!isTouchable) {
        setHovered(false);
        setClicked(false);
      }
    },
  };

  const clickHandlers = {
    onTouchStart: () => setHovered(true),
    onTouchEnd: () => setHovered(false),
    onTouchCancel: () => setHovered(false),
    onMouseDown: () => {
      if (!isTouchable) {
        setClicked(true);
      }
    },
    onMouseUp: () => {
      if (!isTouchable) {
        setClicked(false);
      }
    },
  };

  return {
    isHovered,
    isClicked,
    ...hoverHandlers,
    ...clickHandlers,
  };
};

export default useHoverAndClick;
