<template>
  <div class="container mt-4">
    <h2>Sửa sản phẩm</h2>
    <form v-if="product" @submit.prevent="updateProduct" class="row g-3">
      <div class="col-md-6">
        <label for="name" class="form-label">Tên sản phẩm</label>
        <input v-model="product.name" type="text" class="form-control" id="name" >
      </div>
      <div class="col-md-6">
        <label for="brand" class="form-label">Thương hiệu</label>
        <input v-model="product.brand" type="text" class="form-control" id="brand" >
      </div>
      <div class="col-md-6">
        <label for="price" class="form-label">Giá</label>
        <input v-model.number="product.price" type="number" class="form-control" id="price"  min="0">
      </div>
      <div class="col-md-6">
        <label for="category" class="form-label">Danh mục</label>
        <select v-model="product.categoryId" class="form-select" id="category" >
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
        <textarea v-model="product.description" class="form-control" id="description" rows="3" ></textarea>
      </div>
      <div class="col-12">
        <label for="image" class="form-label">URL hình ảnh</label>
        <input v-model="product.image" type="url" class="form-control" id="image" >
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Cập nhật</button>
        <router-link to="/admin/products" class="btn btn-secondary ms-2">Hủy</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductEdit',
  data() {
    return {
      product: null,
      categories: [],
      errors: {}
    };
  },
  async mounted() {
    await this.fetchProduct();
    await this.fetchCategories();
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:3001/products/${this.$route.params.id}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
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
    validate() {
      this.errors = {};
      if (!this.product.name.trim()) this.errors.name = 'Tên sản phẩm là bắt buộc.';
      if (!this.product.brand.trim()) this.errors.brand = 'Thương hiệu là bắt buộc.';
      if (this.product.price <= 0) this.errors.price = 'Giá phải lớn hơn 0.';
      if (!this.product.categoryId) this.errors.category = 'Danh mục là bắt buộc.';
      if (!this.product.description.trim()) this.errors.description = 'Mô tả là bắt buộc.';
      if (!this.product.image.trim()) this.errors.image = 'URL hình ảnh là bắt buộc.';
      return Object.keys(this.errors).length === 0;
    },
    async updateProduct() {
      if (!this.validate()) {
        const errorMessages = Object.values(this.errors).join('\n');
        alert('Vui lòng sửa các lỗi sau:\n' + errorMessages);
        return;
      }
      try {
        await axios.put(`http://localhost:3001/products/${this.product.id}`, this.product);
        this.$router.push('/admin/products');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  }
};
</script>
