<script>
import axios from "axios";

export default {
  name: "ClientCheckout",
  data() {
    return {
      cartItems: [],
      fullName: "",
      phone: "",
      email: "",
      address: "",
      paymentMethod: "cod",
    };
  },
  computed: {
    total() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0,
      );
    },
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cartItems = cart;
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    async submitOrder() {
      if (!this.fullName || !this.phone || !this.address) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      if (this.cartItems.length === 0) {
        alert("Giỏ hàng trống!");
        return;
      }

      try {
        const order = {
          customerName: this.fullName,
          phone: this.phone,
          email: this.email,
          address: this.address,
          paymentMethod: this.paymentMethod,
          items: this.cartItems,
          totalPrice: this.total,
          status: "Đang xử lý",
          createdAt: new Date().toISOString(),
        };

        const response = await axios.post(
          "http://localhost:3001/orders",
          order,
        );

        if (response.data) {
          alert("Đặt hàng thành công!");
          localStorage.removeItem("cart");
          this.$router.push("/");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Có lỗi xảy ra khi đặt hàng!");
      }
    },
  },
};
</script>

<template>
  <div class="container py-5">
    <h2 class="mb-4 text-center fw-bold">Thông Tin Đơn Hàng</h2>

    <div class="row">
      <div class="col-lg-8 mb-4">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white pb-0 border-0 mt-3">
            <h4 class="mb-0">Địa chỉ giao hàng</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitOrder">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="fullName" class="form-label">Họ và tên</label>
                  <input
                    v-model="fullName"
                    type="text"
                    class="form-control"
                    id="fullName"
                    placeholder="Nhập họ và tên người nhận"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="phone" class="form-label">Số điện thoại</label>
                  <input
                    v-model="phone"
                    type="tel"
                    class="form-control"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email (Tùy chọn)</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Nhập email để nhận hóa đơn"
                />
              </div>

              <div class="mb-3">
                <label for="address" class="form-label">Địa chỉ chi tiết</label>
                <textarea
                  v-model="address"
                  class="form-control"
                  id="address"
                  rows="3"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Phương thức thanh toán</label>
                <div class="form-check">
                  <input
                    v-model="paymentMethod"
                    class="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value="cod"
                  />
                  <label class="form-check-label" for="cod"
                    >Thanh toán khi nhận hàng (COD)</label
                  >
                </div>
                <div class="form-check">
                  <input
                    v-model="paymentMethod"
                    class="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="banking"
                    value="banking"
                  />
                  <label class="form-check-label" for="banking"
                    >Chuyển khoản ngân hàng</label
                  >
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-dark w-100 btn-lg rounded-pill mt-3"
              >
                Xác Nhận & Thanh Toán
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white pb-0 border-0 mt-3">
            <h4 class="mb-0">Giỏ hàng của bạn</h4>
          </div>
          <div class="card-body">
            <div v-if="cartItems.length === 0" class="alert alert-info">
              Giỏ hàng trống!
            </div>
            <div v-else>
              <ul class="list-group list-group-flush mb-3">
                <li
                  v-for="(item, index) in cartItems"
                  :key="index"
                  class="list-group-item d-flex justify-content-between align-items-center px-0"
                >
                  <div>
                    <h6 class="my-0">{{ item.name }}</h6>
                    <small class="text-muted"
                      >Số lượng: {{ item.quantity || 1 }}</small
                    >
                  </div>
                  <div class="text-end">
                    <span class="text-muted"
                      >{{ item.price * (item.quantity || 1) }} USD</span
                    >
                    <button
                      @click="removeItem(index)"
                      class="btn btn-sm btn-danger ms-2"
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              </ul>

              <div class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex justify-content-between px-0 mt-2"
                >
                  <span class="fw-bold h5 mb-0">Tổng cộng</span>
                  <strong class="text-danger h5 mb-0">{{ total }} USD</strong>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
