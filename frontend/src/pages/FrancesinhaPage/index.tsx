import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFrancesinha } from "../../utils";
import Francesinha from "../../components/Francesinha";
import ErrorPage from "../ErrorPage";

type Francesinha = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: any;
  ingredients: any[];
  restaurant: any;
}

export default function FrancesinhaPage() {

  const { id } = useParams<{id: string}>();
  const [francesinha, setFrancesinha] = useState<Francesinha | null>(null);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    if (id){
      const francesinhaId = parseInt(id);
      fetchFrancesinha(francesinhaId, setFrancesinha, setError, false);
    }
  }, [id]);

  return (
    <div>
      {francesinha ? (
        <Francesinha francesinha={francesinha} />
        ) : (
        <ErrorPage errorMsg={error}/>
      )}
    </div>
  );

}