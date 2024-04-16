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
    conn = sqlite3.connect('database.db')
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


# GET Articles of a given cluster
@app.route('/articles/<clusterId>')
@cross_origin()
def get_articles_in_cluster(clusterId=0):

    conn = get_db_connection()
    conn = conn.cursor()
    # conn.execute("SELECT * FROM articles")
    conn.execute(
        f"""SELECT *
            FROM articles
            WHERE [Cluster Tags] REGEXP '\\b{clusterId}\\b';"""
    )
    articles = conn.fetchall()
    conn.close()

    return jsonify([dict(article) for article in articles])


# # GET Articles of a given cluster by name of the tag
# @app.route('/articles/<clusterId>')
# @cross_origin()
# def get_articles_in_cluster(clusterId=0, limit=10):

#     print(clusterId)

#     conn = get_db_connection()
#     conn = conn.cursor()
#     # conn.execute("SELECT * FROM articles")
#     conn.execute(
#         f"""SELECT *
#             FROM articles
#             WHERE [Cluster Tags] REGEXP '\\b{clusterId}\\b';"""
#     )
#     articles = conn.fetchall()
#     conn.close()

#     return jsonify([dict(article) for article in articles])


# GET histogram
@app.route('/histogram')
@cross_origin()
def get_histogram_data():
    # cluster_tags = [
    #     "Political and Social Issues",
    #     "Community Involvement",
    #     "Names, Organizations, and Various Terms",
    #     "Locations",
    #     "Misc. Adjectives",
    #     "Legal and Law Enforcement",
    #     "Science and Medicine",
    #     "Noise/Nonsensical Phrases",
    #     "Media and Entertainment",
    #     "Various Phrases/Verbs",
    #     "Nature and Wildlife",
    #     "Food",
    #     "Finance and Economics",
    #     "Objects and Accessories",
    # ]
    conn = sqlite3.connect('first_2000.db')
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
            SELECT bias, count(*) AS article_count FROM articles 
            WHERE [Cluster Tags] LIKE ? group by bias;
            """, (like_tag,))
        cluster_data = conn.fetchall()
        histogram_data.append({
            "tag": tag,
            "data": cluster_data
        })
    conn.close()

    return jsonify(histogram_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
