<template>
  <div class="horse-list">
    <h2>Horse List</h2>
    <div class="horse-grid">
      <div v-for="horse in horses" :key="horse.id" class="horse-card">
        <div class="horse-info">
          <span class="horse-name">{{ horse.name }}</span>
          <span class="horse-color-name">({{ horse.colorName || 'Unknown' }})</span>
          <div class="horse-color" :style="{ backgroundColor: horse.color }"></div>
          <span class="horse-condition">{{ horse.condition }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const horses = computed(() => store.getters['race/horses'])
</script>

<style scoped>
.horse-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  height:calc(100vh - 185px);
  overflow: hidden;
  min-height: 0;
}

.horse-list h2 {
  flex-shrink: 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: sticky;
  top: 0;
  background: #fafafa;
  z-index: 10;
  padding-top: 0;
  padding-bottom: 0.5rem;
}

.horse-grid {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  flex: 1;
  min-height: 0;  
  gap: 0.5rem;
  -webkit-overflow-scrolling: touch;
  padding-right: 4px;
}

.horse-card {
  display: flex;
  align-items: center;
  padding: 0.625rem;
  border-radius: 4px;
  background: white;
  border: 1px solid #e0e0e0;
  transition: all 0.2s;
  flex-shrink: 0;
}

.horse-card:hover {
  border-color: #bdc3c7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.horse-info {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.horse-color {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  flex-shrink: 0;
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.horse-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.8rem;
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.horse-color-name {
  font-size: 0.7rem;
  color: #7f8c8d;
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.horse-condition {
  font-size: 0.75rem;
  color: #7f8c8d;
  font-weight: 600;
  flex-shrink: 0;
}

/* Tablet Stack (1024px and below) */
@media (max-width: 1023px) {
  .horse-list {
    height: auto;
  }

  .horse-grid {
    flex: 1;
    overflow: hidden;
    max-height: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .horse-card {
    padding: 0.4rem;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .horse-info {
    gap: 0.375rem;
  }

  .horse-card {
    padding: 0.5rem;
  }

  .horse-name,
  .horse-color-name {
    font-size: 0.7rem;
  }

  .horse-color {
    width: 22px;
    height: 22px;
  }

  .horse-condition {
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .horse-list h2 {
    font-size: 0.7rem;
    margin-bottom: 0.35rem;
  }

  .horse-card {
    padding: 0.35rem;
  }

  .horse-info {
    gap: 0.25rem;
  }

  .horse-name,
  .horse-color-name {
    font-size: 0.65rem;
  }

  .horse-color {
    width: 20px;
    height: 20px;
  }

  .horse-condition {
    font-size: 0.6rem;
  }
}
</style>
