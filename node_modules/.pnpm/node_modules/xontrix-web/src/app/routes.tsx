// @ts-nocheck
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const Products = lazy(() => import("./pages/Products").then((module) => ({ default: module.Products })));
const ProductDetail = lazy(() => import("./pages/ProductDetail").then((module) => ({ default: module.ProductDetail })));
const Cart = lazy(() => import("./pages/Cart").then((module) => ({ default: module.Cart })));
const Dashboard = lazy(() => import("./pages/Dashboard").then((module) => ({ default: module.Dashboard })));
const Admin = lazy(() => import("./pages/Admin").then((module) => ({ default: module.Admin })));
const About = lazy(() => import("./pages/About").then((module) => ({ default: module.About })));
const Contact = lazy(() => import("./pages/Contact").then((module) => ({ default: module.Contact })));
const Login = lazy(() => import("./pages/Login").then((module) => ({ default: module.Login })));
const Checkout = lazy(() => import("./pages/Checkout").then((module) => ({ default: module.Checkout })));
const UserProfile = lazy(() => import("./pages/UserProfile").then((module) => ({ default: module.UserProfile })));
const UserOrders = lazy(() => import("./pages/UserOrders").then((module) => ({ default: module.UserOrders })));
const UserWishlist = lazy(() => import("./pages/UserWishlist").then((module) => ({ default: module.UserWishlist })));
const UserAddresses = lazy(() => import("./pages/UserAddresses").then((module) => ({ default: module.UserAddresses })));
const UserNotifications = lazy(() => import("./pages/UserNotifications").then((module) => ({ default: module.UserNotifications })));
const UserSecurity = lazy(() => import("./pages/UserSecurity").then((module) => ({ default: module.UserSecurity })));
const NotFound = lazy(() => import("./pages/NotFound").then((module) => ({ default: module.NotFound })));

function PageFallback() {
  return (
    <div className="flex min-h-[45vh] items-center justify-center bg-white px-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#f1b2b2] border-t-[#db4444]" />
    </div>
  );
}

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <LazyPage><Home /></LazyPage> },
      { path: "products", element: <LazyPage><Products /></LazyPage> },
      { path: "products/:id", element: <LazyPage><ProductDetail /></LazyPage> },
      { path: "cart", element: <LazyPage><Cart /></LazyPage> },
      { 
        path: "dashboard", 
        element: (
          <LazyPage>
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          </LazyPage>
        )
      },
      {
        path: "admin",
        element: (
          <LazyPage>
            <ProtectedRoute adminOnly>
              <Admin />
            </ProtectedRoute>
          </LazyPage>
        )
      },
      { path: "about", element: <LazyPage><About /></LazyPage> },
      { path: "contact", element: <LazyPage><Contact /></LazyPage> },
      { path: "login", element: <LazyPage><Login /></LazyPage> },
      { path: "profile", element: <LazyPage><UserProfile /></LazyPage> },
      { path: "orders", element: <LazyPage><UserOrders /></LazyPage> },
      { path: "wishlist", element: <LazyPage><UserWishlist /></LazyPage> },
      { path: "addresses", element: <LazyPage><UserAddresses /></LazyPage> },
      { path: "notifications", element: <LazyPage><UserNotifications /></LazyPage> },
      { path: "security", element: <LazyPage><UserSecurity /></LazyPage> },
      { path: "checkout", element: <LazyPage><Checkout /></LazyPage> },
      { path: "*", element: <LazyPage><NotFound /></LazyPage> },
    ],
  },
]);