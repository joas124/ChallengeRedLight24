import "./restaurant-page.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRestaurants } from "../../api/api.tsx";
import Restaurant from "../../components/Restaurant";
import ErrorPage from "../ErrorPage";
import type { RestaurantType, FrancesinhaType } from "../../utils";

export default function RestaurantPage() {

  const { id } = useParams<{id: string}>();
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [francesinhas, setFrancesinhas] = useState<FrancesinhaType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurant = async () => {
    if (id){
      try{
        const restaurantId = parseInt(id);
        const francesinhasResponse = await apiRestaurants.getRestaurantFrancesinhas(restaurantId).then().catch();
        await apiRestaurants.getRestaurant(restaurantId).then(data => {
          if(data.data.deleted){
            setError(`Restaurant with ID: ${id} was deleted.`);
            return;
          }
          setFrancesinhas(francesinhasResponse.data);
          setRestaurant(data.data);
        }).catch();
      }catch(error){
        setError(`Restaurant with ID: ${id} not found.`);
      }
    }
  }

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  return (
    <div className="restaurant-page">
      {restaurant ? (
        <Restaurant restaurant={restaurant} francesinhas={francesinhas} />
      ) : (
        <ErrorPage errorMsg={error} />
      )}
    </div>
  );

}