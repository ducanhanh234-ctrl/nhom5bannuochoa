<template>
  <div class="container mt-4">
    <h2>Doanh thu đã xóa</h2>
    <div class="mb-3">
      <router-link to="/admin/revenues" class="btn btn-secondary"
        >Quay lại danh sách</router-link
      >
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Ngày</th>
          <th>Số tiền</th>
          <th>Mô tả</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="revenue in deletedRevenues" :key="revenue.id">
          <td>{{ revenue.id }}</td>
          <td>{{ revenue.date }}</td>
          <td>{{ revenue.amount }}</td>
          <td>{{ revenue.description }}</td>
          <td>
            <button
              @click="restore(revenue.id)"
              class="btn btn-success btn-sm me-2"
            >
              Khôi phục
            </button>
            <button
              @click="hardDelete(revenue.id)"
              class="btn btn-danger btn-sm"
            >
              Xóa vĩnh viễn
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RevenueDeleted",
  data() {
    return {
      revenues: [],
    };
  },
  computed: {
    deletedRevenues() {
      return this.revenues.filter((revenue) => revenue.isDeleted);
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
    async restore(id) {
      if (confirm("Bạn có chắc muốn khôi phục doanh thu này?")) {
        try {
          await axios.patch(`http://localhost:3001/revenues/${id}`, {
            isDeleted: false,
          });
          await this.fetchRevenues();
        } catch (error) {
          console.error("Error restoring revenue:", error);
        }
      }
    },
    async hardDelete(id) {
      if (confirm("Bạn có chắc muốn xóa vĩnh viễn doanh thu này?")) {
        try {
          await axios.delete(`http://localhost:3001/revenues/${id}`);
          await this.fetchRevenues();
        } catch (error) {
          console.error("Error hard deleting revenue:", error);
        }
      }
    },
  },
};
</script>
