<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-500 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-bold text-white mb-8">About Us</h1>

      <div class="bg-white rounded-lg shadow-xl p-8 mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Welcome to GOTY Games</h2>
        <p class="text-gray-600 mb-4 text-lg">
          This is a test application to demonstrate AWS Real User Monitoring (RUM) capabilities.
          Navigate through different pages to see how RUM tracks user interactions, page loads,
          and performance metrics.
        </p>
        <p class="text-gray-600 text-lg">
          AWS RUM helps you understand how real users experience your web application by collecting
          client-side data including page load times, JavaScript errors, and HTTP requests.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-xl p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Navigation</h3>
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink to="/" class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            Home
          </NuxtLink>
          <NuxtLink to="/products" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            Products
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
