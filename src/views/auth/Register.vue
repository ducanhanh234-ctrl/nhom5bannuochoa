<template>
  <div class="container mt-5" style="max-width: 500px;">
    <h2 class="mb-4">Đăng ký</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label class="form-label">Tên</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Mật khẩu</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Xác nhận mật khẩu</label>
        <input v-model="confirmPassword" type="password" class="form-control" required />
      </div>
      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
      <button type="submit" class="btn btn-primary">Đăng ký</button>
      <router-link to="/login" class="btn btn-link">Đã có tài khoản</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { setAuthUser } from "@/composables/useAuth";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");

const register = async () => {
  try {
    error.value = "";
    if (password.value !== confirmPassword.value) {
      error.value = "Mật khẩu xác nhận không khớp";
      return;
    }

    // kiểm tra trùng email
    const check = await axios.get("http://localhost:3001/users", {
      params: { email: email.value },
    });
    if (check.data.length > 0) {
      error.value = "Email đã tồn tại";
      return;
    }

    // tạo customer trong customers
    const customerRes = await axios.post("http://localhost:3001/customers", {
      name: name.value,
      email: email.value,
      phone: "",
      address: "",
      isDeleted: false,
    });

    // tạo user (credential)
    const userRes = await axios.post("http://localhost:3001/users", {
      email: email.value,
      password: password.value,
      role: "customer",
      customerId: customerRes.data.id,
    });

    setAuthUser(userRes.data);
    router.push("/");
  } catch (err) {
    console.error(err);
    error.value = "Đăng ký thất bại, thử lại";
  }
};
</script>
