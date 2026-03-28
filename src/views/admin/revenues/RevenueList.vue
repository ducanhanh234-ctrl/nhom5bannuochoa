<template>
  <div class="container mt-4">
    <h2>Quản lý doanh thu</h2>
    <div class="d-flex justify-content-between mb-3">
      <!-- <input
        v-model="searchQuery"
        type="text"
        class="form-control d-inline-block w-auto me-2"
        placeholder="Tìm kiếm doanh thu..."
      />
      <router-link to="/admin/revenues/add" class="btn btn-primary"
        >Thêm doanh thu</router-link
      > -->
    </div>
    <!-- <div class="mb-3">
      <router-link to="/admin/revenues/deleted" class="btn btn-secondary"
        >Xem doanh thu đã xóa</router-link
      >
    </div> -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Ngày/Tháng</th>
          <th>Số tiền/Doanh thu</th>
          <th>Mô tả/Đơn hàng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="revenue in filteredRevenues" :key="revenue.id">
          <td>{{ revenue.id }}</td>
          <td>{{ revenue.date || revenue.month }}</td>
          <td>{{ revenue.amount || revenue.totalRevenue }}</td>
          <td>
            {{
              revenue.description ||
              `Đơn hàng: ${revenue.totalOrders}, Khách: ${revenue.totalCustomers}`
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RevenueList",
  data() {
    return {
      revenues: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredRevenues() {
      return this.revenues.filter((revenue) => {
        const searchText = this.searchQuery.toLowerCase();
        const matchesSearch =
          (revenue.description &&
            revenue.description.toLowerCase().includes(searchText)) ||
          (revenue.month && revenue.month.includes(searchText)) ||
          (revenue.amount && revenue.amount.toString().includes(searchText)) ||
          (revenue.totalRevenue &&
            revenue.totalRevenue.toString().includes(searchText));
        return matchesSearch && !revenue.isDeleted;
      });
    },
  },
  async mounted() {
    await this.fetchRevenues();
  },
  methods: {
    async fetchRevenues() {
      try {
        const response = await axios.get("http://localhost:3001/revenues");
        this.revenues = response.data;
      } catch (error) {
        console.error("Error fetching revenues:", error);
      }
    },
    async softDelete(id) {
      if (confirm("Bạn có chắc muốn xóa doanh thu này?")) {
        try {
          await axios.patch(`http://localhost:3001/revenues/${id}`, {
            isDeleted: true,
          });
          await this.fetchRevenues();
        } catch (error) {
          console.error("Error deleting revenue:", error);
        }
      }
    },
  },
};
</script>
