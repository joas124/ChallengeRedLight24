# Generated by Django 5.0.3 on 2024-05-28 20:22

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("wiki", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="francesinha",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="francesinhas/"),
        ),
    ]
