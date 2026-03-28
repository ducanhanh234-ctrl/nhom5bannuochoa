<template>
  <div class="container mt-4">
    <h2>Khách hàng đã xóa</h2>
    <router-link to="/admin/customers" class="btn btn-secondary mb-3"
      >Quay lại danh sách</router-link
    >
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
        <tr v-for="customer in deletedCustomers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.address }}</td>
          <td>
            <button
              @click="restore(customer.id)"
              class="btn btn-success btn-sm me-2"
            >
              Khôi phục
            </button>
            <button
              @click="hardDelete(customer.id)"
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
  name: "CustomerDeleted",
  data() {
    return {
      customers: [],
    };
  },
  computed: {
    deletedCustomers() {
      return this.customers.filter((customer) => customer.isDeleted);
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
    async restore(id) {
      try {
        await axios.patch(`http://localhost:3001/customers/${id}`, {
          isDeleted: false,
        });
        await this.fetchCustomers();
      } catch (error) {
        console.error("Error restoring customer:", error);
      }
    },
    async hardDelete(id) {
      if (confirm("Bạn có chắc muốn xóa vĩnh viễn khách hàng này?")) {
        try {
          await axios.delete(`http://localhost:3001/customers/${id}`);
          await this.fetchCustomers();
        } catch (error) {
          console.error("Error deleting customer:", error);
        }
      }
    },
  },
};
</script>
