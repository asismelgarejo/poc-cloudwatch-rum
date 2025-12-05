<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-bold text-white mb-8 text-center">AWS RUM Test App</h1>

      <div class="bg-white rounded-lg shadow-xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Test Navigation</h2>
        <p class="text-gray-600 mb-4">Navigate between pages to test RUM page tracking:</p>
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink to="/about" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            About Page
          </NuxtLink>
          <NuxtLink to="/products" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            Products Page
          </NuxtLink>
          <NuxtLink to="/contact" class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            Contact Page
          </NuxtLink>
          <NuxtLink to="/dashboard" class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition">
            Dashboard
          </NuxtLink>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Test HTTP Requests</h2>
        <p class="text-gray-600 mb-4">Make API requests to test RUM HTTP monitoring:</p>
        <div class="grid grid-cols-2 gap-4">
          <button @click="makeSuccessRequest" class="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            Success Request
          </button>
          <button @click="makeSlowRequest" class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            Slow Request (3s)
          </button>
          <button @click="makeErrorRequest" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            Error Request (404)
          </button>
          <button @click="makeMultipleRequests" class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            Multiple Requests
          </button>
        </div>
        <div v-if="requestStatus" class="mt-4 p-4 rounded" :class="requestStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          {{ requestStatus.message }}
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-xl p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Test JavaScript Errors</h2>
        <p class="text-gray-600 mb-4">Trigger errors to test RUM error monitoring:</p>
        <div class="grid grid-cols-2 gap-4">
          <button @click="throwError" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition">
            Throw Error
          </button>
          <button @click="nullReferenceError" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition">
            Null Reference Error
          </button>
          <button @click="typeError" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition">
            Type Error
          </button>
          <button @click="asyncError" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition">
            Async Error
          </button>
        </div>
      </div>

      <div class="mt-8 bg-white rounded-lg shadow-xl p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Testing Instructions:</h3>
        <ul class="text-gray-600 space-y-2 list-disc list-inside">
          <li>Open this app in different browsers (Chrome, Firefox, Safari, Edge)</li>
          <li>Test on different devices (desktop, mobile, tablet)</li>
          <li>Navigate between pages to track page views</li>
          <li>Click the request buttons to track HTTP calls</li>
          <li>Click the error buttons to track JavaScript errors</li>
          <li>Check AWS CloudWatch RUM dashboard for collected data</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const requestStatus = ref<{ success: boolean; message: string } | null>(null);

const makeSuccessRequest = async () => {
  try {
    const response = await $fetch('/api/test/success');
    requestStatus.value = { success: true, message: `Success: ${JSON.stringify(response)}` };
  } catch (error) {
    requestStatus.value = { success: false, message: `Error: ${error}` };
  }
};

const makeSlowRequest = async () => {
  requestStatus.value = { success: true, message: 'Making slow request...' };
  try {
    const response = await $fetch('/api/test/slow');
    requestStatus.value = { success: true, message: `Slow request completed: ${JSON.stringify(response)}` };
  } catch (error) {
    requestStatus.value = { success: false, message: `Error: ${error}` };
  }
};

const makeErrorRequest = async () => {
  try {
    await $fetch('/api/test/error');
  } catch (error: any) {
    requestStatus.value = { success: false, message: `Expected error: ${error.statusCode} - ${error.statusMessage}` };
  }
};

const makeMultipleRequests = async () => {
  requestStatus.value = { success: true, message: 'Making multiple requests...' };
  try {
    await Promise.all([
      $fetch('/api/test/success'),
      $fetch('/api/test/success'),
      $fetch('/api/test/success'),
    ]);
    requestStatus.value = { success: true, message: 'All 3 requests completed successfully' };
  } catch (error) {
    requestStatus.value = { success: false, message: `Error: ${error}` };
  }
};

const throwError = () => {
  throw new Error('This is a test error thrown from the home page!');
};

const nullReferenceError = () => {
  const obj: any = null;
  console.log(obj.property);
};

const typeError = () => {
  const num: any = 42;
  num.toUpperCase();
};

const asyncError = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  throw new Error('This is an async error!');
};
</script>
