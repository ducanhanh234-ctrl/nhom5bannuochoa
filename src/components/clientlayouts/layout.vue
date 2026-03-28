<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

const products = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3001/products");
    products.value = response.data.filter((p) => !p.isDeleted);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <a class="navbar-brand fs-3 fw-bold text-white" href="#">AURA.</a>
      <div class="ms-auto d-flex align-items-center">
        <ul class="navbar-nav d-none d-lg-flex flex-row me-4">
          <li class="nav-item">
            <a class="nav-link px-3 text-white" href="#">NAM</a>
          </li>
          <li class="nav-item">
            <a class="nav-link px-3 text-white" href="#">NỮ</a>
          </li>
          <li class="nav-item">
            <a class="nav-link px-3 text-white" href="#">BST MỚI</a>
          </li>
        </ul>
        <a href="#" class="text-white text-decoration-none small"
          >GIỎ HÀNG (0)</a
        >
      </div>
    </div>
  </nav>

  <header class="hero-section">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <p class="category-label mb-3 text-uppercase">The Minimalist Scent</p>
          <h1 class="display-3 mb-4">
            Sự Tinh Tế Từ <br />
            Những Điều Đơn Giản nhất
          </h1>
          <p class="mb-5 text-muted">
            Bộ sưu tập nước hoa tông phấn và xạ hương, nhẹ nhàng như làn da thứ
            hai của bạn.
          </p>
          <a href="#collection" class="btn btn-grey">MUA BỘ SƯU TẬP</a>
        </div>
      </div>
    </div>
  </header>

  <section id="collection" class="container py-5 mt-4">
    <div class="text-center mb-5">
      <h2 class="fw-light">SẢN PHẨM NỔI BẬT</h2>
      <p class="text-muted small">
        Màu xám của sự kiên định, màu nude của sự thuần khiết
      </p>
    </div>

    <div class="row g-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-md-3 col-sm-6"
      >
        <div class="card h-100">
          <div class="product-img">
            <img :src="product.image" class="img-fluid" :alt="product.name" />
          </div>
          <div class="card-body">
            <span class="category-label text-uppercase">{{
              product.category
            }}</span>
            <h6 class="my-2">{{ product.name }}</h6>
            <p class="price">{{ product.price }} USD</p>
            <button class="btn btn-outline-grey btn-sm w-100">Chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="py-5 mt-5">
    <div class="container text-center">
      <h3 class="mb-4">AURA.</h3>
      <p class="small mb-4">
        Email: contact@auraperfume.com | Phone: 0123 456 789
      </p>
      <div class="d-flex justify-content-center gap-3 mb-4">
        <div
          style="
            width: 20px;
            height: 20px;
            background-color: var(--accent-grey);
            border-radius: 50%;
          "
        ></div>
        <div
          style="
            width: 20px;
            height: 20px;
            background-color: var(--bg-nude);
            border-radius: 50%;
            border: 1px solid var(--light-grey);
          "
        ></div>
        <div
          style="
            width: 20px;
            height: 20px;
            background-color: var(--deep-grey);
            border-radius: 50%;
          "
        ></div>
      </div>
      <p class="text-muted" style="font-size: 0.7rem">
        &copy; 2026 Aura Perfume. Tất cả quyền được bảo lưu.
      </p>
    </div>
  </footer>
</template>

<style scoped>
:root {
  --bg-nude: #f4ece4; /* Màu da/nude làm nền chính */
  --accent-grey: #4a4a4a; /* Xám đậm cho chữ và icon */
  --light-grey: #d1d1d1; /* Xám nhạt cho viền */
  --deep-grey: #2d2d2d; /* Xám chì cho các nút hoặc navbar */
  --white-soft: #ffffff;
}

body {
  font-family: "Montserrat", sans-serif;
  background-color: var(--bg-nude);
  color: var(--accent-grey);
}

h1,
h2,
h3,
.navbar-brand {
  font-family: "Playfair Display", serif;
  color: var(--deep-grey);
}

/* Navbar Xám Chì */
.navbar {
  background-color: #2d2d2d !important;
  padding: 1.5rem 0;
}
.navbar-brand,
.nav-link {
  color: #ffffff !important;
}
.nav-link:hover {
  opacity: 0.8;
}

/* Hero Section - Nền màu da nhạt hơn */
.hero-section {
  background-color: #ede2d5;
  height: 70vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--light-grey);
}

/* Card Sản phẩm - Màu trắng hoặc nude nhạt */
.card {
  background-color: var(--white-soft);
  border: none;
  border-radius: 0;
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 15px 30px rgba(74, 74, 74, 0.1);
  transform: translateY(-5px);
}

.product-img {
  background-color: #f9f9f9;
  padding: 20px;
}

/* Nút bấm Xám */
.btn-grey {
  background-color: var(--accent-grey);
  color: var(--bg-nude);
  border-radius: 0;
  border: none;
  padding: 12px 25px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.btn-grey:hover {
  background-color: var(--deep-grey);
  color: #fff;
}

.btn-outline-grey {
  color: var(--accent-grey);
  border: 1px solid var(--accent-grey);
  border-radius: 0;
}
.btn-outline-grey:hover {
  background-color: var(--accent-grey);
  color: #fff;
}

.price {
  color: #8e8e8e;
  font-weight: 600;
}
.category-label {
  color: #b5a491;
  font-size: 0.75rem;
  letter-spacing: 2px;
}

footer {
  background-color: var(--light-grey);
  color: var(--accent-grey);
}
.product-img {
  background-color: #f9f9f9;
  padding: 20px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
</style>
