<template>
  <div class="container mt-4">
    <h2>Thêm danh mục mới</h2>
    <form @submit.prevent="addCategory">
      <div class="mb-3">
        <label for="name" class="form-label">Tên danh mục</label>
        <input
          v-model="category.name"
          type="text"
          class="form-control"
          id="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Mô tả</label>
        <textarea
          v-model="category.description"
          class="form-control"
          id="description"
          rows="3"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Thêm danh mục</button>
      <router-link to="/admin/categories" class="btn btn-secondary ms-2"
        >Hủy</router-link
      >
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryAdd",
  data() {
    return {
      category: {
        name: "",
        description: "",
        isDeleted: false,
      },
    };
  },
  methods: {
    async addCategory() {
      if (!this.category.name.trim()) {
        alert("Tên danh mục không được để trống");
        return;
      }
      try {
        await axios.post("http://localhost:3001/categories", this.category);
        this.$router.push("/admin/categories");
      } catch (error) {
        console.error("Error adding category:", error);
        alert("Có lỗi xảy ra khi thêm danh mục");
      }
    },
  },
};
</script>


<!-- yygytgytgtyvy -->