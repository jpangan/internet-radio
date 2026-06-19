Square station favicon with rounded corners and a graceful radio-icon fallback. The large size carries the now-playing glow halo and pulses while playing.

```jsx
<StationArtwork src={station.favicon} size="lg" playing={isPlaying} />
<StationArtwork src={station.favicon} size="sm" />  {/* circle, for list rows */}
```

- `size`: `sm` (36px circle) · `md` (44px rounded) · `lg` (144px hero). `playing` only affects `lg`.
