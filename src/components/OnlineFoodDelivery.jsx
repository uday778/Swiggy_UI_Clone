import RestaurantCard from "./RestaurantCard";

function OnlineFoodDelivery({ data ,title}) {
  return (
    <div>
     <h1 className="text-2xl font-bold mb-2">
          {title}
        </h1>
      <div className="grid grid-cols-4 gap-8">
        {data && data.map(({ info ,cta:{link}}) => (
          <div key={info.id} className="hover:scale-95 duration-300">
            <RestaurantCard {...info} link={link} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnlineFoodDelivery;
