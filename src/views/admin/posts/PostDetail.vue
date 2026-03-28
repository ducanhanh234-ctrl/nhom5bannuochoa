<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p><strong>Tác giả:</strong> {{ post.author }}</p>
    <p><strong>Trạng thái:</strong> {{ post.status === 'published' ? 'Xuất bản' : 'Nháp' }}</p>
    <p><strong>Ngày tạo:</strong> {{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}</p>
    <div class="mb-3">
      <strong>Nội dung:</strong>
      <div class="border p-2 mt-2">{{ post.content }}</div>
    </div>
    <router-link :to="`/admin/posts/edit/${post.id}`" class="btn btn-warning me-2">Sửa</router-link>
    <router-link to="/admin/posts/list" class="btn btn-secondary">Quay lại danh sách</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);

const fetchPost = async () => {
  const response = await axios.get(`http://localhost:3001/posts/${route.params.id}`);
  post.value = response.data;
};

onMounted(fetchPost);
</script>
