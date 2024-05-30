import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFrancesinha, fetchIngredients, fetchRestaurants } from '../../utils';
import { apiFrancesinhas } from '../../api/api.tsx';
import { AxiosResponse, AxiosError } from 'axios';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorPage from '../ErrorPage/index.tsx';

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
  const [restaurants, setRestaurants] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchIngredients(null, null, setIngredients);
    fetchRestaurants(null, null, setRestaurants);
    if (id){
      fetchFrancesinha(parseInt(id), setFrancesinha, setError, true);
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
      let response: AxiosResponse<any>;
      if (id){
        response = await apiFrancesinhas.updateFrancesinha(parseInt(id), formData);
      }else{
        response = await apiFrancesinhas.createFrancesinha(formData);
      }

      const {data} = response;
      navigate(`/francesinhas/${data.id}`);
    } catch (error) {
      if((error instanceof AxiosError) && error.response){
        if (error.response.status === 400){
          setFieldErrors(error.response.data);
        }else{
          setError('An error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <>
      {francesinha ? (
        <div className="form-div">
        {id ?  (<h1>Editing {francesinha.name}</h1>) : (<h1>Add Francesinha</h1>  )}
        <form onSubmit={handleSubmit}>
          <Input label="Name" name="name" error={fieldErrors.name} defaultVal={francesinha.name} />
          <Input label="Price" name="price" error={fieldErrors.price} defaultVal={francesinha.price} />
          <Input label="Rating" name="rating" error={fieldErrors.rating} defaultVal={francesinha.rating} />
          <Input label="Image" name="image" error={fieldErrors.image} type='file'/>
          <label>Ingredients:</label>
          {fieldErrors.ingredients && <span className="error">{fieldErrors.ingredients}</span>}
          <ul>
            {ingredients.map((ingredient: Ingredient) => (
              <li key={ingredient.id}>
                <input type='checkbox' name='ingredients' value={ingredient.id} defaultChecked={francesinha.ingredients.includes(ingredient.id)} />
                {ingredient.name}
              </li>
            ))}
          </ul>
          <label>Restaurant:</label>
          {fieldErrors.restaurant && <span className="error">{fieldErrors.restaurant}</span>}
          <select name='restaurant' defaultValue={francesinha.restaurant.id}>
            {restaurants.map((restaurant:any) => (
              <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
            ))}
          </select>
          
          <Button text='Submit' type='submit' />
          <Button text='Cancel' type='button' handleClick={() => navigate(-1)} />
        </form>
      </div>
      ) : (
        <ErrorPage errorMsg={error} />
      )}
    </>
  );
}
