import requests
import json
# This file is only for reference and is not meant to be run. It contains snippets of code that may be helpful.
book_url = input("Please enter the url for the book")
## Assuming that request will be a get request, how to confirm?
response = requests.get(book_url)
response_json = response.json()
data = json.loads(response_json)
data_keys = list(data.keys())
book_ISBN = data_keys[0]
book_title = book_info[book_ISBN]["title"]
book_author = book_info[book_ISBN]["authors"]["name"]
book_page_count = book_info[book_ISBN]["number_of_pages"]