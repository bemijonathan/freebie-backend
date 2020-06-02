## Backend For FreeBie Ecommerce Site

npm install

configure your environment variables
```json
CLOUD_NAME="<cloudinary_cloud_name>"
API_KEY="<cloudinary_api_key>"
API_SECRET="<cloudinary _secret_key>"
ENVIRONMENT=DEVELOPEMENT
JWT_SECRET_KEY="<jwt_secret>"
```

## Endpoints

# Products

- all products `GET: api/products`
- pagination `GET: api/products?page=1`
- single product `GET: api/products/:id`
- create product `POST: /api/products` `authenticated route`
- update product `PUT: api/products/id` `authenticated route`
- delete image `PUT: api/products/id/image_index` `authenticated route`
- delete products 	`DELETE: api/products/:id` `authenticated route`



```json
{
  "data": [
    {
      "id": "5ed007e74c2e14358da8769c",
      "name": "Night Warmer",
      "cost": 125.29,
      "shortDescription": "Best fit for children",
      "images": [
        {
          "id": "5ed007e74c2e14358da8769d",
          "img": "http://url",
          "public_id": "zn51zaymevilamrhsldn"
        }
      ],
      "createdBy": "5ecfd651cc958c255f2412c8",
      "createdAt": "2020-05-28T18:50:15.886Z",
      "updatedAt": "2020-05-28T18:50:15.886Z"
    }
  ],
  "page": 0
}
```

# Orders

- create Order `POST api/orders`
- get all Order `GET api/orders` `authenticated route`
- get single Order `GET api/orders/id`
- delete Order `DELETE api/orders/id` `authenticated route`

```json
{
  "products": [{ "product": "5ea9a67b92b43d55feebbdd5", "qty": 5 }],
  "shippingDetails": {
    "fullName": "jathan",
    "location": "Lagos",
    "email": "john@.com",
    "phoneNumber": "+3430903455366",
    "city": "Ikeja"
  },
  "shippingLocation": "Abuja"
}
```

# Admin
- signup `POST: signup`
- login `POST: login`
- get users `GET api/users` `authenticated route`

```js
//signup
{
	"email":"jonathan@gmail.com",
	"password":"******",
	"name":"Jonathan"
}
```

```js
//login
{
	"email":"jonathan@gmail.com",
	"password":"******"
}
```

```js
//response
{
  "data": "jwt_token"
}
```

## Dashboard Routes
<!-- affsfd -->