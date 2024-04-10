import { useState, useEffect } from "react";
import axios from "axios";

import { useLoaderData } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { SimpleGrid } from "@chakra-ui/react";
// import { getContact } from "../contacts";

export function loader({ params }) {
  const articleId = params.articlesId;
  return articleId;
}

function Article({ params }) {
  const [articles, setArticles] = useState([]);

  const articleId = useLoaderData();
  console.log(articleId);

  const dummyArticles = [
    {
      title: "economix article 1",
      text: "lorem ipsum dolor",
      bias: 0,
      keywords: ["taxes", "fed", "monetary", "policy", "economy"],
      cluster_tags: [1, 2, 7],
    },
    {
      title: "economix article 2",
      text: "lorem ipsum dolor yummy bad",
      bias: 1,
      keywords: ["science", "economy", "stocks", "bubble", "money"],
      cluster_tags: [1, 4, 8],
    },
    {
      title: "law article",
      text: "lorem ipsum dolores",
      bias: 3,
      keywords: ["law", "supreme", "court", "policy", "fraud"],
      cluster_tags: [3, 5, 7],
    },
  ];

  useEffect(() => {
    // TODO: Need API route to GET by articleId
    // axios.get("http://127.0.0.1:5000/embeddings").then((response) => {
    //   console.log("hello");
    //   const res = response.data;
    //   console.log(res);
    //   setEmbeddings(res);
    // });
    // setArticles()
    const keywordArticles = dummyArticles.filter((article) =>
      article.keywords.includes(articleId)
    );
    setArticles(keywordArticles);
  }, []);

  return (
    <div>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {articles.map((article) => (
          <ArticleCard
            title={article.title}
            text={article.text}
            bias={article.bias}
            keywords={article.keywords}
            cluster_tags={article.cluster_tags}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default Article;
