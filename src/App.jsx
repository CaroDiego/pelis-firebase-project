import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const TopNav = lazy(() => import("./components/TopNav"));

const FilmsPage = lazy(() => import("./pages/FilmsPage"));
const FilmPage = lazy(() => import("./pages/FilmPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const DirectorPage = lazy(() => import("./pages/DirectorPage"));
const GenrePage = lazy(() => import("./pages/GenrePage"));
const Watched = lazy(() => import("./pages/Watched"));
const Liked = lazy(() => import("./pages/Liked"));

// TODO 1. watched and liked pages
// TODO 2. lists page
function App() {
  const Layout = ({ children }) => (
    <main className="page-layout">{children}</main>
  );

  return (
    <div>
      <TopNav></TopNav>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <FilmsPage />
              </Layout>
            }
          />
          <Route
            path="/film/:id"
            element={
              <Layout>
                <FilmPage />
              </Layout>
            }
          />
          <Route
            path="/director/:director"
            element={
              <Layout>
                <DirectorPage />
              </Layout>
            }
          />
          <Route
            path="/genre/:genre"
            element={
              <Layout>
                <GenrePage />
              </Layout>
            }
          />
          <Route
            path="/films/watched"
            element={
              <Layout>
                <Watched />
              </Layout>
            }
          />
          <Route
            path="/films/liked"
            element={
              <Layout>
                <Liked />
              </Layout>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
