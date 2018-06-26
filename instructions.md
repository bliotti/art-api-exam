# Art

Create a RESTful api that helps to manage a list of famous art. Include scripts to load data. Provide developer documentation to minimize on-boarding friction.

## Getting Started

1.  Fork the repo

Sign in to your GitHub account and fork the following repo:

```
https://github.com/tripott/art-api-exam.git
```

2.  Clone your fork

Clone your fork to your local machine and install the project's dependencies.

```
$ git clone <url>
$ cd art-api-exam
$ npm install
```

## Grading Scale

Successfully complete the first 4 steps to receive a grade of 'Meets Expectations'. Complete step 5 to receive a grade of 'Exceeds Expectations'. Complete step 6 to receive a grade of 'Outstanding'

### Step 1

- Using the file named **load-data.js**, create a program that adds the following paintings into a CouchDB database named `{your first name}Art`. Ex: `TripArt`:

> Remember to keep your secret safe.

```
[
  {
    "_id": "painting_starry_night",
    "name": "The Starry Night",
    "type": "painting",
    "movement": "post-impressionism",
    "artist": "Vincent van Gogh",
    "yearCreated": 1889,
    "museum": {name: "Museum of Modern Art", location: "New York"}
  },
  {
    "_id": "painting_water_lilies_nympheas",
    "name": "Water Lilies Nympheas",
    "type": "painting",
    "movement": "impressionism",
    "artist": "Claude Monet",
    "yearCreated": 1907,
    "museum": {"name": "Art Gallery of Ontario", "location": "Toronto"}
  },
  {
    "_id": "painting_last_supper",
    "name": "The Last Supper",
    "type": "painting",
    "movement": "Renaissance",
    "artist": "Leonardo da Vinci",
    "yearCreated": 1495,
    "museum": {"name": "Santa Maria delle Grazie", "location": "Milan"}
  },
  {
    "_id": "painting_sunday_afternoon_on_the_island_of_la_grande_jatte",
    "name": "A Sunday Afternoon on the Island of La Grande Jatte",
    "type": "painting",
    "movement": "impressionism",
    "artist": "Georges Seurat",
    "yearCreated": 1884,
    "museum": {"name": "Art Institute of Chicago", "location": "Chicago"}
  },
  {
    "_id": "painting_guernica",
    "name": "Guernica",
    "type": "painting",
    "movement": "surrealism",
    "artist": "Pablo Picasso",
    "yearCreated": 1937,
    "museum": {"name": "Museo Nacional Centro de Arte Reina Sofía", "location": "Madrid"}
  },
  {
    "_id": "painting_bal_du_moulin_de_la_galette",
    "name": "Bal du moulin de la Galette",
    "type": "painting",
    "movement": "impressionism",
    "artist": "Pierre-Auguste Renoires",
    "yearCreated": 1876,
    "museum": {"name": "Musée d’Orsay", "location": "Paris"}
  }
]
```

- Within your **package.json**, create a `load` script that runs your **load-data.js** program.

### Step 2

Review the information below and create the described functionality.

- Create a painting

  `POST /paintings`

  Creates a painting. The request body must contain a JSON object that represents the painting being created. The request body must include the `name`, `movement`, `artist`, `yearCreated`, and `museum` fields.

  Use the `name` field in the creation of the `_id` value. **DO NOT ALLOW** the articles "a" or "the" in the beginning of the name for the primary key value.

  > DO NOT ALLOW the articles "a" or "the" in the beginning of the name for the primary key value. In the example below the name of the painting to create is "The Persistence of Memory". When created the painting should have a primary key value of `_id: "painting_persistence_of_memory"`

  **Sample Request**

  ```
  POST /paintings
  ```

  **Sample Request Body JSON Data**

  ```
  {
    "name": "The Persistence of Memory",
    "movement": "surrealism",
    "artist": "Salvador Dali",
    "yearCreated": 1931,
    "museum": {"name": "Musuem of Modern Art", "location": "New York"}
  }
  ```

  **Sample Response**

  ```
  {
    "ok": true,
    "id": "painting_persistence_of_memory",
    "rev": "1-c617189487fbe325d01cb7fc74acf45b"
  }
  ```

- Retrieve a painting

  `GET /paintings/:id`

  Retrieves a specific painting as identified by the `:id` path parameter.

  **Sample Request**

  ```
  GET /paintings/painting_bal_du_moulin_de_la_galette
  ```

  **Sample Response**

  ```
  {
    "_id": "painting_bal_du_moulin_de_la_galette",
    "_rev": "1-c617189487fbe325d01cb7fc74acf45b",
    "name": "Bal du moulin de la Galette",
    "type": "painting",
    "movement": "impressionism",
    "artist": "Pierre-Auguste Renoires",
    "yearCreated": 1876,
    "museum": {"name": "Musée d’Orsay", "location": "Paris"}
  }
  ```

- Update a painting

  `PUT /paintings/:id`

  Updates a specific painting as identified by the `:id` path parameter. The request body must contain a JSON object that represents the painting being updated. The request body must include the `_id`, `_rev`, `name`, `movement`, `artist`, `yearCreated`, and `museum` fields. The `museum` key value must contain an object that includes the museum's `name` and `location`. Not providing the most recent `_rev` value will cause an `409 - conflict` error to occur.

  **Sample Request**

  ```
  PUT /paintings/painting_bal_du_moulin_de_la_galette
  ```

  **Sample Request Body JSON Data**

  ```
  {
    "_id": "painting_bal_du_moulin_de_la_galette",
    "_rev": "1-c617189487fbe325d01cb7fc74acf45b",
    "name": "Bal du moulin de la Galette",
    "type": "painting",
    "movement": "impressionism",
    "artist": "Pierre-Auguste Renoires",
    "yearCreated": 1877,
    "museum": {"name": "Musée d’Orsay", "location": "Paris"}
  }
  ```

  **Sample Response**

  ```
  {
    "ok": true,
    "id": "painting_bal_du_moulin_de_la_galette",
    "rev": "2-7e9b8cac710e70bfe0bef2de7bb3cfdb"
  }
  ```

- Delete a painting

  `DELETE /paintings/:id`

  Deletes a specific painting as identified by the `:id` path parameter.

  **Sample Request**

  ```
  DELETE /paintings/painting_bal_du_moulin_de_la_galette
  ```

  **Sample Response**

  ```
  {
      "ok": true,
      "id": "painting_bal_du_moulin_de_la_galette",
      "rev": "3-fdd7fcbc62477372240862772d91c88f"
  }
  ```

- List paintings with pagination

  `GET /paintings`

  Returns a collection of paintings sorted by name. An optional `limit` query parameter provides a limit on the number of objects returned. Default `limit` value is 5. When used in conjunction with `limit`, an optional `lastItem` query parameter provides the ability to return the next page of paintings.

  **Examples**

  - `GET /paintings?limit=2` returns an JSON array of 2 paintings.

    **Sample Response**

    ```
    [
      {
        "_id": "painting_bal_du_moulin_de_la_galette",
        "_rev": "5-2bac91fbd33b6612e4ea7da0552c91ca",
        "name": "Bal du moulin de la Galette",
        "type": "painting",
        "movement": "impressionism",
        "artist": "Pierre-Auguste Renoires",
        "yearCreated": 1876,
        "museum": {
            "name": "Musée d’Orsay",
            "location": "Paris"
        }
      },
      {
        "_id": "painting_guernica",
        "_rev": "5-a8b803395d7cb6154f63c627571a5575",
        "name": "Guernica",
        "type": "painting",
        "movement": "surrealism",
        "artist": "Pablo Picasso",
        "yearCreated": 1937,
        "museum": {
            "name": "Museo Nacional Centro de Arte Reina Sofía",
            "location": "Madrid"
        }
      }
    ]
    ```

  - `GET /paintings?limit=2&lastItem=painting_guernica` to get the next page of results:

    **Sample Response**

    ```
    [
      {
        "_id": "painting_last_supper",
        "_rev": "3-418af3c02f63725a2bd7941afe0cc3c6",
        "name": "The Last Supper",
        "type": "painting",
        "movement": "Renaissance",
        "artist": "Leonardo da Vinci",
        "yearCreated": 1495,
        "museum": {
            "name": "Santa Maria delle Grazie",
            "location": "Milan"
          }
      },
      {
        "_id": "painting_starry_night",
        "_rev": "3-5e8b713e1644779ebbb29c539166bd81",
        "name": "The Starry Night",
        "type": "painting",
        "movement": "post-impressionism",
        "artist": "Vincent van Gogh",
        "yearCreated": 1889,
        "museum": {
            "name": "Museum of Modern Art",
            "location": "New York"
        }
      }
    ]
    ```

### Step 4 - Getting Started

Create developer on-boarding instructions by creating a **README.md** file. Include the following sections:

#### Getting Started

Within the Getting Started section provide guidance on how to:

- Clone your repo
- Install dependencies
- Establish environment variables
- Load data
- Start the API

### Step 5 - Add a filter

- Create a `filter` query parameter on the `GET /paintings` endpoint to provide flexible search capability.
- Provide the ability to filter paintings by name, movement, artist and year created.
- The `filter` query parameter may be used in conjunction with `limit` but not with `lastItem`.

  > Paintings may not be filtered and paginated at the same time.

  > Consider using functional techniques within the dal to filter the documents after they are retrieved from the database.

  **Example**

  - Filter by movement and limit to five paintings

    ```
    GET /paintings?filter=movement:surrealism&limit=5
    ```

    **Sample Results**

    ```
    [
      {
          "_id": "painting_guernica",
          "_rev": "1-ccd60fb0ca42d879d048f083b95cfdcb",
          "name": "Guernica",
          "type": "painting",
          "movement": "surrealism",
          "artist": "Pablo Picasso",
          "yearCreated": 1937,
          "museum": {
              "name": "Museo Nacional Centro de Arte Reina Sofía",
              "location": "Madrid"
          }
      }
    ]
    ```

### Step 6 - Add filter comparison operators

- Enhance the existing `filter` query parameter on the `GET /paintings` endpoint by adding `eq` (equals), `gt` (greater than), `gte` (greater than equal to) ,`lt` (less than), `lte` (less than equal to) comparison operators within your filter.

- The `filter` query parameter may be used in conjunction with `limit` but not with `lastItem`.

> Paintings may not be filtered and paginated at the same time.

**Examples**

- Filter paintings created after 1930. Limit results to 5 paintings

  ```
  GET /paintings?filter=yearCreated:gt:1930&limit=5
  ```

  **Sample Results**

  ```
  [
    {
        "_id": "painting_guernica",
        "_rev": "1-ccd60fb0ca42d879d048f083b95cfdcb",
        "name": "Guernica",
        "type": "painting",
        "movement": "surrealism",
        "artist": "Pablo Picasso",
        "yearCreated": 1937,
        "museum": {
            "name": "Museo Nacional Centro de Arte Reina Sofía",
            "location": "Madrid"
        }
    }
  ]
  ```

- Filter by artists greater or equal to Pablo Picasso.

  ```
  GET /paintings?filter=artist:gte:Pablo Picasso
  ```

  **Sample Results**

  ```
  [
    {
        "_id": "painting_guernica",
        "_rev": "1-ccd60fb0ca42d879d048f083b95cfdcb",
        "name": "Guernica",
        "type": "painting",
        "movement": "surrealism",
        "artist": "Pablo Picasso",
        "yearCreated": 1937,
        "museum": {
            "name": "Museo Nacional Centro de Arte Reina Sofía",
            "location": "Madrid"
        }
    },
    {
      "_id": "painting_bal_du_moulin_de_la_galette",
      "name": "Bal du moulin de la Galette",
      "type": "painting",
      "movement": "impressionism",
      "artist": "Pierre-Auguste Renoires",
      "yearCreated": 1876,
      "museum": {"name": "Musée d’Orsay", "location": "Paris"}
    },
    {
      "_id": "painting_starry_night",
      "name": "The Starry Night",
      "type": "painting",
      "movement": "post-impressionism",
      "artist": "Vincent van Gogh",
      "yearCreated": 1889,
      "museum": {"name": "Museum of Modern Art", "location": "New York"}
    }
  ]
  ```
