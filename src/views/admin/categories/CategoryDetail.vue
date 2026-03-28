<template>
  <div class="container mt-4">
    <h2>Chi tiết danh mục</h2>
    <div v-if="category">
      <p><strong>ID:</strong> {{ category.id }}</p>
      <p><strong>Tên danh mục:</strong> {{ category.name }}</p>
      <p><strong>Mô tả:</strong> {{ category.description }}</p>
      <p>
        <strong>Trạng thái:</strong>
        {{ category.isDeleted ? "Đã xóa" : "Hoạt động" }}
      </p>
    </div>
    <router-link to="/admin/categories" class="btn btn-secondary"
      >Quay lại</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryDetail",
  data() {
    return {
      category: null,
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
  },
};
</script>
