export default function RestaurantForm(props: any) {
  const { restaurant, fieldErrors, handleSubmit, navigate } = props;
  return(
    <div className="form-class">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        {fieldErrors.name && <div className="error-form">{fieldErrors.name}</div> }
        <input type="text" name="name" defaultValue={restaurant.name} />

        <label>Address:</label>
        {fieldErrors.address && <div className="error-form">{fieldErrors.address}</div> }
        <input type="text" name="address" defaultValue={restaurant.address} />

        <label>City:</label>
        {fieldErrors.city && <div className="error-form">{fieldErrors.city}</div> }
        <input type="text" name="city" defaultValue={restaurant.city} />

        <label>Country:</label>
        {fieldErrors.country && <div className="error-form">{fieldErrors.country}</div> }
        <input type="text" name="country" defaultValue={restaurant.country} />

        <label>Rating:</label>
        {fieldErrors.rating && <div className="error-form">{fieldErrors.rating}</div> }
        <input type="number" name="rating" defaultValue={restaurant.rating} />
        
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
}