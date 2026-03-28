<template>
  <div class="container mt-4">
    <h2>Quản lý danh mục sản phẩm</h2>
    <div class="d-flex justify-content-between mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control d-inline-block w-auto me-2"
        placeholder="Tìm kiếm danh mục..."
      />
      <router-link to="/admin/categories/add" class="btn btn-primary"
        >Thêm danh mục</router-link
      >
    </div>
    <div class="mb-3">
      <router-link to="/admin/categories/deleted" class="btn btn-secondary"
        >Xem danh mục đã xóa</router-link
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
        <tr v-for="category in filteredCategories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <router-link
              :to="`/admin/categories/detail/${category.id}`"
              class="btn btn-info btn-sm me-2"
              >Chi tiết</router-link
            >
            <router-link
              :to="`/admin/categories/edit/${category.id}`"
              class="btn btn-warning btn-sm me-2"
              >Sửa</router-link
            >
            <button
              @click="softDelete(category.id)"
              class="btn btn-danger btn-sm"
            >
              Xóa
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
  name: "CategoryList",
  data() {
    return {
      categories: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter((category) => {
        const matchesSearch =
          category.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          category.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        return matchesSearch && !category.isDeleted;
      });
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
    async softDelete(id) {
      if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
        try {
          await axios.patch(`http://localhost:3001/categories/${id}`, {
            isDeleted: true,
          });
          await this.fetchCategories();
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      }
    },
  },
};
</script>
