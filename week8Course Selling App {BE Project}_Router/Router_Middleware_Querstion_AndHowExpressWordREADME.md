# Express Router + Middleware Example

This project shows how **Express Routers** and **Middleware** work together.

---

## 📂 Files
- `router1` → handles `/brain/notshare`
- `router2` → handles `/brain/share`
- `middleware` → adds `req.hello = "12345"` and logs `"middleware running"`

---

## ⚡ Code (Your Current Version)

```js
app.use("/api/v1", middleware, router1); 
app.use("/api/v1", router2);
```

### 👉 What happens?

- `GET /api/v1/brain/notshare`
  - middleware runs ✅
  - router1 responds with `{ msg: "inside router1", hello: "12345" }`

- `GET /api/v1/brain/share`
  - middleware runs ✅ (because it is attached before router1)
  - router1 has no matching route → request falls through
  - router2 handles → `{ msg: "inside router2" }`

⚠️ Notice: middleware runs for **both router1 and router2**.

---

## ✅ Fixed Version (Scoped Middleware)

```js
router1.use(middleware);

app.use("/api/v1", router1); 
app.use("/api/v1", router2);
```

### 👉 What happens now?

- `GET /api/v1/brain/notshare`
  - middleware runs ✅
  - router1 responds → `{ msg: "inside router1", hello: "12345" }`

- `GET /api/v1/brain/share`
  - middleware does **not** run 🚫
  - router2 responds → `{ msg: "inside router2" }`

---

## 🎯 Key Learning
- `app.use("/api/v1", middleware, router1)` → middleware applies to **all requests under `/api/v1`**, even if router1 doesn’t handle them.  
- `router1.use(middleware)` → middleware applies **only to router1’s routes**.  

---

## 🚀 Run It
```bash
npm install express
node index.js
```
Then open in browser:
- [http://localhost:3000/api/v1/brain/notshare](http://localhost:3000/api/v1/brain/notshare)
- [http://localhost:3000/api/v1/brain/share](http://localhost:3000/api/v1/brain/share)
