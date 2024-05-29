import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRestaurants } from "../../api/api.tsx";
import Restaurant from "../../components/Restaurant";

export default function RestaurantPage() {
  type Restaurant = {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    francesinhas: any[];
    rating: number;
  }

  const { id } = useParams<{id: string}>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurant = async () => {
    if (id){
      try{
        const restaurantId = parseInt(id);
        const francesinhasResponse = await apiRestaurants.getRestaurantFrancesinhas(restaurantId).then().catch();
        await apiRestaurants.getRestaurant(restaurantId).then(data => {
          data.data.francesinhas = francesinhasResponse.data;
          setRestaurant(data.data);
        }).catch();
      }catch(error){
        setError(`Restaurant with ID: ${id} not found`);
      }
    }
  }

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  return (
    <>
      {restaurant ? (
        <Restaurant restaurant={restaurant} />
      ) : (
        <div className="error">{error}</div>
      )}
    </>
  );

}