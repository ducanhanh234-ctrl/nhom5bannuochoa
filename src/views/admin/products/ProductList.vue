<template>
  <div class="container mt-4">
    <h2>Quản lý sản phẩm nước hoa</h2>
    <div class="d-flex justify-content-between mb-3">
      <div>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control d-inline-block w-auto me-2"
          placeholder="Tìm kiếm sản phẩm..."
        />
        <select
          v-model="filterCategory"
          class="form-select d-inline-block w-auto"
        >
          <option value="">Tất cả danh mục</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <router-link to="/admin/products/add" class="btn btn-primary"
        >Thêm sản phẩm</router-link
      >
    </div>
    <div class="mb-3">
      <router-link to="/admin/products/deleted" class="btn btn-secondary"
        >Xem sản phẩm đã xóa</router-link
      >
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Hình ảnh</th>
          <th>Tên</th>
          <th>Thương hiệu</th>
          <th>Giá</th>
          <th>Danh mục</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>
            <img
              :src="product.image"
              alt="Product Image"
              style="width: 100px; height: 100px; object-fit: cover"
            />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.price }} USD</td>
          <td>{{ categoryMap[product.categoryId] || "N/A" }}</td>
          <td>
            <router-link
              :to="`/admin/products/detail/${product.id}`"
              class="btn btn-info btn-sm me-2"
              >Chi tiết</router-link
            >
            <router-link
              :to="`/admin/products/edit/${product.id}`"
              class="btn btn-warning btn-sm me-2"
              >Sửa</router-link
            >
            <button
              @click="softDelete(product.id)"
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
  name: "ProductList",
  data() {
    return {
      products: [],
      categories: [],
      searchQuery: "",
      filterCategory: "",
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory =
          !this.filterCategory || product.categoryId === this.filterCategory;
        return matchesSearch && matchesCategory && !product.isDeleted;
      });
    },
    categoryMap() {
      return this.categories.reduce((map, category) => {
        map[category.id] = category.name;
        return map;
      }, {});
    },
  },
  async mounted() {
    await this.fetchProducts();
    await this.fetchCategories();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3001/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:3001/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async softDelete(id) {
      if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        try {
          await axios.patch(`http://localhost:3001/products/${id}`, {
            isDeleted: true,
          });
          await this.fetchProducts();
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    },
  },
};
</script>
