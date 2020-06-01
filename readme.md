## backend for freeBie Ecommerce Site


# get all Products 
GET : http:yourserver/api/products

pagination
GET: http:yourserver/api/products?page=1

```js
	{
		"data":
		[
			{"id":"5ed007e74c2e14358da8769c",
			 "name":"Night Warmer",
			 "cost":125.29,
			 "shortDescription":"Best fit for children",
			 "images":[
			 	{
			 	"id":"5ed007e74c2e14358da8769d",
			 	 "img":"http://res.cloudinary.com/mixedcode/image/upload/v1590691815/zn51zaymevilamrhsldn.jpg",
			 	 "public_id":"zn51zaymevilamrhsldn"
			 	}
			 ],
			 "createdBy":"5ecfd651cc958c255f2412c8",
			 "createdAt":"2020-05-28T18:50:15.886Z",
			 "updatedAt":"2020-05-28T18:50:15.886Z"
			}
		]
		,
		"page":0
	}
	
````


