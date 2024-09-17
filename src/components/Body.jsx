import { useEffect, useState } from "react";
import OnYourMind from "./OnYourMind";
import TopResturents from "./TopResturents";
import OnlineFoodDelivery from "./OnlineFoodDelivery";


function Body() {
  const[topRestaurantData,setTopRestaurantData]=useState([])
  const[onYourMind,setOnYourMind]=useState([])
  async function fetchData() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4375084&lng=78.4482441&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const response = await data.json();
    // console.log(response);
    
    // console.log(response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setTopRestaurantData(
      response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setOnYourMind(response?.data?.cards[0]?.card?.card?.imageGridCards?.info)
  }


  useEffect(() => {
    fetchData();
  }, []);

  return (
   <div className="w-full ">
      <div className="w-[75%] mx-auto mt-6 overflow-hidden ">
        <OnYourMind data={onYourMind} />
        <TopResturents data={topRestaurantData} />
        <OnlineFoodDelivery data={topRestaurantData}/>
      </div>
      
    </div>
  );
}

export default Body;
