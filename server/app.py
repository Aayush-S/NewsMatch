import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import re

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def regexp(expr, item):
    reg = re.compile(expr)
    return reg.search(item) is not None

def get_db_connection():
    conn = sqlite3.connect('first_2000.db')
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
    conn.execute("SELECT * FROM articles")
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
    conn.execute(f'SELECT * FROM articles WHERE "article_id" = {articleId};')
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
def get_biased_articles_by_cluster(clusterId=0, limit=15):

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

    # conn = sqlite3.connect('small.db')
    # conn = conn.cursor()
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
            if str(i) in d:
                bias_counts.append((bias_names[i], d[str(i)]))
        histogram_data.append({
            "tag": tag,
            "data": bias_counts,
        })
    conn.close()

    return jsonify(histogram_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
