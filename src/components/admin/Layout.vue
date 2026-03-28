<template>
  <div>
    <AdminSidebar />
    <main id="main-content">
      <AdminHeader :title="pageTitle" />
      <router-view />
      <AdminFooter />
    </main>
  </div>
</template>

<script>
import AdminHeader from "./Header.vue";
import AdminSidebar from "./Sidebar.vue";
import AdminFooter from "./Footer.vue";

export default {
  name: "AdminLayout",
  components: {
    AdminHeader,
    AdminSidebar,
    AdminFooter,
  },
  computed: {
    pageTitle() {
      // Có thể dynamic dựa trên route
      const route = this.$route;
      if (route.path === "/admin") return "Bảng điều khiển";
      if (route.path.startsWith("/admin/products")) return "Quản lý sản phẩm";
      return "Admin";
    },
  },
};
</script>

<style scoped>
#main-content {
  margin-left: 250px;
  padding: 30px;
}

@media (max-width: 768px) {
  #main-content {
    margin-left: 0;
  }
}
</style>
