<template>
  <div>
    <h2>Sửa bài viết</h2>
    <form v-if="form" @submit.prevent="updatePost">
      <div class="mb-3">
        <label class="form-label">Tiêu đề</label>
        <input v-model="form.title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Tác giả</label>
        <input v-model="form.author" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Nội dung</label>
        <textarea v-model="form.content" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Trạng thái</label>
        <select v-model="form.status" class="form-select">
          <option value="published">Xuất bản</option>
          <option value="draft">Nháp</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Cập nhật</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const form = ref(null);

const fetchPost = async () => {
  const response = await axios.get(`http://localhost:3001/posts/${route.params.id}`);
  form.value = response.data;
};

const updatePost = async () => {
  await axios.put(`http://localhost:3001/posts/${route.params.id}`, form.value);
  router.push('/admin/posts/list');
};

onMounted(fetchPost);
</script>
