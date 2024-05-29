import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFrancesinhas, apiRestaurants } from "../../api/api.tsx";
import Francesinha from "../../components/Francesinha";

export default function FrancesinhaPage() {
  type Francesinha = {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: any;
    ingredients: any[];
    restaurant: any;
  }

  const { id } = useParams<{id: string}>();
  const [francesinha, setFrancesinha] = useState<Francesinha | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFrancesinha = async () => {
    if (id){
      try{
        const francesinhaId = parseInt(id);
        const response = await apiFrancesinhas.getFrancesinha(francesinhaId);
        const ingredientsResponse = await apiFrancesinhas.getFrancesinhaIngredients(francesinhaId);
        const restaurantResponse = await apiRestaurants.getRestaurant(response.data.restaurant);
        response.data.restaurant = restaurantResponse.data;
        response.data.ingredients = ingredientsResponse.data;
        setFrancesinha(response.data);
      }catch(error){
        setError(`Francesinha with id ${id} not found`);
      }
    }
  }

  useEffect(() => {
    fetchFrancesinha();
  }, [id]);

  return (
    <div>
      {francesinha ? (
        <Francesinha francesinha={francesinha} />
        ) : (
        <div className="error">{error}</div>
      )}
    </div>
  );

}