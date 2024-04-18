
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  Tag,
  Text,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

import Histogram from "./Histogram";

function ClusterCard({ cluster_id, tag_name, data }) {
  return (
    <>
      <LinkBox
        as="article"
        maxW="lg"
        maxH="lg"
        p="3"
        borderWidth="0px"
        rounded="md"
      >
        <Card>
          <CardHeader>
            <LinkOverlay href={`/articles/${cluster_id}`}>
              <Heading size="md">{tag_name}</Heading>
            </LinkOverlay>
          </CardHeader>

          <CardBody>
            <Histogram data={data} />
          </CardBody>
        </Card>
      </LinkBox>
    </>
  );
}

export default ClusterCard;
