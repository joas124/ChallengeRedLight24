from rest_framework import generics, status, serializers
from rest_framework.response import Response
from .models import Francesinha, Ingredient, Restaurant
from .serializers import FrancesinhaSerializer, IngredientSerializer, RestaurantSerializer
from django.utils.html import escape
from django.http import HttpResponse
from django.conf import settings
import os

# Generic views
class FrancesinhaListCreate(generics.ListCreateAPIView):
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
    
    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        sort = self.request.query_params.get('sort', None)
        result = Francesinha.objects.filter(deleted=False)
        if query:
            result = result.filter(name__icontains=query)
        if sort:
            if sort == 'rating':
                result = result.order_by(sort).reverse()
            else:
                result = result.order_by(sort)
        return result

class IngredientListCreate(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        # Sanitize inputs
        data['name'] = escape(data.get('name', ''))
        
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            # Check if the ingredient already exists
            name = serializer.validated_data.get('name')
            if Ingredient.objects.filter(name=name).exists():
                return Response({'detail': 'Ingredient already exists'}, status=status.HTTP_400_BAD_REQUEST)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        sort = self.request.query_params.get('sort', None)
        result = Ingredient.objects.filter(deleted=False)
        if query:
            result = result.filter(name__icontains=query)
        if sort:
            result = result.order_by(sort)
        return result

class RestaurantListCreate(generics.ListCreateAPIView):
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
        
    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        sort = self.request.query_params.get('sort', None)
        result = Restaurant.objects.filter(deleted=False)
        if query:
            result = result.filter(name__icontains=query)
        if sort:
            if sort == 'rating':
                result = result.order_by(sort).reverse()
            else:
                result = result.order_by(sort)
        return result
    
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
            if instance.image:
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
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        hard_delete = request.query_params.get('hard', 'false').lower() == 'true'
        
        if hard_delete:
            # Hard delete
            instance.image.delete(save=False)
            self.perform_destroy(instance)
        else:
            # Soft delete
            instance.deleted = True
            instance.save()
        
        return Response(status=status.HTTP_204_NO_CONTENT)

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
            # Check if the ingredient already exists
            name = serializer.validated_data.get('name')
            if Ingredient.objects.filter(name=name).exists():
                return Response({'detail': 'Ingredient already exists'}, status=status.HTTP_400_BAD_REQUEST)
            self.perform_update(serializer)
            return Response(serializer.data)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        hard_delete = request.query_params.get('hard', 'false').lower() == 'true'
        
        if hard_delete:
            # Hard delete
            self.perform_destroy(instance)
        else:
            # Soft delete
            instance.deleted = True
            instance.save()
        
        return Response(status=status.HTTP_204_NO_CONTENT)

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
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        hard_delete = request.query_params.get('hard', 'false').lower() == 'true'
        
        if hard_delete:
            # Hard delete all francesinhas from this restaurant, and their images
            francesinhas = Francesinha.objects.filter(restaurant=instance.id)
            for francesinha in francesinhas:
                francesinha.image.delete(save=False)
                francesinha.delete()
            self.perform_destroy(instance)
        else:
            # Soft delete all francesinhas from this restaurant
            francesinhas = Francesinha.objects.filter(restaurant=instance.id)
            for francesinha in francesinhas:
                francesinha.deleted = True
                francesinha.save()
            instance.deleted = True
            instance.save()
        
        return Response(status=status.HTTP_204_NO_CONTENT)

# Custom views

def render_image(request, image_name):
    image_path = os.path.join(settings.MEDIA_ROOT, 'images', image_name)
    with open(image_path, 'rb') as image_file:
        return HttpResponse(image_file.read(), content_type='image/jpeg')

class FrancesinhaListByRestaurant(generics.ListAPIView):
    serializer_class = FrancesinhaSerializer

    def get_queryset(self):
        restaurant_id = self.kwargs['restaurant_id']
        return Francesinha.objects.filter(restaurant=restaurant_id, deleted=False)
    
class IngredientListByFrancesinha(generics.ListAPIView):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        francesinha_id = self.kwargs['francesinha_id']
        return Ingredient.objects.filter(francesinha=francesinha_id, deleted=False)

# Views for deleted objects

class DeletedFrancesinhaList(generics.ListAPIView):
    serializer_class = FrancesinhaSerializer

    def get_queryset(self):
        return Francesinha.objects.filter(deleted=True)
    
class DeletedIngredientList(generics.ListAPIView):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        return Ingredient.objects.filter(deleted=True)
    
class DeletedRestaurantList(generics.ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        return Restaurant.objects.filter(deleted=True)

# Views for restoring objects

class RestoreFrancesinha(generics.UpdateAPIView):
    queryset = Francesinha.objects.filter(deleted=True)
    serializer_class = FrancesinhaSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.deleted = False
        # Also restore the restaurant (if it was deleted)
        instance.restaurant.deleted = False
        instance.restaurant.save()
        instance.save()
        return Response(status=status.HTTP_200_OK)
    
class RestoreIngredient(generics.UpdateAPIView):
    queryset = Ingredient.objects.filter(deleted=True)
    serializer_class = IngredientSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.deleted = False
        instance.save()
        return Response(status=status.HTTP_200_OK)
    
class RestoreRestaurant(generics.UpdateAPIView):
    queryset = Restaurant.objects.filter(deleted=True)
    serializer_class = RestaurantSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.deleted = False
        instance.save()
        return Response(status=status.HTTP_200_OK)