from django.urls import path, re_path
from . import views

urlpatterns = [
    path('francesinhas/', views.FrancesinhaListCreate.as_view(), name='francesinha-list-create'),
    path('ingredients/', views.IngredientListCreate.as_view(), name='ingredient-list-create'),
    path('restaurants/', views.RestaurantListCreate.as_view(), name='restaurant-list-create'),
    path('francesinhas/<int:pk>/', views.FrancesinhaRetrieveUpdateDestroy.as_view(), name='francesinha-retrieve-update-destroy'),
    path('ingredients/<int:pk>/', views.IngredientRetrieveUpdateDestroy.as_view(), name='ingredient-retrieve-update-destroy'),
    path('restaurants/<int:pk>/', views.RestaurantRetrieveUpdateDestroy.as_view(), name='restaurant-retrieve-update-destroy'),
]