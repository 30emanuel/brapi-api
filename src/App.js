import { Home } from "./pages/Home";
import { Quote } from "./pages/Quote";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}></Route>
      <Route path="/quote/:search" element={<Quote />} />
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
