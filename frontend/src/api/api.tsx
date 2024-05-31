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
  getDeletedFrancesinhas(){
    return axiosInstance.get('/francesinhas/deleted');
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
  deleteFrancesinha(id: number, hard: boolean = false){
    return axiosInstance.delete(`/francesinhas/${id}${hard ? "/?hard=true" : ""}`);
  },
  restoreFrancesinha(id: number){
    return axiosInstance.put(`/francesinhas/${id}/restore/`);
  }, 
  searchFrancesinhas(query: string|null, sort: string|null){
    return axiosInstance.get(`/francesinhas/?q=${query ? query : ""}&sort=${sort ? sort : ""}`);
  },
}

export const apiIngredients = {
  getIngredients(){
    return axiosInstance.get('/ingredients');
  },
  getDeletedIngredients(){
    return axiosInstance.get('/ingredients/deleted');
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
  deleteIngredient(id: number, hard: boolean = false){
    return axiosInstance.delete(`/ingredients/${id}${hard ? "/?hard=true" : ""}`);
  },
  restoreIngredient(id: number){
    return axiosInstance.put(`/ingredients/${id}/restore/`);
  },
  searchIngredients(query: string|null, sort: string|null){
    return axiosInstance.get(`/ingredients/?q=${query ? query : ""}&sort=${sort ? sort : ""}`);
  },
}

export const apiRestaurants = {
  getRestaurants(){
    return axiosInstance.get('/restaurants');
  },
  getDeletedRestaurants(){
    return axiosInstance.get('/restaurants/deleted');
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
  deleteRestaurant(id: number, hard: boolean = false){
    return axiosInstance.delete(`/restaurants/${id}${hard ? "/?hard=true" : ""}`);
  },
  restoreRestaurant(id: number){
    return axiosInstance.put(`/restaurants/${id}/restore/`);
  },
  searchRestaurants(query: string|null, sort: string|null){
    return axiosInstance.get(`/restaurants/?q=${query ? query : ""}&sort=${sort ? sort : ""}`);
  },
}