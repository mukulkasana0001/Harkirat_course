# `generateStaticParams()` in Next.js (App Router)

## 📘 What It Does

`generateStaticParams()` is used in the **Next.js App Router** (from
version 13+) to define **dynamic routes that should be statically
generated** at build time.

------------------------------------------------------------------------

## 🧩 Example

### File structure

    app/
     └── posts/
          └── [id]/
              └── page.jsx

### Code

``` javascript
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostPage({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
```

------------------------------------------------------------------------

## 🧠 Key Points

-   `generateStaticParams()` runs **only during build time**
    (`npm run build`).
-   It tells Next.js **which dynamic routes to pre-render**.
-   The returned array must contain objects that match the dynamic
    segment names (like `{ id: '1' }`).

------------------------------------------------------------------------

## ⚙️ What Happens Internally

When you run:

    npm run build

Next.js does this:

1.  Calls `generateStaticParams()` once → gets all IDs (e.g. \['1', '2',
    '3'\]).\

2.  For each one, calls your page:

    ``` js
    PostPage({ params: { id: '1' } })
    PostPage({ params: { id: '2' } })
    PostPage({ params: { id: '3' } })
    ```

3.  Pre-renders static HTML for each page at build time.

So the output will contain:

    /posts/1/index.html
    /posts/2/index.html
    /posts/3/index.html

------------------------------------------------------------------------

## 🔍 Difference from `getStaticPaths`

  ---------------------------------------------------------------------------
  Feature      `generateStaticParams` (App      `getStaticPaths` (Pages
               Router)                          Router)
  ------------ -------------------------------- -----------------------------
  Used in      `app/` directory                 `pages/` directory

  Returns      Array of params                  Object with `paths` +
                                                `fallback`

  Runs         During build                     During build

  Data         Uses standard async/await        Uses `getStaticProps`
  fetching                                      

  Introduced   Next.js 13                       Next.js 9
  in                                            
  ---------------------------------------------------------------------------

------------------------------------------------------------------------

## ✅ Summary

`generateStaticParams()` is the **App Router version of
`getStaticPaths()`**.\
It helps Next.js know which dynamic routes to **generate at build time**
for faster performance.
