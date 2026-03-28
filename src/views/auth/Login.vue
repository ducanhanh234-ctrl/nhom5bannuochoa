<template>
  <div class="container mt-5" style="max-width: 500px;">
    <h2 class="mb-4">Đăng nhập</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Mật khẩu</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
      <router-link to="/register" class="btn btn-link">Đăng ký</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { setAuthUser } from "@/composables/useAuth";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  try {
    error.value = "";
    const response = await axios.get("http://localhost:3001/users", {
      params: { email: email.value.trim() },
    });
    const user = response.data[0];

    if (!user || user.password !== password.value.trim()) {
      error.value = "Email hoặc mật khẩu không đúng";
      return;
    }

    setAuthUser(user);
    if (user.role === "customer") {
      router.push("/");
    } else {
      router.push("/admin");
    }
  } catch (err) {
    console.error(err);
    error.value = "Đăng nhập thất bại, vui lòng thử lại";
  }
};
</script>
