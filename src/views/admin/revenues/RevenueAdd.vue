<template>
  <div class="container mt-4">
    <h2>Thêm doanh thu mới</h2>
    <form @submit.prevent="addRevenue">
      <div class="mb-3">
        <label for="date" class="form-label">Ngày</label>
        <input
          v-model="revenue.date"
          type="date"
          class="form-control"
          id="date"
          required
        />
      </div>
      <div class="mb-3">
        <label for="amount" class="form-label">Số tiền</label>
        <input
          v-model="revenue.amount"
          type="number"
          class="form-control"
          id="amount"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Mô tả</label>
        <textarea
          v-model="revenue.description"
          class="form-control"
          id="description"
          rows="3"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Thêm doanh thu</button>
      <router-link to="/admin/revenues" class="btn btn-secondary ms-2"
        >Hủy</router-link
      >
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RevenueAdd",
  data() {
    return {
      revenue: {
        date: "",
        amount: 0,
        description: "",
        isDeleted: false,
      },
    };
  },
  methods: {
    async addRevenue() {
      if (!this.revenue.date || this.revenue.amount <= 0) {
        alert("Ngày và số tiền phải hợp lệ");
        return;
      }
      try {
        await axios.post("http://localhost:3001/revenues", this.revenue);
        this.$router.push("/admin/revenues");
      } catch (error) {
        console.error("Error adding revenue:", error);
        alert("Có lỗi xảy ra khi thêm doanh thu");
      }
    },
  },
};
</script>
