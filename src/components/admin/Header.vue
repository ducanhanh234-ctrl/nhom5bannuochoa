<template>
  <header class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="fw-bold">{{ title }}</h4>
    <div class="dropdown">
      <button
        class="btn btn-white border dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        <img
          :src="`https://ui-avatars.com/api/?name=${user?.email || 'Admin'}`"
          width="30"
          class="rounded-circle me-2"
        />
        {{
          user?.role
            ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
            : "Admin"
        }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">Hồ sơ</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <button class="dropdown-item text-danger" @click.prevent="logout">
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { getAuthUser, clearAuthUser } from "@/composables/useAuth";

export default {
  name: "AdminHeader",
  props: {
    title: {
      type: String,
      default: "Bảng điều khiển",
    },
  },
  data() {
    return {
      user: getAuthUser(),
    };
  },
  methods: {
    logout() {
      clearAuthUser();
      this.$router.push("/login");
    },
  },
};
</script>
