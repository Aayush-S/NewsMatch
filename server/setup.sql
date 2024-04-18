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
.import full_clustered_articles.csv articles
.import clusters.csv clusters