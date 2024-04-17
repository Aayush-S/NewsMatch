import { useState, useEffect } from "react";
import axios from "axios";
import _, { random } from "lodash";

import { useLoaderData } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";

import ArticleCard from "../article/ArticleCard";

export function loader({ params }) {
  const articleId = params.articleId;
  return articleId;
}

function RecommendationGallery({ params }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [similarArticles, setSimilarArticles] = useState([]);
  const [differentArticles, setDifferentArticles] = useState([]);

  const articleId = useLoaderData();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/articles/${articleId}`)
      .then((response) => {
        const res = response.data;
        setSelectedArticle(res);
      });

    const clusterId = 0;
    const biasLevel = 0;

    axios.get(`http://127.0.0.1:5000/bias/${clusterId}/5`).then((response) => {
      const res = response.data;

      setSimilarArticles(res[biasLevel]);

      let randomDiffArticles = res;
      delete randomDiffArticles[biasLevel];
      randomDiffArticles = Object.values(randomDiffArticles).flat();
      randomDiffArticles = _.sampleSize(randomDiffArticles, 5);

      setDifferentArticles(randomDiffArticles);
    });
  }, []);

  return (
    <div>
      <h1>RECOMMENDATION PAGE {articleId} </h1>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem w="100%" h="10">
          <h1>Similar Articles</h1>
          {similarArticles &&
            similarArticles.map((article) => (
              <ArticleCard
                articleId={article.article_id}
                title={article.Title}
                text={article.Text}
                bias={article.Bias}
                keywords={article.Keywords}
              />
            ))}
        </GridItem>
        <GridItem w="100%" h="10">
          <h1>Selected Article</h1>
          {selectedArticle && (
            <ArticleCard
              articleId={selectedArticle.article_id}
              title={selectedArticle.Title}
              text={selectedArticle.Text}
              bias={selectedArticle.Bias}
              keywords={selectedArticle.Keywords}
            />
          )}
        </GridItem>
        <GridItem w="100%" h="10">
          <h1>Different Articles</h1>
          {differentArticles.map((article) => (
            <ArticleCard
              articleId={article.article_id}
              title={article.Title}
              text={article.Text}
              bias={article.Bias}
              keywords={article.Keywords}
            />
          ))}
        </GridItem>
      </Grid>
    </div>
  );
}

export default RecommendationGallery;
