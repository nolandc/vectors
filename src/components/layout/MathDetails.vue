<script setup lang="ts">
import { ref, useSlots, computed } from 'vue'

const slots = useSlots()

const activeTab = ref('')

const tabs = computed(() => {
  return Object.keys(slots)
    .filter(slot => slot !== 'default')
    .map(slot => ({
      name: slot,
      label: slot.charAt(0).toUpperCase() + slot.slice(1) // Capitalize first letter
    }))
})

// Set the first tab as active by default
if (tabs.value.length > 0) {
  activeTab.value = tabs.value[0].name
}
</script>

<template>
  <div class="math-details">
    <div v-if="tabs.length > 1" class="tab-bar">
      <button 
        v-for="tab in tabs" 
        :key="tab.name"
        @click="activeTab = tab.name"
        :class="{ active: activeTab === tab.name }"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tab-content">
      <template v-for="tab in tabs" :key="tab.name">
        <div v-if="activeTab === tab.name">
          <slot :name="tab.name"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.math-details {
  box-sizing: border-box;
  padding: 0 30px;
  width: 440px;

  @media screen and (max-width: 1200px) {
    padding: 0 15px;
    width: 600px;

  }
  
  @media screen and (max-width: 800px) {
    width: 100%;
  }  

  .tab-bar {
    display: flex;
		justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

    button {
      border: none;
      padding: 8px 14px 8px 14px;
      font-size: 16px;
      cursor: pointer;
      position: relative;
      border-radius: 20px;
      background: white;
      border: 1px solid transparent;
      transition: border-color 0s;
      color: #777;

			&.active {
        border: 1px solid #888;
        color: #333;
			}

      &:hover:not(.active) {
        border: 1px dotted #888;
      }

      &:focus {
        outline: none;
      }
    }
  }

	ul {
    padding-inline-start: 16px;
  }

  li {
    margin-bottom: 10px;
  }

  math > mtable {
    width: 100%;
    border-collapse: collapse;
    > mtr:first-child > mtd {
      padding-top: 10px
    }
    > mtr > mtd {
      padding: 10px 0;
    }
  }
}
</style>