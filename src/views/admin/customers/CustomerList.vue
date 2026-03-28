<template>
  <div class="container mt-4">
    <h2>Quản lý khách hàng</h2>
    <div class="d-flex justify-content-between mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control d-inline-block w-auto me-2"
        placeholder="Tìm kiếm khách hàng..."
      />
      <router-link to="/admin/customers/add" class="btn btn-primary"
        >Thêm khách hàng</router-link
      >
    </div>
    <div class="mb-3">
      <router-link to="/admin/customers/deleted" class="btn btn-secondary"
        >Xem khách hàng đã xóa</router-link
      >
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in filteredCustomers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.address }}</td>
          <td>
            <router-link
              :to="`/admin/customers/detail/${customer.id}`"
              class="btn btn-info btn-sm me-2"
              >Chi tiết</router-link
            >
            <router-link
              :to="`/admin/customers/edit/${customer.id}`"
              class="btn btn-warning btn-sm me-2"
              >Sửa</router-link
            >
            <button
              @click="softDelete(customer.id)"
              class="btn btn-danger btn-sm me-2"
            >
              Xóa
            </button>
            <button
              v-if="isAdmin"
              @click="promoteToEmployee(customer)"
              class="btn btn-success btn-sm"
            >
              Thăng nhân viên
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
  name: "CustomerList",
  data() {
    return {
      customers: [],
      searchQuery: "",
    };
  },
  computed: {
    isAdmin() {
      const userRaw = localStorage.getItem("auth_user");
      if (!userRaw) return false;
      const user = JSON.parse(userRaw);
      return user.role === "admin";
    },
    filteredCustomers() {
      return this.customers.filter((customer) => {
        const matchesSearch =
          customer.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesSearch && !customer.isDeleted;
      });
    },
  },
  async mounted() {
    await this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get("http://localhost:3001/customers");
        this.customers = response.data;
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    },
    async softDelete(id) {
      if (confirm("Bạn có chắc muốn xóa khách hàng này?")) {
        try {
          await axios.patch(`http://localhost:3001/customers/${id}`, {
            isDeleted: true,
          });
          await this.fetchCustomers();
        } catch (error) {
          console.error("Error deleting customer:", error);
        }
      }
    },
    async promoteToEmployee(customer) {
      if (!this.isAdmin) return;
      if (!confirm(`Chuyển ${customer.name} thành nhân viên?`)) return;
      try {
        await axios.post("http://localhost:3001/employees", {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          position: "Nhân viên bán hàng",
          salary: 8000000,
          isDeleted: false,
        });

        const res = await axios.get("http://localhost:3001/users", {
          params: { email: customer.email },
        });
        if (res.data.length > 0) {
          const user = res.data[0];
          await axios.patch(`http://localhost:3001/users/${user.id}`, {
            role: "employee",
          });
        }

        await axios.patch(`http://localhost:3001/customers/${customer.id}`, {
          isDeleted: true,
        });

        await this.fetchCustomers();
        alert("Chuyển sang nhân viên thành công.");
      } catch (error) {
        console.error("Error promoting customer:", error);
        alert("Thao tác không thành công.");
      }
    },
  },
};
</script>
