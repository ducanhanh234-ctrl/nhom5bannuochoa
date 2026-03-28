<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

const stats = reactive({
  totalPosts: 0,
  publishedPosts: 0,
  draftPosts: 0,
  recentPosts: [],
});

const fetchStats = async () => {
  try {
    const response = await axios.get("http://localhost:3001/posts");
    const posts = response.data.filter((post) => !post.isDeleted);

    stats.totalPosts = posts.length;
    stats.publishedPosts = posts.filter(
      (post) => post.status === "published",
    ).length;
    stats.draftPosts = posts.filter((post) => post.status === "draft").length;

    // Lấy 5 bài viết gần nhất
    stats.recentPosts = posts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  } catch (error) {
    console.error("Error fetching posts stats:", error);
  }
};

onMounted(() => {
  fetchStats();
});
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Quản lý bài viết</h2>
      <router-link to="/admin/posts/add" class="btn btn-primary">
        <i class="fas fa-plus me-2"></i>Thêm bài viết mới
      </router-link>
    </div>

    <!-- Thống kê -->
    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="card stat-card p-3">
          <div class="d-flex align-items-center">
            <div class="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
              <i class="fas fa-newspaper text-primary"></i>
            </div>
            <div>
              <p class="text-muted small mb-0">Tổng bài viết</p>
              <h5 class="fw-bold mb-0">{{ stats.totalPosts }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card p-3">
          <div class="d-flex align-items-center">
            <div class="bg-success bg-opacity-10 p-3 rounded-circle me-3">
              <i class="fas fa-check-circle text-success"></i>
            </div>
            <div>
              <p class="text-muted small mb-0">Đã xuất bản</p>
              <h5 class="fw-bold mb-0">{{ stats.publishedPosts }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card p-3">
          <div class="d-flex align-items-center">
            <div class="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
              <i class="fas fa-edit text-warning"></i>
            </div>
            <div>
              <p class="text-muted small mb-0">Bản nháp</p>
              <h5 class="fw-bold mb-0">{{ stats.draftPosts }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card p-3">
          <div class="d-flex align-items-center">
            <div class="bg-info bg-opacity-10 p-3 rounded-circle me-3">
              <i class="fas fa-clock text-info"></i>
            </div>
            <div>
              <p class="text-muted small mb-0">Bài viết gần đây</p>
              <h5 class="fw-bold mb-0">{{ stats.recentPosts.length }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bài viết gần đây -->
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Bài viết gần đây</h5>
          </div>
          <div class="card-body">
            <div v-if="stats.recentPosts.length === 0" class="text-center py-4">
              <i class="fas fa-newspaper fa-3x text-muted mb-3"></i>
              <p class="text-muted">Chưa có bài viết nào</p>
              <router-link to="/admin/posts/add" class="btn btn-primary">
                Tạo bài viết đầu tiên
              </router-link>
            </div>
            <div v-else class="list-group list-group-flush">
              <div
                v-for="post in stats.recentPosts"
                :key="post.id"
                class="list-group-item px-0"
              >
                <div class="d-flex justify-content-between align-items-start">
                  <div class="flex-grow-1">
                    <h6 class="mb-1">
                      <router-link
                        :to="`/admin/posts/detail/${post.id}`"
                        class="text-decoration-none"
                      >
                        {{ post.title }}
                      </router-link>
                    </h6>
                    <p class="text-muted small mb-1">
                      Bởi {{ post.author }} •
                      {{ new Date(post.createdAt).toLocaleDateString("vi-VN") }}
                    </p>
                    <p class="text-muted small mb-0">
                      {{ post.content.substring(0, 100) }}...
                    </p>
                  </div>
                  <div class="ms-3">
                    <span
                      :class="
                        post.status === 'published'
                          ? 'badge bg-success'
                          : 'badge bg-warning'
                      "
                    >
                      {{ post.status === "published" ? "Xuất bản" : "Nháp" }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Hành động nhanh</h5>
          </div>
          <div class="card-body">
            <div class="d-grid gap-2">
              <router-link to="/admin/posts/add" class="btn btn-primary">
                <i class="fas fa-plus me-2"></i>Thêm bài viết mới
              </router-link>
              <router-link
                to="/admin/posts/list"
                class="btn btn-outline-primary"
              >
                <i class="fas fa-list me-2"></i>Xem tất cả bài viết
              </router-link>
              <router-link
                to="/admin/posts/deleted"
                class="btn btn-outline-secondary"
              >
                <i class="fas fa-trash me-2"></i>Bài viết đã xóa
              </router-link>
            </div>
          </div>
        </div>

        <!-- Thống kê trạng thái -->
        <div class="card mt-3">
          <div class="card-header">
            <h6 class="mb-0">Trạng thái bài viết</h6>
          </div>
          <div class="card-body">
            <div class="mb-2">
              <div class="d-flex justify-content-between">
                <span>Đã xuất bản</span>
                <span class="fw-bold">{{ stats.publishedPosts }}</span>
              </div>
              <div class="progress" style="height: 8px">
                <div
                  class="progress-bar bg-success"
                  :style="{
                    width:
                      stats.totalPosts > 0
                        ? (stats.publishedPosts / stats.totalPosts) * 100 + '%'
                        : '0%',
                  }"
                ></div>
              </div>
            </div>
            <div>
              <div class="d-flex justify-content-between">
                <span>Bản nháp</span>
                <span class="fw-bold">{{ stats.draftPosts }}</span>
              </div>
              <div class="progress" style="height: 8px">
                <div
                  class="progress-bar bg-warning"
                  :style="{
                    width:
                      stats.totalPosts > 0
                        ? (stats.draftPosts / stats.totalPosts) * 100 + '%'
                        : '0%',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.list-group-item {
  border: none;
  border-bottom: 1px solid #f0f0f0;
}

.list-group-item:last-child {
  border-bottom: none;
}
</style>
