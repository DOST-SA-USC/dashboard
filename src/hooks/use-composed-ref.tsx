import { useCallback } from 'react';

type Ref<T> = React.Ref<T> | undefined;

export function useComposedRef<T>(...refs: Ref<T>[]): React.RefCallback<T> {
  return useCallback(
    (node: T) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === 'function') {
          ref(node);
        } else if (typeof ref === 'object' && 'current' in ref) {
          (ref as React.MutableRefObject<T | null>).current = node;
        }
      });
    },
    [refs]
  );
}
