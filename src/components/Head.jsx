
import logo from "../assets/swiggy.png";
import { IoIosArrowDown ,IoIosSearch } from "react-icons/io";
import { IoBagOutline,IoCartOutline  } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { RiDiscountPercentLine } from "react-icons/ri";
import { CgPokemon } from "react-icons/cg";
import { Link, Outlet } from "react-router-dom";

function Head() {
  const navItems = [
    {
      name:"Swiggy Corporate",
      icon: <IoBagOutline />,
    },
    {
      name:"Search",
      icon: <IoIosSearch/>,
    },
    {
      name:"Offer",
      icon: <RiDiscountPercentLine/>,
    },
    {
      name:"Help",
      icon: <CgPokemon/>,
    },
    {
      name:"Sign In",
      icon: <FaRegUser/>,
    },
    {
      name:"Cart",
      icon: <IoCartOutline/>,
    },
];

  return (
    <div>
    <div className="h-20 w-full shadow-md flex justify-center items-center">
      <div className="   w-[80%] flex justify-between">
        <div className="flex  items-center">
          <Link to={"/"}> <img src={logo} className="w-16 px-4" />
          </Link>
          <p className="font-semibold  border-b-4 border-black pb-2">Other`s</p>
          <IoIosArrowDown className="mb-2 ml-2 gap-2 font- text-orange-500"/>
        </div>

        <div className="flex items-center gap-10 font-semibold px-2">
          {
           navItems&& navItems?.map((item)=>(
              <div className="flex" key={item.name}>
                <span className="mt-1 px-1 w-6">{item.icon}</span>
                <p>{item.name}</p>
              </div>
            ))
          }
        </div>
      </div>
      
    </div>
    <Outlet/>
    </div>
  );
}

export default Head;
