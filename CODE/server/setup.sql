CREATE TABLE articles (
    article_id INT,
    Keywords TEXT,
    Title TEXT,
    Text TEXT,
    Bias INT,
    [Cluster Tags] TEXT
);
CREATE TABLE clusters (
    cluster_id INTEGER,
    cluster_name TEXT
);
.mode csv
.import clustered_articles_100k.csv articles
.import clusters.csv clusters