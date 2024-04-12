import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Home from "./components/home/Home";
import KeywordGallery from "./components/keyword/KeywordGallery";
import SubmitArticle from "./components/submitArticle/SubmitArticle";
import ArticleGallery, {
  loader as articleLoader,
} from "./components/article/ArticleGallery";

import RecommendationGallery, {
  loader as recommendationLoader,
} from "./components/recommendation/RecommendationGallery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/submitArticle",
    element: <SubmitArticle />,
  },
  {
    path: "/keyword",
    element: <KeywordGallery />,
  },
  {
    path: "/articles/:articlesId",
    element: <ArticleGallery />,
    loader: articleLoader,
  },

  {
    path: "/recommendation/:articleId",
    element: <RecommendationGallery />,
    loader: recommendationLoader,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
