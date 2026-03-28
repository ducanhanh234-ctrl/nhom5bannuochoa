<template>
  <div>
    <h2>Thêm bài viết mới</h2>
    <form @submit.prevent="addPost">
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
      <button type="submit" class="btn btn-primary">Thêm</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({
  title: '',
  author: '',
  content: '',
  status: 'draft',
  createdAt: new Date().toISOString(),
  isDeleted: false,
});

const addPost = async () => {
  await axios.post('http://localhost:3001/posts', form.value);
  router.push('/admin/posts/list');
};
</script>
