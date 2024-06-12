# project_3
Project 3 - Interactive Air Pollution Visualization

OVERVIEW
  Using the OpenWeather [here]https://openweathermap.org/api/geocoding-api we created an interactive visualization of air pollution across various U.S. Cities. We located a Git repo [here]https://gist.github.com/Miserlou/c5cd8364bf9b2420bb29
  that lists the top 125 populated states. The map aims to provide an intuitive interface for understanding the air quality and its different components in major urban areas. This interactive map allows users to explore data on a variety of different air pollutants. Each    Marker also reflects the AQI or Air Quality Index Number. 

PURPOSE
  By visualizing this data, we hope to promote informed decision-making and encourage actions to improve air quality.   

DEPLOYMENT - MAP
  Go to "back" folder then use `npm install` in the terminal. 

  use `node index` in terminal to run

  might take longer to populate the database
  
DEPLOYMENT - Streamlit: 
Streamlit is an open-source Python library that allows you to create web applications for machine learning, data science, and other analytics tasks with minimal effort. It's designed to make the process of building and sharing data-centric web apps simple and intuitive.
With Streamlit, you can write Python scripts just like you would for any other data analysis task, but with added commands to create interactive widgets, plots, and visualizations. These scripts can then be run like any other Python script, but instead of just outputting results to the console, Streamlit turns them into interactive web apps that can be accessed through a browser.

  *You will need streamlit, pandas, plotly.express & the data csv files in the "back" folder to run streamlit.*
  
  - clone repo to local
  - CD to repo on local 
  - run 'python -m streamlit run app.py' in terminal. This will tell streamlit to look in your repo folder for the "app.py" file and run the code within it.

  Streamlit will open in your browser and you can begin interacting with the data within.

We also got help from chatgpt to build our project.
  
  
  GITPAGE ISSUE
    Gitpage is unable to connect to databases like PostgreSQL - you will see when you deploy our gitpage that the map populates and we are able to filter through our date range, however, the city markers do not populate. 
