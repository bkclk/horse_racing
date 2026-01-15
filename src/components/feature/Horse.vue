<template>
  <div class="horse-container">
    <div
      class="horse"
      :style="{
        left: `${position}%`,
      }"
    >
      <div class="horse-content">
        <div class="horse-name-label">{{ horse.name }}</div>
        <img :src="horsePng" alt="Horse" class="horse-img">
      </div>
    </div>
  </div>
</template>

<script setup>
import horsePng from '@/assets/horse.png'

defineProps({
  horse: {
    type: Object,
    required: true,
  },
  position: {
    type: Number,
    default: 0,
  },
  isRacing: {
    type: Boolean,
    default: false,
  },
})

</script>

<style scoped>
.horse-container {
  position: relative;
  height: 56px;
  margin-bottom: 0;
}

.horse {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 5;
}

.horse-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

}

.horse-name-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.9);
  padding: 1px 4px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.horse-img {
  width: 40px;
  height: 40px;
}



/* Mobile Responsive */
@media (max-width: 1024px) {
  .horse-container {
    height: 44px;
  }

  .horse-name-label {
    font-size: 0.55rem;
    padding: 0px 2px;
  }

  .horse-img {
    width: 32px;
    height: 32px;
  }

  .horse-content {
    gap: 1px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .horse-container {
    height: 48px;
  }
  .horse-img {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .horse-container {
    height: 40px;
  }

  .horse-name-label {
    font-size: 0.5rem;
    padding: 0px 2px;
  }

  .horse-img {
    width: 28px;
    height: 28px;
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .horse-container {
    height: 35px;
  }

  .horse-img {
    width: 30px;
    height: 30px;
  }

  .horse-name-label {
    font-size: 0.5rem;
  }
}
</style>
