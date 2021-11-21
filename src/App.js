import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";

import theme from "./styles/theme";

import Main from "./components/Main";
import Navbar from "./components/Navbar";
import RequireAuth from "./guard/RequireAuth";

/** Code Splitting */
const Home = React.lazy(() => import("./pages/Home"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const Fruit = React.lazy(() => import("./pages/product/Fruit"));
const ProductDetail = React.lazy(() => import("./pages/product/ProductDetail"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Promotion = React.lazy(() => import("./pages/Promotion"));
const Contact = React.lazy(() => import("./pages/Contact"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Faqs = React.lazy(() => import("./pages/Faqs"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Setting = React.lazy(() => import("./pages/Setting"));

const CreateProduct = React.lazy(() =>
  import("./pages/admin/product/CreateProduct")
);
const EditProduct = React.lazy(() =>
  import("./pages/admin/product/EditProduct")
);

function App() {
  const themeMode = useSelector((state) => state.themeReducer.themeMode);

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <Suspense fallback={<Loader />}>
        <Router>
          <Box sx={{ display: "flex", flexFlow: "row wrap" }}>
            <CssBaseline />
            <Navbar />
            <Main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="product">
                  <Route path="fruit" element={<Fruit />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                </Route>

                <Route path="promotion" element={<Promotion />} />
                <Route path="contact" element={<Contact />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="cart" element={<Cart />} />
                <Route path="faqs" element={<Faqs />} />
                <Route
                  path="profile"
                  element={
                    <RequireAuth >
                      <Profile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="setting"
                  element={
                    <RequireAuth >
                      <Setting />
                    </RequireAuth>
                  }
                />
                <Route
                  path="admin/addproduct"
                  element={
                    <RequireAuth roles="admin">
                      <CreateProduct />
                    </RequireAuth>
                  }
                />
                <Route
                  path="admin/editproduct"
                  element={
                    <RequireAuth roles="admin">
                      <EditProduct />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Main>
            <ToastContainer />
          </Box>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
