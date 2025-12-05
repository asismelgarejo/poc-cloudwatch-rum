<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-500 to-orange-500 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-bold text-white mb-8">Contact Us</h1>

      <div class="bg-white rounded-lg shadow-xl p-8 mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Send us a message</h2>

        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Name</label>
            <input v-model="form.name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Email</label>
            <input v-model="form.email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea v-model="form.message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required></textarea>
          </div>

          <button type="submit" class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            Send Message
          </button>
        </form>

        <div v-if="submitStatus" class="mt-4 p-4 rounded" :class="submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          {{ submitStatus.message }}
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-xl p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Navigation</h3>
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink to="/" class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            Home
          </NuxtLink>
          <NuxtLink to="/about" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            About
          </NuxtLink>
          <NuxtLink to="/products" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            Products
          </NuxtLink>
          <NuxtLink to="/dashboard" class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            Dashboard
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  message: ''
});

const submitStatus = ref<{ success: boolean; message: string } | null>(null);

const submitForm = async () => {
  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    });
    submitStatus.value = { success: true, message: 'Message sent successfully!' };
    form.value = { name: '', email: '', message: '' };
  } catch (error) {
    submitStatus.value = { success: false, message: 'Failed to send message. Please try again.' };
  }
};
</script>
