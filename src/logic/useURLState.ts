import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash';
import Vector from "../math/vector";
import Matrix2x2 from "../math/matrix";

interface UrlStateConfig {
  [key: string]: {
    type: 'vector' | 'matrix' | 'number',
    default: Vector | Matrix2x2 | number
  }
}

export function useUrlState(config: UrlStateConfig) {
  const router = useRouter();
  const route = useRoute();

  const state: { [key: string]: any } = {};

  // Initialize reactive references
  for (const [key, value] of Object.entries(config)) {
    state[key] = ref(value.default);
  }

  // Function to update URL
  const updateURL = () => {
    const query: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(config)) {
      if (value.type === 'vector') {
        query[`${key}x`] = state[key].value.x.toFixed(2);
        query[`${key}y`] = state[key].value.y.toFixed(2);
      } else if (value.type === 'matrix') {
        query[`${key}a`] = state[key].value.a.toFixed(2);
        query[`${key}b`] = state[key].value.b.toFixed(2);
        query[`${key}c`] = state[key].value.c.toFixed(2);
        query[`${key}d`] = state[key].value.d.toFixed(2);
      } else if (value.type === 'number') {
        query[key] = state[key].value.toFixed(2);
      }
    }
    router.replace({ query });
  };

  const debouncedUpdateURL = debounce(updateURL, 500);

  // Function to update state from URL
  const updateFromURL = () => {
    for (const [key, value] of Object.entries(config)) {
      if (value.type === 'vector') {
        const x = route.query[`${key}x`];
        const y = route.query[`${key}y`];
        if (x && y) {
          state[key].value = new Vector(Number(x), Number(y));
        }
      } else if (value.type === 'matrix') {
        const a = route.query[`${key}a`];
        const b = route.query[`${key}b`];
        const c = route.query[`${key}c`];
        const d = route.query[`${key}d`];
        if (a && b && c && d) {
          state[key].value = new Matrix2x2(Number(a), Number(b), Number(c), Number(d));
        }
      } else if (value.type === 'number') {
        const num = route.query[key];
        if (num) {
          state[key].value = Number(num);
        }
      }
    }
  };

  // Watch for changes in state and update URL
  watch(Object.values(state), debouncedUpdateURL, { deep: true });

  // Update from URL on component mount and update URL with initial values
  onMounted(() => {
    updateFromURL();
    updateURL(); // Immediate update without debounce
  });

  return state;
}