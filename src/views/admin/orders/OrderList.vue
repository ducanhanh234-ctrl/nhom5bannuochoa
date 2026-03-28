<template>
  <div class="container mt-4">
    <h2>Quản lý đơn hàng</h2>
    <div class="d-flex justify-content-between mb-3">
      <div>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control d-inline-block w-auto me-2"
          placeholder="Tìm kiếm đơn hàng..."
        />
        <select
          v-model="filterStatus"
          class="form-select d-inline-block w-auto"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Đã giao">Đã giao</option>
        </select>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Khách hàng</th>
          <th>Ngày đặt</th>
          <th>Trạng thái</th>
          <th>Tổng tiền</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ getCustomerName(order) }}</td>
          <td>
            {{
              order.orderDate ||
              new Date(order.createdAt).toLocaleDateString("vi-VN")
            }}
          </td>
          <td>
            <select
              :value="order.status || 'N/A'"
              @change="updateOrderStatus(order.id, $event.target.value)"
              class="form-select form-select-sm"
              style="width: auto; min-width: 120px"
            >
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
            </select>
          </td>
          <td>
            {{ (order.total || order.totalPrice || 0).toLocaleString() }} VND
          </td>
          <td>
            <router-link
              :to="`/admin/orders/detail/${order.id}`"
              class="btn btn-info btn-sm"
              >Chi tiết</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderList",
  data() {
    return {
      orders: [],
      customers: [],
      searchQuery: "",
      filterStatus: "",
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter((order) => {
        if (!order || !order.id) return false;
        const customerName = this.getCustomerName(order);
        const matchesSearch =
          customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (order.id && order.id.toString().includes(this.searchQuery));
        const matchesStatus =
          !this.filterStatus ||
          (order.status && order.status === this.filterStatus);
        return (
          matchesSearch &&
          matchesStatus &&
          (order.isDeleted === false || order.isDeleted === undefined)
        );
      });
    },
  },
  async mounted() {
    await this.fetchOrders();
    await this.fetchCustomers();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get("http://localhost:3001/orders");
        console.log("Orders fetched:", response.data);
        this.orders = response.data.filter(
          (order) => order && typeof order === "object",
        ); // Filter out undefined/null/invalid orders
        console.log("Orders after filter:", this.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    async fetchCustomers() {
      try {
        const response = await axios.get("http://localhost:3001/customers");
        this.customers = response.data;
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    },
    getCustomerName(order) {
      if (!order) return "Unknown";
      if (order.customerId) {
        const customer = this.customers.find((c) => c.id === order.customerId);
        return customer ? customer.name : "Unknown";
      } else if (order.customerName) {
        return order.customerName;
      }
      return "Unknown";
    },
    async updateOrderStatus(orderId, newStatus) {
      try {
        await axios.patch(`http://localhost:3001/orders/${orderId}`, {
          status: newStatus,
        });
        // Update local data
        const order = this.orders.find((o) => o.id === orderId);
        if (order) {
          order.status = newStatus;
        }
        alert("Cập nhật trạng thái thành công!");
      } catch (error) {
        console.error("Error updating order status:", error);
        alert("Có lỗi xảy ra khi cập nhật trạng thái!");
      }
    },
  },
};
</script>
