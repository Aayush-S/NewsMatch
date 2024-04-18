import { useState, useEffect } from "react";
import axios from "axios";
import _, { random } from "lodash";

import { useLoaderData } from "react-router-dom";
import { Grid, GridItem, Heading } from "@chakra-ui/react";

import RecArticleCard from "./RecArticleCard";

export function loader({ params }) {
  const articleId = params.articleId;
  const clusterId = params.clusterId;
  const biasLevel = params.biasLevel;
  return { articleId, clusterId, biasLevel };
}

function RecommendationGallery({ params }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [similarArticles, setSimilarArticles] = useState([]);
  const [differentArticles, setDifferentArticles] = useState([]);

  const { articleId, clusterId, biasLevel } = useLoaderData();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/articles/${articleId}`)
      .then((response) => {
        const res = response.data;
        setSelectedArticle(res);
      });

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
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem w="100%" h="10">
          <Heading size={"md"} padding={"7px"} marginTop={"20px"}>
            Similar Articles
          </Heading>
          {similarArticles &&
            similarArticles.map((article) => (
              <RecArticleCard
                articleId={article.article_id}
                title={article.Title}
                text={article.Text}
                bias={article.Bias}
                keywords={article.Keywords}
                selectedCluster={clusterId}
                numLines={2}
              />
            ))}
        </GridItem>
        <GridItem w="100%" h="10">
          <Heading size={"md"} padding={"7px"} marginTop={"20px"}>
            Selected Article
          </Heading>
          {selectedArticle && (
            <RecArticleCard
              articleId={selectedArticle.article_id}
              title={selectedArticle.Title}
              text={selectedArticle.Text}
              bias={selectedArticle.Bias}
              keywords={selectedArticle.Keywords}
              selectedCluster={clusterId}
              numLines={20}
            />
          )}
        </GridItem>
        <GridItem w="100%" h="10">
          <Heading size={"md"} padding={"7px"} marginTop={"20px"}>
            Different Articles
          </Heading>
          {differentArticles.map((article) => (
            <RecArticleCard
              articleId={article.article_id}
              title={article.Title}
              text={article.Text}
              bias={article.Bias}
              keywords={article.Keywords}
              selectedCluster={clusterId}
              numLines={2}
            />
          ))}
        </GridItem>
      </Grid>
    </div>
  );
}

export default RecommendationGallery;
