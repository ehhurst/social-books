from flask import Flask, request, jsonify
from flask_cors import CORS
from book_api import fetch_books_from_api, parse_books

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

@app.route('/parse', methods=['POST'])
def parse_book():
    try:
        data = request.json  # Receive JSON from frontend
        book_ISBN = list(data.keys())[0]
        book_title = data[book_ISBN]["title"]
        book_author = data[book_ISBN]["author"]
        
        return jsonify({
            "ISBN": book_ISBN,
            "title": book_title,
            "author": book_author
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/search', methods=['GET'])
def search_books():
    """
    Flask route to handle book search requests.
    
    Returns:
        Response: JSON response containing search results or an error message.
    """
    query = request.args.get('q')
    title = request.args.get('title')
    author = request.args.get('author')
    subject = request.args.get('subject')

    if not (query or title or author or subject):
        return jsonify({'error': 'Missing search parameter'}), 400

    # Use the fetch_books_from_api function to get the search results
    data = fetch_books_from_api(query=query, title=title, author=author, subject=subject)
    parsed_data = parse_books(data)
    return jsonify(parsed_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
