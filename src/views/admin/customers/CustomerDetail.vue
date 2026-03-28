<template>
  <div class="container mt-4">
    <h2>Chi tiết khách hàng</h2>
    <div v-if="customer" class="card">
      <div class="card-body">
        <h5 class="card-title">{{ customer.name }}</h5>
        <p class="card-text"><strong>Email:</strong> {{ customer.email }}</p>
        <p class="card-text">
          <strong>Số điện thoại:</strong> {{ customer.phone }}
        </p>
        <p class="card-text">
          <strong>Địa chỉ:</strong> {{ customer.address }}
        </p>
      </div>
    </div>
    <router-link to="/admin/customers" class="btn btn-secondary mt-3"
      >Quay lại</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CustomerDetail",
  data() {
    return {
      customer: null,
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
  },
};
</script>
