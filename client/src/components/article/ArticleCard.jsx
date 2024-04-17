import { useState, useEffect } from "react";
import axios from "axios";

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

function ArticleCard({ articleId, title, text, bias, keywords, cluster_tags }) {
  const cardColors = {
    0: "#4B3CE1",
    1: "#8379E0",
    2: "#C3D2E0",
    3: "#E17468",
    4: "#E03826",
  };
  const biasNames = {
    0: "left",
    1: "center-left",
    2: "center",
    3: "center-right",
    4: "right",
  };

  // Convert keyword string into list
  keywords = keywords.replace(/'/g, '"');
  keywords = JSON.parse(keywords);

  return (
    <>
      <LinkBox as="article" maxW="sm" p="2" borderWidth="0px" rounded="md">
        <Card>
          <CardHeader>
            <LinkOverlay href={`/recommendation/${articleId}`}>
              <Heading size="md">{title}</Heading>
            </LinkOverlay>
            <Badge color={cardColors[bias]}>{biasNames[bias]}</Badge>
          </CardHeader>

          <CardBody>
            <Text>{text}...</Text>

            {keywords.map((keyword) => (
              <Tag>{keyword}</Tag>
            ))}
          </CardBody>
        </Card>
      </LinkBox>
    </>
  );
}

export default ArticleCard;
