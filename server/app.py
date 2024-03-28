from flask import Flask, jsonify

app = Flask(__name__)
from flask_cors import CORS, cross_origin
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
