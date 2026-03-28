<template>
  <div class="container mt-4">
    <h2>Sửa danh mục</h2>
    <form @submit.prevent="updateCategory">
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
      <button type="submit" class="btn btn-primary">Cập nhật</button>
      <router-link to="/admin/categories" class="btn btn-secondary ms-2"
        >Hủy</router-link
      >
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryEdit",
  data() {
    return {
      category: {
        name: "",
        description: "",
        isDeleted: false,
      },
    };
  },
  async mounted() {
    await this.fetchCategory();
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await axios.get(
          `http://localhost:3001/categories/${this.$route.params.id}`,
        );
        this.category = response.data;
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    },
    async updateCategory() {
      if (!this.category.name.trim()) {
        alert("Tên danh mục không được để trống");
        return;
      }
      try {
        await axios.put(
          `http://localhost:3001/categories/${this.category.id}`,
          this.category,
        );
        this.$router.push("/admin/categories");
      } catch (error) {
        console.error("Error updating category:", error);
        alert("Có lỗi xảy ra khi cập nhật danh mục");
      }
    },
  },
};
</script>
