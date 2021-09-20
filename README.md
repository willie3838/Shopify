# Shopify Developer Intern Challenge

## Challenge Information
In this challenge, I created the backend for the image repository where individuals can add and search through images

## Technologies
This project was created with:
* Node.js
* Express
* MongoDB
* Mocha
* Chai
* Insomnia

## Challenge Showcase

### Database
![MongoDB Database](/assets/database.gif)
The database I created has the following attributes:
* id 
* url
* user 
* category 
* name 
* visibility

### Adding images
![Insomnia POST request](/assets/add_img.png)
To add images, create a POST request at http://localhost:8000/api/v1/images 

You can add one or multiple images, but make sure to encapsulate an image's information in one object as shown in the png above.


### Searching images
![Insomnia GET request](/assets/srch.png)
![Insomnia GET request with filters](/assets/srch2.png)
To search images, create a GET request at http://localhost:8000/api/v1/images

If called without a query, it will return all images in the repository that are public.

Otherwise, it will return images that fit within the query.

### Unit tests
![Unit tests](/assets/tests.gif)
I created unit tests for the 2 endpoints I made, making sure they contained the right content and received a 200 HTTP response code