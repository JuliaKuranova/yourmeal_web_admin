import NavBar from "../../shared_components/nav_bar/NavBar";
import "./RestaurantPage.css";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { MediaQueries } from "../../../assets/constants/enums/MediaQueries";
import { RootState } from "../../../redux/ReduxStore";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/redux";
import { GetRestaurantInfoThunk } from "../../../redux/restaurant_info_reducer/thunks";
import EditRestaurantForm from "../../shared_components/forms/EditRestaurantForm";
// import { RestarauntInfo } from "../../../assets/constants/content_types/RestarauntInfo";


interface RestarauntPageProps {
  // restarauntInfo: RestarauntInfo; 
}


const RestaurantPage = (props: RestarauntPageProps) => {

  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });


  const restaurantInfo = useSelector((state: RootState) => state.restaurantInfo.restaurantInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(GetRestarauntInfoTagsThunk());
    dispatch(GetRestaurantInfoThunk({ id: 1 }));
  }, [dispatch]);


  return (


  
    <div className="page-wrapper">
      <NavBar />

      {
        restaurantInfo
        ? <EditRestaurantForm restaurantInfo={restaurantInfo} />
        : null  
      }
    </div>
  );
};

export default RestaurantPage;
