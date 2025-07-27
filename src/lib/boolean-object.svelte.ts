export function useBooleanState(value: boolean) {
  let val = $state(value);

  return {
    get value() { return val; },
    set value(newValue: boolean) { val = newValue; },
    setTrue: () => (val = true),
    setFalse: () => (val = false)
  };
}