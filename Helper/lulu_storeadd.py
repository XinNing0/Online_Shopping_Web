# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
#pip install selenium webdriver-manager
#pip show selenium
#pip show webdriver-manager

import csv
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

# Setup Chrome options
chrome_options = Options()
chrome_options.binary_location = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# Uncomment the next line if you want to run Chrome in headless mode
# chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Set path to chromedriver as per your configuration
webdriver_service = Service(ChromeDriverManager().install())

# Initialize the Chrome driver
driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)

# Open the Lululemon all stores page
driver.get("https://shop.lululemon.com/stores/all-lululemon-stores")


# get the link for each store
store_links = []
states = driver.find_elements(By.CSS_SELECTOR, "div[class^='accordionItemToggle-1dGpA']")

#save link
for state in states:
    state.click()
    time.sleep(3)
cities = driver.find_elements(By.CSS_SELECTOR, "a[href^='/stores/us/']")
print(len(cities))
for city in cities:
    #print(city.get_attribute('href'))
    store_links.append(city.get_attribute('href'))

# Prepare CSV and JSON files to store the results
csv_file = 'lululemon_stores.csv'
json_file = 'lululemon_stores.json'

# Initialize a list to hold JSON data
json_data = []




with open(csv_file, 'w', newline='') as csvfile:
    fieldnames = ['Store Name', 'Link', 'Phone', 'Email', 'Address', 'Open Hours']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    
    # Check if file has headers already, if not, write headers
    #if csvfile.tell() == 0:
    #    writer.writeheader()
    
    #get info in each link    
    for link in store_links:
        print(link)
        tmp_driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)
        tmp_driver.get(link)
        DIC = {}
        DIC['Link'] = link
        
        
        try:
            store_name_element = tmp_driver.find_element(By.CSS_SELECTOR, "h1.lll-text-xlarge.OneLinkNoTx.store-name_name__9c9Db")
            DIC['Store Name'] = store_name_element.text.strip()

            
            # Check if there are open hours listed
            open_days = tmp_driver.find_elements(By.CSS_SELECTOR, "dt[class^='store-hours-components_day__Stsoa']")
            open_times = tmp_driver.find_elements(By.CSS_SELECTOR, "dt[class^='store-hours-components_hour__tIUCq']")
            
            if not open_days or not open_times:
                raise ValueError("Store is closed or no open hours available")
            
            open_hours = ""

            for index in range(len(open_days)):
                open_hours += f"{open_days[index].text}: {open_times[index].text}; "
            #DIC[open_days[index].text] = open_hours[index].text
        
            DIC['Open Hours'] = open_hours.strip('; ')  # Remove the trailing semicolon and space
            
            # Check if there is contact information listed
            contact_us = tmp_driver.find_elements(By.CSS_SELECTOR, "span[class^='lll-text-body-2 icon-text-list_text__qdRia']")
            if len(contact_us) < 3:
                raise ValueError("Store is closed or contact information is missing")
        
            DIC['Phone'] = contact_us[0].text
            DIC['Email'] = contact_us[1].text
            DIC['Address'] = contact_us[2].text
            print(DIC)
            writer.writerow(DIC)
            print('----------------------------')
            # Append the data to the JSON list
            json_data.append(DIC)
            
        
        except Exception as e:
            print(f"Skipping store {DIC['Store Name']} due to missing information: {e}")
            
        tmp_driver.quit()
    

# Close the browser
driver.quit()

# Write the JSON data to a file
with open(json_file, 'w') as jsonfile:
    json.dump(json_data, jsonfile, indent=4)

print(f"Data has been saved to {csv_file} and {json_file}")








