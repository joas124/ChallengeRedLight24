from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Francesinha, Ingredient, Restaurant

# Create your tests here.

class FrancesinhaListCreateTests(APITestCase):

    def setUp(self):
        self.restaurant = Restaurant.objects.create(name="Barriga Cheia", address="Rua amarela, 25", city="Setúbal", country="Portugal", rating=5.0)
        self.ingredient = Ingredient.objects.create(name="Ovo")

    def test_create_francesinha(self):
        url = reverse('francesinha-list-create')
        data = {
            'name': 'Francesinha de Ovo',
            'price': '7.99',
            'rating': '2.5',
            'ingredients': [self.ingredient.id],
            'restaurant': self.restaurant.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Francesinha.objects.count(), 1)
        self.assertEqual(Francesinha.objects.get().name, 'Francesinha de Ovo')

    def test_list_francesinhas(self):
        Francesinha.objects.create(name="Francesinha da Boa", price="12.99", rating="4.9", restaurant=self.restaurant)
        url = reverse('francesinha-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

class IngredientListCreateTests(APITestCase):

    def test_create_ingredient(self):
        url = reverse('ingredient-list-create')
        data = {'name': 'Cigarro'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Ingredient.objects.count(), 1)
        self.assertEqual(Ingredient.objects.get().name, 'Cigarro')

    def test_list_ingredients(self):
        Ingredient.objects.create(name="Cigarro")
        url = reverse('ingredient-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

class RestaurantListCreateTests(APITestCase):

    def test_create_restaurant(self):
        url = reverse('restaurant-list-create')
        data = {
            'name': 'Mata Bicho',
            'address': 'Praça da Alegria, 69',
            'city': 'Leiria',
            'country': '?????',
            'rating': '4.5'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Restaurant.objects.count(), 1)
        self.assertEqual(Restaurant.objects.get().name, 'Mata Bicho')

    def test_list_restaurants(self):
        Restaurant.objects.create(name="Pancinhas 3", address="Escadas Monumentais", city="Coimbra", country="Portugal", rating="3.2")
        url = reverse('restaurant-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class FrancesinhaRetrieveUpdateDestroyTests(APITestCase):

    def setUp(self):
        self.restaurant = Restaurant.objects.create(name="Restaurante Top", address="Avenida da Liberdade", city="Rio de Janeiro", country="Brazil", rating=4.3)
        self.ingredient = Ingredient.objects.create(name="Pão de forma")
        self.francesinha = Francesinha.objects.create(name="Francesinha Brasileira", price="4.99", rating="5.0", restaurant=self.restaurant)
        self.francesinha.ingredients.add(self.ingredient)
        self.url = reverse('francesinha-retrieve-update-destroy', args=[self.francesinha.id])

    def test_retrieve_francesinha(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Francesinha Brasileira')

    def test_update_francesinha(self):
        data = {'name': 'Francesinha Brasileira Atualizada'}
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.francesinha.refresh_from_db()
        self.assertEqual(self.francesinha.name, 'Francesinha Brasileira Atualizada')

    def test_delete_francesinha(self):
        # Test soft delete
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.francesinha.refresh_from_db()
        self.assertTrue(self.francesinha.deleted)

        # Test hard delete
        response = self.client.delete(f"{self.url}?hard=true")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Francesinha.objects.filter(id=self.francesinha.id).count(), 0)

class IngredientRetrieveUpdateDestroyTests(APITestCase):

    def setUp(self):
        self.ingredient = Ingredient.objects.create(name="Molho Francesinha")
        self.url = reverse('ingredient-retrieve-update-destroy', args=[self.ingredient.id])

    def test_retrieve_ingredient(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Molho Francesinha')

    def test_update_ingredient(self):
        data = {'name': 'Molho Francesinha do Mercadona'}
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.ingredient.refresh_from_db()
        self.assertEqual(self.ingredient.name, 'Molho Francesinha do Mercadona')

    def test_delete_ingredient(self):
        # Test soft delete
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.ingredient.refresh_from_db()
        self.assertTrue(self.ingredient.deleted)

        # Test hard delete
        response = self.client.delete(f"{self.url}?hard=true")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Ingredient.objects.filter(id=self.ingredient.id).count(), 0)

class RestaurantRetrieveUpdateDestroyTests(APITestCase):

    def setUp(self):
        self.restaurant = Restaurant.objects.create(name="Churrasqueira Corte Real", address="Ao lado da minha casa", city="Coimbra", country="Portugal", rating=3.7)
        self.url = reverse('restaurant-retrieve-update-destroy', args=[self.restaurant.id])

    def test_retrieve_restaurant(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Churrasqueira Corte Real')

    def test_update_restaurant(self):
        data = {'name': 'Churrasqueira Corte Real de Palmela'}
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.restaurant.refresh_from_db()
        self.assertEqual(self.restaurant.name, 'Churrasqueira Corte Real de Palmela')

    def test_delete_restaurant(self):
        # Test soft delete
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.restaurant.refresh_from_db()
        self.assertTrue(self.restaurant.deleted)

        # Test hard delete
        response = self.client.delete(f"{self.url}?hard=true")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Restaurant.objects.filter(id=self.restaurant.id).count(), 0)

