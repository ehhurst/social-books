from flask import Flask, request, jsonify
from flask_cors import CORS

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
