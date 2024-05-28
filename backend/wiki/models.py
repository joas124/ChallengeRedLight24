from django.db import models

# Create your models here.

class Ingredient(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=1)

    def __str__(self):
        return self.name

class Francesinha(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    ingredients = models.ManyToManyField(Ingredient)
    image = models.ImageField(upload_to='francesinhas/', blank=True, null=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    def __str__(self):
        return self.name