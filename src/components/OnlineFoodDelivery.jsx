import RestaurantCard from "./RestaurantCard";

function OnlineFoodDelivery({ data }) {
  return (
    <div>
      Restaurants with online food delivery in Hyderabad
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
