import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFrancesinha, fetchIngredients, fetchRestaurants } from '../../utils';
import FrancesinhaForm from '../../components/FrancesinhaForm';

export default function FrancesinhaFormPage() {
  type Francesinha = {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: any;
    ingredients: any[];
    restaurant: any;
  }

  type Ingredient = {
    id: number;
    name: string;
  }

  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const [francesinha, setFrancesinha] = useState<Francesinha | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchIngredients(setIngredients);
    fetchRestaurants(null, setRestaurants);
    if (id){
      const francesinhaId = parseInt(id);
      fetchFrancesinha(francesinhaId, setFrancesinha, setError);
    }else{
      setFrancesinha({
        id: 0,
        name: '',
        price: 0,
        rating: 0,
        image: null,
        ingredients: [],
        restaurant: 0,
      });
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!francesinha) return;

    const formData = new FormData(event.currentTarget);
    //Convert price and rating to floats
    formData.set('price', Number(formData.get('price')).toString());
    formData.set('rating', Number(formData.get('rating')).toString());

    try {
      let response: Response;
      if (id){
        response = await fetch(`${import.meta.env.VITE_API_URL}/francesinhas/${id}/`, {
          method: 'PUT',
          body: formData,
        });
      }else{
        response = await fetch(`${import.meta.env.VITE_API_URL}/francesinhas/`, {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400) {
          setFieldErrors(data);
        }
        throw new Error('Failed to add/update Francesinha');
      }

      const data = await response.json();
      navigate(`/francesinhas/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // props: id,  francesinha, ingredients, restaurants, handleSubmit, fieldErrors, navigate
  return (
    <>
      {francesinha ? (
        <FrancesinhaForm
          id={id}
          francesinha={francesinha}
          ingredients={ingredients}
          restaurants={restaurants}
          handleSubmit={handleSubmit}
          fieldErrors={fieldErrors}
          navigate={navigate}
        />
      ) : (
        <div className="error">{error}</div>
      )}
    </>
  );
}
