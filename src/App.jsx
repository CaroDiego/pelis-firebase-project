import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const FilmsPage = lazy(() => import("./pages/FilmsPage"));
const FilmPage = lazy(() => import("./pages/FilmPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
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
        ></Route>{" "}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
