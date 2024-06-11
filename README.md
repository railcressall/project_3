# project_3
Project 3 - Interactive Air Pollution Visualization

OVERVIEW
  This project is an interactive visualization of air pollution across various U.S. Cities. It aims to provide an intuitive interface for understanding the air quality and its different components in major urban areas. 
  This interactive map allows users to explore data on a variety of different air pollutants. Each Marker also reflects the AQI or Air Quality Index Number. 

PURPOSE
  By visualizing this data, we hope to promote informed decision-making and encourage actions to improve air quality.   

DEPLOYMENT - MAP
  Go to "back" folder then use `npm install` in the terminal. 

  use `node index` in terminal to run

  might take longer to populate the database
  
DEPLOYMENT - Streamlit
  clone repo to local
  CD to repo on local 
  run 'python -m streamlit run app.py
  
  GITPAGE ISSUE
    Gitpage is unable to connect to databases like PostgreSQL - you will see when you deploy our gitpage that the map populates and we are able to filter through our date range, however, the city markers do not populate. 
