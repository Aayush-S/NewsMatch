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
  Button,
  Link,
} from "@chakra-ui/react";

function ArticleCard({
  articleId,
  title,
  text,
  bias,
  keywords,
  selectedCluster,
}) {
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
  keywords = JSON.parse(keywords).slice(0, 3);

  return (
    <>
      <LinkBox as="article" maxW="sm" p="2" borderWidth="0px" rounded="md">
        <Card>
          <CardHeader>
            <LinkOverlay
              href={`/recommendation/${selectedCluster}/${bias}/${articleId}`}
            >
              <Heading size="md" noOfLines={2}>
                {title}
              </Heading>
            </LinkOverlay>
            <Badge color={cardColors[bias]}>{biasNames[bias]}</Badge>
          </CardHeader>

          <CardBody>
            <Text noOfLines={2} marginBottom={"10px"}>
              {text}...
            </Text>

            <div paddingBottom={"10px"}>
              {keywords.map((keyword) => (
                <Tag marginRight={"5px"}>{keyword}</Tag>
              ))}
            </div>
            <br />

            {/* <LinkOverlay > */}
            <Button size={"sm"} colorScheme={"teal"}>
              <Link href={`/article-content/${articleId}`}>Read Article</Link>
            </Button>
            {/* </LinkOverlay> */}
          </CardBody>
        </Card>
      </LinkBox>
    </>
  );
}

export default ArticleCard;
