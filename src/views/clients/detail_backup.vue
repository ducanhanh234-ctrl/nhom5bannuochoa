<template>
  <div class="container mt-4">
    <h2>Chi tiết sản phẩm</h2>
    <div v-if="product" class="row">
      <div class="col-md-6">
        <img
          :src="product.image"
          class="img-fluid"
          alt="Product Image"
          style="height: 400px; object-fit: cover"
        />
      </div>
      <div class="col-md-6">
        <h4>{{ product.name }}</h4>
        <p><strong>Thương hiệu:</strong> {{ product.brand }}</p>
        <p><strong>Giá:</strong> {{ product.price }} USD</p>
        <p><strong>Danh mục:</strong> {{ product.category }}</p>
        <p><strong>Mô tả:</strong> {{ product.description }}</p>

        <div class="mb-3">
          <label for="quantity" class="form-label">Số lượng:</label>
          <input
            v-model.number="quantity"
            type="number"
            class="form-control"
            id="quantity"
            min="1"
            max="100"
          />
        </div>

        <button @click="addToCart" class="btn btn-primary me-2">
          Thêm vào giỏ hàng
        </button>
        <router-link to="/" class="btn btn-secondary"> Quay lại </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ClientProductDetail",
  data() {
    return {
      product: null,
      quantity: 1,
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
    addToCart() {
      if (this.product) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.id === this.product.id);

        if (existingItem) {
          existingItem.quantity += this.quantity;
        } else {
          cart.push({
            ...this.product,
            quantity: this.quantity,
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng!");
        this.$router.push("/");
      }
    },
  },
};
</script>
