import requests
from flask import Flask, request, jsonify

def fetch_books_from_api(query=None, title=None, author=None, subject=None, limit=5):
    """
    Fetch books from the public API based on the search query, title, author, or subject.
    
    Args:
        query (str): The general search query string.
        title (str): The book title to search for.
        author (str): The author name to search for.
        subject (str): The subject to search for.
    
    Returns:
        dict: The JSON response from the API.
    """
    api_url = 'https://openlibrary.org/search.json'
    params = {}

    if query:
        params['q'] = query
    if title:
        params['title'] = title
    if author:
        params['author'] = author
    if subject:
        params['subject'] = subject
    params['limit'] = limit

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}

def parse_description(work_id):
    """
    Parse the description of a book from the API based on the Work ID.
    
    Args:
        work_id (str): The Work ID of the book.
    
    Returns:
        str: The description of the book.
    """
    api_work_url = f'https://openlibrary.org/works/{work_id}.json'
    try:
        work_response = requests.get(api_work_url)
        work_response.raise_for_status()  # Raises an HTTPError for bad responses
        work_data = work_response.json()
        description = work_data.get('description', 'No description available')
        
        # Check if the description is a dictionary and extract the 'value' field
        if isinstance(description, dict):
            description = description.get('value', 'No description available')
        
        return description
    except requests.exceptions.RequestException as e:
        return f'Error fetching description: {str(e)}'

def parse_books(data):
    """
    Parse the JSON response to extract book title, author, cover_edition_key and Work ID.
    
    Args:
        data (dict): The JSON response from the API.
    
    Returns:
        list: A list of dictionaries containing the extracted information.
    """
    books = []
    for doc in data.get('docs', []):
        work_id = doc.get('key').split('/')[-1]
        title = doc.get('title')
        author = doc.get('author_name', ['Unknown'])[0]
        description = parse_description(work_id)
        cover_edition_key = doc.get('cover_edition_key')
        img_S = f"https://covers.openlibrary.org/b/olid/{cover_edition_key}-S.jpg"
        img_M = f"https://covers.openlibrary.org/b/olid/{cover_edition_key}-M.jpg"
        img_L = f"https://covers.openlibrary.org/b/olid/{cover_edition_key}-L.jpg"
        book = {
            'title': title,
            'author': author,
            'Work_ID': work_id,
            'description': description,
            'img_S': img_S,
            'img_M': img_M,
            'img_L': img_L
        }
        books.append(book)
    return books