import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchRestaurant } from '../../utils';
import { apiRestaurants } from '../../api/api.tsx';
import { AxiosResponse, AxiosError } from 'axios';
import Input from '../../components/Input/index.tsx';
import Button from '../../components/Button/index.tsx';
import ErrorPage from '../ErrorPage/index.tsx';

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
      let response: AxiosResponse<any>;
      if (id){
        response = await apiRestaurants.updateRestaurant(parseInt(id), formData);
      }else{
        response = await apiRestaurants.createRestaurant(formData);
      }

      const {data} = response;
      navigate(`/restaurants/${data.id}`);
    } catch (error) {
      if ((error instanceof AxiosError) && error.response){
        if (error.response.status === 400){
          setFieldErrors(error.response.data);
        }else{
          setError('An error occurred. Please try again.');
        }
      }
    }
  };
  //props: restaurant, fieldErrors, handleSubmit, navigate
  return (
    <>
      {restaurant ? (
        <div className="form-class">
        {id ? (<h1>Editing Restaurant '{restaurant.name}'</h1>) : (<h1>Create Restaurant</h1>)}
        <form onSubmit={handleSubmit}>
          <Input name="name" label="Name:" defaultVal={restaurant.name} error={fieldErrors.name} />
          <Input name="address" label="Address:" defaultVal={restaurant.address} error={fieldErrors.address} />
          <Input name="city" label="City:" defaultVal={restaurant.city} error={fieldErrors.city} />
          <Input name="country" label="Country:" defaultVal={restaurant.country} error={fieldErrors.country} />
          <Input name="rating" label="Rating:" defaultVal={restaurant.rating} error={fieldErrors.rating} />
          <Button type="submit" text="Save" />
          <Button type="button" text="Cancel" handleClick={() => navigate(-1)} />
        </form>
      </div>
      ) : (
        <ErrorPage errorMsg={error} />
      )}
    </>
  );
}
