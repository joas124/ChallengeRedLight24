import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../../utils";
import Button from "../../components/Button";

export default function RestaurantsListPage(){
  const [restaurants, setRestaurants] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/restaurants/add');
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const sort = searchParams.get('sort');
    fetchRestaurants(query, sort, setRestaurants);
  }, [location.search, location.pathname]);

  return (
    <div className="restaurant-list">
      <h1>Restaurants</h1>
      { restaurants.length === 0 ? (<p>No restaurants found</p>) : (
        <ul>
          {restaurants.map((restaurant: any) => (
            <li key={restaurant.id} className="restaurant">
              <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <Button text="Add New Restaurant" handleClick={handleClick}/>
    </div>
  );
}