import "./deleted-list.css";
import type { FrancesinhaType, RestaurantType, IngredientType } from "../../utils";

type DeletedListProps = {
  deletedItems: FrancesinhaType[] | RestaurantType[] | IngredientType[];
  type: 'francesinha' | 'restaurant' | 'ingredient';
  handleRestore: (id: number, type: 'francesinha' | 'restaurant' | 'ingredient') => void;
  handleDelete: (id: number, type: 'francesinha' | 'restaurant' | 'ingredient') => void;
}

export default function DeletedList({deletedItems, type, handleRestore, handleDelete}: DeletedListProps) {
  return (
    <div className="deleted-list">
      <h2>Deleted {`${type.charAt(0).toUpperCase()}${type.substring(1)}`}</h2>
      {deletedItems.length === 0 ? (<p>No deleted {type}s found</p>) : (
        <ul className="small-list">
          {deletedItems.map((item) => (
            <li key={item.id}>
              {item.name}
              <div className="deleted-item-buttons">
                <button onClick={() => handleRestore(item.id, type)}>Restore</button>
                <button onClick={() => handleDelete(item.id, type)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}