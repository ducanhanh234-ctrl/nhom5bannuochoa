<template>
  <div class="container mt-4">
    <h2>Chi tiết nhân viên</h2>
    <div v-if="employee" class="card">
      <div class="card-body">
        <h5 class="card-title">{{ employee.name }}</h5>
        <p class="card-text"><strong>Email:</strong> {{ employee.email }}</p>
        <p class="card-text">
          <strong>Số điện thoại:</strong> {{ employee.phone }}
        </p>
        <p class="card-text">
          <strong>Vị trí:</strong> {{ employee.position }}
        </p>
        <p class="card-text">
          <strong>Lương:</strong> {{ employee.salary.toLocaleString() }} VND
        </p>
      </div>
    </div>
    <router-link to="/admin/employees" class="btn btn-secondary mt-3"
      >Quay lại</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmployeeDetail",
  data() {
    return {
      employee: null,
    };
  },
  async mounted() {
    await this.fetchEmployee();
  },
  methods: {
    async fetchEmployee() {
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/${this.$route.params.id}`,
        );
        this.employee = response.data;
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    },
  },
};
</script>
