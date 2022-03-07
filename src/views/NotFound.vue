<template>
  <div>
    <h1>Not Found</h1>
    <p>
      Oops we couldn't find that page. Try see
      <router-link :to="{ name: 'products' }">our products</router-link>
    </p>
  </div>
</template>
