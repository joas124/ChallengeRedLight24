from django.shortcuts import render
from rest_framework import generics
from .models import Francesinha, Ingredient, Restaurant
from .serializers import FrancesinhaSerializer, IngredientSerializer, RestaurantSerializer

# Create your views here.

# Generic views
class FrancesinhaListCreate(generics.ListCreateAPIView):
    queryset = Francesinha.objects.all()
    serializer_class = FrancesinhaSerializer

class IngredientListCreate(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class RestaurantListCreate(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class FrancesinhaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Francesinha.objects.all()
    serializer_class = FrancesinhaSerializer

class IngredientRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class RestaurantRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


# Custom views
class FrancesinhaListByRestaurant(generics.ListAPIView):
    serializer_class = FrancesinhaSerializer

    def get_queryset(self):
        restaurant_id = self.kwargs['restaurant_id']
        return Francesinha.objects.filter(restaurant=restaurant_id)
    
class IngredientListByFrancesinha(generics.ListAPIView):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        francesinha_id = self.kwargs['francesinha_id']
        return Ingredient.objects.filter(francesinha=francesinha_id)
    
class FrancesinhaListByIngredient(generics.ListAPIView):
    serializer_class = FrancesinhaSerializer

    def get_queryset(self):
        ingredient_id = self.kwargs['ingredient_id']
        return Francesinha.objects.filter(ingredients=ingredient_id)
    
class RestaurantListByFrancesinha(generics.ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        francesinha_id = self.kwargs['francesinha_id']
        return Restaurant.objects.filter(francesinhas=francesinha_id)
    

    
    

