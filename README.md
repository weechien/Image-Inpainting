# Image-Inpainting 🎨

A web app built with React and Flask which uses deep learning algorithms to inpaint any portion of an image:

https://flask-react-image-inpainting.herokuapp.com/

*Note: Inpainting function is currently unavailable because Heroku's free tier server only has 500MB of memory, which is insufficient to run the machine learning model. Please clone this repo instead and install the required libraries (stated in requirements.txt) to run the model in your local browser.*

## Project Description

Image Inpainting is built for users who wish to remove objects such as watermarks and defects from an image. It has a simple interface whereby users could upload an image they wish to alter, and then mark the area they wish to remove with a brush object. The image can then be uploaded to the Heroku server for processing. Ideally, we would like to use a GPU-enabled server for a faster processing speed. However, as this is deployed on a free tier Heroku server, the processing is instead done by a CPU, albeit much slower. We hope that this project will inspire more people to explore the endless possibilities of artificial intelligence.

## Features

- Responsive layout for any devices.
- Mark image area to inpaint.
- Inpaint image from server side.
- Download inpainted image.
- Undo and redo brush strokes.
- Change brush size.
- Clear brush strokes or select a new image.

## Built With

- [Flask](https://palletsprojects.com/p/flask/) - Web framework used
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces

## Acknowledgments

- [EdgeConnect](https://github.com/knazeri/edge-connect)

## Example image:

![alt text](https://github.com/weechien/Image-Inpainting/blob/master/example.jpg)
