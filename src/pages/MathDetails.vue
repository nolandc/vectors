<script setup>
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

<style lang="scss" scoped>
.math-details {
  width: 400px;
  box-sizing: border-box;
  padding: 0 30px;
  text-align: left;

  .tab-bar {
    display: flex;
		justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

    button {
      background: none;
      border: none;
      padding: 10px 10px;
      font-size: 16px;
      cursor: pointer;
      color: #333;
      position: relative;

			&.active {
				text-decoration: underline;
			}

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: 2px solid #333;
        outline-offset: 2px;
      }
    }
  }

	ul {
    padding-inline-start: 16px;
  }

  li {
    margin-bottom: 10px;
  }

}
</style>