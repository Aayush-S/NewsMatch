import { useState, useEffect } from "react";
import axios from "axios";
import { Heading, SimpleGrid } from "@chakra-ui/react";

import ClusterCard from "./ClusterCard";

function ClusterGallery() {
  const [clusterData, setClusterData] = useState([]);

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
          clusterData
            .map((cluster, i) => (
              <ClusterCard
                key={i}
                cluster_id={i}
                tag_name={cluster.tag}
                data={cluster.data}
              />
            ))
            .filter((d) => d.props.data.length > 0)}
      </SimpleGrid>
    </>
  );
}

export default ClusterGallery;
