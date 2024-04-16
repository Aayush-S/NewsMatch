import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";

function ClusterGallery() {
  // API Call to get keywords
  // Process the keywords into required format

  const keywordsExample = [
    { id: "economy", name: "economics", numArticles: 5, bias: "center" },
    { id: "finance", name: "finance", numArticles: 15, bias: "right" },
    { id: "law", name: "law", numArticles: 35, bias: "left" },
  ];

  return (
    <>
      <TableContainer>
        <Table>
          <TableCaption>Topics</TableCaption>
          <Thead>
            <Tr>
              <Th>Keyword</Th>
              <Th>Number of Articles</Th>
              <Th>Bias</Th>
            </Tr>
          </Thead>
          <Tbody>
            {keywordsExample.map((keyword) => (
              <Tr>
                <Td>
                  <ChakraLink
                    color="teal.500"
                    as={ReactRouterLink}
                    to={`/articles/${keyword.id}`}
                  >
                    {keyword.name}
                  </ChakraLink>
                </Td>
                <Td>{keyword.numArticles}</Td>
                <Td>{keyword.bias}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ClusterGallery;
