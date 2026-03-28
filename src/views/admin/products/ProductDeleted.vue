<template>
  <div class="container mt-4">
    <h2>Sản phẩm đã xóa</h2>
    <router-link to="/admin/products" class="btn btn-secondary mb-3"
      >Quay lại danh sách</router-link
    >
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
        <tr v-for="product in deletedProducts" :key="product.id">
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
          <td>{{ product.category }}</td>
          <td>
            <button
              @click="restore(product.id)"
              class="btn btn-success btn-sm me-2"
            >
              Khôi phục
            </button>
            <button
              @click="hardDelete(product.id)"
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
  name: "ProductDeleted",
  data() {
    return {
      products: [],
    };
  },
  computed: {
    deletedProducts() {
      return this.products.filter((product) => product.isDeleted);
    },
  },
  async mounted() {
    await this.fetchProducts();
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
    async restore(id) {
      try {
        await axios.patch(`http://localhost:3001/products/${id}`, {
          isDeleted: false,
        });
        await this.fetchProducts();
      } catch (error) {
        console.error("Error restoring product:", error);
      }
    },
    async hardDelete(id) {
      if (confirm("Bạn có chắc muốn xóa vĩnh viễn sản phẩm này?")) {
        try {
          await axios.delete(`http://localhost:3001/products/${id}`);
          await this.fetchProducts();
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    },
  },
};
</script>
