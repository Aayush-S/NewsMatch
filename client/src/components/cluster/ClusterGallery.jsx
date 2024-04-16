import { Heading } from "@chakra-ui/react";

// import { Link as ReactRouterLink } from "react-router-dom";
import { SimpleGrid } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";
import ClusterCard from "./ClusterCard";

function ClusterGallery() {
  // API Call to get keywords
  // Process the keywords into required format

  const [clusterData, setClusterData] = useState([]);

  // const keywordsExample = [
  //   { id: "economy", name: "economics", numArticles: 5, bias: "center" },
  //   { id: "finance", name: "finance", numArticles: 15, bias: "right" },
  //   { id: "law", name: "law", numArticles: 35, bias: "left" },
  // ];

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/histogram`).then((response) => {
      const res = response.data;
      setClusterData(res);
    });
  }, []);

  return (
    <>
      <Heading>Select a Topic:</Heading>
      <SimpleGrid
        spacing={2}
        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      >
        {clusterData &&
          clusterData.map((cluster, i) => (
            <ClusterCard
              key={i}
              cluster_id={i}
              tag_name={cluster.tag}
              data={cluster.data}
            />
          ))}
      </SimpleGrid>
    </>
  );
}

export default ClusterGallery;
