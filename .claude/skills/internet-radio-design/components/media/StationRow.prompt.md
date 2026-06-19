Tappable station list row used inside the browse / favorites lists: circular favicon, station name, up to two genre tags + bitrate, and an active pulse dot. The active row gets a violet inset ring.

```jsx
<StationRow name="BBC Radio 6 Music" favicon={url} tags={["alternative","indie"]} bitrate={128} active={isActive} onClick={play} />
```
