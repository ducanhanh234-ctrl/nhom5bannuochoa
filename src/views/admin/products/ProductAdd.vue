<template>
  <div class="container mt-4">
    <h2>Thêm sản phẩm mới</h2>
    <form @submit.prevent="addProduct" class="row g-3">
      <div class="col-md-6">
        <label for="name" class="form-label">Tên sản phẩm</label>
        <input
          v-model="product.name"
          type="text"
          class="form-control"
          id="name"
        />
      </div>
      <div class="col-md-6">
        <label for="brand" class="form-label">Thương hiệu</label>
        <input
          v-model="product.brand"
          type="text"
          class="form-control"
          id="brand"
        />
      </div>
      <div class="col-md-6">
        <label for="price" class="form-label">Giá</label>
        <input
          v-model.number="product.price"
          type="number"
          class="form-control"
          id="price"
          min="0"
        />
      </div>
      <div class="col-md-6">
        <label for="category" class="form-label">Danh mục</label>
        <select v-model="product.categoryId" class="form-select" id="category">
          <option value="">Chọn danh mục</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="col-12">
        <label for="description" class="form-label">Mô tả</label>
        <textarea
          v-model="product.description"
          class="form-control"
          id="description"
          rows="3"
        ></textarea>
      </div>
      <div class="col-12">
        <label for="image" class="form-label">URL hình ảnh</label>
        <input
          v-model="product.image"
          type="url"
          class="form-control"
          id="image"
        />
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Thêm sản phẩm</button>
        <!-- nút thêm sản phẩm nước hoa nha anh em  -->
        <router-link to="/admin/products" class="btn btn-secondary ms-2"
          >Hủy</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductAdd",
  data() {
    return {
      product: {
        name: "",
        brand: "",
        price: 0,
        categoryId: "",
        description: "",
        image: "",
        isDeleted: false,
      },
      categories: [],
      errors: {},
    };
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
    validate() {
      this.errors = {};
      if (!this.product.name.trim())
        this.errors.name = "Tên sản phẩm là bắt buộc.";
      if (!this.product.brand.trim())
        this.errors.brand = "Thương hiệu là bắt buộc.";
      if (this.product.price <= 0) this.errors.price = "Giá phải lớn hơn 0.";
      if (!this.product.categoryId)
        this.errors.category = "Danh mục là bắt buộc.";
      if (!this.product.description.trim())
        this.errors.description = "Mô tả là bắt buộc.";
      if (!this.product.image.trim())
        this.errors.image = "URL hình ảnh là bắt buộc.";
      return Object.keys(this.errors).length === 0;
    },
    async addProduct() {
      if (!this.validate()) {
        const errorMessages = Object.values(this.errors).join("\n");
        alert("Vui lòng sửa các lỗi sau:\n" + errorMessages);
        return;
      }
      try {
        await axios.post("http://localhost:3001/products", this.product);
        this.$router.push("/admin/products");
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
  },
};
</script>
