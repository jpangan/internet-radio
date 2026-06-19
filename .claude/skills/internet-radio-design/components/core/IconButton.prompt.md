Circular icon-only control. Holds one inline SVG; fills with a faint surface on hover and shrinks on press. Use `tone="fav"` for the heart, `tone="accent"` for the globe.

```jsx
<IconButton label="Next" size="lg"><NextSvg /></IconButton>
<IconButton label="Favorite" tone="fav" active={isFav}><HeartSvg /></IconButton>
```

- `size`: `sm` (32px), `md` (36px), `lg` (44px — the touch-target floor).
- `tone`: `default | accent | fav`. `active` keeps the tone colour applied at rest.
