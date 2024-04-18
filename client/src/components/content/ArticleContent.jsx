import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Heading, Text } from "@chakra-ui/react";

export function loader({ params }) {
  const articleId = params.articleId;
  return articleId;
}

function ArticleContent({ title, content }) {
  const articleId = useLoaderData();
  const [data, setData] = useState();

  //   const articleId = useLoaderData();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/articles/${articleId}`)
      .then((response) => {
        const res = response.data;
        setData(res);
      });
  }, []);

  return data ? (
    <>
      <Heading padding={"30px 50px 0px 50px"}>{data["Title"]}</Heading>
      <Text padding={"10px 50px 0px 50px"} align={"justify"}>
        {data["Text"]}
      </Text>
    </>
  ) : (
    <>
      <Heading>Title</Heading>
      <Text>Article Content</Text>
    </>
  );
}

export default ArticleContent;
