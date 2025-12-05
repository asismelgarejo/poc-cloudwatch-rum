<template>
  <div class="min-h-screen bg-gradient-to-br from-green-500 to-teal-500 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-bold text-white mb-8">Products</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-xl p-6">
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Game of the Year 2024</h3>
          <p class="text-gray-600 mb-4">The ultimate gaming experience awaits!</p>
          <button @click="loadProduct(1)" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition">
            Load Details
          </button>
        </div>

        <div class="bg-white rounded-lg shadow-xl p-6">
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Epic Adventure DLC</h3>
          <p class="text-gray-600 mb-4">Expand your journey with new content!</p>
          <button @click="loadProduct(2)" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition">
            Load Details
          </button>
        </div>

        <div class="bg-white rounded-lg shadow-xl p-6">
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Multiplayer Season Pass</h3>
          <p class="text-gray-600 mb-4">Join the competitive scene!</p>
          <button @click="loadProduct(3)" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition">
            Load Details
          </button>
        </div>

        <div class="bg-white rounded-lg shadow-xl p-6">
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Collector's Edition</h3>
          <p class="text-gray-600 mb-4">Premium content for true fans!</p>
          <button @click="loadProduct(4)" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition">
            Load Details
          </button>
        </div>
      </div>

      <div v-if="productData" class="bg-white rounded-lg shadow-xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
        <pre class="bg-gray-100 p-4 rounded">{{ productData }}</pre>
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
          <NuxtLink to="/contact" class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            Contact
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
const productData = ref(null);

const loadProduct = async (id: number) => {
  try {
    const data = await $fetch(`/api/products/${id}`);
    productData.value = data;
  } catch (error) {
    console.error('Failed to load product:', error);
  }
};
</script>
