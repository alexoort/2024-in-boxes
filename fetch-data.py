# search for the number of deaths in the middle east using this link: https://data.techforpalestine.org/api/v2/killed-in-gaza.min.json

import requests

response = requests.get(
    "https://data.techforpalestine.org/api/v2/killed-in-gaza.min.json"
)

# save the response to a a database

