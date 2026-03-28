<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const product = ref(null);
const quantity = ref(1);
const cartCount = ref(0);

const loadCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.value = cart.length;
};

const fetchProduct = async () => {
  try {
    const productId = route.params.id;
    console.log("Fetching product with ID:", productId);
    const response = await axios.get(
      `http://localhost:3001/products/${productId}`,
    );
    console.log("Product data:", response.data);
    product.value = response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

const addToCart = () => {
  if (product.value) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.value.id);

    if (existingItem) {
      existingItem.quantity += quantity.value;
    } else {
      cart.push({
        ...product.value,
        quantity: quantity.value,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
    router.push("/");
  }
};

onMounted(() => {
  fetchProduct();
  loadCartCount();
});
</script>

<template>
  <div>
    <nav
      class="navbar navbar-expand-lg sticky-top"
      style="background-color: #2d2d2d"
    >
      <div class="container">
        <a class="navbar-brand fs-3 fw-bold text-white" href="#">AURA.</a>
        <div class="ms-auto d-flex align-items-center">
          <ul class="navbar-nav d-none d-lg-flex flex-row me-4">
            <li class="nav-item">
              <router-link to="/" class="nav-link px-3 text-white"
                >NAM</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link px-3 text-white"
                >NỮ</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link px-3 text-white"
                >BST MỚI</router-link
              >
            </li>
          </ul>
          <router-link
            to="/checkout"
            class="text-white text-decoration-none small"
          >
            GIỎ HÀNG ({{ cartCount }})
          </router-link>
        </div>
      </div>
    </nav>

    <div class="container py-5">
      <div v-if="product" class="row bg-white p-4 rounded shadow-sm">
        <div class="col-md-6 mb-4 mb-md-0 text-center">
          <img
            :src="product.image"
            :alt="product.name"
            class="img-fluid rounded"
          />
        </div>

        <div class="col-md-6 d-flex flex-column justify-content-center">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none text-muted"
                  >Trang chủ</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ product.name }}
              </li>
            </ol>
          </nav>

          <h1 class="h2 fw-bold mb-2">{{ product.name }}</h1>
          <p class="text-muted mb-3">
            Thương hiệu: <strong>{{ product.brand }}</strong> | Danh mục:
            {{ product.category }}
          </p>

          <h3 class="text-danger fw-bold mb-3">{{ product.price }} USD</h3>

          <p class="mb-4">
            {{ product.description }}
          </p>

          <form
            @submit.prevent="addToCart"
            class="d-flex align-items-center mb-4"
          >
            <label for="quantity" class="me-3 fw-bold">Số lượng:</label>
            <input
              v-model.number="quantity"
              type="number"
              id="quantity"
              class="form-control text-center me-3"
              min="1"
              max="100"
              style="width: 80px"
            />
            <button type="submit" class="btn btn-dark btn-lg px-4 rounded-pill">
              Mua Ngay
            </button>
          </form>

          <hr />

          <div class="mt-2">
            <p class="mb-1">
              <i class="text-success">✔</i> <strong>Tình trạng:</strong> Còn
              hàng
            </p>
            <p class="mb-1">
              <i class="text-success">✔</i> Giao hàng toàn quốc trong 2-4 ngày
            </p>
            <p class="mb-1">
              <i class="text-success">✔</i> Cam kết hàng chính hãng 100%
            </p>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Đang tải...</span>
        </div>
        <p class="mt-3">Đang tải sản phẩm...</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
