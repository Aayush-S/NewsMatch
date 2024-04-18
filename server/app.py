import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import re

# ML Libraries
import torch
from torch import cuda
from transformers import AutoTokenizer, AutoModelForSequenceClassification

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

################################################
# make sure to insert the correct file name here
# FILE_NAME = "full_database.db"
# FILE_NAME = "first_2000.db"
FILE_NAME = "first_10k.db"
################################################

def regexp(expr, item):
    reg = re.compile(expr)
    return reg.search(item) is not None

def get_db_connection():
    conn = sqlite3.connect(FILE_NAME)
    conn.create_function("REGEXP", 2, regexp)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
@cross_origin()
def home():
    return "Hello, World!"

@app.route('/articles')
@cross_origin()
def get_articles():

    conn = get_db_connection()
    conn = conn.cursor()
    conn.execute("SELECT * FROM articles limit 100;")
    articles = conn.fetchall()
    conn.close()

    return jsonify([dict(article) for article in articles])

# GET Article by id
@app.route('/articles/<articleId>')
@cross_origin()
def get_article_by_id(articleId=0):
    print(articleId)

    conn = get_db_connection()
    conn = conn.cursor()
    conn.execute(f'SELECT * FROM articles WHERE "article_id" = {articleId} LIMIT 1;')
    article = conn.fetchall()
    conn.close()

    return jsonify(dict(article[0]))
     

"""
cluster_tags = [
    "Political and Social Issues",
    "Community Involvement",
    "Names, Organizations, and Various Terms",
    "Locations",
    "Misc. Adjectives",
    "Legal and Law Enforcement",
    "Science and Medicine",
    "Noise/Nonsensical Phrases",
    "Media and Entertainment",
    "Various Phrases/Verbs",
    "Nature and Wildlife",
    "Food",
    "Finance and Economics",
    "Objects and Accessories",
]
"""
# GET Articles of a given cluster
@app.route('/articles/cluster/<clusterId>/<limit>')
@cross_origin()
def get_articles_in_cluster(clusterId=0, limit=50):

    conn = get_db_connection()
    conn = conn.cursor()
    conn.execute("""
        SELECT cluster_name from clusters where cluster_id = ?;
                 """, (clusterId,)
    )
    cluster_tags = conn.fetchall()
    print("cluster_tags", cluster_tags)
    if len(cluster_tags) != 1:
        print("wrong number of tags returned!")
        return None
    tag_name = cluster_tags[0][0]
    tag_name = "%" + tag_name + "%"
    conn.execute(
        f"""SELECT *
            FROM articles
            WHERE [Cluster Tags] like ? limit ?;""", (tag_name,limit,)
    )
    articles = conn.fetchall()
    print("articles", articles)
    conn.close()

    return jsonify([dict(article) for article in articles])

@app.route('/bias/<clusterId>/<limit>')
@cross_origin()
def get_biased_articles_by_cluster(clusterId=0, limit=5):
    conn = get_db_connection()
    conn = conn.cursor()
    conn.execute("""
        SELECT cluster_name from clusters where cluster_id = ?;
                 """, (clusterId,)
    )
    cluster_tags = conn.fetchall()
    if len(cluster_tags) != 1:
        print("wrong number of tags returned!")
        return None
    tag_name = cluster_tags[0][0]
    print("tag_name", tag_name)
    tag_name = "%" + tag_name + "%"
    outputs = {}
    for bias in range(5):
        bias_str = str(bias)
        conn.execute(
            f"""SELECT *
                FROM articles
                WHERE [Cluster Tags] like ? and bias = ? limit ?;""", (tag_name,bias_str,limit,)
        )
        articles = conn.fetchall()
        articles = [dict(article) for article in articles]
        outputs[bias_str] = articles
    conn.close()

    return jsonify(outputs)


# GET histogram
@app.route('/histogram')
@cross_origin()
def get_histogram_data():
    limit = 10
    conn = get_db_connection()
    conn = conn.cursor()
    conn.execute(
        """
        SELECT cluster_id, cluster_name from clusters;"""
    )
    cluster_tags = conn.fetchall()
    cluster_tags = [tag[1] for tag in cluster_tags[1:]]

    # this one uses small.db, created this from shell
    '''
    sqlite3 small.db
    .mode csv articles
    .import clustered_articles_small.csv articles  # this is the first 2000 rows of large csv
    .tables  # prints 'articles'
    .schema  # also gives more info
    .quit
    '''

    histogram_data = []
    for tag in cluster_tags:
        # print(tag[0])
        like_tag = "%" + tag + "%"
        conn.execute("""
            SELECT Bias, count(*) AS article_count FROM articles 
            WHERE [Cluster Tags] LIKE ? group by Bias;
            """, (like_tag,))
        cluster_data = conn.fetchall()
        d = dict(cluster_data)
        # print("printed", d)
        bias_names = ["Left", "Center Left", "Center","Center Right", "Right"]
        bias_counts = []
        for i in range(len(bias_names)):
            if i in d:
                bias_counts.append((bias_names[i], d[i]))
        histogram_data.append({
            "tag": tag,
            "data": bias_counts,
        })
    conn.close()

    return jsonify(histogram_data)



## ML MODEL LOADING
def init_model(model_name: str, device: str='cpu') -> AutoModelForSequenceClassification:
    model = AutoModelForSequenceClassification.from_pretrained(model_name).to(device)
    for param in model.parameters():
        param.requires_grad = False
    model.eval()
    print("Model\n", model)
    return model

def init_tokenizer(tok_name: str) -> AutoTokenizer:
    tokenizer = AutoTokenizer.from_pretrained(tok_name)
    print("Tokenizer\n", tokenizer)
    return tokenizer

def classify_text(model: AutoModelForSequenceClassification, tokenizer: AutoTokenizer, text: str, device: str='cpu') -> int:
    tokens = tokenizer(text, return_tensors='pt', truncation=True, padding='max_length')
    input_ids = tokens['input_ids'].to(device)
    attention_mask = tokens['attention_mask'].to(device)
    outputs = model(input_ids, attention_mask=attention_mask)
    pred_score, pred_label = torch.max(outputs.logits, dim=1)
    prediction = pred_label.flatten().cpu().detach().item()
    return prediction





@app.route('/custom-article-classification')
@cross_origin()
def classify_custom_article():

    model_name = "./distilbert_chkpt_9"
    tokenizer_name = "distilbert-base-uncased" # huggingface tokenizer name
    text_to_classify = "hello there" # text to classify

    text_to_classify = '''A Florida university will honor Trayvon Martin with a posthumous Bachelor of Science Degree in Aviation republicans are angry and upset bad words qanon joe biden'''
    # get cpu or gpu
    device = 'cuda' if cuda.is_available() else 'cpu'
    print(f"Device: {device}")

    # load model and tokenizer
    model = init_model(model_name, device=device)
    tokenizer = init_tokenizer(tokenizer_name)

    # predict bias
    predicted_class = classify_text(model, tokenizer, text_to_classify, device=device)
    print(f"Prediction: {predicted_class}")

    return jsonify(predicted_class)







if __name__ == '__main__':
    app.run(debug=True, port=5000)
