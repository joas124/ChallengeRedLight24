import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

const axiosInstanceFormData = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});


export const apiFrancesinhas = {
  getFrancesinhas(){
    return axiosInstance.get('/francesinhas');
  },
  getFrancesinha(id: number){
    return axiosInstance.get(`/francesinhas/${id}`);
  },
  getFrancesinhaIngredients(id: number){
    return axiosInstance.get(`/francesinhas/${id}/ingredients`);
  },
  createFrancesinha(data: any){
    return axiosInstanceFormData.post('/francesinhas/', data);
  },
  updateFrancesinha(id: number, data: any){
    return axiosInstanceFormData.put(`/francesinhas/${id}/`, data);
  },
  deleteFrancesinha(id: number){
    return axiosInstance.delete(`/francesinhas/${id}`);
  },
  searchFrancesinhas(query: string|null, sort: string|null){
    return axiosInstance.get(`/francesinhas/?q=${query}&sort=${sort}`);
  },
}

export const apiIngredients = {
  getIngredients(){
    return axiosInstance.get('/ingredients');
  },
  getIngredient(id: number){
    return axiosInstance.get(`/ingredients/${id}`);
  },
  createIngredient(data: any){
    return axiosInstanceFormData.post('/ingredients/', data);
  },
  updateIngredient(id: number, data: any){
    return axiosInstanceFormData.put(`/ingredients/${id}/`, data);
  },
  deleteIngredient(id: number){
    return axiosInstance.delete(`/ingredients/${id}`);
  },
  searchIngredients(query: string|null, sort: string|null){
    return axiosInstance.get(`/ingredients/?q=${query}&sort=${sort}`);
  },
}

export const apiRestaurants = {
  getRestaurants(){
    return axiosInstance.get('/restaurants');
  },
  getRestaurant(id: number){
    return axiosInstance.get(`/restaurants/${id}`);
  },
  getRestaurantFrancesinhas(id: number){
    return axiosInstance.get(`/restaurants/${id}/francesinhas`);
  },
  createRestaurant(data: any){
    return axiosInstanceFormData.post('/restaurants/', data);
  },
  updateRestaurant(id: number, data: any){
    return axiosInstanceFormData.put(`/restaurants/${id}/`, data);
  },
  deleteRestaurant(id: number){
    return axiosInstance.delete(`/restaurants/${id}`);
  },
  searchRestaurants(query: string|null, sort: string|null){
    return axiosInstance.get(`/restaurants/?q=${query}&sort=${sort}`);
  },
}