<script setup>
// Script content remains the same as before
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(false);
const selectedIndex = ref(0);

const links = [
  { to: '/addition', text: 'addition' },
  { to: '/projection', text: 'projection' },
  { to: '/unit', text: 'unit vectors' },
  { to: '/dot', text: 'dot product' },
  { to: '/transformation', text: 'linear transformation' },
  { to: '/eigenvectors', text: 'eigenvectors' },
  { to: '/determinant', text: 'determinant' },
];

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const selectLink = (index) => {
  selectedIndex.value = index;
  closeMenu();
};

const updateSelectedIndex = () => {
  const currentPath = router.currentRoute.value.path;
  const index = links.findIndex(link => link.to === currentPath);
  if (index !== -1) {
    selectedIndex.value = index;
  }
};

onMounted(() => {
  updateSelectedIndex();
  router.afterEach(updateSelectedIndex);
});

onUnmounted(() => {
  if (router.removeAfterEach) {
    router.removeAfterEach(updateSelectedIndex);
  }
});

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
};
</script>

<template>
  <div class="nav-menu-wrapper">
    <div :class="'nav-menu ' + (isOpen ? 'open' : '')" v-click-outside="closeMenu">
      <div class="selected-link" @click="toggleMenu">
        {{ links[selectedIndex].text }}
        <svg
          class="arrow"
          :class="{ 'arrow-open': isOpen }"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div v-if="isOpen" class="dropdown">
        <div
          v-for="(link, index) in links"
          :key="link.to"
          class="link"
          :class="{ 'selected': index === selectedIndex }"
          @click="selectLink(index)"
        >
          <RouterLink :to="link.to">{{ link.text }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-menu-wrapper {
  width: 200px;
  margin-bottom: 40px;
}

.nav-menu {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
  user-select: none;


  .selected-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    cursor: pointer;

    .arrow {
      transition: transform 0.3s ease;

      &.arrow-open {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: -1px;
    width: calc(100%);
    background-color: #fff;
    z-index: 1000;
    border: 1px solid #f0f0f0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    .link {
      box-sizing: border-box;

      &:hover {
        text-decoration: underline;
      }

      &.selected {
        text-decoration: underline;
      }

      a {
        padding: 8px;
        color: #333;
        text-decoration: none;
        display: block;
      }
    }
  }
}
</style>