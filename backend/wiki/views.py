from rest_framework import generics, status, serializers
from rest_framework.response import Response
from .models import Francesinha, Ingredient, Restaurant
from .serializers import FrancesinhaSerializer, IngredientSerializer, RestaurantSerializer
from django.utils.html import escape

# Create your views here.

# Generic views
class FrancesinhaListCreate(generics.ListCreateAPIView):
    queryset = Francesinha.objects.all()
    serializer_class = FrancesinhaSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        # Sanitize inputs
        data['name'] = escape(data.get('name', ''))
        
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class IngredientListCreate(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        # Sanitize inputs
        data['name'] = escape(data.get('name', ''))
        
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RestaurantListCreate(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        # Sanitize inputs
        data['name'] = escape(data.get('name', ''))
        data['address'] = escape(data.get('address', ''))
        data['city'] = escape(data.get('city', ''))
        data['country'] = escape(data.get('country', ''))
        
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FrancesinhaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Francesinha.objects.all()
    serializer_class = FrancesinhaSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()

        image = data.get('image', None)
            
        
        # Sanitize inputs
        if 'name' in data:
            data['name'] = escape(data['name'])
        if 'description' in data:
            data['description'] = escape(data['description'])

        # Save current image if no new image is provided
        if not image:
            data['image'] = instance.image
        else:
            instance.image.delete(save=False)
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class IngredientRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()
        
        # Sanitize inputs
        if 'name' in data:
            data['name'] = escape(data['name'])
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RestaurantRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()
        
        # Sanitize inputs
        if 'name' in data:
            data['name'] = escape(data['name'])
        if 'address' in data:
            data['address'] = escape(data['address'])
        if 'city' in data:
            data['city'] = escape(data['city'])
        if 'country' in data:
            data['country'] = escape(data['country'])
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Custom views

#render_image
from django.http import HttpResponse
from django.conf import settings
import os

def render_image(request, image_name):
    image_path = os.path.join(settings.MEDIA_ROOT, 'images', image_name)
    with open(image_path, 'rb') as image_file:
        return HttpResponse(image_file.read(), content_type='image/jpeg')

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
