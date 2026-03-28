<template>
  <div class="container mt-4">
    <h2>Quản lý nhân viên</h2>
    <div class="d-flex justify-content-between mb-3">
      <div>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control d-inline-block w-auto me-2"
          placeholder="Tìm kiếm nhân viên..."
        />
        <select
          v-model="filterPosition"
          class="form-select d-inline-block w-auto"
        >
          <option value="">Tất cả vị trí</option>
          <option value="Quản lý">Quản lý</option>
          <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
          <option value="Nhân viên kho">Nhân viên kho</option>
        </select>
      </div>
      <router-link to="/admin/employees/add" class="btn btn-primary"
        >Thêm nhân viên</router-link
      >
    </div>
    <div class="mb-3">
      <router-link to="/admin/employees/deleted" class="btn btn-secondary"
        >Xem nhân viên đã xóa</router-link
      >
    </div>
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
        <tr v-for="employee in filteredEmployees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.phone }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.salary.toLocaleString() }} VND</td>
          <td>
            <router-link
              :to="`/admin/employees/detail/${employee.id}`"
              class="btn btn-info btn-sm me-2"
              >Chi tiết</router-link
            >
            <router-link
              :to="`/admin/employees/edit/${employee.id}`"
              class="btn btn-warning btn-sm me-2"
              >Sửa</router-link
            >
            <button
              @click="softDelete(employee.id)"
              class="btn btn-danger btn-sm me-2"
            >
              Xóa
            </button>
            <button
              v-if="isAdmin"
              @click="demoteToCustomer(employee)"
              class="btn btn-secondary btn-sm"
            >
              Hạ thành khách
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
  name: "EmployeeList",
  data() {
    return {
      employees: [],
      searchQuery: "",
      filterPosition: "",
    };
  },
  computed: {
    isAdmin() {
      const userRaw = localStorage.getItem("auth_user");
      if (!userRaw) return false;
      const user = JSON.parse(userRaw);
      return user.role === "admin";
    },
    filteredEmployees() {
      return this.employees.filter((employee) => {
        const matchesSearch =
          employee.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          employee.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesPosition =
          !this.filterPosition || employee.position === this.filterPosition;
        return matchesSearch && matchesPosition && !employee.isDeleted;
      });
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
    async softDelete(id) {
      if (confirm("Bạn có chắc muốn xóa nhân viên này?")) {
        try {
          await axios.patch(`http://localhost:3001/employees/${id}`, {
            isDeleted: true,
          });
          await this.fetchEmployees();
        } catch (error) {
          console.error("Error deleting employee:", error);
        }
      }
    },
    async demoteToCustomer(employee) {
      if (!this.isAdmin) return;
      if (!confirm(`Hạ ${employee.name} thành khách hàng?`)) return;
      try {
        await axios.post("http://localhost:3001/customers", {
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          address: "",
          isDeleted: false,
        });

        const res = await axios.get("http://localhost:3001/users", {
          params: { email: employee.email },
        });
        if (res.data.length > 0) {
          const user = res.data[0];
          await axios.patch(`http://localhost:3001/users/${user.id}`, {
            role: "customer",
          });
        }

        await axios.patch(`http://localhost:3001/employees/${employee.id}`, {
          isDeleted: true,
        });

        await this.fetchEmployees();
        alert("Hạ quyền thành công.");
      } catch (error) {
        console.error("Error demoting employee:", error);
        alert("Thao tác không thành công.");
      }
    },
  },
};
</script>
