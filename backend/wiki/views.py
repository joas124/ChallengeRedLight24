from django.shortcuts import render
from rest_framework import generics
from .models import Francesinha, Ingredient, Restaurant
from .serializers import FrancesinhaSerializer, IngredientSerializer, RestaurantSerializer

# Create your views here.

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


