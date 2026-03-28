<template>
  <div class="container mt-4">
    <h2>Sửa khách hàng</h2>
    <form v-if="customer" @submit.prevent="updateCustomer" class="row g-3">
      <div class="col-md-6">
        <label for="name" class="form-label">Tên khách hàng</label>
        <input
          v-model="customer.name"
          type="text"
          class="form-control"
          id="name"
          required
        />
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>
      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="customer.email"
          type="email"
          class="form-control"
          id="email"
          required
        />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>
      <div class="col-md-6">
        <label for="phone" class="form-label">Số điện thoại</label>
        <input
          v-model="customer.phone"
          type="tel"
          class="form-control"
          id="phone"
          required
        />
        <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
      </div>
      <div class="col-md-6">
        <label for="address" class="form-label">Địa chỉ</label>
        <input
          v-model="customer.address"
          type="text"
          class="form-control"
          id="address"
          required
        />
        <div v-if="errors.address" class="text-danger">
          {{ errors.address }}
        </div>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Cập nhật</button>
        <router-link to="/admin/customers" class="btn btn-secondary ms-2"
          >Hủy</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CustomerEdit",
  data() {
    return {
      customer: null,
      errors: {},
    };
  },
  async mounted() {
    await this.fetchCustomer();
  },
  methods: {
    async fetchCustomer() {
      try {
        const response = await axios.get(
          `http://localhost:3001/customers/${this.$route.params.id}`,
        );
        this.customer = response.data;
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    },
    validate() {
      this.errors = {};
      if (!this.customer.name.trim())
        this.errors.name = "Tên khách hàng là bắt buộc.";
      if (!this.customer.email.trim()) this.errors.email = "Email là bắt buộc.";
      if (!this.customer.phone.trim())
        this.errors.phone = "Số điện thoại là bắt buộc.";
      if (!this.customer.address.trim())
        this.errors.address = "Địa chỉ là bắt buộc.";
      return Object.keys(this.errors).length === 0;
    },
    async updateCustomer() {
      if (!this.validate()) {
        const errorMessages = Object.values(this.errors).join("\n");
        alert("Vui lòng sửa các lỗi sau:\n" + errorMessages);
        return;
      }
      try {
        await axios.put(
          `http://localhost:3001/customers/${this.customer.id}`,
          this.customer,
        );
        this.$router.push("/admin/customers");
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    },
  },
};
</script>
