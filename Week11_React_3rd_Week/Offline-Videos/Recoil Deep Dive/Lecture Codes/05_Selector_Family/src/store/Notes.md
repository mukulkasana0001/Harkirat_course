### Question
I am using a `selectorFamily` in Recoil like this:

```js
const todoSelectorFamily = selectorFamily({
  key: "todoSelectorFamily",
  get: (id) => async () => {
    const res = await fetch(`/todos/${id}`);
    return res.json();
  }
});
```

If I use the same selector multiple times with the **same `id`**, will Recoil fetch the data from the API again each time, or does it cache the result?

In other words, does Recoil check the **returned data** to decide whether to refetch, or does it just check whether the **id parameter** has changed?
```

---

### Answer
When you call:

```js
const todo1 = useRecoilValue(todoSelectorFamily(5));
const todo2 = useRecoilValue(todoSelectorFamily(5));
```

---

#### 🔹 What happens?

- **First time (id = 5):**  
  Recoil runs the fetch (`/todos/5`) and stores the result in its cache.

- **Next time (same id = 5):**  
  Recoil does **not** fetch again.  
  It just returns the cached result.

- **If id changes (e.g. 6 instead of 5):**  
  A new fetch is triggered for `/todos/6`.

- **When will it fetch again for the same id?**  
  - If you manually refresh/reset that selector.  
  - Or if some dependency changes.  

---

#### 🔹 How does Recoil decide?

Recoil does **not compare the returned data**.  
It only checks:

- The **selector key** (`"todoSelectorFamily"`)  
- The **parameter** (`id`)  

Together, these form a **cache key**.  

So:  
- `todoSelectorFamily(5)` → one cache entry  
- `todoSelectorFamily(6)` → another cache entry  

---

#### ✅ In simple words
- Same id → fetch happens **only once**, result is cached.  
- Different id → new fetch happens.  
- Recoil checks the **id parameter**, not the **data value**.
