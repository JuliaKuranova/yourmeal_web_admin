import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { MediaQueries } from '../../assets/constants/enums/MediaQueries';
// import {MediaQueries} from "../../constants/enums/MediaQueries";

const useHover = () => {
  const [isHovered, setHovered] = useState(false);
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
      }
    },
    onTouchStart: () => setHovered(true),
    onTouchEnd: () => setHovered(false),
    onTouchCancel: () => setHovered(false),
  };

  return {
    isHovered,
    ...hoverHandlers,
  };
};

export default useHover;
