<template>
  <div>
    <h2>Bài viết đã xóa</h2>
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
        <tr v-for="post in deletedPosts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.author }}</td>
          <td>
            <span :class="post.status === 'published' ? 'badge bg-success' : 'badge bg-warning'">
              {{ post.status === 'published' ? 'Xuất bản' : 'Nháp' }}
            </span>
          </td>
          <td>{{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}</td>
          <td>
            <button @click="restorePost(post.id)" class="btn btn-success btn-sm">Khôi phục</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const deletedPosts = ref([]);

const fetchDeletedPosts = async () => {
  const response = await axios.get('http://localhost:3001/posts');
  deletedPosts.value = response.data.filter(post => post.isDeleted);
};

const restorePost = async (id) => {
  await axios.patch(`http://localhost:3001/posts/${id}`, { isDeleted: false });
  fetchDeletedPosts();
};

onMounted(fetchDeletedPosts);
</script>
