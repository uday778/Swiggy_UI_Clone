import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdStars } from "react-icons/md";
import { GiCycling } from "react-icons/gi";
import parse from "html-react-parser";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa6";



let veg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/768px-Indian-vegetarian-mark.svg.png"

let nonveg = "https://www.vhv.rs/dpng/d/437-4370761_non-veg-icon-non-veg-logo-png-transparent.png"


function RestaurantMenu() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  

  let mainId = id
    .split("-")
    .at(-1)
    .replace(/[^0-9]/g, "");
  // console.log(mainId);

  const [menuData, setMenudata] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicksData,setTopPicksData]=useState([])
 

  async function fetchMenu() {
    let data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4375084&lng=78.4482441&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
    );
    let response = await data.json();

    // console.log(response);

    
    

   
    setResInfo(response?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      response?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );

    
    let actualMenu = response?.data?.cards.find((data) => data?.groupedCard);
    // console.log(actualMenu);

    setMenudata(
      actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      )
    );
    
    console.log(response?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(data => data?.card?.card?.title === "Top Picks")[0]);
    
    setTopPicksData(response?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(data => data?.card?.card?.title === "Top Picks")[0]);
    

  }

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 50);
  }
  function handleNext() {
    value === 150 ? "" : setValue((prev) => prev + 50);
  }



  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <div className="w-full">
      <div className="w-[800px]  mx-auto pt-10">
        <p className="text-[12px] text-slate-400  ">
          {" "}
          <Link to="/">
            Home/ <span className="hover:text-slate-800">{resInfo.city}/</span>{" "}
            <span className="hover:text-slate-800">{resInfo.name}</span>
          </Link>{" "}
        </p>

        <h1 className="pt-6 font-bold text-2xl">{resInfo?.name}</h1>
        <div className="w-full h-52 p-5  border-black mt-3 rounded-[32px] px-4 pb-4 bg-gradient-to-t from-slate-200/50">
          <div className="w-full border bg-white border-slate-200/60 rounded-[30px] p-4 h-full">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <MdStars className="text-green-500 text-2xl" />{" "}
              <span>{resInfo.avgRating}</span>
              <span>({resInfo?.totalRatingsString})-</span>
              <span>{resInfo?.costForTwoMessage}</span>
            </div>
            <p className="text-sm underline text-orange-600 mt-2 font-semibold">
              {resInfo?.cuisines?.join(", ")}
            </p>

            <div className="flex gap-2 mt-1">
              <div className="flex flex-col justify-center items-center">
                <div className="w-2 h-2 bg-black/60 rounded-full"></div>
                <div className="w-[1px] h-5  bg-gray-500 "></div>
                <div className="w-2 h-2 bg-black/50 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-2 text-base ">
                <p>
                  outlet{" "}
                  <span className="text-gray-500 text-sm">
                    {resInfo?.locality}
                  </span>
                </p>
                <p className="text-sm">{resInfo.sla?.slaString}</p>
              </div>
            </div>
          
           {
            resInfo?.feeDetails?.message ?
            <div>  
              <hr className="my-1" />
            <span className="flex gap-3 items-center ">
              <GiCycling className="text-black text-2xl" />{" "}
              {parse(`${resInfo?.feeDetails?.message}`)} |{" "}
            </span></div>:""
            }
          </div>
        </div>

        <div className="w-full overflow-hidden overflow-y-scroll no-scrollbar">
          <div className="flex justify-between mt-8 ">
            <h1 className="text-xl font-bold"> Deals for you</h1>
            <div className="flex gap-4">
              <div
                className={
                  `rounded-2xl p-2 cursor-pointer ` +
                  (value <= 0 ? "bg-gray-200" : "bg-gray-300")
                }
                onClick={handlePrev}
              >
                <FaArrowLeft
                  className={value <= 0 ? "text-gray-400" : "text-gray-800"}
                />
              </div>
              <div
                className={
                  `rounded-2xl p-2 cursor-pointer ` +
                  (value >= 150 ? "bg-gray-200" : "bg-gray-300")
                }
                onClick={handleNext}
              >
                <FaArrowRight
                  className={value >= 150 ? "text-gray-400" : "text-gray-800"}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-5">
            {discountData?.map((data) => (
              <Discount data={data} key={data?.info?.offerIds} />
            ))}
          </div>
        </div>

{/* top picks  */}
{
  topPicksData && 
  <div className="w-full overflow-hidden overflow-y-scroll no-scrollbar">
          <div className="flex justify-between mt-8 ">
            <h1 className="text-xl font-bold"> {topPicksData?.card?.card?.title}</h1>
            <div className="flex gap-4">
              <div
                className={
                  `rounded-2xl p-2 cursor-pointer ` +
                  (value <= 0 ? "bg-gray-200" : "bg-gray-300")
                }
                onClick={handlePrev}
              >
                <FaArrowLeft
                  className={value <= 0 ? "text-gray-400" : "text-gray-800"}
                />
              </div>
              <div
                className={
                  `rounded-2xl p-2 cursor-pointer ` +
                  (value >= 150 ? "bg-gray-200" : "bg-gray-300")
                }
                onClick={handleNext}
              >
                <FaArrowRight
                  className={value >= 150 ? "text-gray-400" : "text-gray-800"}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            {
              topPicksData?.card?.card?.carousel.map(({creativeId,dish:{info:{defaultPrice,price}}})=>(
                <div key={creativeId} className="min-w-[300px] h-[300px] relative">
                  <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`} alt="" className=" w-full h-full " />
                  <div className=" absolute bottom-4 flex text-white justify-between items-center px-4 w-full ">
                    <p className="text-lg">₹{defaultPrice/100 || price/100} </p>
                    <button className=" px-8 py-2 text-green-600 font-semibold bg-white rounded-xl hover:bg-slate-100"> Add </button>
                  </div>
                  </div>
              ))
            }
          </div>
        </div>
}
        {/* {menu} */}
        <h2 className="mt-10 text-center tracking-wide">⁠ MENU ⁠</h2>
        <div className="w-full mt-5 relative">
          <div className="w-full p-4  text-lg bg-slate-200/40 text-center rounded-2xl   cursor-pointer">
            Search for Dishes{" "}
            <IoIosSearch className="absolute right-5 top-5 text-2xl " />
          </div>
        </div>
        {/* {recommanded} */}
        <div>
          {menuData.map(({ card: { card } },i) => (
            <MenuCard card={card} key={i} />
          )
          )}
        </div>
      </div>
    </div>
  );
}



function Discount({
  data: {
    info: { header, offerLogo, description },
  },
}) {
  return (
    <div
      className="flex border p-3  min-w-[328px] h-[76px]  rounded-2xl gap-2"
      key={header}
    >
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`}
        alt=""
      />
      <div>
        <h2 className="line-clamp-1 font-bold text-lg">{header}</h2>
        <p className="line-clamp-1 text-gray-400">{description}</p>
      </div>
    </div>
  );
}




function MenuCard({ card }) {
  const [isMore, setIsMore] = useState(false);
  
  let hello = false
  if (card?.["@type"]) {
    hello = true
  }

  const [isopen, setIsOpen] = useState(hello)


  function toggledropDown() {
    setIsOpen((prev) => !prev)
  }
  if (card?.itemCards) {
    const { title, itemCards } = card;

    return (
      <>
        <div className="mt-5">
          <div className="flex justify-between text-base">
            <h1 className={"font-semibold text-" + (card?.["@type"] ? "xl" : "base")}>
              {title} ({itemCards?.length})
            </h1>

            {isopen ? <IoIosArrowUp className="text-xl" onClick={toggledropDown} /> : <IoIosArrowDown className="text-xl" onClick={toggledropDown} />}
          </div>
          {
            isopen && <DetailMenu itemCards={itemCards}/>
          }

        </div>
        <hr className={
          "my-5 border-" + (card["@type"] ? "[10px]" : "[4px]")
        } />
      </>
    );
  } else {
    const { title, categories } = card
    return (
      <>
        <div className="mt-5  ">
          <h1 className="font-semibold text-base" >{card?.title || title}</h1>

          {
            categories.map((data) => (
              <MenuCard card={data} key={data?.title} />
            ))
          }
          <hr className={
            "my-5 border-" + (card["@type"] ? "[10px]" : "[4px]")
          } />
        </div>

      </>
    )
  }


}





function DetailMenu({ itemCards }) {


  return (
    <div className="mt-5 ">
      {
        itemCards && itemCards.map(({
          card: { info} }) => (
              <Detailmenucard info={info} key={info?.imageId} />
              
              
            )
       
        )
      }
    </div>
  )
}
function  Detailmenucard({info}){
  
  const {
    name,
  id,
  description,
  imageId,
  price,
  ratings: { aggregatedRating: { rating, ratingCountV2 } },
  defaultPrice,
  itemAttribute: { vegClassifier }
  }=info

  const [isMore, setIsMore] = useState(false)

  const  trimDes = description?.substring(0, 125);


return (
<div key={id} className="flex      justify-between w-full mt-5 min-h-[182px] ">
  <div className=" w-[70%]">
    <img src={vegClassifier == "VEG" ? veg : nonveg} alt="" className="w-4 rounded-sm" />
    <h2 className="font-bold text-lg ">{name}</h2>
    <p className="font-bold text-lg ">₹{defaultPrice / 100 || price / 100}</p>
    <p className=" flex items-center gap-2"><FaStar className="text-green-600 " />{rating && <span>{rating} ({ratingCountV2})</span>}</p>
    {
      trimDes?.length > 120 ?
      <div>
        <span>{isMore ? description:trimDes}</span>
        <button className="font-bold ml-2 hover:underline" onClick={() => setIsMore(!isMore)}>{isMore ? "less" : "more"} </button>
      </div>: <span>{trimDes}</span>
    }
     
  </div>


  <div className="w-[20%] relative ">
    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`} alt="" className="rounded-xl aspect-square" />
    <button className="bg-white border border-black px-8 py-1 rounded-lg text-lg font-semibold   drop-shadow-md  text-green-600 hover:bg-slate-100  absolute z-10 bottom-3 right-7  ">Add</button>
  </div>

</div>
)
  
}


export default RestaurantMenu;