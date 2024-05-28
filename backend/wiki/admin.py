from django.contrib import admin

# Register your models here.

from .models import Ingredient, Restaurant, Francesinha

admin.site.register(Ingredient)
admin.site.register(Restaurant)
admin.site.register(Francesinha)
