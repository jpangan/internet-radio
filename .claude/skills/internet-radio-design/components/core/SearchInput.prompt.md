Glass text field with a leading search icon and a violet focus ring. Used for the country / station search bars.

```jsx
<SearchInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search countries…" />
```

- Renders at 16px to prevent iOS zoom-on-focus. Focus draws the `--focus-ring`.
