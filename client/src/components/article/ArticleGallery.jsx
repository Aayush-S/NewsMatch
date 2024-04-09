import { useState, useEffect } from "react";
import axios from "axios";

import { useLoaderData } from "react-router-dom";
// import { getContact } from "../contacts";

export function loader({ params }) {
  const articleId = params.articlesId;
  return articleId;
}

function Article({ params }) {
  const [embeddings, setEmbeddings] = useState([]);
  const articleId = useLoaderData();
  console.log(articleId);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/embeddings").then((response) => {
      console.log("hello");
      const res = response.data;
      console.log(res);
      setEmbeddings(res);
    });
  }, []);

  return (
    <div>
      {articleId} {embeddings[articleId]}
    </div>
  );
}

export default Article;
