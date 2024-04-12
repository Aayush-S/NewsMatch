import { useState, useEffect } from "react";
import axios from "axios";

import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

function SubmitArticle() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleText, setArticleText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Insert API Call
    // TODO: Route to next page based on data from API
    alert(`Title: ${articleTitle} & Article Text: ${articleText}`);
  };
  return (
    <>
      <h1>Submit Article</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            onChange={(event) => setArticleTitle(event.currentTarget.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Article Text</FormLabel>
          <Textarea
            placeholder="Paste your article's text"
            onChange={(event) => setArticleText(event.currentTarget.value)}
          ></Textarea>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default SubmitArticle;
