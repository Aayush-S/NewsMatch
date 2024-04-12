import { useState, useEffect } from "react";
import axios from "axios";

import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <h1>Political Bias Recommendation System</h1>
      <ChakraLink color="teal.500" as={ReactRouterLink} to={`/keyword`}>
        Select from our Corpus
      </ChakraLink>
      <br />
      <ChakraLink color="teal.500" as={ReactRouterLink} to={`/submitArticle`}>
        Submit Custom Article
      </ChakraLink>
    </>
  );
}

export default Home;
