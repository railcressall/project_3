import streamlit as st
import pandas as pd
import plotly.express as px

# Set the page title, icon, layout, and initial sidebar state
st.set_page_config(
    page_title="Air Pollution Visualization",
    page_icon=":cloud_with_lightning_and_rain:",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Set the title of the app with an emoji
st.title(':partly_sunny: Air Pollution Visualization')

# Sidebar navigation
page_options = ['Nov 2020 to Nov 2021', 'Nov 2021 to Nov 2022', 'Nov 2022 to Nov 2023', 'All Years']
selected_page = st.sidebar.radio('Select a page', page_options)

# Load CSV files
file_path_2020 = "back/data/data2020.csv"
file_path_2021 = "back/data/data2021.csv"
file_path_2022 = "back/data/data2022.csv"

# List of pollutants
pollutants = [
    "Carbon monoxide (CO)",
    "Nitric Oxide (NO)",
    "Nitrogen dioxide (NO2)",
    "Ozone (O3)",
    "Sulfur Dioxide (SO2)",
    "Particulates 2.5",
    "Particulates 10",
    "Ammonia (NH3)"
]

# Function to display data for selected year and city
def display_city_data(df, selected_city, date_range):
    city_data = df[df['City Name'] == selected_city]
    # st.subheader(f"Data for {selected_city} ({date_range}):")
    st.write(city_data)
    
    pollutant = st.selectbox("Select Pollutant", options=pollutants, key=f"{date_range}_pollutant")
    
    if pollutant in df.columns:
        min_value = city_data[pollutant].min()
        max_value = city_data[pollutant].max()
        min_dates = city_data[city_data[pollutant] == min_value]['Date'].values
        max_dates = city_data[city_data[pollutant] == max_value]['Date'].values
        
        # st.write(f"**{pollutant} levels in {selected_city} for {date_range}**")
        
        if len(min_dates) > 1:
            selected_min_date = st.selectbox(f"Multiple dates found for minimum value of {min_value}. Select a date:", min_dates, key=f"{date_range}_min_date")
        else:
            selected_min_date = min_dates[0]
        
        if len(max_dates) > 1:
            selected_max_date = st.selectbox(f"Multiple dates found for maximum value of {max_value}. Select a date:", max_dates, key=f"{date_range}_max_date")
        else:
            selected_max_date = max_dates[0]
        
        st.markdown(f"Minimum: <span style='background-color: yellow; color: black'>{min_value}</span> on {selected_min_date}", unsafe_allow_html=True)
        st.markdown(f"Maximum: <span style='background-color: yellow; color: black'>{max_value}</span> on {selected_max_date}", unsafe_allow_html=True)
    else:
        st.error(f"The pollutant '{pollutant}' is not available in the data for {date_range}.")

    # Create a map of the United States showing pollutant levels
    if 'Latitude' in df.columns and 'Longitude' in df.columns:
        fig_map = px.scatter_geo(
            df,
            lat='Latitude',
            lon='Longitude',
            hover_name='City Name',
            size=pollutant,  # Use pollutant levels to determine marker size
            animation_frame='Date',
            projection='albers usa',
            title=f"Levels of {pollutant} over time",
            scope='usa',
            height=600,
            size_max=40,  # Adjust maximum marker size
            color_continuous_scale='Oranges'  # Use a variation of orange color scale
        )
        st.plotly_chart(fig_map, use_container_width=True)

# Display the selected page
if selected_page == 'Nov 2020 to Nov 2021':
    st.header('Data for Nov 2020 to Nov 2021')
    df_2020 = pd.read_csv(file_path_2020)
    selected_city_2020 = st.selectbox("Select a city", df_2020['City Name'].unique())
    display_city_data(df_2020, selected_city_2020, 'Nov 2020 to Nov 2021')

elif selected_page == 'Nov 2021 to Nov 2022':
    st.header('Data for Nov 2021 to Nov 2022')
    df_2021 = pd.read_csv(file_path_2021)
    selected_city_2021 = st.selectbox("Select a city", df_2021['City Name'].unique())
    display_city_data(df_2021, selected_city_2021, 'Nov 2021 to Nov 2022')

elif selected_page == 'Nov 2022 to Nov 2023':
    st.header('Data for Nov 2022 to Nov 2023')
    df_2022 = pd.read_csv(file_path_2022)
    selected_city_2022 = st.selectbox("Select a city", df_2022['City Name'].unique())
    display_city_data(df_2022, selected_city_2022, 'Nov 2022 to Nov 2023')

elif selected_page == 'All Years':
    st.header('Data for All Years')
    st.write('---')

    # Load data for all years
    df_2020 = pd.read_csv(file_path_2020)
    df_2021 = pd.read_csv(file_path_2021)
    df_2022 = pd.read_csv(file_path_2022)

    # Display data for each year in separate columns
    col1, col2, col3 = st.columns(3)

    with col1:
        st.write('Nov 2020 to Nov 2021 Data')
        selected_city_2020_comp = st.selectbox("Select a city", df_2020['City Name'].unique(), key='2020_comp')
        display_city_data(df_2020, selected_city_2020_comp, 'Nov 2020 to Nov 2021')

    with col2:
        st.write('Nov 2021 to Nov 2022 Data')
        selected_city_2021_comp = st.selectbox("Select a city", df_2021['City Name'].unique(), key='2021_comp')
        display_city_data(df_2021, selected_city_2021_comp, 'Nov 2021 to Nov 2022')

    with col3:
        st.write('Nov 2022 to Nov 2023 Data')
        selected_city_2022_comp = st.selectbox("Select a city", df_2022['City Name'].unique(), key='2022_comp')
        display_city_data(df_2022, selected_city_2022_comp, 'Nov 2022 to Nov 2023')
