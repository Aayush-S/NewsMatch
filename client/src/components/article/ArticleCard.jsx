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
} from "@chakra-ui/react";

function ArticleCard({ title, text, bias, keywords, cluster_tags }) {
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
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">{title}</Heading>
          <Badge color={cardColors[bias]}>{biasNames[bias]}</Badge>
        </CardHeader>

        <CardBody>
          <Text>{text}</Text>

          {keywords.map((keyword) => (
            <Tag>{keyword}</Tag>
          ))}
        </CardBody>
      </Card>
    </>
  );
}

export default ArticleCard;
