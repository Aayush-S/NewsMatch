import { useState, useEffect } from "react";
import axios from "axios";

import { useLoaderData } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { SimpleGrid } from "@chakra-ui/react";

export function loader({ params }) {
  const clusterId = params.clusterId;
  return clusterId;
}

function ArticleGallery({ params }) {
  const [articles, setArticles] = useState(null);

  const clusterId = useLoaderData();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/articles/cluster/${clusterId}/50`)
      .then((response) => {
        const res = response.data;
        setArticles(res);
      });
  }, []);

  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {articles &&
          articles.map((article, i) => {
            return (
              <ArticleCard
                key={i}
                articleId={article.article_id}
                title={article.Title}
                text={article.Text}
                bias={article.Bias}
                keywords={article.Keywords}
                selectedCluster={clusterId}
              />
            );
          })}
      </SimpleGrid>
    </>
  );
}

export default ArticleGallery;
