<template>
  <div class="container mt-4">
    <h2>Thêm nhân viên mới</h2>
    <form @submit.prevent="addEmployee" class="row g-3">
      <div class="col-md-6">
        <label for="name" class="form-label">Tên nhân viên</label>
        <input
          v-model="employee.name"
          type="text"
          class="form-control"
          id="name"
          required
        />
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>
      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="employee.email"
          type="email"
          class="form-control"
          id="email"
          required
        />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>
      <div class="col-md-6">
        <label for="phone" class="form-label">Số điện thoại</label>
        <input
          v-model="employee.phone"
          type="tel"
          class="form-control"
          id="phone"
          required
        />
        <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
      </div>
      <div class="col-md-6">
        <label for="position" class="form-label">Vị trí</label>
        <select
          v-model="employee.position"
          class="form-select"
          id="position"
          required
        >
          <option value="">Chọn vị trí</option>
          <option value="Quản lý">Quản lý</option>
          <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
          <option value="Nhân viên kho">Nhân viên kho</option>
        </select>
        <div v-if="errors.position" class="text-danger">
          {{ errors.position }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="salary" class="form-label">Lương</label>
        <input
          v-model.number="employee.salary"
          type="number"
          class="form-control"
          id="salary"
          required
          min="0"
        />
        <div v-if="errors.salary" class="text-danger">{{ errors.salary }}</div>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Thêm nhân viên</button>
        <router-link to="/admin/employees" class="btn btn-secondary ms-2"
          >Hủy</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmployeeAdd",
  data() {
    return {
      employee: {
        name: "",
        email: "",
        phone: "",
        position: "",
        salary: 0,
        isDeleted: false,
      },
      errors: {},
    };
  },
  methods: {
    validate() {
      this.errors = {};
      if (!this.employee.name.trim())
        this.errors.name = "Tên nhân viên là bắt buộc.";
      if (!this.employee.email.trim()) this.errors.email = "Email là bắt buộc.";
      if (!this.employee.phone.trim())
        this.errors.phone = "Số điện thoại là bắt buộc.";
      if (!this.employee.position) this.errors.position = "Vị trí là bắt buộc.";
      if (this.employee.salary <= 0)
        this.errors.salary = "Lương phải lớn hơn 0.";
      return Object.keys(this.errors).length === 0;
    },
    async addEmployee() {
      if (!this.validate()) {
        const errorMessages = Object.values(this.errors).join("\n");
        alert("Vui lòng sửa các lỗi sau:\n" + errorMessages);
        return;
      }
      try {
        await axios.post("http://localhost:3001/employees", this.employee);
        this.$router.push("/admin/employees");
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    },
  },
};
</script>
