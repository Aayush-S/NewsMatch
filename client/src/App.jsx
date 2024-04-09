import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Home from "./components/home/Home";
import KeywordGallery from "./components/keyword/KeywordGallery";
import ArticleGallery, {
  loader as articleLoader,
} from "./components/article/ArticleGallery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
