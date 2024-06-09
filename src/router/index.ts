import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import DashboardLayout from "../views/admin/layout/DashboardLayout.vue";
import LogoutLayout from "../views/admin/layout/LogoutLayout.vue";
import FrontLayout from "../views/front/layout/FrontLayout.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import AdminDashboard from "../views/admin/dashboard/AdminDashboard.vue";
import Error404 from "../views/front/error/404.vue";
import Error500 from "../views/front/error/500.vue";
import Error501 from "../views/front/error/501.vue";
import Error429 from "../views/front/error/429.vue";
import Error419 from "../views/front/error/419.vue";
import SignIn from "../views/front/SignIn.vue";
import HomePage from "../views/front/HomePage.vue";

import SignUp from "../views/front/SignUp.vue";
import Home from "../views/front/Home.vue";
import InviteUser from "../views/admin/user/InviteUser.vue";
import UserList from "../views/admin/user/UserList.vue";

import store from "@/store";

import UploadImage from "../views/admin/uploadimage/UploadImage.vue";
import ListImage from "../views/admin/uploadimage/ImageList.vue";

import PackageCreate from "../views/admin/package/PackageCreate.vue";
import PackageList from "../views/admin/package/PackageList.vue";
import PackageView from "../views/admin/package/PackageView.vue";
import PackageUpdate from "../views/admin/package/PackageUpdate.vue";
import PackageBookingList from "../views/admin/package/PackageBookingList.vue";
import PackageBookingView from "../views/admin/package/PackageBookingView.vue";

import CreateLoaction from "../views/admin/loaction/CreateLoaction.vue";
import LoactionView from "../views/admin/loaction/LoactionView.vue";
import LocationList from "../views/admin/loaction/LocationList.vue";
import LoactionUpdate from "../views/admin/loaction/LoactionUpdate.vue";

import CreateQurbani from "../views/admin/qurbani/CreateQurbani.vue";
import QurbaniList from "../views/admin/qurbani/QurbaniList.vue";
import QurbaniView from "../views/admin/qurbani/QurbaniView.vue";
import QurbaniUpdate from "../views/admin/qurbani/QurbaniUpdate.vue";
import QurbaniBookingList from "../views/admin/qurbani/QurbaniBookingList.vue";
import QurbaniBookingView from "../views/admin/qurbani/QurbaniBookingView.vue";

import CreateCategory from "../views/admin/ecommerce/category/CreateCategory.vue";
import CategoryList from "../views/admin/ecommerce/category/CategoryList.vue";
import CategoryView from "../views/admin/ecommerce/category/CategoryView.vue";
import CategoryUpdate from "../views/admin/ecommerce/category/CategoryUpdate.vue";

import CreateProduct from "../views/admin/ecommerce/product/CreateProduct.vue";
import ProductList from "../views/admin/ecommerce/product/ProductList.vue";
import ProductView from "../views/admin/ecommerce/product/ProductView.vue";
import ProductUpdate from "../views/admin/ecommerce/product/ProductUpdate.vue";

import CabBookingList from "../views/admin/cab/CabBookingList.vue";
import CabView from "../views/admin/cab/CabView.vue";
import CabUpdate from "../views/admin/cab/CabUpdate.vue";

import HijamaCreate from "../views/admin/hijama/HijamaCreate.vue";
import HijamaList from "../views/admin/hijama/HijamaList.vue";
import HijamaView from "../views/admin/hijama/HijamaView.vue";
import HijamaUpdate from "../views/admin/hijama/HijamaUpdate.vue";


const routes: Array<RouteRecordRaw> = [
  // admin routes
  {
    path: "/admin",
    name: "admin",
    component: DashboardLayout,
    meta: { public: false },
    children: [
      { path: "/admin/users/invite", name: "invite-user", component: InviteUser, meta: { name: "user",title:"Invite User" } },
      { path: "/admin/users", name: "user-list", component: UserList, meta: { name: "user" ,title:"Users"} },

      { path: "/admin/images/upload", name: "upload-image", component: UploadImage, meta: { name: "uploadimage" ,title:"UploadImage"} },
      { path: "/admin/images/list", name: "list-image", component: ListImage, meta: { name: "listimage" ,title:"ListImage"} },
      { path: "/admin/images/list", name: "list-image", component: ListImage, meta: { name: "listimage" ,title:"ListImage"} },

      { path: "/admin/packages/create", name: "package-create", component: PackageCreate, meta: { name: "package" ,title:"Package create"} },
      { path: "/admin/packages", name: "package-list", component: PackageList, meta: { name: "package" ,title:"Package"} },
      { path: "/admin/package/:id/view", name: "package-view", component: PackageView, meta: { name: "Package",title:"view Package" } },
      { path: "/admin/package/:id/update", name: "package-update", component: PackageUpdate, meta: { name: "Package",title:"update Package" } },
      { path: "/admin/package/booking", name: "package-booking-list", component: PackageBookingList, meta: { name: "package" ,title:"Package Booking"} },
      { path: "/admin/package/booking/:id/view", name: "package-booking-view", component: PackageBookingView, meta: { name: "Package",title:"view Package Booking" } },

      { path: "/admin/loaction/create", name: "create-loaction", component: CreateLoaction, meta: { name: "loaction" ,title:"Create loaction"} },
      { path: "/admin/locations", name: "location-list", component: LocationList, meta: { name: "location" ,title:"List Location"} },
      { path: "/admin/loaction/:id/view", name: "loaction-view", component: LoactionView, meta: { name: "loaction" ,title:"view loaction"} },
      { path: "/admin/loaction/:id/update", name: "loaction-update", component: LoactionUpdate, meta: { name: "loaction" ,title:"update loaction"} },

      { path: "/admin/qurbani/create", name: "create-qurbani", component: CreateQurbani, meta: { name: "qurbani" ,title:"Create qurbani"} },
      { path: "/admin/qurbanis", name: "qurbani-list", component: QurbaniList, meta: { name: "qurbani" ,title:"List qurbani"} },
      { path: "/admin/qurbani/:id/view", name: "qurbani-view", component: QurbaniView, meta: { name: "qurbani" ,title:"view qurbani"} },
      { path: "/admin/qurbani/:id/update", name: "qurbani-update", component: QurbaniUpdate, meta: { name: "qurbani" ,title:"update qurbani"} },
      { path: "/admin/qurbanis/booking", name: "qurbani-booking-list", component: QurbaniBookingList, meta: { name: "qurbanibooking" ,title:"List Qurbani Booking"} },
      { path: "/admin/qurbani/booking/:id/view", name: "qurbani-booking-view", component: QurbaniBookingView, meta: { name: "qurbani-booking" ,title:"view qurbani-booking"} },

      { path: "/admin/ecommerce/category/create", name: "create-category", component: CreateCategory, meta: { name: "category" ,title:"Create category"} },
      { path: "/admin/ecommerce/categorys", name: "category-list", component: CategoryList, meta: { name: "category" ,title:"List category"} },
      { path: "/admin/ecommerce/category/:id/view", name: "category-view", component: CategoryView, meta: { name: "category" ,title:"view category"} },
      { path: "/admin/ecommerce/category/:id/update", name: "category-update", component: CategoryUpdate, meta: { name: "category" ,title:"update category"} },

      { path: "/admin/ecommerce/product/create", name: "create-product", component: CreateProduct, meta: { name: "product" ,title:"Create product"} },
      { path: "/admin/ecommerce/products", name: "product-list", component: ProductList, meta: { name: "product" ,title:"List product"} },
      { path: "/admin/ecommerce/product/:id/view", name: "product-view", component: ProductView, meta: { name: "product" ,title:"view product"} },
      { path: "/admin/ecommerce/product/:id/update", name: "product-update", component: ProductUpdate, meta: { name: "product" ,title:"update product"} },

      { path: "/admin/cab/booking", name: "cab-booking-list", component: CabBookingList, meta: { name: "cabbooking" ,title:"List Cab Booking"} },
      { path: "/admin/cab/:id/view", name: "cab-view", component: CabView, meta: { name: "cab",title:"view cab" } },
      { path: "/admin/cab/:id/update", name: "cab-update", component: CabUpdate, meta: { name: "cab",title:"update cab" } },

      { path: "/admin/hijamas/create", name: "hijama-create", component: HijamaCreate, meta: { name: "hijama" ,title:"hijama create"} },
      { path: "/admin/hijamas", name: "hijama-list", component: HijamaList, meta: { name: "hijama" ,title:"hijama"} },
      { path: "/admin/hijama/:id/view", name: "hijama-view", component: HijamaView, meta: { name: "hijama",title:"view hijama" } },
      { path: "/admin/hijama/:id/update", name: "hijama-update", component: HijamaUpdate, meta: { name: "hijama",title:"update hijama" } },



      
    ],
  },

  // public routes
  {
    path: "/",
    name: "/",
    component: DashboardLayout,
    meta: { public: true },
    children: [
      { path: "/home", name: "home", component: Home, meta: { title: "Home" } },
    ],
  },
  {
    path: "/",
    name: "logout",
    component: LogoutLayout,
    meta: { public: true },
    children: [
      { path: "/signin", name: "signin", component: SignIn, meta: { onlyLoggedOut: true,  title: "Sign In"  } },
      { path: "/signup", name: "signup", component: SignUp,meta: { onlyLoggedOut: true, title: "Sign Up"  } },
      { path: "/homepage", name: "homepage", component: HomePage, meta: { onlyLoggedOut: true,  title: "Home Page"  } },
    ],
  },
  //error route
  {
    path: "/error",
    name: "error",
    component: FrontLayout,
    meta: { public: true },
    children: [
      { path: "/404", name: "error-404", component: Error404, meta: { title: "Not Fount" } },
      { path: "/500", name: "error-500", component: Error500, meta: { title: "Server Error" } },
      { path: "/501", name: "error-501", component: Error501, meta: { title: "Not Inplemented" } },
      { path: "/429", name: "error-429", component: Error429, meta: { title: "Request Overload" } },
      { path: "/419", name: "error-419", component: Error419, meta: { title: "Misdirected Request" } },

    ],
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const token = getToken()
  const isValidURL = to.name !== "not-found"; // or error404
  const isPublic = to.matched.some((route) => route.meta.public);
  if (isValidURL && !isPublic && !token) {
    localStorage.removeItem("vuex")
    next({ path: "/signin" });
  }else {
    document.title = to.meta.title? String(to.meta.title):"kaka web"
    next();
  }
});
function getToken() {
  return localStorage.getItem('token');
}

export default router;
