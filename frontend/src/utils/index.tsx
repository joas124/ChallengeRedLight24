import { apiFrancesinhas, apiRestaurants, apiIngredients } from "../api/api";

//Types
export type FrancesinhaType = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: any;
  ingredients: any[];
  restaurant: any;
}

export type RestaurantType = {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  rating: number;
}

export type IngredientType = {
  id: number;
  name: string;
}


//Fetch functions
export const fetchFrancesinhas = async (query: string|null, sort: string|null, setFrancesinhas: Function) => {
  try {
    let response: any;
    if (query || sort) {
      response = await apiFrancesinhas.searchFrancesinhas(query, sort);
    } else {
      response = await apiFrancesinhas.getFrancesinhas();
    }
    setFrancesinhas(response.data);
  } catch (error) {
    console.error(error);
  }
}

export const fetchRestaurants = async (query: string|null, sort: string|null, setRestaurants: Function) => {
  try {
    let response: any;
    if (query || sort) {
      await apiRestaurants.searchRestaurants(query, sort).then(
        (data) => {
          response = data;
        }
      ).catch();
    } else {
      response = await apiRestaurants.getRestaurants();
    }
    setRestaurants(response.data);
  } catch (error) {
    console.error(error);
  }
}

export const fetchFrancesinha = async (id: number, setFrancesinha: Function, setError: Function, isForm: boolean) => {
  try {
    const [ingredientsResponse, francesinhaResponse] = await Promise.all([
      apiFrancesinhas.getFrancesinhaIngredients(id),
      apiFrancesinhas.getFrancesinha(id),
    ]);
    if (francesinhaResponse.data.deleted) {
      throw new Error('Francesinha deleted');
    }
    const restaurantResponse = await apiRestaurants.getRestaurant(francesinhaResponse.data.restaurant);
    francesinhaResponse.data.restaurant = restaurantResponse.data;
    if(!isForm) {
      francesinhaResponse.data.ingredients = ingredientsResponse.data;
    }
    setFrancesinha(francesinhaResponse.data);
  } catch (error) {
    setError(`Francesinha with id ${id} not found`);
  }
};

export const fetchRestaurant = async (id: number, setRestaurant: Function, setError: Function) => {
  try {
    const response = await apiRestaurants.getRestaurant(id);
    if(response.data.deleted) {
      throw new Error('Restaurant deleted');
    }
    setRestaurant(response.data);
  } catch (error) {
    setError(`Restaurant with id ${id} not found`);
  }
}

export const fetchIngredients = async (query: string|null, sort: string|null, setIngredients: Function) => {
  try {
    let response: any;
    if (query || sort) {
      response = await apiIngredients.searchIngredients(query, sort);
    } else {
      response = await apiIngredients.getIngredients();
    }
    setIngredients(response.data);
  } catch (error) {
    console.error(error);
  }
}

