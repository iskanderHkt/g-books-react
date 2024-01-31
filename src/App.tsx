import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";
import CategoryBooksPage from "./pages/CategoryBooksPage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppDrawer from "./components/AppDrawer";
import SearchBooksPage from "./pages/SearchBooksPage";

const Layout = () => (
  <>
    <Header />
    <AppDrawer />

    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/book/:bookId" element={<BookPage />} />
          <Route
            path="/categoryBooks/:category"
            element={<CategoryBooksPage />}
          />
          <Route path="/search-books" element={<SearchBooksPage />} />

          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;