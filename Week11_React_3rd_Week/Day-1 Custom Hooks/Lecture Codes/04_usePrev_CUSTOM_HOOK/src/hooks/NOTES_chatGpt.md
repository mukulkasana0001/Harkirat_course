
# Understanding the Problem with `usePrevious` Hook

## The Problem: When “previous” isn’t truly the previous value

### What’s the standard `usePrevious` hook?

Developers commonly implement it like this:

```js
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

Here, the value is stored into `ref.current` **after rendering**, and the hook returns that stored value.

---

## Why that’s misleading

Even though we call it `usePrevious`, what it actually returns is the value from the **previous render**, not necessarily when the value last changed.

### Walkthrough Example

- **First render**, say `value = 1`:
  - `ref.current` is `undefined`, so the hook returns `undefined`.
  - After render, effect updates `ref.current = 1`.

- **Second render**, `value = 2`:
  - The hook returns `1` (the old render’s value).
  - After render, effect updates `ref.current = 2`.

- **Third render**, even if `value` stays `2`:
  - Hook still returns `2` (from last render), **not the “real previous distinct value” when it actually changed**.

👉 So it always **lags one render, not one change**.  
👉 Changing unrelated state (like a parent re-render) can trigger unwanted “previous value” updates, causing glitches.

---

## The Improved Hook: Track actual previous **distinct** value

To fix this, Giacomo proposes storing both the “current” and “previous” values in a ref, and only updating when the value changes:

```js
function usePreviousPersistent(value) {
  const ref = useRef({ value, previous: undefined });

  if (ref.current.value !== value) {
    ref.current = {
      value,
      previous: ref.current.value
    };
  }

  return ref.current.previous;
}
```

### How it works:
1. On each render, compare incoming `value` with `ref.current.value`.
2. Only when they differ do we move `value` to `previous` and assign the new current value.
3. If `value` doesn’t change, `previous` stays stable — fixing the glitch.

---

## TL;DR Comparison

| Hook Type               | What “previous” actually is                           | Potential Issue                                     |
|--------------------------|-------------------------------------------------------|-----------------------------------------------------|
| Standard `usePrevious`   | Value from the **previous render**, even if unchanged | Can glitch when render occurs without value change  |
| Persistent `usePrevious` | Value from the **last time value changed**            | Stabler, predictable — only updates on value change |

---

## In Short

- The **problem** with the standard `usePrevious` is that it returns the immediate **previous render’s value**, even if nothing changed in that render.
- The **fix** is to track both `current` and `previous` and only shift them when the input value **changes**.
