import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Heading, Text } from "@chakra-ui/react";

export function loader({ params }) {
  const articleId = params.articlesId;
  return articleId;
}

function ArticleContent({ title, content }) {
  const [data, setData] = useState();

  const articleId = useLoaderData();
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/article/${articleId}`).then((response) => {
      const res = response.data;
      setData(res);
    });
  });
  return (
    <>
      <Heading>{data["Title"]}</Heading>
      <Text>{data["Text"]}</Text>
    </>
  );
}

export default ArticleContent;
