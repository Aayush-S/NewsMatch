import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
@cross_origin()
def home():
    return "Hello, World!"

# Create dummy embeddings
dummy_embeddings = {
    'CNN': [0.1, 0.2, 0.3],
    'Fox News': [0.4, 0.5, 0.6],
    'BBC': [0.7, 0.8, 0.9],
    'CNBC': [0.2, 0.8, 0.9]
}

@app.route('/embeddings')
@cross_origin()
def get_embeddings():
    return jsonify(dummy_embeddings)

@app.route('/articles')
@cross_origin()
def get_articles():

    conn = get_db_connection()
    conn = conn.cursor()
    conn.execute("SELECT * FROM articles LIMIT 10")
    articles = conn.fetchall()
    conn.close()

    return jsonify([dict(article) for article in articles])

    # return jsonify(dummy_embeddings)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
