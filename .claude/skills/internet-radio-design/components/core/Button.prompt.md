Primary action control — a fully-rounded violet gradient pill (with glow) for the main action; glass and ghost variants for secondary actions.

```jsx
<Button variant="primary" size="md">Select Country</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" size="sm">Skip</Button>
```

- `variant`: `primary` (gradient + glow), `secondary` (glass fill + border), `ghost` (transparent, hover-fills).
- `size`: `sm | md | lg`. `fullWidth` stretches it. Pass `iconLeft` for a leading inline SVG.
- All buttons are pill-shaped (`--radius-full`) and shrink slightly on press.
