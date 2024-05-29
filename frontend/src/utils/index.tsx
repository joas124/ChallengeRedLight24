import { apiFrancesinhas, apiRestaurants, apiIngredients } from "../api/api";


//Fetch functions
export const fetchFrancesinhas = async (query: string|null, setFrancesinhas: Function) => {
  try {
    let response: any;
    if (query) {
      response = await apiFrancesinhas.searchFrancesinhas(query);
    } else {
      response = await apiFrancesinhas.getFrancesinhas();
    }
    setFrancesinhas(response.data);
  } catch (error) {
    console.error(error);
  }
}

export const fetchRestaurants = async (query: string|null, setRestaurants: Function) => {
  try {
    let response: any;
    if (query) {
      await apiRestaurants.searchRestaurants(query).then(
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

export const fetchFrancesinha = async (id: number, setFrancesinha: Function, setError: Function) => {
  try {
    const [ingredientsResponse, francesinhaResponse] = await Promise.all([
      apiFrancesinhas.getFrancesinhaIngredients(id),
      apiFrancesinhas.getFrancesinha(id),
    ]);
    const restaurantResponse = await apiRestaurants.getRestaurant(francesinhaResponse.data.restaurant);
    francesinhaResponse.data.restaurant = restaurantResponse.data;
    francesinhaResponse.data.ingredients = ingredientsResponse.data;
    setFrancesinha(francesinhaResponse.data);
  } catch (error) {
    setError(`Francesinha with id ${id} not found`);
  }
};

export const fetchRestaurant = async (id: number, setRestaurant: Function, setError: Function) => {
  try {
    const response = await apiRestaurants.getRestaurant(id);
    setRestaurant(response.data);
  } catch (error) {
    setError(`Restaurant with id ${id} not found`);
  }
}

export const fetchIngredients = async (setIngredients: Function) => {
  try {
    const ingredientsResponse = await apiIngredients.getIngredients();
    setIngredients(ingredientsResponse.data);
  } catch (error) {
    console.error(error);
  }
}


// Delete functions
export const removeFrancesinha = async (id: number, navigate: Function) => {
  try {
    await apiFrancesinhas.deleteFrancesinha(id);
    navigate('/francesinhas');
  } catch (error) {
    console.error(error);
  }
}

export const removeRestaurant = async (id: number, navigate: Function) => {
  try {
    await apiRestaurants.deleteRestaurant(id);
    navigate('/restaurants');
  } catch (error) {
    console.error(error);
  }
}

export const removeIngredient = async (id: number) => {
  try {
    await apiIngredients.deleteIngredient(id);
  } catch (error) {
    console.error(error);
  }
}

