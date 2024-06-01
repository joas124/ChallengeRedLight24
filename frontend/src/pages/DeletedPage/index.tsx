import "./deleted-page.css";
import { useState, useEffect } from "react";
import { apiFrancesinhas, apiIngredients, apiRestaurants } from "../../api/api";
import DeletedList from "../../components/DeletedList";
import type { FrancesinhaType, IngredientType, RestaurantType } from "../../utils";

export default function DeletedPage() {
  const [deletedFrancesinhas, setDeletedFrancesinhas] = useState<FrancesinhaType[]>([]);
  const [deletedRestaurants, setDeletedRestaurants] = useState<RestaurantType[]>([]);
  const [deletedIngredients, setDeletedIngredients] = useState<IngredientType[]>([]);

  const fetchDeleted = async () => {
    try {
      const [francesinhas, restaurants, ingredients] = await Promise.all([
        apiFrancesinhas.getDeletedFrancesinhas(),
        apiRestaurants.getDeletedRestaurants(),
        apiIngredients.getDeletedIngredients()
      ]);
      setDeletedFrancesinhas(francesinhas.data);
      setDeletedRestaurants(restaurants.data);
      setDeletedIngredients(ingredients.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleRestore = async (id: number, type: 'francesinha' | 'restaurant' | 'ingredient') => {
    if (window.confirm(`Are you sure you want to restore this ${type}?`)) {
      try {
        switch (type) {
          case 'francesinha':
            await apiFrancesinhas.restoreFrancesinha(id);
            break;
          case 'restaurant':
            await apiRestaurants.restoreRestaurant(id);
            break;
          case 'ingredient':
            await apiIngredients.restoreIngredient(id);
            break;
          default:
            throw new Error('Invalid type');
        }
        fetchDeleted();
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleDelete = async (id: number, type: 'francesinha' | 'restaurant' | 'ingredient') => {
    if (window.confirm(`Are you sure you want to permanently delete this ${type}?`)) {
      try {
        switch (type) {
          case 'francesinha':
            await apiFrancesinhas.deleteFrancesinha(id, true);
            break;
          case 'restaurant':
            await apiRestaurants.deleteRestaurant(id, true);
            break;
          case 'ingredient':
            await apiIngredients.deleteIngredient(id, true);
            break;
          default:
            throw new Error('Invalid type');
        }
        fetchDeleted();
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchDeleted();
  }, []);

  return (
    <div className="deleted-page">
      <h1>Deleted Elements</h1>
      <p>Here you can find all the elements that you deleted. If you want to restore them (or permanently delete them), click on the buttons below.</p>
      <DeletedList deletedItems={deletedFrancesinhas} type='francesinha' handleRestore={handleRestore} handleDelete={handleDelete} />
      <DeletedList deletedItems={deletedRestaurants} type='restaurant' handleRestore={handleRestore} handleDelete={handleDelete} />
      <DeletedList deletedItems={deletedIngredients} type='ingredient' handleRestore={handleRestore} handleDelete={handleDelete} />
    </div>
  );
}
