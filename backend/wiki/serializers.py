from rest_framework import serializers
from .models import Francesinha, Ingredient, Restaurant

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'
      
class FrancesinhaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Francesinha
        fields = '__all__'

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        # Return all fields + all francesinhas related to the restaurant
        fields = '__all__'