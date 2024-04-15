import { useState, useEffect } from "react";
import axios from "axios";

import { useLoaderData } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { SimpleGrid } from "@chakra-ui/react";

export function loader({ params }) {
  const articleId = params.articlesId;
  return articleId;
}

function Article({ params }) {
  const [articles, setArticles] = useState(null);

  const articleId = useLoaderData();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/articles/${articleId}`)
      .then((response) => {
        const res = response.data;
        setArticles(res);
      });
  }, []);

  return (
    <div>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {articles &&
          articles.map((article, i) => (
            <ArticleCard
              articleId={i}
              title={article.Title}
              text={article.Text.substring(0, 50)}
              bias={article.Bias}
              keywords={article.Keywords}
              cluster_tags={article["Cluster Tags"]}
            />
          ))}
      </SimpleGrid>
    </div>
  );
}

export default Article;
