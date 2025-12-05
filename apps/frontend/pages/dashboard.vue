<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-5xl font-bold text-white mb-8">Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-xl p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">Total Users</h3>
          <p class="text-4xl font-bold text-indigo-600">{{ stats.users }}</p>
          <button @click="refreshStats" class="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded transition">
            Refresh
          </button>
        </div>

        <div class="bg-white rounded-lg shadow-xl p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">Page Views</h3>
          <p class="text-4xl font-bold text-green-600">{{ stats.pageViews }}</p>
          <button @click="refreshStats" class="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition">
            Refresh
          </button>
        </div>

        <div class="bg-white rounded-lg shadow-xl p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">Active Sessions</h3>
          <p class="text-4xl font-bold text-purple-600">{{ stats.sessions }}</p>
          <button @click="refreshStats" class="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition">
            Refresh
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Performance Tests</h2>
        <div class="grid grid-cols-2 gap-4">
          <button @click="heavyComputation" class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            Heavy Computation
          </button>
          <button @click="memoryIntensive" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            Memory Intensive
          </button>
          <button @click="multipleAPICalls" class="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            Multiple API Calls
          </button>
          <button @click="slowRender" class="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            Slow Render
          </button>
        </div>
        <div v-if="testResult" class="mt-4 p-4 bg-blue-100 text-blue-800 rounded">
          {{ testResult }}
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
          <NuxtLink to="/contact" class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            Contact
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = ref({
  users: 1234,
  pageViews: 5678,
  sessions: 89
});

const testResult = ref('');

const refreshStats = async () => {
  try {
    const data = await $fetch('/api/stats');
    stats.value = data as any;
    testResult.value = 'Stats refreshed successfully!';
  } catch (error) {
    testResult.value = 'Failed to refresh stats';
  }
};

const heavyComputation = () => {
  testResult.value = 'Running heavy computation...';
  const start = Date.now();
  let result = 0;
  for (let i = 0; i < 10000000; i++) {
    result += Math.sqrt(i);
  }
  const duration = Date.now() - start;
  testResult.value = `Heavy computation completed in ${duration}ms`;
};

const memoryIntensive = () => {
  testResult.value = 'Creating large arrays...';
  const arrays = [];
  for (let i = 0; i < 100; i++) {
    arrays.push(new Array(100000).fill(Math.random()));
  }
  testResult.value = `Created ${arrays.length} large arrays`;
};

const multipleAPICalls = async () => {
  testResult.value = 'Making multiple API calls...';
  const start = Date.now();
  await Promise.all([
    $fetch('/api/stats'),
    $fetch('/api/products/1'),
    $fetch('/api/products/2'),
    $fetch('/api/test/success'),
    $fetch('/api/test/slow')
  ]);
  const duration = Date.now() - start;
  testResult.value = `All API calls completed in ${duration}ms`;
};

const slowRender = () => {
  testResult.value = 'Rendering many elements...';
  // Force a slow render by creating many DOM operations
  const container = document.createElement('div');
  for (let i = 0; i < 1000; i++) {
    const el = document.createElement('div');
    el.textContent = `Element ${i}`;
    container.appendChild(el);
  }
  testResult.value = 'Slow render completed';
};
</script>
