<template>
  <div>
    <h2>Danh sách bài viết</h2>
    <router-link to="/admin/posts/add" class="btn btn-primary mb-3">Thêm bài viết mới</router-link>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Tác giả</th>
          <th>Trạng thái</th>
          <th>Ngày tạo</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.author }}</td>
          <td>
            <span :class="post.status === 'published' ? 'badge bg-success' : 'badge bg-warning'">
              {{ post.status === 'published' ? 'Xuất bản' : 'Nháp' }}
            </span>
          </td>
          <td>{{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}</td>
          <td>
            <router-link :to="`/admin/posts/detail/${post.id}`" class="btn btn-info btn-sm me-1">Chi tiết</router-link>
            <router-link :to="`/admin/posts/edit/${post.id}`" class="btn btn-warning btn-sm me-1">Sửa</router-link>
            <button @click="deletePost(post.id)" class="btn btn-danger btn-sm">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]);

const fetchPosts = async () => {
  const response = await axios.get('http://localhost:3001/posts');
  posts.value = response.data.filter(post => !post.isDeleted);
};

const deletePost = async (id) => {
  if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
    await axios.patch(`http://localhost:3001/posts/${id}`, { isDeleted: true });
    fetchPosts();
  }
};

onMounted(fetchPosts);
</script>
