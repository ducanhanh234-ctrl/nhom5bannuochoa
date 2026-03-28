<template>
  <div class="container mt-4">
    <h2>Chi tiết doanh thu</h2>
    <div v-if="revenue">
      <p><strong>ID:</strong> {{ revenue.id }}</p>
      <p v-if="revenue.date"><strong>Ngày:</strong> {{ revenue.date }}</p>
      <p v-if="revenue.month"><strong>Tháng:</strong> {{ revenue.month }}</p>
      <p v-if="revenue.amount">
        <strong>Số tiền:</strong> {{ revenue.amount }}
      </p>
      <p v-if="revenue.totalRevenue">
        <strong>Tổng doanh thu:</strong> {{ revenue.totalRevenue }}
      </p>
      <p v-if="revenue.description">
        <strong>Mô tả:</strong> {{ revenue.description }}
      </p>
      <p v-if="revenue.totalOrders">
        <strong>Tổng đơn hàng:</strong> {{ revenue.totalOrders }}
      </p>
      <p v-if="revenue.totalCustomers">
        <strong>Tổng khách hàng:</strong> {{ revenue.totalCustomers }}
      </p>
      <p>
        <strong>Trạng thái:</strong>
        {{ revenue.isDeleted ? "Đã xóa" : "Hoạt động" }}
      </p>
    </div>
    <router-link to="/admin/revenues" class="btn btn-secondary"
      >Quay lại</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RevenueDetail",
  data() {
    return {
      revenue: null,
    };
  },
  async mounted() {
    await this.fetchRevenue();
  },
  methods: {
    async fetchRevenue() {
      try {
        const response = await axios.get(
          `http://localhost:3001/revenues/${this.$route.params.id}`,
        );
        this.revenue = response.data;
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    },
  },
};
</script>
