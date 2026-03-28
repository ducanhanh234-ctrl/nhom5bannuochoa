import { createRouter, createWebHistory } from "vue-router";
import { getAuthUser } from "@/composables/useAuth";
import Main2 from "@/views/clients/main.vue";
import ClientProductDetail from "@/views/clients/detail.vue";
import ClientCheckout from "@/views/clients/checkout.vue";
import AdminLayout from "@/components/admin/Layout.vue";
import Main1 from "@/views/admin/main.vue";
import ProductList from "@/views/admin/products/ProductList.vue";
import ProductDetail from "@/views/admin/products/ProductDetail.vue";
import ProductAdd from "@/views/admin/products/ProductAdd.vue";
import ProductEdit from "@/views/admin/products/ProductEdit.vue";
import ProductDeleted from "@/views/admin/products/ProductDeleted.vue";
import CustomerList from "@/views/admin/customers/CustomerList.vue";
import CustomerDetail from "@/views/admin/customers/CustomerDetail.vue";
import CustomerAdd from "@/views/admin/customers/CustomerAdd.vue";
import CustomerEdit from "@/views/admin/customers/CustomerEdit.vue";
import CustomerDeleted from "@/views/admin/customers/CustomerDeleted.vue";
import OrderList from "@/views/admin/orders/OrderList.vue";
import OrderDetail from "@/views/admin/orders/OrderDetail.vue";
import EmployeeList from "@/views/admin/employees/EmployeeList.vue";
import EmployeeDetail from "@/views/admin/employees/EmployeeDetail.vue";
import EmployeeAdd from "@/views/admin/employees/EmployeeAdd.vue";
import EmployeeEdit from "@/views/admin/employees/EmployeeEdit.vue";
import EmployeeDeleted from "@/views/admin/employees/EmployeeDeleted.vue";
import CategoryList from "@/views/admin/categories/CategoryList.vue";
import CategoryDetail from "@/views/admin/categories/CategoryDetail.vue";
import CategoryAdd from "@/views/admin/categories/CategoryAdd.vue";
import CategoryEdit from "@/views/admin/categories/CategoryEdit.vue";
import CategoryDeleted from "@/views/admin/categories/CategoryDeleted.vue";
import RevenueList from "@/views/admin/revenues/RevenueList.vue";
import RevenueDetail from "@/views/admin/revenues/RevenueDetail.vue";
import RevenueAdd from "@/views/admin/revenues/RevenueAdd.vue";
import RevenueEdit from "@/views/admin/revenues/RevenueEdit.vue";
import RevenueDeleted from "@/views/admin/revenues/RevenueDeleted.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

import PostMain from "@/views/admin/posts/main.vue";
import PostList from "@/views/admin/posts/PostList.vue";
import PostAdd from "@/views/admin/posts/PostAdd.vue";
import PostEdit from "@/views/admin/posts/PostEdit.vue";
import PostDetail from "@/views/admin/posts/PostDetail.vue";
import PostDeleted from "@/views/admin/posts/PostDeleted.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Main2,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/product/:id",
      name: "client-product-detail",
      component: ClientProductDetail,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: ClientCheckout,
    },
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        {
          path: "",
          name: "admin-dashboard",
          component: Main1,
        },
        {
          path: "customers",
          name: "customer-list",
          component: CustomerList,
        },
        {
          path: "customers/add",
          name: "customer-add",
          component: CustomerAdd,
        },
        {
          path: "customers/edit/:id",
          name: "customer-edit",
          component: CustomerEdit,
        },
        {
          path: "customers/detail/:id",
          name: "customer-detail",
          component: CustomerDetail,
        },
        {
          path: "customers/deleted",
          name: "customer-deleted",
          component: CustomerDeleted,
        },
        {
          path: "products",
          name: "product-list",
          component: ProductList,
        },
        {
          path: "products/add",
          name: "product-add",
          component: ProductAdd,
        },
        {
          path: "products/edit/:id",
          name: "product-edit",
          component: ProductEdit,
        },
        {
          path: "products/detail/:id",
          name: "product-detail",
          component: ProductDetail,
        },
        {
          path: "products/deleted",
          name: "product-deleted",
          component: ProductDeleted,
        },
        {
          path: "orders",
          name: "order-list",
          component: OrderList,
        },
        {
          path: "orders/detail/:id",
          name: "order-detail",
          component: OrderDetail,
        },
        {
          path: "employees",
          name: "employee-list",
          component: EmployeeList,
        },
        {
          path: "employees/add",
          name: "employee-add",
          component: EmployeeAdd,
        },
        {
          path: "employees/edit/:id",
          name: "employee-edit",
          component: EmployeeEdit,
        },
        {
          path: "employees/detail/:id",
          name: "employee-detail",
          component: EmployeeDetail,
        },
        {
          path: "employees/deleted",
          name: "employee-deleted",
          component: EmployeeDeleted,
        },
        {
          path: "categories",
          name: "category-list",
          component: CategoryList,
        },
        {
          path: "categories/add",
          name: "category-add",
          component: CategoryAdd,
        },
        {
          path: "categories/edit/:id",
          name: "category-edit",
          component: CategoryEdit,
        },
        {
          path: "categories/detail/:id",
          name: "category-detail",
          component: CategoryDetail,
        },
        {
          path: "categories/deleted",
          name: "category-deleted",
          component: CategoryDeleted,
        },
        {
          path: "revenues",
          name: "revenue-list",
          component: RevenueList,
        },
        {
          path: "revenues/add",
          name: "revenue-add",
          component: RevenueAdd,
        },
        {
          path: "revenues/edit/:id",
          name: "revenue-edit",
          component: RevenueEdit,
        },
        {
          path: "revenues/detail/:id",
          name: "revenue-detail",
          component: RevenueDetail,
        },
        {
          path: "revenues/deleted",
          name: "revenue-deleted",
          component: RevenueDeleted,
        },
        {
          path: "posts",
          name: "post-main",
          component: PostMain,
          meta: { requireRole: ["admin", "employee"] },
        },
        {
          path: "posts/list",
          name: "post-list",
          component: PostList,
        },
        {
          path: "posts/add",
          name: "post-add",
          component: PostAdd,
        },
        {
          path: "posts/edit/:id",
          name: "post-edit",
          component: PostEdit,
        },
        {
          path: "posts/detail/:id",
          name: "post-detail",
          component: PostDetail,
        },
        {
          path: "posts/deleted",
          name: "post-deleted",
          component: PostDeleted,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = getAuthUser();

  if (to.path === "/login" || to.path === "/register") {
    if (user) {
      if (user.role === "customer") {
        return next({ path: "/" });
      }
      return next({ path: "/admin" });
    }
    return next();
  }

  if (to.path.startsWith("/admin")) {
    if (!user) {
      return next({ path: "/login" });
    }

    if (user.role === "customer") {
      return next({ path: "/login" });
    }

    if (
      to.path.startsWith("/admin/customers") ||
      to.path.startsWith("/admin/employees")
    ) {
      if (user.role !== "admin") {
        return next({ path: "/admin" });
      }
    }
  }

  return next();
});

export default router;
