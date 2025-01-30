import "./App.css";
import HomePage from "./pages/HomePage";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const FilmsPage = lazy(() => import("./pages/FilmsPage"));
const FilmPage = lazy(() => import("./pages/FilmPage"));

function App() {
  return (
    // <>
    //   <div>
    //     <GetForm></GetForm>
    //     <FilmList></FilmList>
    //   </div>
    // </>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/films" element={<FilmsPage />}></Route>
        <Route path="/film/:id" element={<FilmPage />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
