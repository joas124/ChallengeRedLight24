import "./restaurants-list.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../../utils";
import Button from "../../components/Button";

export default function RestaurantsListPage(){
  const [restaurants, setRestaurants] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/restaurants/add');
  }

  const handleClick = (id: number) => {
    navigate(`/restaurants/${id}`);
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const sort = searchParams.get('sort');
    fetchRestaurants(query, sort, setRestaurants);
  }, [location.search, location.pathname]);

  return (
    <div className="list-page">
      <div className="list-header">
        <h1>Restaurants</h1>
        <Button text="Add New Restaurant" handleClick={handleAdd}/>
      </div>
      { restaurants.length === 0 ? (<p>No restaurants found</p>) : (
        <ul className="list">
          {restaurants.map((restaurant: any) => (
            <li key={restaurant.id} className="list-element" onClick={() => handleClick(restaurant.id)}>
              <h2 className="restaurant-title">{restaurant.name}</h2>
              <p>{restaurant.rating}⭐</p>
              <p>{restaurant.city} - {restaurant.country}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}