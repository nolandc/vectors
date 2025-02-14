import { ref, watch, onMounted, Directive, Ref } from 'vue';
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

type UrlStateReturn<T extends UrlStateConfig> = {
  [K in keyof T]: T[K]['type'] extends 'vector'
    ? Ref<Vector>
    : T[K]['type'] extends 'matrix'
    ? Ref<Matrix2x2>
    : Ref<number>
} & {
  vStateLink: Directive<any, any>
}

export function useUrlState<T extends UrlStateConfig>(config: T): UrlStateReturn<T> {
  const router = useRouter();
  const route = useRoute();

  const state = {} as UrlStateReturn<T>;

  // Initialize reactive references
  for (const [key, value] of Object.entries(config)) {
    state[key as keyof T] = ref(value.default) as any;
  }

  // Function to generate query params
  const generateQueryParams = (newState?: { [key: string]: any }) => {
    const query: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(config)) {
      const stateValue = newState?.[key] ?? state[key].value;
      if (value.type === 'vector') {
        query[`${key}x`] = stateValue.x.toFixed(2);
        query[`${key}y`] = stateValue.y.toFixed(2);
      } else if (value.type === 'matrix') {
        query[`${key}a`] = stateValue.a.toFixed(2);
        query[`${key}b`] = stateValue.b.toFixed(2);
        query[`${key}c`] = stateValue.c.toFixed(2);
        query[`${key}d`] = stateValue.d.toFixed(2);
      } else if (value.type === 'number') {
        query[key] = stateValue.toFixed(2);
      }
    }
    return query;
  };

  // Debounced function to update URL
  const debouncedUpdateURL = debounce(() => {
    const query = generateQueryParams();
    router.replace({ query });
  }, 500);

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

  // Watch for changes in the route and update state
  watch(() => route.query, updateFromURL, { deep: true });

  // Update from URL on component mount
  onMounted(updateFromURL);

  // Custom directive for state links
  const vStateLink: Directive = {
    mounted(el, binding) {
      const newState = binding.value;
      const query = generateQueryParams(newState);
      
      // Generate the correct URL without duplicating the hash
      const href = router.resolve({
        path: route.path,
        hash: route.hash,
        query: query
      }).href;
      
      el.href = href;
      el.addEventListener('click', (event: MouseEvent) => {
        if (!event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          for (const [key, value] of Object.entries(newState)) {
            if (key in state) {
              state[key].value = value as any;
            }
          }
          router.push({ query: query });
        }
      });
    }
  };

  return { ...state, vStateLink };
}