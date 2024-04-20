import { Link as ReactRouterLink } from "react-router-dom";
import {
  Heading,
  Text,
  Box,
  Center,
  VStack,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Center height="100vh">
        <VStack>
          <Heading size={"4xl"}>NewsMatch</Heading>
          <Box width="400px">
            <Text fontSize={"md"}>
              Explore news tailored to your interests, with similar and diverse
              articles based on topic, bias, and keywords.
            </Text>
          </Box>

          <Button>
            <ChakraLink color="teal.500" as={ReactRouterLink} to={`/cluster`}>
              Get Started
            </ChakraLink>
          </Button>
          {/* <Button>
            <ChakraLink
              color="teal.500"
              as={ReactRouterLink}
              to={`/submitArticle`}
            >
              Submit Custom Article
            </ChakraLink>
          </Button> */}
        </VStack>
      </Center>
    </>
  );
}

export default Home;
