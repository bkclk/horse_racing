<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  color: #333;
}

#app {
  min-height: 100vh;
}

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  html {
    font-size: 13px;
  }
}

@media (min-width: 1921px) {
  html {
    font-size: 18px;
  }
}

@media print {
  .controls-bar,
  .app-header {
    display: none;
  }

  .main-content {
    grid-template-columns: 1fr;
    overflow: auto;
  }

  .panel {
    page-break-inside: avoid;
    border: 1px solid #ccc;
    break-inside: avoid;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
