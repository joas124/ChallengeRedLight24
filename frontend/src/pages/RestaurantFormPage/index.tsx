import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchRestaurant } from '../../utils';
import RestaurantForm from '../../components/RestaurantForm';

export default function RestaurantFormPage() {
  type Restaurant = {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    rating: number;
  }

  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (id){
      const restaurantId = parseInt(id);
      fetchRestaurant(restaurantId, setRestaurant, setError);
    }else{
      setRestaurant({
        id: 0,
        name: '',
        address: '',
        city: '',
        country: '',
        rating: 0,
      });
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!restaurant) return;

    const formData = new FormData(event.currentTarget);
    //Convert rating to float
    formData.set('rating', Number(formData.get('rating')).toString());

    try {
      let response: Response;
      if (id){
        response = await fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}/`, {
          method: 'PUT',
          body: formData,
        });
      }else{
        response = await fetch(`${import.meta.env.VITE_API_URL}/restaurants/`, {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400) {
          setFieldErrors(data);
        }
        throw new Error('Failed to add/update Restaurant');
      }

      const data = await response.json();
      navigate(`/restaurants/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };
  //props: restaurant, fieldErrors, handleSubmit, navigate
  return (
    <>
      {restaurant ? (
        <RestaurantForm
          restaurant={restaurant}
          fieldErrors={fieldErrors}
          handleSubmit={handleSubmit}
          navigate={navigate}
        />
      ) : (
        <div className="error">{error}</div>
      )}
    </>
  );
}
