import { useState, useEffect } from "react";
import { apiRestaurants } from "../../api/api.tsx";
import { Link } from "react-router-dom";

export default function RestaurantsListPage(){
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    const response = await apiRestaurants.getRestaurants().then().catch();
    setRestaurants(response.data);
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="restaurant-list">
      <ul>
        {restaurants.map((restaurant: any) => (
          <li key={restaurant.id} className="restaurant">
            <Link to={`${restaurant.id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}