Hello I'm [Enzo Ariel Fiol](https://enzofiol.tech/) this Fullstack challenge was made with Next14, NodeJS and Tailwind. 

## Website: ITCrowd Test (https://it-crowd-test.vercel.app/).

## Brief

## NodeJS Server (Render) (https://itcrowd-server.onrender.com/products)

This Node.js application is a simple CRUD (Create, Read, Update, Delete) server using Express.js and MongoDB (with Mongoose) for data storage. Here's a brief overview of the main components and functionality:

PS: The server could have up to 40s delay in make a the first response, when you enter on the website for the first time.

`Dependencies`:

[express]: A web application framework for Node.js.
[mongoose]: An ODM (Object Data Modeling) library for MongoDB and Node.js.
[body-parser]: Middleware to parse the request body.
[cors]: Middleware to handle Cross-Origin Resource Sharing.

`Server Setup`:

The server is created using [Express], and it listens on port 5000 (const port = 5000).
MongoDB connection is established using Mongoose with a connection string (const uri).

`Token Generation:`

A function [generateToken] is defined using the crypto module to generate a random token whenever needed.
MongoDB Schemas and Models:

Three MongoDB schemas and models are defined using Mongoose:
[Admin]: Represents an administrator with fields for username, password, and a token.
[Brand]: Represents a brand with fields for name and logo URL.
[Product]: Represents a product with fields for name, description, image URL, price, and a reference to a brand.
Middleware:

[authorizeAdmin]: Middleware function to check authorization for admin routes. It verifies the presence and validity of a token in the request header.
Routes:

`Admin Routes:`

[POST] /admins: Creates a new admin with a username, password, and a generated token.
[GET] /admins/login: Performs login with a username and password, returning success or failure.

`Brand Routes:`

[GET] /brands: Retrieves all brands.
[POST] /brands: Creates a new brand with a name and logo URL.

`Product Routes:`

[GET] /products: Retrieves all products, populating brand information.
[GET] /products/search: Filters products by name and description.
[POST] /products: Creates a new product with various attributes.
[PUT] /products/:id: Updates a product by ID, including the option to update the associated brand.
[DELETE] /products/:id: Deletes a product by ID.

## Next14 Frontend (Vercel) (https://it-crowd-test.vercel.app/)

This smooth and responsive website, shows the products with their images in cards, when you click on [ReadMore->] a modal window will open with description of the product.

[Admin-UI] If you click on [LOGIN] another modal with a username and password inputs with Popup.

## Admin Credentials: [USER]:admin [PASSWORD]:admin (For test)

Once you enter a correct Credential, you will be redirect to an Admin Dashboard

[Admin-Dashboard] There is a list with all the information of the products.

`Edit` on click, a modal with the information of the selected product will show. You can change any field and Update it. This will reload the page with all the new information.

`Brand Edit` when you edit a Brand, and the products have the same Brand, they're all going to be updated automatically.

`Delete` if you need to delete a product, the website will ask you again to confirm the deletion.

`Create product` an empty modal will show so you can fill with all you product information. Once you created, this will store at the end of the list products.

Hope you can see all funcionalities of the website, and likes you. Have a great day! I'll be waiting for you feedback.

Regards,

Enzo Ariel Fiol.
