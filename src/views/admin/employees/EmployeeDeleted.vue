<template>
  <div class="container mt-4">
    <h2>Nhân viên đã xóa</h2>
    <router-link to="/admin/employees" class="btn btn-secondary mb-3"
      >Quay lại danh sách</router-link
    >
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Vị trí</th>
          <th>Lương</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in deletedEmployees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.phone }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.salary.toLocaleString() }} VND</td>
          <td>
            <button
              @click="restore(employee.id)"
              class="btn btn-success btn-sm me-2"
            >
              Khôi phục
            </button>
            <button
              @click="hardDelete(employee.id)"
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
  name: "EmployeeDeleted",
  data() {
    return {
      employees: [],
    };
  },
  computed: {
    deletedEmployees() {
      return this.employees.filter((employee) => employee.isDeleted);
    },
  },
  async mounted() {
    await this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get("http://localhost:3001/employees");
        this.employees = response.data;
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
    async restore(id) {
      try {
        await axios.patch(`http://localhost:3001/employees/${id}`, {
          isDeleted: false,
        });
        await this.fetchEmployees();
      } catch (error) {
        console.error("Error restoring employee:", error);
      }
    },
    async hardDelete(id) {
      if (confirm("Bạn có chắc muốn xóa vĩnh viễn nhân viên này?")) {
        try {
          await axios.delete(`http://localhost:3001/employees/${id}`);
          await this.fetchEmployees();
        } catch (error) {
          console.error("Error deleting employee:", error);
        }
      }
    },
  },
};
</script>
