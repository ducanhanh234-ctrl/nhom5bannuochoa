<script setup>
import { ref, reactive, onMounted } from "vue";
</script>

<template>
  <div>
    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="card stat-card p-3">
          <div class="d-flex align-items-center">
            <div class="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
              <i class="fas fa-dollar-sign text-primary"></i>
            </div>
            <div>
              <p class="text-muted small mb-0">Doanh thu tháng</p>
              <h5 class="fw-bold mb-0">125.4M</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card p-3">
          <div class="d-flex align-items-center">
            <div class="bg-success bg-opacity-10 p-3 rounded-circle me-3">
              <i class="fas fa-shopping-bag text-success"></i>
            </div>
            <div>
              <p class="text-muted small mb-0">Đơn hàng mới</p>
              <h5 class="fw-bold mb-0">48</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card p-3">
          <div class="d-flex align-items-center">
            <div class="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
              <i class="fas fa-star text-warning"></i>
            </div>
            <div>
              <p class="text-muted small mb-0">Đánh giá 5 sao</p>
              <h5 class="fw-bold mb-0">120</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card p-3">
          <div class="d-flex align-items-center">
            <div class="bg-danger bg-opacity-10 p-3 rounded-circle me-3">
              <i class="fas fa-exclamation-triangle text-danger"></i>
            </div>
            <div>
              <p class="text-muted small mb-0">Hết hàng</p>
              <h5 class="fw-bold mb-0">05</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-container">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">Đơn hàng gần đây</h5>
        <button class="btn btn-dark btn-sm">Xem tất cả</button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ORD-8821</td>
              <td>Nguyễn Văn A</td>
              <td>Bleu de Chanel</td>
              <td>12/03/2026</td>
              <td><span class="badge bg-success">Đã giao</span></td>
              <td>3.450.000đ</td>
              <td>
                <button class="btn btn-light btn-sm">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>#ORD-8822</td>
              <td>Trần Thị B</td>
              <td>Miss Dior 50ml</td>
              <td>13/03/2026</td>
              <td>
                <span class="badge bg-warning text-dark">Chờ xử lý</span>
              </td>
              <td>2.900.000đ</td>
              <td>
                <button class="btn btn-light btn-sm">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>#ORD-8823</td>
              <td>Lê Văn C</td>
              <td>Santal 33</td>
              <td>13/03/2026</td>
              <td><span class="badge bg-info">Đang giao</span></td>
              <td>5.200.000đ</td>
              <td>
                <button class="btn btn-light btn-sm">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.table-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
