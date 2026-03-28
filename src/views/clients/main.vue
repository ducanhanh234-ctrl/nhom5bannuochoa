<script>
import axios from "axios";
import { getAuthUser, clearAuthUser } from "@/composables/useAuth";

export default {
  name: "ClientHome",
  data() {
    return {
      products: [],
      posts: [],
      cartCount: 0,
      authUser: getAuthUser(),
    };
  },
  async mounted() {
    await Promise.all([this.fetchProducts(), this.fetchPosts()]);
    this.loadCartCount();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3001/products");
        this.products = response.data.filter((p) => !p.isDeleted);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchPosts() {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        this.posts = response.data
          .filter((post) => !post.isDeleted && post.status === "published")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    loadCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cartCount = cart.length;
    },
    logout() {
      clearAuthUser();
      this.authUser = null;
      this.$router.push("/login");
    },
    goToDetail(productId) {
      this.$router.push(`/product/${productId}`);
    },
  },
};
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
              <a class="nav-link px-3 text-white" href="#">NAM</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3 text-white" href="#">NỮ</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3 text-white" href="#">BST MỚI</a>
            </li>
          </ul>
          <router-link
            to="/checkout"
            class="text-white text-decoration-none small me-3"
          >
            GIỎ HÀNG ({{ cartCount }})
          </router-link>
          <span v-if="authUser" class="text-white small me-3">
            {{ authUser.email }} ({{ authUser.role }})
          </span>
          <button
            v-if="authUser"
            @click="logout"
            class="btn btn-sm btn-outline-light"
          >
            Đăng xuất
          </button>
          <div v-else>
            <router-link to="/login" class="text-white text-decoration-none small me-2">Đăng nhập</router-link>
            <router-link to="/register" class="text-white text-decoration-none small">Đăng ký</router-link>
          </div>
        </div>
      </div>
    </nav>

    <header
      style="
        background-color: #ede2d5;
        height: 70vh;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d1d1d1;
      "
    >
      <div class="container text-center">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <p class="category-label mb-3 text-uppercase">
              The Minimalist Scent
            </p>
            <h1
              class="display-3 mb-4"
              style="font-family: &quot;Playfair Display&quot;, serif"
            >
              Sự Tinh Tế Từ <br />
              Những Điều Đơn Giản nhất
            </h1>
            <p class="mb-5 text-muted">
              Bộ sưu tập nước hoa tông phấn và xạ hương, nhẹ nhàng như làn da
              thứ hai của bạn.
            </p>
            <a
              href="#collection"
              class="btn"
              style="
                background-color: #4a4a4a;
                color: #f4ece4;
                border: none;
                padding: 12px 25px;
                text-transform: uppercase;
                letter-spacing: 1px;
              "
              >MUA BỘ SƯU TẬP</a
            >
          </div>
        </div>
      </div>
    </header>

    <section id="collection" class="container py-5 mt-4">
      <div class="text-center mb-5">
        <h2
          style="
            font-family: &quot;Playfair Display&quot;, serif;
            font-weight: 300;
          "
        >
          SẢN PHẨM NỔI BẬT
        </h2>
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
          <div
            class="card h-100"
            style="border: none; border-radius: 0; transition: all 0.3s ease"
          >
            <div
              style="
                background-color: #f9f9f9;
                padding: 20px;
                height: 220px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <img
                :src="product.image"
                class="img-fluid"
                :alt="product.name"
                style="width: 100%; height: 180px; object-fit: cover"
              />
            </div>
            <div class="card-body">
              <span
                style="
                  color: #b5a491;
                  font-size: 0.75rem;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                "
                >{{ product.category }}</span
              >
              <h6 class="my-2">{{ product.name }}</h6>
              <p style="color: #8e8e8e; font-weight: 600">
                {{ product.price }} USD
              </p>
              <button
                @click="goToDetail(product.id)"
                class="btn btn-sm w-100"
                style="
                  color: #4a4a4a;
                  border: 1px solid #4a4a4a;
                  border-radius: 0;
                  background-color: transparent;
                "
              >
                Chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="posts" class="container py-5 mt-4">
      <div class="text-center mb-5">
        <h2 style="font-family: 'Playfair Display', serif; font-weight: 300;">BÀI VIẾT MỚI NHẤT</h2>
        <p class="text-muted small">Tin tức và cẩm nang nước hoa</p>
      </div>

      <div class="row g-4">
        <div v-if="posts.length === 0" class="col-12 text-center">
          <p class="text-muted">Chưa có bài viết nào.</p>
        </div>
        <div v-for="post in posts" :key="post.id" class="col-md-4 col-sm-6">
          <div class="card h-100" style="border: none;">
            <div class="card-body">
              <h5>{{ post.title }}</h5>
              <p class="text-muted small mb-2">Bởi {{ post.author }} - {{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}</p>
              <p class="text-secondary" style="height: 80px; overflow: hidden;">{{ post.content }}</p>
              <router-link :to="`/admin/posts/detail/${post.id}`" class="text-decoration-none">Xem chi tiết →</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer style="background-color: #d1d1d1; color: #4a4a4a" class="py-5 mt-5">
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
              background-color: #4a4a4a;
              border-radius: 50%;
            "
          ></div>
          <div
            style="
              width: 20px;
              height: 20px;
              background-color: #f4ece4;
              border-radius: 50%;
              border: 1px solid #d1d1d1;
            "
          ></div>
          <div
            style="
              width: 20px;
              height: 20px;
              background-color: #2d2d2d;
              border-radius: 50%;
            "
          ></div>
        </div>
        <p class="text-muted" style="font-size: 0.7rem">
          &copy; 2026 Aura Perfume. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.category-label {
  color: #b5a491;
  font-size: 0.75rem;
  letter-spacing: 2px;
}
</style>
