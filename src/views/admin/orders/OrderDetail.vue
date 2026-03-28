<template>
  <div class="container mt-4">
    <h2>Chi tiết đơn hàng</h2>
    <div v-if="order" class="card">
      <div class="card-body">
        <h5 class="card-title">Đơn hàng #{{ order.id }}</h5>
        <p class="card-text">
          <strong>Khách hàng:</strong> {{ getCustomerName(order) }}
        </p>
        <p class="card-text">
          <strong>Ngày đặt:</strong>
          {{
            order.orderDate ||
            new Date(order.createdAt).toLocaleDateString("vi-VN")
          }}
        </p>
        <p class="card-text"><strong>Trạng thái:</strong> {{ order.status }}</p>
        <div class="mb-3">
          <label for="statusUpdate" class="form-label"
            ><strong>Cập nhật trạng thái:</strong></label
          >
          <div class="d-flex gap-2">
            <select
              id="statusUpdate"
              v-model="newStatus"
              class="form-select"
              style="width: auto"
            >
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
            </select>
            <button @click="updateOrderStatus" class="btn btn-primary btn-sm">
              Cập nhật
            </button>
          </div>
        </div>
        <p class="card-text">
          <strong>Tổng tiền:</strong>
          {{ (order.total || order.totalPrice).toLocaleString() }} VND
        </p>
        <h6>Sản phẩm:</h6>
        <ul>
          <li
            v-for="(item, index) in order.items"
            :key="item.productId || index"
          >
            {{ item.productId ? getProductName(item.productId) : item.name }} -
            Số lượng: {{ item.quantity }} - Giá:
            {{ item.price || item.price }} USD
          </li>
        </ul>
      </div>
    </div>
    <router-link to="/admin/orders" class="btn btn-secondary mt-3"
      >Quay lại</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderDetail",
  data() {
    return {
      order: null,
      customers: [],
      products: [],
      newStatus: "",
    };
  },
  async mounted() {
    await this.fetchOrder();
    await this.fetchCustomers();
    await this.fetchProducts();
  },
  watch: {
    order: {
      handler(newOrder) {
        if (newOrder && newOrder.status) {
          this.newStatus = newOrder.status;
        }
      },
      immediate: true,
    },
  },
  methods: {
    async fetchOrder() {
      try {
        const response = await axios.get(
          `http://localhost:3001/orders/${this.$route.params.id}`,
        );
        this.order = response.data;
      } catch (error) {
        console.error("Error fetching order:", error);
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
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3001/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    getCustomerName(order) {
      if (order.customerId) {
        const customer = this.customers.find((c) => c.id === order.customerId);
        return customer ? customer.name : "Unknown";
      } else if (order.customerName) {
        return order.customerName;
      }
      return "Unknown";
    },
    async updateOrderStatus() {
      try {
        await axios.patch(`http://localhost:3001/orders/${this.order.id}`, {
          status: this.newStatus,
        });
        this.order.status = this.newStatus;
        alert("Cập nhật trạng thái thành công!");
      } catch (error) {
        console.error("Error updating order status:", error);
        alert("Có lỗi xảy ra khi cập nhật trạng thái!");
      }
    },
    getProductName(productId) {
      const product = this.products.find((p) => p.id === productId);
      return product ? product.name : "Unknown";
    },
  },
};
</script>
