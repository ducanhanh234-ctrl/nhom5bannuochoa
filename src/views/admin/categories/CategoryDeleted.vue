<template>
  <div class="container mt-4">
    <h2>Danh mục đã xóa</h2>
    <div class="mb-3">
      <router-link to="/admin/categories" class="btn btn-secondary"
        >Quay lại danh sách</router-link
      >
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên danh mục</th>
          <th>Mô tả</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in deletedCategories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <button
              @click="restore(category.id)"
              class="btn btn-success btn-sm me-2"
            >
              Khôi phục
            </button>
            <button
              @click="hardDelete(category.id)"
              class="btn btn-danger btn-sm"
            >
              Xóa vĩnh viễn
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryDeleted",
  data() {
    return {
      categories: [],
    };
  },
  computed: {
    deletedCategories() {
      return this.categories.filter((category) => category.isDeleted);
    },
  },
  async mounted() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:3001/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async restore(id) {
      if (confirm("Bạn có chắc muốn khôi phục danh mục này?")) {
        try {
          await axios.patch(`http://localhost:3001/categories/${id}`, {
            isDeleted: false,
          });
          await this.fetchCategories();
        } catch (error) {
          console.error("Error restoring category:", error);
        }
      }
    },
    async hardDelete(id) {
      if (confirm("Bạn có chắc muốn xóa vĩnh viễn danh mục này?")) {
        try {
          await axios.delete(`http://localhost:3001/categories/${id}`);
          await this.fetchCategories();
        } catch (error) {
          console.error("Error hard deleting category:", error);
        }
      }
    },
  },
};
</script>
