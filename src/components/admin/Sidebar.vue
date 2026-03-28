<template>
  <nav id="sidebar">
    <div class="p-4 text-center">
      <h3 class="fw-bold border-bottom pb-3 text-white">AURA ADMIN</h3>
    </div>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link
          to="/admin"
          class="nav-link"
          :class="{ active: $route.path === '/admin' }"
        >
          <i class="fas fa-chart-line me-2"></i> Tổng quan
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/products"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/admin/products') }"
        >
          <i class="fas fa-box me-2"></i> Sản phẩm
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/orders"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/admin/orders') }"
        >
          <i class="fas fa-shopping-cart me-2"></i> Đơn hàng
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/posts"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/admin/posts') }"
        >
          <i class="fas fa-newspaper me-2"></i> Bài viết
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/customers"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/admin/customers') }"
        >
          <i class="fas fa-users me-2"></i> Khách hàng
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/employees"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/admin/employees') }"
        >
          <i class="fas fa-user-tie me-2"></i> Nhân viên
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/categories"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/admin/categories') }"
        >
          <i class="fas fa-tags me-2"></i> Danh mục
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/revenues"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/admin/revenues') }"
        >
          <i class="fas fa-dollar-sign me-2"></i> Doanh thu
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AdminSidebar",
};
</script>

<style scoped>
#sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #1a1a1a;
}
#sidebar .nav-link {
  color: #adb5bd;
  padding: 15px 25px;
  border-radius: 0;
}
#sidebar .nav-link:hover,
#sidebar .nav-link.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  #sidebar {
    margin-left: calc(-1 * 250px);
  }
  #sidebar.active {
    margin-left: 0;
  }
}
</style>
