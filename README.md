# Francesinha Wiki

## Introduction
This project was made for the [RedLight Summer Internship 2024 - Dev Challenge](https://gitlab.com/weareredlight/code-challenges/si-24-dev-challenge)

## Architecture

### Front-end

- React (with TypeScript)
- Ngnix

### Back-end

- Django REST Framework
- PostgreSQL


## Requirements

- Docker

## How to run

1. Clone the repository

```bash
git clone https://github.com/joas124/ChallengeRedLight24
```

2. Run the following command

```bash
docker-compose up
```

3. Access the application at `http://localhost:3000`

## Features

- Create, edit and delete Francesinhas, Restaurants and Ingredients
- Search for Francesinhas, Restaurants and Ingredients
- Filter Francesinhas by name, price and rating
- Filter Restaurants by name and rating
- Filter Ingredients by name

## API Documentation

API URL: `http://localhost:8080/`

### Endpoints
#### Francesinhas
- `/francesinhas/`
  - `GET`: Get all Francesinhas (can search for name and/or filter by name, price and rating)
  - `POST`: Create a Francesinha
- `/francesinhas/<id>/`
  - `GET`: Get a Francesinha with the given id
  - `PUT`: Update a Francesinha with the given id
  - `DELETE`: Delete a Francesinha with the given id (can be soft or hard delete)
- `/francesinhas/deleted/`
  - `GET`: Get all soft deleted Francesinhas
- `/francesinhas/<id>/restore/`
  - `PUT`: Restore a soft deleted Francesinha (and its restaurant if it was soft deleted too)
- `/francesinhas/<id>/ingredients/`
  - `GET`: Get all Ingredients of a Francesinha with the given id

#### Restaurants
- `/restaurants/`
  - `GET`: Get all Restaurants (can search for name and/or filter by name and rating)
  - `POST`: Create a Restaurant
- `/restaurants/<id>/`
  - `GET`: Get a Restaurant with the given id
  - `PUT`: Update a Restaurant with the given id
  - `DELETE`: Delete a Restaurant with the given id (can be soft or hard delete)
- `/restaurants/deleted/`
  - `GET`: Get all soft deleted Restaurants
- `/restaurants/<id>/restore/`
  - `PUT`: Restore a soft deleted Restaurant
- `/restaurants/<id>/francesinhas/`
  - `GET`: Get all Francesinhas of a Restaurant with the given id

#### Ingredients
- `/ingredients/`
  - `GET`: Get all Ingredients (can search for name)
  - `POST`: Create an Ingredient
- `/ingredients/<id>/`
  - `GET`: Get an Ingredient with the given id
  - `PUT`: Update an Ingredient with the given id
  - `DELETE`: Delete an Ingredient with the given id (can be soft or hard delete)
- `/ingredients/deleted/`
  - `GET`: Get all soft deleted Ingredients
- `/ingredients/<id>/restore/`
  - `PUT`: Restore a soft deleted Ingredient

#### Others
- `/media/images/<image_name>`
  - `GET`: Get an image with the given name

