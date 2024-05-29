import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchRestaurants } from "../../utils";

export default function RestaurantsListPage(){
  const [restaurants, setRestaurants] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    fetchRestaurants(query, setRestaurants);
  }, [location.search]);

  return (
    <div className="restaurant-list">
      <ul>
        {restaurants.map((restaurant: any) => (
          <li key={restaurant.id} className="restaurant">
            <Link to={`${restaurant.id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
      <button><Link to={`/restaurants/add`}>Add New Restaurant</Link></button>
    </div>
  );
}