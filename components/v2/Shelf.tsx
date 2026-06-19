interface ShelfProps {
  title: string;
  children: React.ReactNode;
}

export default function Shelf({ title, children }: ShelfProps) {
  return (
    <section style={{ marginBottom: 8 }}>
      <h2 style={{
        margin: "0 4px 10px", fontSize: 21, fontWeight: 750,
        letterSpacing: "-0.02em", color: "var(--v-fg)",
      }}>
        {title}
      </h2>
      <div
        className="v-shelf"
        style={{
          display: "flex", gap: 6, overflowX: "auto", overflowY: "hidden",
          padding: "2px 0 14px", scrollSnapType: "x proximity",
        }}
      >
        {children}
      </div>
    </section>
  );
}
