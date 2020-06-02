## backend for freeBie Ecommerce Site

npm install

configure your environment variable
## Endpoints

# Products 
* all products `GET` http:yourserver/api/products
* pagination `GET` http:yourserver/api/products?page=1
* single product `GET` http:yourserver/api/product/:id
# 

```javascript
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
			 	 "img":"http://url",
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
	
```


