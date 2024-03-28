from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World!"

# Create dummy embeddings
dummy_embeddings = {
    'CNN': [0.1, 0.2, 0.3],
    'Fox News': [0.4, 0.5, 0.6],
    'BBC': [0.7, 0.8, 0.9]
}

@app.route('/embeddings')
def get_embeddings():
    return jsonify(dummy_embeddings)

if __name__ == '__main__':
    app.run(debug=True)
