import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFrancesinha } from "../../utils";
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

  
  useEffect(() => {
    if (id){
      const francesinhaId = parseInt(id);
      fetchFrancesinha(francesinhaId, setFrancesinha, setError);
    }
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