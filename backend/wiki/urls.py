from django.urls import path, re_path
from . import views

urlpatterns = [
    path('francesinhas/', views.FrancesinhaListCreate.as_view(), name='francesinha-list-create'),
    path('ingredients/', views.IngredientListCreate.as_view(), name='ingredient-list-create'),
    path('restaurants/', views.RestaurantListCreate.as_view(), name='restaurant-list-create'),
    path('francesinhas/<int:pk>/', views.FrancesinhaRetrieveUpdateDestroy.as_view(), name='francesinha-retrieve-update-destroy'),
    path('ingredients/<int:pk>/', views.IngredientRetrieveUpdateDestroy.as_view(), name='ingredient-retrieve-update-destroy'),
    path('restaurants/<int:pk>/', views.RestaurantRetrieveUpdateDestroy.as_view(), name='restaurant-retrieve-update-destroy'),
    path('restaurants/<int:restaurant_id>/francesinhas/', views.FrancesinhaListByRestaurant.as_view(), name='francesinha-list-by-restaurant'),
    path('francesinhas/<int:francesinha_id>/ingredients/', views.IngredientListByFrancesinha.as_view(), name='ingredient-list-by-francesinha'),
    path('ingredients/<int:ingredient_id>/francesinhas/', views.FrancesinhaListByIngredient.as_view(), name='francesinha-list-by-ingredient'),
    path('media/images/<str:image_name>/', views.render_image, name='render-image')
]