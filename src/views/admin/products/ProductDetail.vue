<template>
  <div class="container mt-4">
    <h2>Chi tiết sản phẩm</h2>
    <div v-if="product" class="card">
      <img
        :src="product.image"
        class="card-img-top"
        alt="Product Image"
        style="height: 300px; object-fit: cover"
      />
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">
          <strong>Thương hiệu:</strong> {{ product.brand }}
        </p>
        <p class="card-text"><strong>Giá:</strong> {{ product.price }} USD</p>
        <p class="card-text">
          <strong>Danh mục:</strong> {{ product.category }}
        </p>
        <p class="card-text">
          <strong>Mô tả:</strong> {{ product.description }}
        </p>
      </div>
    </div>
    <router-link to="/admin/products" class="btn btn-secondary mt-3"
      >Quay lại</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductDetail",
  data() {
    return {
      product: null,
    };
  },
  async mounted() {
    await this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/${this.$route.params.id}`,
        );
        this.product = response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },
  },
};
</script>
