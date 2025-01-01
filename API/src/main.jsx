import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { store } from "./app/store.js";
import ListVideo from "./components/ListVideo.jsx";
import About from "./components/About.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="listvideo" element={<ListVideo />} />
      <Route path="about" element={<About />} />
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
