import "./App.css";
import HomePage from "./pages/HomePage";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const FilmsPage = lazy(() => import("./pages/FilmsPage"));
const FilmPage = lazy(() => import("./pages/FilmPage"));

function App() {
  const Layout = ({ children }) => (
    <main className="page-layout">{children}</main>
  );

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              {" "}
              <HomePage />
            </Layout>
          }
        ></Route>
        <Route
          path="/films"
          element={
            <Layout>
              {" "}
              <FilmsPage />
            </Layout>
          }
        ></Route>
        <Route
          path="/film/:id"
          element={
            <Layout>
              <FilmPage />
            </Layout>
          }
        ></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
