/* @ds-bundle: {"format":3,"namespace":"InternetRadioDesignSystem_7e870d","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"SearchInput","sourcePath":"components/core/SearchInput.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"CountryRow","sourcePath":"components/media/CountryRow.jsx"},{"name":"Flag","sourcePath":"components/media/Flag.jsx"},{"name":"StationArtwork","sourcePath":"components/media/StationArtwork.jsx"},{"name":"StationRow","sourcePath":"components/media/StationRow.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"c5625583b89a","components/core/Button.jsx":"7dc1f9ff626b","components/core/Card.jsx":"ba30aaec6319","components/core/Icon.jsx":"221eabe03028","components/core/IconButton.jsx":"04ecc32913d6","components/core/SearchInput.jsx":"02111d31faa7","components/core/Tag.jsx":"6d17f67bd430","components/media/CountryRow.jsx":"9d3be6d33f93","components/media/Flag.jsx":"e6a38444c37e","components/media/StationArtwork.jsx":"a9e2050b7687","components/media/StationRow.jsx":"ff066016b123","design_handoff_player_v2/prototype/app.jsx":"1740e12ceb1b","design_handoff_player_v2/prototype/chrome.jsx":"780a2fffa7a9","design_handoff_player_v2/prototype/gen.js":"5cbf74d6a5c6","design_handoff_player_v2/prototype/home.jsx":"8fa5841bb7a4","design_handoff_player_v2/prototype/player.jsx":"ad5235d3fc98","design_handoff_player_v2/prototype/ui.jsx":"57ac1101efc9","design_handoff_player_v2/prototype/views.jsx":"e6fd104378ba","ui_kits/internet-radio-v2/app.jsx":"781bca43b7ef","ui_kits/internet-radio-v2/chrome.jsx":"780a2fffa7a9","ui_kits/internet-radio-v2/gen.js":"5cbf74d6a5c6","ui_kits/internet-radio-v2/home.jsx":"8fa5841bb7a4","ui_kits/internet-radio-v2/player.jsx":"ad5235d3fc98","ui_kits/internet-radio-v2/share.jsx":"552334d043db","ui_kits/internet-radio-v2/ui.jsx":"57ac1101efc9","ui_kits/internet-radio-v2/views.jsx":"e6fd104378ba","ui_kits/internet-radio/BrowseSheet.jsx":"3577f1f86cff","ui_kits/internet-radio/FavoritesSheet.jsx":"c3a7b2a2856e","ui_kits/internet-radio/Header.jsx":"a13c81a8d7ed","ui_kits/internet-radio/PlayerView.jsx":"0143fda21751","ui_kits/internet-radio/ShareSheet.jsx":"6a38134234a1","ui_kits/internet-radio/Sheet.jsx":"e74c3f91d3d1","ui_kits/internet-radio/app.jsx":"2064be1ffe9b","ui_kits/internet-radio/data.js":"ece41b06d96f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.InternetRadioDesignSystem_7e870d = window.InternetRadioDesignSystem_7e870d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * Badge — small status pill. "live" shows a pulsing dot; "connecting"
 * shows three bouncing dots. Soft tinted background + matching border.
 */
function Badge({
  children,
  tone = "live",
  showDot = true,
  style = {}
}) {
  const tones = {
    live: {
      bg: "var(--live-soft)",
      color: "var(--live)",
      border: "var(--live-border)"
    },
    accent: {
      bg: "var(--accent-soft)",
      color: "var(--accent-hover)",
      border: "var(--accent-ring)"
    },
    fav: {
      bg: "var(--fav-soft)",
      color: "var(--fav)",
      border: "var(--fav-border)"
    },
    neutral: {
      bg: "var(--surface)",
      color: "var(--fg-2)",
      border: "var(--border)"
    }
  };
  const t = tones[tone] || tones.live;
  const isConnecting = tone === "accent" && showDot && children && String(children).toLowerCase().includes("connect");
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 12px",
      fontSize: "var(--text-2xs)",
      fontWeight: "var(--weight-semibold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      borderRadius: "var(--radius-full)",
      background: t.bg,
      color: t.color,
      border: `1px solid ${t.border}`,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, showDot && !isConnecting && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "var(--radius-full)",
      background: t.color,
      animation: "artwork-pulse 2s ease-in-out infinite"
    }
  }), isConnecting && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 3
    }
  }, [0, 0.15, 0.3].map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "connecting-dot",
    style: {
      width: 6,
      height: 6,
      borderRadius: "var(--radius-full)",
      background: t.color,
      animationDelay: `${d}s`
    }
  }))), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the brand's primary action control.
 * Variants: "primary" (violet gradient pill + glow), "secondary" (glass pill),
 * "ghost" (transparent, hover-fills). Always fully rounded.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "8px 16px",
      fontSize: 13,
      gap: 6
    },
    md: {
      padding: "12px 28px",
      fontSize: 14,
      gap: 8
    },
    lg: {
      padding: "14px 32px",
      fontSize: 15,
      gap: 8
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-semibold)",
    borderRadius: "var(--radius-full)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : "auto",
    transition: "background .2s ease, box-shadow .2s ease, transform .1s ease, color .2s ease",
    whiteSpace: "nowrap",
    WebkitTapHighlightColor: "transparent"
  };
  const variants = {
    primary: {
      background: "var(--gradient-accent)",
      color: "#fff",
      boxShadow: "var(--glow-accent-sm)"
    },
    secondary: {
      background: "var(--surface)",
      color: "var(--fg)",
      border: "1px solid var(--border)"
    },
    ghost: {
      background: "transparent",
      color: "var(--fg-2)"
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? {
    primary: {
      boxShadow: "var(--glow-accent-lg)"
    },
    secondary: {
      background: "var(--surface-hover)",
      borderColor: "var(--border-strong)"
    },
    ghost: {
      background: "var(--surface)",
      color: "var(--fg)"
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.96)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle,
      ...style
    }
  }, rest), iconLeft, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — a glass surface container. "panel" is the workhorse (blurred,
 * bordered); "sheet" is the heavier modal base; "plain" is a flat
 * translucent tile. Soft, large radius.
 */
function Card({
  children,
  variant = "panel",
  padding = 20,
  style = {},
  ...rest
}) {
  const variants = {
    panel: {
      background: "var(--glass-strong-fill)",
      backdropFilter: "var(--blur-strong)",
      WebkitBackdropFilter: "var(--blur-strong)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-2xl)"
    },
    sheet: {
      background: "var(--bg-sheet)",
      backdropFilter: "var(--blur-sheet)",
      WebkitBackdropFilter: "var(--blur-sheet)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-3xl)",
      boxShadow: "var(--shadow-sheet)"
    },
    plain: {
      background: "var(--surface)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)"
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding,
      color: "var(--fg)",
      fontFamily: "var(--font-sans)",
      boxSizing: "border-box",
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon — the product's inline SVG icon set. Lucide-style 24px stroke icons
 * (globe, search, heart, share, list, chevrons, volume, x) plus the custom
 * radio-wave glyphs (radio, signal) and solid media-transport icons
 * (play, pause, prev, next). Stroke icons inherit `currentColor`.
 */
const STROKE = {
  globe: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"
  })),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  heart: /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  }),
  share: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 6 12 2 8 6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "15"
  })),
  list: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "18",
    x2: "21",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "3.01",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "3.01",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "3.01",
    y2: "18"
  })),
  chevronRight: /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  }),
  chevronLeft: /*#__PURE__*/React.createElement("path", {
    d: "M15 18l-6-6 6-6"
  }),
  arrowLeft: /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5M12 19l-7-7 7-7"
  }),
  x: /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12"
  }),
  check: /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }),
  copy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  })),
  radio: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.1 4.9C23 8.8 23 15.1 19.1 19"
  })),
  signal: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "14",
    r: "2",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 10.5C9.7 9.3 10.8 8.8 12 8.8s2.3.5 3.5 1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.5 7.5C7.4 5.6 9.6 4.6 12 4.6s4.6 1 6.5 2.9"
  }))
};
const SOLID = {
  play: /*#__PURE__*/React.createElement("path", {
    d: "M8 5v14l11-7z"
  }),
  pause: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "4",
    width: "4",
    height: "16",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "4",
    width: "4",
    height: "16",
    rx: "1.5"
  })),
  prev: /*#__PURE__*/React.createElement("path", {
    d: "M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z"
  }),
  next: /*#__PURE__*/React.createElement("path", {
    d: "M16 6h2v12h-2V6zM6 18l8.5-6L6 6v12z"
  }),
  volume: /*#__PURE__*/React.createElement("path", {
    d: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"
  }),
  volumeMute: /*#__PURE__*/React.createElement("path", {
    d: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"
  })
};
function Icon({
  name,
  size = 24,
  strokeWidth = 1.75,
  style = {},
  ...rest
}) {
  const isSolid = name in SOLID;
  const content = isSolid ? SOLID[name] : STROKE[name];
  if (!content) return null;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: isSolid ? "currentColor" : "none",
    stroke: isSolid ? "none" : "currentColor",
    strokeWidth: isSolid ? undefined : strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "block",
      flexShrink: 0,
      ...style
    }
  }, rest), content);
}

/** Names available to <Icon name="…" />. */
Icon.names = [...Object.keys(STROKE), ...Object.keys(SOLID)];
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — circular control holding a single inline SVG icon.
 * Hover fills with a faint surface; press shrinks. Use `tone` for
 * accent / favorite states.
 */
function IconButton({
  children,
  label,
  size = "md",
  tone = "default",
  active = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const dims = {
    sm: 32,
    md: 36,
    lg: 44
  }[size] || 36;
  const [hover, setHover] = React.useState(false);
  const toneColor = {
    default: "var(--fg-2)",
    accent: "var(--accent-hover)",
    fav: "var(--fav)"
  }[tone];
  const idle = active && tone === "fav" ? "var(--fav)" : active && tone === "accent" ? "var(--accent-hover)" : "var(--fg-2)";
  const hoverBg = tone === "fav" ? "var(--fav-soft)" : tone === "accent" ? "var(--accent-soft)" : "var(--surface)";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.92)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dims,
      height: dims,
      flexShrink: 0,
      borderRadius: "var(--radius-full)",
      border: "none",
      background: hover && !disabled ? hoverBg : "transparent",
      color: hover && !disabled ? toneColor : idle,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.3 : 1,
      transition: "background .2s ease, color .2s ease, transform .1s ease",
      WebkitTapHighlightColor: "transparent",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/SearchInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SearchInput — glass text field with a leading search icon and a violet
 * focus ring. Matches the modal search bars. 16px font on mobile to avoid
 * iOS zoom.
 */
function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--fg-3)",
    strokeWidth: "2",
    style: {
      position: "absolute",
      top: "50%",
      left: 12,
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })), /*#__PURE__*/React.createElement("input", _extends({
    type: "search",
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    autoComplete: "off",
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      boxSizing: "border-box",
      padding: "10px 16px 10px 36px",
      fontSize: 16,
      fontFamily: "var(--font-sans)",
      color: "var(--fg)",
      background: "var(--glass-hover)",
      border: `1px solid ${focus ? "var(--focus-border)" : "var(--border)"}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      boxShadow: focus ? "var(--focus-ring)" : "none",
      transition: "border-color .2s ease, box-shadow .2s ease"
    }
  }, rest)));
}
Object.assign(__ds_scope, { SearchInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SearchInput.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/**
 * Tag — tiny genre / metadata chip. Low-contrast glass fill, no border.
 * Used in clusters under a station name.
 */
function Tag({
  children,
  accent = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 10px",
      fontSize: "var(--text-2xs)",
      fontWeight: "var(--weight-medium)",
      borderRadius: "var(--radius-full)",
      background: accent ? "var(--accent-soft)" : "var(--glass-hover)",
      color: accent ? "rgba(196,190,255,0.85)" : "var(--fg-3)",
      border: accent ? "1px solid var(--accent-ring)" : "none",
      fontFamily: "var(--font-sans)",
      textTransform: "capitalize",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/media/Flag.jsx
try { (() => {
/**
 * Flag — a country flag from an ISO 3166-1 alpha-2 code. Renders a 3x2
 * raster from flagcdn.com (the app uses the country-flag-icons package;
 * this is the CDN-backed equivalent). Falls back to a globe glyph.
 */
function Flag({
  code,
  width = 20,
  radius = 3,
  style = {}
}) {
  const [error, setError] = React.useState(false);
  const cc = (code || "").toLowerCase();
  const height = Math.round(width * 2 / 3);
  if (!cc || cc.length !== 2 || error) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width,
        height,
        fontSize: width * 0.7,
        color: "var(--fg-3)",
        ...style
      }
    }, "\uD83C\uDF10");
  }
  return /*#__PURE__*/React.createElement("img", {
    src: `https://flagcdn.com/w40/${cc}.png`,
    srcSet: `https://flagcdn.com/w80/${cc}.png 2x`,
    alt: code,
    onError: () => setError(true),
    style: {
      width,
      height,
      objectFit: "cover",
      borderRadius: radius,
      display: "block",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Flag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Flag.jsx", error: String((e && e.message) || e) }); }

// components/media/CountryRow.jsx
try { (() => {
/**
 * CountryRow — browse-list row: flag tile, country name, station-count
 * pill, chevron. Hover fills faintly.
 */
function CountryRow({
  name,
  code,
  stationCount,
  onClick,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      padding: "10px 12px",
      textAlign: "left",
      border: "none",
      cursor: "pointer",
      borderRadius: "var(--radius-lg)",
      fontFamily: "var(--font-sans)",
      background: hover ? "var(--glass-hover)" : "transparent",
      transition: "background .15s ease",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      flexShrink: 0,
      overflow: "hidden",
      borderRadius: "var(--radius-md)",
      background: "var(--surface)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Flag, {
    code: code,
    width: 36,
    radius: 0,
    style: {
      height: 36
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: "var(--text-sm)",
      fontWeight: 500,
      color: "var(--fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, name), stationCount != null && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      padding: "2px 8px",
      borderRadius: "var(--radius-md)",
      fontSize: "var(--text-2xs)",
      fontVariantNumeric: "tabular-nums",
      background: "var(--surface)",
      color: "var(--fg-3)"
    }
  }, stationCount), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--fg-4)",
    strokeWidth: "2.5",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  })));
}
Object.assign(__ds_scope, { CountryRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/CountryRow.jsx", error: String((e && e.message) || e) }); }

// components/media/StationArtwork.jsx
try { (() => {
/** Fallback radio-tower icon shown when a station has no favicon. */
function RadioIcon({
  size
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--fg-3)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.1 4.9C23 8.8 23 15.1 19.1 19"
  }));
}

/**
 * StationArtwork — square station favicon with rounded corners and a
 * graceful radio-icon fallback. "lg" carries the now-playing glow halo
 * (and pulses when `playing`).
 */
function StationArtwork({
  src,
  alt = "",
  size = "md",
  playing = false,
  style = {}
}) {
  const [error, setError] = React.useState(false);
  const dims = {
    sm: 36,
    md: 44,
    lg: 144
  }[size] || 44;
  const radius = size === "sm" ? "var(--radius-full)" : size === "lg" ? "var(--radius-3xl)" : "var(--radius-2xl)";
  const showFallback = !src || error;
  return /*#__PURE__*/React.createElement("div", {
    className: size === "lg" ? playing ? "artwork-pulse" : "artwork-glow" : undefined,
    style: {
      width: dims,
      height: dims,
      flexShrink: 0,
      borderRadius: radius,
      overflow: "hidden",
      background: "var(--surface)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style
    }
  }, showFallback ? /*#__PURE__*/React.createElement(RadioIcon, {
    size: size === "lg" ? 48 : 18
  }) : /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    onError: () => setError(true),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }));
}
Object.assign(__ds_scope, { StationArtwork });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/StationArtwork.jsx", error: String((e && e.message) || e) }); }

// components/media/StationRow.jsx
try { (() => {
/**
 * StationRow — a tappable list row: circular favicon, name, genre tags +
 * bitrate, and an active pulse dot. Active rows get a violet inset ring.
 */
function StationRow({
  name,
  favicon,
  tags = [],
  bitrate,
  active = false,
  onClick,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      padding: "10px 12px",
      textAlign: "left",
      border: "none",
      cursor: "pointer",
      borderRadius: "var(--radius-lg)",
      fontFamily: "var(--font-sans)",
      background: active ? "var(--accent-soft)" : hover ? "var(--glass-hover)" : "transparent",
      boxShadow: active ? "inset 0 0 0 1px var(--accent-ring)" : "none",
      transition: "background .15s ease",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StationArtwork, {
    src: favicon,
    alt: name,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: active ? 600 : 500,
      color: active ? "var(--fg)" : "rgba(255,255,255,0.85)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, name), (tags.length > 0 || bitrate) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 4,
      marginTop: 3
    }
  }, tags.slice(0, 2).map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t,
    style: {
      fontSize: 10,
      padding: "1px 6px",
      borderRadius: "var(--radius-sm)"
    }
  }, t)), bitrate ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "var(--fg-3)"
    }
  }, bitrate, " kbps") : null)), active && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "var(--radius-full)",
      background: "var(--accent)",
      flexShrink: 0,
      animation: "artwork-pulse 2s ease-in-out infinite"
    }
  }));
}
Object.assign(__ds_scope, { StationRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/StationRow.jsx", error: String((e && e.message) || e) }); }

// design_handoff_player_v2/prototype/app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// V2 app — responsive orchestrator (sidebar desktop / tabs mobile), theme + device toggles.
const {
  Icon
} = window.InternetRadioDesignSystem_7e870d;
function ShareToast({
  show
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: 110,
      transform: `translateX(-50%) translateY(${show ? 0 : 12}px)`,
      zIndex: 90,
      opacity: show ? 1 : 0,
      pointerEvents: "none",
      transition: "opacity .25s, transform .25s",
      padding: "11px 18px",
      borderRadius: 99,
      background: "var(--v-mat-chrome)",
      backdropFilter: "var(--v-mat-blur)",
      border: "1px solid var(--v-hairline-2)",
      color: "var(--v-fg)",
      fontSize: 13.5,
      fontWeight: 650,
      boxShadow: "var(--v-shadow-pop)",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    strokeWidth: 2.6,
    style: {
      color: "var(--v-accent)"
    }
  }), " Link copied to clipboard");
}
function FloatingControls({
  theme,
  onToggleTheme,
  device,
  onToggleDevice
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      right: 16,
      zIndex: 95,
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleDevice,
    title: "Toggle device",
    style: fcBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: device === "mobile" ? "globe" : "list",
    size: 16,
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 650
    }
  }, device === "mobile" ? "Desktop" : "Mobile")));
}
const fcBtn = {
  display: "flex",
  alignItems: "center",
  gap: 7,
  padding: "8px 12px",
  borderRadius: 99,
  cursor: "pointer",
  border: "1px solid var(--v-hairline-2)",
  background: "var(--v-mat-chrome)",
  backdropFilter: "var(--v-mat-blur)",
  color: "var(--v-fg-2)"
};
function App() {
  const G = window.IR2;
  const [theme, setTheme] = React.useState("dark");
  const [device, setDevice] = React.useState("desktop"); // desktop | mobile
  const [view, setView] = React.useState("home");
  const [current, setCurrent] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [npOpen, setNpOpen] = React.useState(false);
  const [favs, setFavs] = React.useState(() => [G.stations[4], G.stations[2]]);
  const [volume, setVolume] = React.useState(0.8);
  const [toast, setToast] = React.useState(false);
  const [width, setWidth] = React.useState(1100);
  const hostRef = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  React.useEffect(() => {
    if (!hostRef.current || !window.ResizeObserver) return;
    const ro = new ResizeObserver(entries => setWidth(entries[0].contentRect.width));
    ro.observe(hostRef.current);
    return () => ro.disconnect();
  }, []);
  const compact = device === "mobile" || width < 760;
  const play = s => {
    setCurrent(s);
    setPlaying(true);
  };
  const toggle = () => {
    if (current) setPlaying(p => !p);
  };
  const open = s => {
    setCurrent(s);
    setPlaying(true);
    setNpOpen(true);
  };
  const idx = current ? G.stations.findIndex(s => s.stationuuid === current.stationuuid) : -1;
  const tune = d => {
    if (idx < 0) return;
    const n = G.stations[(idx + d + G.stations.length) % G.stations.length];
    setCurrent(n);
    setPlaying(true);
  };
  const isFav = s => favs.some(f => f.stationuuid === s?.stationuuid);
  const toggleFav = s => {
    const t = s || current;
    if (!t) return;
    setFavs(p => p.some(f => f.stationuuid === t.stationuuid) ? p.filter(f => f.stationuuid !== t.stationuuid) : [t, ...p]);
  };
  const share = () => {
    setToast(true);
    setTimeout(() => setToast(false), 1900);
  };
  const viewProps = {
    current,
    playing,
    onPlay: play,
    onOpen: open
  };
  let content;
  if (view === "home") content = /*#__PURE__*/React.createElement(window.HomeView, viewProps);else if (view === "search") content = /*#__PURE__*/React.createElement(window.SearchView, viewProps);else if (view === "browse") content = /*#__PURE__*/React.createElement(window.BrowseView, viewProps);else content = /*#__PURE__*/React.createElement(window.LibraryView, _extends({
    favorites: favs
  }, viewProps, {
    onRemove: s => toggleFav(s)
  }));

  // Frame: full-bleed desktop, or a centered phone for mobile preview.
  const frame = device === "mobile" ? {
    width: 402,
    height: "100%",
    maxHeight: 860,
    borderRadius: 30,
    overflow: "hidden",
    boxShadow: "0 40px 120px rgba(0,0,0,0.5), 0 0 0 1px var(--v-hairline)"
  } : {
    width: "100%",
    height: "100%"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: device === "mobile" ? "var(--v-bg)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: hostRef,
    style: {
      position: "relative",
      display: "flex",
      background: "var(--v-bg)",
      color: "var(--v-fg)",
      fontFamily: "var(--v-font)",
      ...frame
    }
  }, /*#__PURE__*/React.createElement(FloatingControls, {
    theme: theme,
    onToggleTheme: () => setTheme(t => t === "dark" ? "light" : "dark"),
    device: device,
    onToggleDevice: () => setDevice(d => d === "mobile" ? "desktop" : "mobile")
  }), !compact && /*#__PURE__*/React.createElement(window.Sidebar, {
    view: view,
    onNav: setView,
    theme: theme,
    onToggleTheme: () => setTheme(t => t === "dark" ? "light" : "dark"),
    favCount: favs.length
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }
  }, compact && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 18px 6px"
    }
  }, /*#__PURE__*/React.createElement(window.Logo, null), /*#__PURE__*/React.createElement(window.ThemeToggle, {
    theme: theme,
    onToggle: () => setTheme(t => t === "dark" ? "light" : "dark")
  })), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: compact ? "8px 18px 20px" : "0 32px 28px",
      paddingBottom: current ? compact ? 150 : 100 : compact ? 80 : 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto"
    }
  }, content)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 45
    }
  }, current && /*#__PURE__*/React.createElement(window.MiniPlayer, {
    station: current,
    playing: playing,
    onToggle: toggle,
    onNext: () => tune(1),
    onExpand: () => setNpOpen(true),
    isFav: isFav(current),
    onFav: () => toggleFav()
  }), compact && /*#__PURE__*/React.createElement(window.MobileNav, {
    view: view,
    onNav: setView,
    favCount: favs.length
  }))), /*#__PURE__*/React.createElement(window.NowPlaying, {
    station: current,
    playing: playing,
    open: npOpen,
    onClose: () => setNpOpen(false),
    onToggle: toggle,
    onNext: () => tune(1),
    onPrev: () => tune(-1),
    isFav: isFav(current),
    onFav: () => toggleFav(),
    volume: volume,
    onVolume: setVolume,
    onShare: share
  }), /*#__PURE__*/React.createElement(ShareToast, {
    show: toast
  })));
}
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_player_v2/prototype/app.jsx", error: String((e && e.message) || e) }); }

// design_handoff_player_v2/prototype/chrome.jsx
try { (() => {
// V2 chrome — desktop sidebar, mobile bottom nav, top bar.
const {
  Icon
} = window.InternetRadioDesignSystem_7e870d;
const NAV = [{
  key: "home",
  label: "Home",
  icon: "home"
}, {
  key: "search",
  label: "Search",
  icon: "search"
}, {
  key: "browse",
  label: "Browse",
  icon: "globe"
}, {
  key: "library",
  label: "Library",
  icon: "library"
}];

// Extra glyphs not in the DS Icon set.
function NavGlyph({
  name,
  size = 22,
  active
}) {
  const sw = active ? 2.2 : 1.9;
  if (name === "home") return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: active ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 10.5 12 3l9 7.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5",
    fill: active ? "currentColor" : "none"
  }));
  if (name === "library") return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 4v17M10 4v17"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "4",
    width: "6",
    height: "17",
    rx: "1.5",
    fill: active ? "currentColor" : "none",
    transform: "rotate(12 17 12)"
  }));
  return /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: size,
    strokeWidth: sw
  });
}
function Logo({
  compact
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      flexShrink: 0,
      borderRadius: 11,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
      color: "#fff",
      boxShadow: "0 4px 16px rgba(108,92,231,0.4)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "signal",
    size: 20
  })), !compact && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 750,
      letterSpacing: "-0.02em",
      color: "var(--v-fg)"
    }
  }, "Internet Radio"));
}
function Sidebar({
  view,
  onNav,
  theme,
  onToggleTheme,
  favCount
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 248,
      flexShrink: 0,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "20px 14px",
      gap: 6,
      borderRight: "1px solid var(--v-hairline)",
      background: "var(--v-bg-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 10px 18px"
    }
  }, /*#__PURE__*/React.createElement(Logo, null)), NAV.map(n => {
    const active = view === n.key;
    return /*#__PURE__*/React.createElement("button", {
      key: n.key,
      type: "button",
      onClick: () => onNav(n.key),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "11px 14px",
        borderRadius: "var(--v-r-md)",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        background: active ? "var(--v-elev-2)" : "transparent",
        color: active ? "var(--v-fg)" : "var(--v-fg-3)",
        fontSize: 15,
        fontWeight: active ? 700 : 600,
        transition: "background .15s, color .15s"
      }
    }, /*#__PURE__*/React.createElement(NavGlyph, {
      name: n.icon,
      size: 22,
      active: active
    }), /*#__PURE__*/React.createElement("span", null, n.label), n.key === "library" && favCount > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontSize: 11,
        fontWeight: 700,
        color: "var(--v-accent)",
        background: "var(--v-accent-soft)",
        borderRadius: 99,
        padding: "2px 8px"
      }
    }, favCount));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    onToggle: onToggleTheme,
    wide: true
  }));
}
function ThemeToggle({
  theme,
  onToggle,
  wide
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    "aria-label": "Toggle theme",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: wide ? "flex-start" : "center",
      gap: 10,
      padding: wide ? "11px 14px" : 0,
      width: wide ? "100%" : 38,
      height: wide ? "auto" : 38,
      borderRadius: wide ? "var(--v-r-md)" : "var(--v-r-pill)",
      cursor: "pointer",
      border: "1px solid var(--v-hairline)",
      background: "var(--v-elev)",
      color: "var(--v-fg-2)",
      fontSize: 14,
      fontWeight: 600
    }
  }, theme === "dark" ? /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
  })), wide && /*#__PURE__*/React.createElement("span", null, theme === "dark" ? "Light mode" : "Dark mode"));
}

// Sticky top bar inside the main scroll area (desktop): greeting + theme.
function TopBar({
  title,
  theme,
  onToggleTheme,
  onBack
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "16px 4px",
      background: "linear-gradient(var(--v-bg) 60%, transparent)"
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    "aria-label": "Back",
    style: {
      width: 36,
      height: 36,
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      background: "var(--v-elev-2)",
      color: "var(--v-fg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 18,
    strokeWidth: 2.4
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: "-0.03em",
      color: "var(--v-fg)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto"
    }
  }));
}
function MobileNav({
  view,
  onNav,
  favCount
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 40,
      display: "flex",
      borderTop: "1px solid var(--v-hairline)",
      background: "var(--v-mat-chrome)",
      backdropFilter: "var(--v-mat-blur)",
      WebkitBackdropFilter: "var(--v-mat-blur)",
      padding: "8px 8px max(8px, env(safe-area-inset-bottom))"
    }
  }, NAV.map(n => {
    const active = view === n.key;
    return /*#__PURE__*/React.createElement("button", {
      key: n.key,
      type: "button",
      onClick: () => onNav(n.key),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "6px 0",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: active ? "var(--v-accent)" : "var(--v-fg-3)",
        fontSize: 10.5,
        fontWeight: 650
      }
    }, /*#__PURE__*/React.createElement(NavGlyph, {
      name: n.icon,
      size: 23,
      active: active
    }), n.label);
  }));
}
Object.assign(window, {
  Sidebar,
  MobileNav,
  TopBar,
  ThemeToggle,
  Logo,
  NavGlyph
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_player_v2/prototype/chrome.jsx", error: String((e && e.message) || e) }); }

// design_handoff_player_v2/prototype/gen.js
try { (() => {
/* ───────────────────────────────────────────────────────────────
   Internet Radio V2 — generative artwork + catalog.
   Every station gets a deterministic, harmonious gradient "cover"
   derived from its name — so the UI is rich even though real radio
   stations only ship a tiny favicon.
   ─────────────────────────────────────────────────────────────── */
(function () {
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // → { from, to, h1, h2, css, cssSoft } — a duotone gradient cover.
  function gradientFor(seed) {
    const h = hash(seed || "radio");
    const h1 = h % 360;
    const h2 = (h1 + 30 + h % 50) % 360;
    const s1 = 68 + h % 18;
    const l1 = 56 + h % 10;
    const s2 = 70 + (h >> 3) % 16;
    const l2 = 34 + (h >> 5) % 10;
    const from = `hsl(${h1} ${s1}% ${l1}%)`;
    const to = `hsl(${h2} ${s2}% ${l2}%)`;
    const ax = 18 + h % 30;
    const ay = 12 + (h >> 4) % 30;
    const css = `radial-gradient(120% 120% at ${ax}% ${ay}%, ${from} 0%, transparent 58%),` + `radial-gradient(130% 130% at ${100 - ax}% ${100 - ay}%, ${to} 0%, transparent 60%),` + `linear-gradient(135deg, hsl(${h1} ${s1}% ${l1 - 8}%), hsl(${h2} ${s2}% ${l2}%))`;
    return {
      from,
      to,
      h1,
      h2,
      css
    };
  }
  function initials(name) {
    const cleaned = (name || "").replace(/^(radio|the)\s+/i, "").trim();
    const parts = cleaned.split(/[\s.\-]+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // ── Catalog ──────────────────────────────────────────────────
  // A broad country list (Radio Browser covers ~230 countries; this is a
  // representative slice). Sorted by station count, like the real /countries feed.
  const COUNTRIES = [{
    name: "United States",
    iso: "US",
    count: 5392
  }, {
    name: "Germany",
    iso: "DE",
    count: 3104
  }, {
    name: "United Kingdom",
    iso: "GB",
    count: 2841
  }, {
    name: "France",
    iso: "FR",
    count: 1876
  }, {
    name: "Brazil",
    iso: "BR",
    count: 1442
  }, {
    name: "India",
    iso: "IN",
    count: 1395
  }, {
    name: "Italy",
    iso: "IT",
    count: 1330
  }, {
    name: "Japan",
    iso: "JP",
    count: 1209
  }, {
    name: "Spain",
    iso: "ES",
    count: 1188
  }, {
    name: "Canada",
    iso: "CA",
    count: 1120
  }, {
    name: "Russia",
    iso: "RU",
    count: 1064
  }, {
    name: "Mexico",
    iso: "MX",
    count: 980
  }, {
    name: "Poland",
    iso: "PL",
    count: 942
  }, {
    name: "Netherlands",
    iso: "NL",
    count: 904
  }, {
    name: "Argentina",
    iso: "AR",
    count: 870
  }, {
    name: "Greece",
    iso: "GR",
    count: 812
  }, {
    name: "Turkey",
    iso: "TR",
    count: 786
  }, {
    name: "Australia",
    iso: "AU",
    count: 742
  }, {
    name: "Indonesia",
    iso: "ID",
    count: 708
  }, {
    name: "Ukraine",
    iso: "UA",
    count: 690
  }, {
    name: "Portugal",
    iso: "PT",
    count: 654
  }, {
    name: "Romania",
    iso: "RO",
    count: 632
  }, {
    name: "South Korea",
    iso: "KR",
    count: 612
  }, {
    name: "Austria",
    iso: "AT",
    count: 590
  }, {
    name: "Colombia",
    iso: "CO",
    count: 566
  }, {
    name: "Switzerland",
    iso: "CH",
    count: 552
  }, {
    name: "Sweden",
    iso: "SE",
    count: 528
  }, {
    name: "Belgium",
    iso: "BE",
    count: 514
  }, {
    name: "Chile",
    iso: "CL",
    count: 498
  }, {
    name: "Czechia",
    iso: "CZ",
    count: 472
  }, {
    name: "Hungary",
    iso: "HU",
    count: 448
  }, {
    name: "Denmark",
    iso: "DK",
    count: 430
  }, {
    name: "Finland",
    iso: "FI",
    count: 412
  }, {
    name: "Norway",
    iso: "NO",
    count: 398
  }, {
    name: "Ireland",
    iso: "IE",
    count: 376
  }, {
    name: "Peru",
    iso: "PE",
    count: 354
  }, {
    name: "Philippines",
    iso: "PH",
    count: 342
  }, {
    name: "South Africa",
    iso: "ZA",
    count: 328
  }, {
    name: "New Zealand",
    iso: "NZ",
    count: 296
  }, {
    name: "Thailand",
    iso: "TH",
    count: 278
  }, {
    name: "China",
    iso: "CN",
    count: 262
  }, {
    name: "Croatia",
    iso: "HR",
    count: 244
  }, {
    name: "Serbia",
    iso: "RS",
    count: 228
  }, {
    name: "Egypt",
    iso: "EG",
    count: 196
  }];

  // Fields mirror Radio Browser: votes (user votes) + clickcount (cumulative plays).
  // clicktrend (the "trending" growth metric) is faked by ordering position here.
  function S(name, country, iso, lang, genres, bitrate, codec) {
    const h = hash(name);
    return {
      stationuuid: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      country,
      iso,
      language: lang,
      tags: genres.join(","),
      genres,
      bitrate,
      codec,
      votes: 80 + h % 9000,
      clickcount: 1000 + h % 240000
    };
  }
  const STATIONS = [S("BBC Radio 6 Music", "United Kingdom", "GB", "English", ["Alternative", "Indie", "Eclectic"], 128, "MP3"), S("KEXP 90.3 FM", "United States", "US", "English", ["Eclectic", "Indie", "Public"], 128, "MP3"), S("FIP", "France", "FR", "French", ["Eclectic", "Jazz", "World"], 192, "MP3"), S("NTS Radio 1", "United Kingdom", "GB", "English", ["Electronic", "Eclectic"], 256, "AAC"), S("Jazz FM", "United Kingdom", "GB", "English", ["Jazz", "Soul", "Blues"], 256, "MP3"), S("J-WAVE 81.3", "Japan", "JP", "Japanese", ["J-Pop", "City Pop"], 128, "AAC"), S("Radio Nova", "France", "FR", "French", ["Eclectic", "Groove"], 128, "AAC"), S("Triple J", "Australia", "AU", "English", ["Alternative", "Indie"], 192, "MP3"), S("WNYC 93.9", "United States", "US", "English", ["News", "Talk", "Public"], 128, "AAC"), S("Classic FM", "United Kingdom", "GB", "English", ["Classical"], 192, "AAC"), S("Hot 97", "United States", "US", "English", ["Hip-Hop", "Rap"], 128, "MP3"), S("FluxFM Berlin", "Germany", "DE", "German", ["Alternative", "Indie"], 128, "MP3"), S("Rinse FM", "United Kingdom", "GB", "English", ["Electronic", "Grime", "House"], 256, "AAC"), S("Tokyo FM", "Japan", "JP", "Japanese", ["Pop", "Talk"], 128, "MP3"), S("Antena 1", "Brazil", "BR", "Portuguese", ["Soft Rock", "Pop"], 128, "MP3"), S("Los 40", "Spain", "ES", "Spanish", ["Pop", "Hits"], 128, "MP3"), S("Radio Deejay", "Italy", "IT", "Italian", ["Pop", "Dance"], 128, "MP3"), S("1LIVE", "Germany", "DE", "German", ["Pop", "Charts"], 128, "AAC"), S("Worldwide FM", "United Kingdom", "GB", "English", ["Jazz", "Soul", "Global"], 256, "AAC"), S("KCRW", "United States", "US", "English", ["Eclectic", "Indie", "Public"], 128, "AAC"), S("Capital London", "United Kingdom", "GB", "English", ["Pop", "Hits"], 128, "MP3"), S("InterFM897", "Japan", "JP", "Japanese", ["Bilingual", "Rock"], 192, "MP3"), S("France Inter", "France", "FR", "French", ["News", "Culture", "Talk"], 128, "MP3"), S("Kiss Fresh", "United Kingdom", "GB", "English", ["Dance", "Electronic"], 128, "MP3")];
  const GENRES = [{
    name: "Jazz & Soul",
    key: "jazz"
  }, {
    name: "Electronic",
    key: "electronic"
  }, {
    name: "Indie & Alternative",
    key: "indie"
  }, {
    name: "Pop & Hits",
    key: "pop"
  }, {
    name: "Classical",
    key: "classical"
  }, {
    name: "News & Talk",
    key: "news"
  }, {
    name: "Hip-Hop",
    key: "hip-hop"
  }, {
    name: "World",
    key: "world"
  }];
  function byGenre(substr) {
    return STATIONS.filter(s => s.genres.some(g => g.toLowerCase().includes(substr)));
  }
  const byVotes = [...STATIONS].sort((a, b) => b.votes - a.votes);
  const byPlays = [...STATIONS].sort((a, b) => b.clickcount - a.clickcount);
  window.IR2 = {
    gradientFor,
    initials,
    hash,
    countries: COUNTRIES,
    stations: STATIONS,
    genres: GENRES,
    // Every shelf below maps to a real Radio Browser ordering / filter:
    topStation: byVotes[0],
    // order=votes, take #1
    trending: STATIONS.slice(0, 8),
    // order=clicktrend
    popular: byPlays.slice(0, 8),
    // order=clickcount
    mostVoted: byVotes.slice(0, 8),
    // order=votes
    byGenre,
    byCountry: iso => {
      const real = STATIONS.filter(s => s.iso === iso);
      if (real.length >= 3) return real;
      // Synthesize a plausible lineup for countries without seeded stations,
      // so every country drills into content (the live API returns real ones).
      const c = COUNTRIES.find(x => x.iso === iso) || {
        name: iso,
        iso
      };
      const kinds = [["FM", ["Pop", "Hits"]], ["Radio Uno", ["Talk", "News"]], ["Classic", ["Classical"]], ["Beat", ["Dance", "Electronic"]], ["Jazz Cafe", ["Jazz", "Soul"]], ["Rock", ["Rock", "Alternative"]], ["Capital", ["Pop", "Top 40"]], ["Cultura", ["Culture", "Talk"]]];
      const synth = kinds.map(([suffix, genres], i) => S(`${c.name.split(" ")[0]} ${suffix}`, c.name, iso, "", genres, [128, 192, 256][i % 3], i % 2 ? "AAC" : "MP3"));
      return real.concat(synth).slice(0, 8);
    },
    search: q => {
      q = q.trim().toLowerCase();
      if (!q) return [];
      return STATIONS.filter(s => s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q) || s.genres.some(g => g.toLowerCase().includes(q)));
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_player_v2/prototype/gen.js", error: String((e && e.message) || e) }); }

// design_handoff_player_v2/prototype/home.jsx
try { (() => {
// V2 Home / Discover — editorial hero + scrolling shelves.
const {
  Icon,
  Flag
} = window.InternetRadioDesignSystem_7e870d;
function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}
function Hero({
  station,
  playing,
  onPlay,
  onOpen
}) {
  const g = window.IR2.gradientFor(station.name);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onOpen(station),
    style: {
      position: "relative",
      borderRadius: "var(--v-r-xl)",
      overflow: "hidden",
      cursor: "pointer",
      padding: "clamp(20px, 4vw, 36px)",
      marginBottom: 26,
      minHeight: 220,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      background: g.css,
      boxShadow: "var(--v-shadow-card)",
      animation: "v-pop-in .5s var(--v-ease)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.45))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "5px 12px",
      borderRadius: 99,
      background: "rgba(255,255,255,0.18)",
      backdropFilter: "blur(8px)",
      color: "#fff",
      fontSize: 11.5,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 99,
      background: "#fff",
      boxShadow: "0 0 8px #fff"
    }
  }), " Top Station Today"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: "clamp(28px, 5vw, 46px)",
      fontWeight: 820,
      letterSpacing: "-0.035em",
      color: "#fff",
      lineHeight: 1.02,
      textShadow: "0 2px 24px rgba(0,0,0,0.3)"
    }
  }, station.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 18px",
      color: "rgba(255,255,255,0.82)",
      fontSize: 15,
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Flag, {
    code: station.iso,
    width: 18,
    radius: 3
  }), " ", station.country, " \xB7 ", station.genres.join(" · ")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onPlay(station);
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      padding: "12px 24px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      background: "#fff",
      color: "#111",
      fontSize: 15,
      fontWeight: 750,
      boxShadow: "0 8px 28px rgba(0,0,0,0.25)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: playing ? "pause" : "play",
    size: 18
  }), " ", playing ? "Pause" : "Listen Now"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "rgba(255,255,255,0.7)",
      fontSize: 13,
      fontWeight: 600
    }
  }, station.votes.toLocaleString(), " votes"))));
}
function QuickTile({
  station,
  playing,
  onPlay,
  onOpen
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onOpen(station),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      borderRadius: "var(--v-r-md)",
      overflow: "hidden",
      cursor: "pointer",
      background: hover ? "var(--v-elev-3)" : "var(--v-elev-2)",
      transition: "background .18s",
      height: 56
    }
  }, /*#__PURE__*/React.createElement(window.Cover, {
    station: station,
    size: 56,
    radius: "0",
    initials: true,
    playing: playing
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: 13.5,
      fontWeight: 700,
      color: "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: 12,
      opacity: hover ? 1 : 0,
      transition: "opacity .15s"
    }
  }, /*#__PURE__*/React.createElement(window.PlayFab, {
    playing: playing,
    size: 36,
    onClick: e => {
      e.stopPropagation();
      onPlay(station);
    }
  })));
}
function HomeView({
  current,
  playing,
  onPlay,
  onOpen,
  country
}) {
  const G = window.IR2;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "v-fade .35s ease"
    }
  }, /*#__PURE__*/React.createElement(window.TopBar, {
    title: greeting()
  }), /*#__PURE__*/React.createElement(Hero, {
    station: G.topStation,
    playing: playing && current?.stationuuid === G.topStation.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: 10,
      marginBottom: 30
    }
  }, G.trending.slice(0, 6).map(s => /*#__PURE__*/React.createElement(QuickTile, {
    key: s.stationuuid,
    station: s,
    playing: playing && current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }))), /*#__PURE__*/React.createElement(window.Shelf, {
    title: "Trending now"
  }, G.trending.map(s => /*#__PURE__*/React.createElement(window.StationCard, {
    key: s.stationuuid,
    station: s,
    playing: playing && current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }))), /*#__PURE__*/React.createElement(window.Shelf, {
    title: "Most popular"
  }, G.popular.map(s => /*#__PURE__*/React.createElement(window.StationCard, {
    key: s.stationuuid,
    station: s,
    playing: playing && current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }))), /*#__PURE__*/React.createElement(window.Shelf, {
    title: "Jazz & Soul"
  }, G.byGenre("jazz").concat(G.byGenre("soul")).map((s, i) => /*#__PURE__*/React.createElement(window.StationCard, {
    key: s.stationuuid + i,
    station: s,
    playing: playing && current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }))), /*#__PURE__*/React.createElement(window.Shelf, {
    title: "Most voted"
  }, G.mostVoted.map((s, i) => /*#__PURE__*/React.createElement(window.StationCard, {
    key: s.stationuuid + i,
    station: s,
    playing: playing && current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }))));
}
Object.assign(window, {
  HomeView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_player_v2/prototype/home.jsx", error: String((e && e.message) || e) }); }

// design_handoff_player_v2/prototype/player.jsx
try { (() => {
// V2 player — docked mini bar + full-screen Now Playing (parallax, ambient).
const {
  Icon,
  Flag
} = window.InternetRadioDesignSystem_7e870d;
function MiniPlayer({
  station,
  playing,
  onToggle,
  onNext,
  onExpand,
  isFav,
  onFav
}) {
  if (!station) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onExpand,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      cursor: "pointer",
      borderTop: "1px solid var(--v-hairline)",
      background: "var(--v-mat-chrome)",
      backdropFilter: "var(--v-mat-blur)",
      WebkitBackdropFilter: "var(--v-mat-blur)"
    }
  }, /*#__PURE__*/React.createElement(window.Cover, {
    station: station,
    size: 48,
    radius: "10px",
    playing: playing
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--v-fg-3)",
      marginTop: 1,
      display: "flex",
      alignItems: "center",
      gap: 6,
      whiteSpace: "nowrap",
      overflow: "hidden"
    }
  }, playing ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      color: "var(--v-accent)",
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: "var(--v-accent)"
    }
  }), "LIVE") : "Paused", " \xB7 ", station.country)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onFav();
    },
    "aria-label": "Favorite",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: isFav ? "var(--v-accent)" : "var(--v-fg-3)",
      display: "inline-flex",
      padding: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 20,
    style: {
      fill: isFav ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: 2
    }
  })), /*#__PURE__*/React.createElement(window.PlayFab, {
    playing: playing,
    size: 42,
    onClick: e => {
      e.stopPropagation();
      onToggle();
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onNext();
    },
    "aria-label": "Next",
    className: "v-only-wide",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--v-fg-2)",
      display: "inline-flex",
      padding: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "next",
    size: 22
  })));
}
function NowPlaying({
  station,
  playing,
  open,
  onClose,
  onToggle,
  onNext,
  onPrev,
  isFav,
  onFav,
  volume,
  onVolume,
  onShare
}) {
  const ref = React.useRef(null);
  const [px, setPx] = React.useState({
    x: 0,
    y: 0
  });
  const [elapsed, setElapsed] = React.useState(0);
  React.useEffect(() => {
    if (!open || !playing) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [open, playing]);
  React.useEffect(() => {
    setElapsed(0);
  }, [station]);
  if (!station) return null;
  const g = window.IR2.gradientFor(station.name);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setPx({
      x,
      y
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: () => setPx({
      x: 0,
      y: 0
    }),
    "aria-hidden": !open,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 60,
      overflow: "hidden",
      transform: open ? "translateY(0)" : "translateY(100%)",
      transition: "transform .5s var(--v-ease)",
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "-20%",
      background: g.css,
      filter: "blur(80px) saturate(150%)",
      transform: `scale(1.2) translate(${px.x * -24}px, ${px.y * -24}px)`,
      transition: "transform .3s var(--v-ease-soft)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.62))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "clamp(18px, 3vw, 34px)",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 520,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Collapse",
    style: {
      width: 40,
      height: 40,
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      background: "rgba(255,255,255,0.16)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      opacity: 0.8
    }
  }, "Now Playing"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onShare,
    "aria-label": "Share",
    style: {
      width: 40,
      height: 40,
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      background: "rgba(255,255,255,0.16)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      margin: "auto 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: `translate(${px.x * 16}px, ${px.y * 16}px) rotateX(${px.y * -5}deg) rotateY(${px.x * 5}deg)`,
      transition: "transform .25s var(--v-ease-soft)",
      transformStyle: "preserve-3d",
      perspective: 800
    }
  }, /*#__PURE__*/React.createElement(window.Cover, {
    station: station,
    size: "min(64vw, 340px)",
    radius: "var(--v-r-xl)",
    initials: true,
    playing: playing,
    style: {
      boxShadow: "0 40px 90px rgba(0,0,0,0.5)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      marginTop: 30,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: "clamp(24px, 5vw, 34px)",
      fontWeight: 820,
      letterSpacing: "-0.03em",
      lineHeight: 1.08
    }
  }, station.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: 15,
      opacity: 0.82,
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(Flag, {
    code: station.iso,
    width: 18,
    radius: 3
  }), " ", station.country, " \xB7 ", station.genres.join(" · "))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onFav,
    "aria-label": "Favorite",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "#fff",
      display: "inline-flex",
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 28,
    style: {
      fill: isFav ? "#fff" : "none",
      stroke: "#fff",
      strokeWidth: 2
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontVariantNumeric: "tabular-nums",
      opacity: 0.75
    }
  }, mm, ":", ss), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 26,
      display: "flex",
      alignItems: "center",
      gap: 2,
      overflow: "hidden"
    }
  }, Array.from({
    length: 64
  }).map((_, i) => {
    const h = 6 + window.IR2.hash(station.name + i) % 20;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        height: playing ? h + "px" : "4px",
        minWidth: 2,
        borderRadius: 2,
        background: "rgba(255,255,255,0.55)",
        transformOrigin: "center",
        animation: playing ? `v-eq ${0.6 + i % 5 * 0.12}s ease-in-out infinite` : "none",
        animationDelay: `${i % 7 * 0.07}s`
      }
    });
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11.5,
      fontWeight: 800,
      letterSpacing: "0.08em",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 99,
      background: "#fff",
      boxShadow: "0 0 8px #fff"
    }
  }), " LIVE")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onPrev,
    "aria-label": "Previous",
    style: transBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "prev",
    size: 30
  })), /*#__PURE__*/React.createElement(window.PlayFab, {
    playing: playing,
    size: 76,
    onClick: onToggle,
    style: {
      background: "#fff",
      color: "#111",
      boxShadow: "0 12px 40px rgba(0,0,0,0.35)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onNext,
    "aria-label": "Next",
    style: transBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "next",
    size: 30
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: "flex",
      alignItems: "center",
      gap: 12,
      maxWidth: 360,
      margin: "24px auto 8px",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "volume",
    size: 18,
    style: {
      opacity: 0.8
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 1,
    step: 0.01,
    value: volume,
    onChange: e => onVolume(parseFloat(e.target.value)),
    "aria-label": "Volume",
    className: "v-range-light",
    style: {
      flex: 1,
      height: 4
    }
  }))))));
}
const transBtn = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: "#fff",
  display: "inline-flex",
  padding: 4
};
Object.assign(window, {
  MiniPlayer,
  NowPlaying
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_player_v2/prototype/player.jsx", error: String((e && e.message) || e) }); }

// design_handoff_player_v2/prototype/ui.jsx
try { (() => {
// V2 shared primitives — generative cover, equalizer, cards, play button.
const {
  Icon,
  Flag
} = window.InternetRadioDesignSystem_7e870d;
const G = window.IR2;

// Generative gradient cover. `playing` overlays an equalizer.
function Cover({
  station,
  size = 160,
  radius = "var(--v-r-md)",
  initials = true,
  playing = false,
  style = {}
}) {
  const g = G.gradientFor(station.name);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: radius,
      overflow: "hidden",
      background: g.css,
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), var(--v-shadow-card)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style
    }
  }, initials && size >= 96 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      color: "rgba(255,255,255,0.92)",
      letterSpacing: "-0.03em",
      fontSize: size * 0.34,
      textShadow: "0 2px 14px rgba(0,0,0,0.3)",
      userSelect: "none"
    }
  }, G.initials(station.name)), initials && size < 96 && size >= 40 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      color: "rgba(255,255,255,0.92)",
      fontSize: size * 0.4
    }
  }, G.initials(station.name)[0]), playing && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.28)",
      backdropFilter: "blur(1px)"
    }
  }, /*#__PURE__*/React.createElement(Equalizer, {
    size: size > 120 ? 22 : 14
  })));
}
function Equalizer({
  size = 18,
  color = "#fff"
}) {
  const bars = [0, 1, 2, 3];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: size * 0.16,
      height: size
    },
    "aria-hidden": true
  }, bars.map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: size * 0.16,
      height: size,
      borderRadius: 99,
      background: color,
      transformOrigin: "bottom",
      animation: `v-eq ${0.7 + i * 0.18}s ease-in-out infinite`,
      animationDelay: `${i * 0.12}s`
    }
  })));
}

// Circular gradient play/pause button (the brand control).
function PlayFab({
  playing,
  onClick,
  size = 56,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-label": playing ? "Pause" : "Play",
    className: "v-fab",
    style: {
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: "var(--v-r-pill)",
      border: "none",
      cursor: "pointer",
      background: "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
      color: "var(--v-on-accent)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 28px rgba(108,92,231,0.45)",
      transition: "transform .12s var(--v-ease-soft)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: playing ? "pause" : "play",
    size: size * 0.42,
    style: {
      marginLeft: playing ? 0 : size * 0.03
    }
  }));
}

// Discover card (square cover + title + subtitle), used in shelves.
function StationCard({
  station,
  playing,
  onPlay,
  onOpen,
  width = 168
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onOpen(station),
    style: {
      width,
      flexShrink: 0,
      padding: 10,
      borderRadius: "var(--v-r-lg)",
      cursor: "pointer",
      background: hover ? "var(--v-elev-2)" : "transparent",
      transition: "background .2s var(--v-ease-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Cover, {
    station: station,
    size: width - 20,
    radius: "var(--v-r-md)",
    playing: playing
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 8,
      bottom: 8,
      opacity: hover || playing ? 1 : 0,
      transform: hover || playing ? "translateY(0)" : "translateY(8px)",
      transition: "opacity .22s var(--v-ease-soft), transform .22s var(--v-ease-soft)"
    }
  }, /*#__PURE__*/React.createElement(PlayFab, {
    playing: playing,
    size: 44,
    onClick: e => {
      e.stopPropagation();
      onPlay(station);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: "0 2px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 650,
      color: "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      fontSize: 12.5,
      color: "var(--v-fg-3)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.genres.slice(0, 2).join(" · "))));
}

// Horizontal scrolling shelf with a title.
function Shelf({
  title,
  action,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      padding: "0 4px 10px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 21,
      fontWeight: 750,
      letterSpacing: "-0.02em",
      color: "var(--v-fg)"
    }
  }, title), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: action.onClick,
    className: "v-link",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--v-fg-3)"
    }
  }, action.label)), /*#__PURE__*/React.createElement("div", {
    className: "v-shelf",
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      overflowY: "hidden",
      padding: "2px 0 6px",
      scrollSnapType: "x proximity"
    }
  }, children));
}

// Compact list row (Library / search results / now-playing queue).
function ListRow({
  station,
  index,
  playing,
  active,
  onPlay,
  onOpen,
  trailing
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onOpen(station),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "8px 12px",
      borderRadius: "var(--v-r-md)",
      cursor: "pointer",
      background: active ? "var(--v-accent-soft)" : hover ? "var(--v-elev-2)" : "transparent",
      transition: "background .15s var(--v-ease-soft)"
    }
  }, index != null && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      textAlign: "center",
      flexShrink: 0,
      color: active ? "var(--v-accent)" : "var(--v-fg-3)",
      fontSize: 14,
      fontVariantNumeric: "tabular-nums"
    }
  }, hover ? /*#__PURE__*/React.createElement(PlayMini, {
    onClick: e => {
      e.stopPropagation();
      onPlay(station);
    },
    active: active
  }) : active && playing ? /*#__PURE__*/React.createElement(Equalizer, {
    size: 13,
    color: "var(--v-accent)"
  }) : index), /*#__PURE__*/React.createElement(Cover, {
    station: station,
    size: 44,
    radius: "10px",
    initials: true,
    playing: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: active ? "var(--v-accent)" : "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontSize: 12.5,
      color: "var(--v-fg-3)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Flag, {
    code: station.iso,
    width: 15,
    radius: 2
  }), " ", station.country, " \xB7 ", station.genres[0])), trailing, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      fontSize: 12.5,
      color: "var(--v-fg-4)",
      fontVariantNumeric: "tabular-nums"
    }
  }, station.bitrate, "k"));
}
function PlayMini({
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-label": "Play",
    style: {
      border: "none",
      background: "transparent",
      color: "var(--v-fg)",
      cursor: "pointer",
      padding: 0,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 16
  }));
}
Object.assign(window, {
  Cover,
  Equalizer,
  PlayFab,
  StationCard,
  Shelf,
  ListRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_player_v2/prototype/ui.jsx", error: String((e && e.message) || e) }); }

// design_handoff_player_v2/prototype/views.jsx
try { (() => {
// V2 Search + Browse + Library views.
const {
  Icon,
  Flag
} = window.InternetRadioDesignSystem_7e870d;
function GenreTile({
  genre,
  onClick
}) {
  const g = window.IR2.gradientFor(genre.name + genre.key);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      position: "relative",
      height: 104,
      borderRadius: "var(--v-r-md)",
      overflow: "hidden",
      border: "none",
      cursor: "pointer",
      background: g.css,
      textAlign: "left",
      padding: 16,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontSize: 17,
      fontWeight: 780,
      letterSpacing: "-0.02em",
      textShadow: "0 2px 12px rgba(0,0,0,0.3)"
    }
  }, genre.name), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(120deg, transparent 40%, rgba(0,0,0,0.25))"
    }
  }));
}
function SearchView({
  current,
  playing,
  onPlay,
  onOpen
}) {
  const G = window.IR2;
  const [q, setQ] = React.useState("");
  const [country, setCountry] = React.useState(null);
  const results = G.search(q);
  const countryMatches = q.trim() ? G.countries.filter(c => c.name.toLowerCase().includes(q.trim().toLowerCase())) : [];

  // Drill-in: a country's stations.
  if (country) {
    const list = G.byCountry(country.iso);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        animation: "v-fade .3s ease"
      }
    }, /*#__PURE__*/React.createElement(window.TopBar, {
      title: country.name,
      onBack: () => setCountry(null)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "0 4px 18px",
        color: "var(--v-fg-3)",
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement(Flag, {
      code: country.iso,
      width: 22,
      radius: 3
    }), " ", country.count.toLocaleString(), " stations \xB7 showing top ", list.length), list.map((s, i) => /*#__PURE__*/React.createElement(window.ListRow, {
      key: s.stationuuid,
      station: s,
      index: i + 1,
      playing: playing,
      active: current?.stationuuid === s.stationuuid,
      onPlay: onPlay,
      onOpen: onOpen
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "v-fade .35s ease"
    }
  }, /*#__PURE__*/React.createElement(window.TopBar, {
    title: "Search"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginBottom: 24,
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 20,
    strokeWidth: 2,
    style: {
      position: "absolute",
      left: 16,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--v-fg-3)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Stations, genres, countries\u2026",
    style: {
      width: "100%",
      padding: "14px 16px 14px 46px",
      fontSize: 16,
      fontFamily: "var(--v-font)",
      fontWeight: 500,
      color: "var(--v-fg)",
      background: "var(--v-elev-2)",
      border: "1px solid var(--v-hairline)",
      borderRadius: "var(--v-r-md)",
      outline: "none"
    }
  })), q ? results.length || countryMatches.length ? /*#__PURE__*/React.createElement("div", null, countryMatches.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--v-fg-3)",
      margin: "0 4px 8px"
    }
  }, "Countries"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 10
    }
  }, countryMatches.slice(0, 6).map(c => /*#__PURE__*/React.createElement(CountryCard, {
    key: c.iso,
    c: c,
    onClick: () => setCountry(c)
  })))), results.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--v-fg-3)",
      margin: "0 4px 8px"
    }
  }, results.length, " station", results.length !== 1 ? "s" : ""), results.map((s, i) => /*#__PURE__*/React.createElement(window.ListRow, {
    key: s.stationuuid,
    station: s,
    index: i + 1,
    playing: playing,
    active: current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  })))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "60px 0",
      textAlign: "center",
      color: "var(--v-fg-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 650,
      color: "var(--v-fg-2)"
    }
  }, "No matches for \u201C", q, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      marginTop: 6
    }
  }, "Try a genre like \u201Cjazz\u201D or a country like \u201CJapan\u201D.")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, null, "Browse by country"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 10,
      marginBottom: 30
    }
  }, G.countries.map(c => /*#__PURE__*/React.createElement(CountryCard, {
    key: c.iso,
    c: c,
    onClick: () => setCountry(c)
  }))), /*#__PURE__*/React.createElement(SectionHead, null, "Browse all genres"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      gap: 12
    }
  }, G.genres.map(genre => /*#__PURE__*/React.createElement(GenreTile, {
    key: genre.key,
    genre: genre,
    onClick: () => setQ(genre.name.split(" ")[0])
  })))));
}
function SectionHead({
  children
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 4px 14px",
      fontSize: 21,
      fontWeight: 750,
      letterSpacing: "-0.02em",
      color: "var(--v-fg)"
    }
  }, children);
}
function CountryCard({
  c,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: 14,
      borderRadius: "var(--v-r-md)",
      border: "1px solid var(--v-hairline)",
      background: hover ? "var(--v-elev-2)" : "var(--v-elev)",
      cursor: "pointer",
      textAlign: "left",
      transition: "background .15s, transform .15s",
      transform: hover ? "translateY(-2px)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 36,
      borderRadius: 8,
      overflow: "hidden",
      flexShrink: 0,
      boxShadow: "var(--v-shadow-card)"
    }
  }, /*#__PURE__*/React.createElement(Flag, {
    code: c.iso,
    width: 48,
    radius: 0,
    style: {
      height: 36
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--v-fg-3)",
      marginTop: 2
    }
  }, c.count.toLocaleString(), " stations")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 18,
    strokeWidth: 2.4,
    style: {
      color: "var(--v-fg-4)"
    }
  }));
}
function BrowseView({
  current,
  playing,
  onPlay,
  onOpen
}) {
  const G = window.IR2;
  const [country, setCountry] = React.useState(null);
  if (country) {
    const list = G.byCountry(country.iso);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        animation: "v-fade .3s ease"
      }
    }, /*#__PURE__*/React.createElement(window.TopBar, {
      title: country.name,
      onBack: () => setCountry(null)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "0 4px 18px",
        color: "var(--v-fg-3)",
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement(Flag, {
      code: country.iso,
      width: 22,
      radius: 3
    }), " ", country.count.toLocaleString(), " stations \xB7 showing top ", list.length), list.map((s, i) => /*#__PURE__*/React.createElement(window.ListRow, {
      key: s.stationuuid,
      station: s,
      index: i + 1,
      playing: playing,
      active: current?.stationuuid === s.stationuuid,
      onPlay: onPlay,
      onOpen: onOpen
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "v-fade .35s ease"
    }
  }, /*#__PURE__*/React.createElement(window.TopBar, {
    title: "Browse"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 4px 18px",
      color: "var(--v-fg-3)",
      fontSize: 14.5
    }
  }, "Tune in to live radio from around the world."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 12
    }
  }, G.countries.map(c => /*#__PURE__*/React.createElement(CountryCard, {
    key: c.iso,
    c: c,
    onClick: () => setCountry(c)
  }))));
}
function LibraryView({
  favorites,
  current,
  playing,
  onPlay,
  onOpen,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "v-fade .35s ease"
    }
  }, /*#__PURE__*/React.createElement(window.TopBar, {
    title: "Your Library"
  }), favorites.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "70px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      margin: "0 auto 18px",
      borderRadius: "var(--v-r-lg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--v-elev-2)",
      color: "var(--v-fg-3)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "40",
    height: "40",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 4v17M10 4v17"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "4",
    width: "6",
    height: "17",
    rx: "1.5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 750,
      color: "var(--v-fg)"
    }
  }, "Build your collection"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      color: "var(--v-fg-3)",
      marginTop: 8
    }
  }, "Tap the heart on any station to save it here.")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--v-fg-3)",
      margin: "0 4px 8px"
    }
  }, favorites.length, " saved station", favorites.length !== 1 ? "s" : ""), favorites.map((s, i) => /*#__PURE__*/React.createElement(window.ListRow, {
    key: s.stationuuid,
    station: s,
    index: i + 1,
    playing: playing,
    active: current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen,
    trailing: /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: e => {
        e.stopPropagation();
        onRemove(s);
      },
      "aria-label": "Remove",
      style: {
        border: "none",
        background: "transparent",
        color: "var(--v-accent)",
        cursor: "pointer",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 18,
      style: {
        fill: "currentColor",
        stroke: "none"
      }
    }))
  }))));
}
Object.assign(window, {
  SearchView,
  BrowseView,
  LibraryView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_player_v2/prototype/views.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio-v2/app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// V2 app — responsive orchestrator (sidebar desktop / tabs mobile), theme + device toggles.
const {
  Icon
} = window.InternetRadioDesignSystem_7e870d;
function ShareToast({
  show
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: 110,
      transform: `translateX(-50%) translateY(${show ? 0 : 12}px)`,
      zIndex: 90,
      opacity: show ? 1 : 0,
      pointerEvents: "none",
      transition: "opacity .25s, transform .25s",
      padding: "11px 18px",
      borderRadius: 99,
      background: "var(--v-mat-chrome)",
      backdropFilter: "var(--v-mat-blur)",
      border: "1px solid var(--v-hairline-2)",
      color: "var(--v-fg)",
      fontSize: 13.5,
      fontWeight: 650,
      boxShadow: "var(--v-shadow-pop)",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    strokeWidth: 2.6,
    style: {
      color: "var(--v-accent)"
    }
  }), " Link copied to clipboard");
}
function FloatingControls({
  theme,
  onToggleTheme,
  device,
  onToggleDevice
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      right: 16,
      zIndex: 95,
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleDevice,
    title: "Toggle device",
    style: fcBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: device === "mobile" ? "globe" : "list",
    size: 16,
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 650
    }
  }, device === "mobile" ? "Desktop" : "Mobile")));
}
const fcBtn = {
  display: "flex",
  alignItems: "center",
  gap: 7,
  padding: "8px 12px",
  borderRadius: 99,
  cursor: "pointer",
  border: "1px solid var(--v-hairline-2)",
  background: "var(--v-mat-chrome)",
  backdropFilter: "var(--v-mat-blur)",
  color: "var(--v-fg-2)"
};
function App() {
  const G = window.IR2;
  const [theme, setTheme] = React.useState("dark");
  const [device, setDevice] = React.useState("desktop"); // desktop | mobile
  const [view, setView] = React.useState("home");
  const [current, setCurrent] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [npOpen, setNpOpen] = React.useState(false);
  const [favs, setFavs] = React.useState(() => [G.stations[4], G.stations[2]]);
  const [volume, setVolume] = React.useState(0.8);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [width, setWidth] = React.useState(1100);
  const hostRef = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  React.useEffect(() => {
    if (!hostRef.current || !window.ResizeObserver) return;
    const ro = new ResizeObserver(entries => setWidth(entries[0].contentRect.width));
    ro.observe(hostRef.current);
    return () => ro.disconnect();
  }, []);
  const compact = device === "mobile" || width < 760;
  const play = s => {
    setCurrent(s);
    setPlaying(true);
  };
  const toggle = () => {
    if (current) setPlaying(p => !p);
  };
  const open = s => {
    setCurrent(s);
    setPlaying(true);
    setNpOpen(true);
  };
  const idx = current ? G.stations.findIndex(s => s.stationuuid === current.stationuuid) : -1;
  const tune = d => {
    if (idx < 0) return;
    const n = G.stations[(idx + d + G.stations.length) % G.stations.length];
    setCurrent(n);
    setPlaying(true);
  };
  const isFav = s => favs.some(f => f.stationuuid === s?.stationuuid);
  const toggleFav = s => {
    const t = s || current;
    if (!t) return;
    setFavs(p => p.some(f => f.stationuuid === t.stationuuid) ? p.filter(f => f.stationuuid !== t.stationuuid) : [t, ...p]);
  };
  const share = () => setShareOpen(true);
  const viewProps = {
    current,
    playing,
    onPlay: play,
    onOpen: open
  };
  let content;
  if (view === "home") content = /*#__PURE__*/React.createElement(window.HomeView, viewProps);else if (view === "search") content = /*#__PURE__*/React.createElement(window.SearchView, viewProps);else if (view === "browse") content = /*#__PURE__*/React.createElement(window.BrowseView, viewProps);else content = /*#__PURE__*/React.createElement(window.LibraryView, _extends({
    favorites: favs
  }, viewProps, {
    onRemove: s => toggleFav(s)
  }));

  // Frame: full-bleed desktop, or a centered phone for mobile preview.
  const frame = device === "mobile" ? {
    width: 402,
    height: "100%",
    maxHeight: 860,
    borderRadius: 30,
    overflow: "hidden",
    boxShadow: "0 40px 120px rgba(0,0,0,0.5), 0 0 0 1px var(--v-hairline)"
  } : {
    width: "100%",
    height: "100%"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: device === "mobile" ? "var(--v-bg)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: hostRef,
    style: {
      position: "relative",
      display: "flex",
      background: "var(--v-bg)",
      color: "var(--v-fg)",
      fontFamily: "var(--v-font)",
      ...frame
    }
  }, /*#__PURE__*/React.createElement(FloatingControls, {
    theme: theme,
    onToggleTheme: () => setTheme(t => t === "dark" ? "light" : "dark"),
    device: device,
    onToggleDevice: () => setDevice(d => d === "mobile" ? "desktop" : "mobile")
  }), !compact && /*#__PURE__*/React.createElement(window.Sidebar, {
    view: view,
    onNav: setView,
    theme: theme,
    onToggleTheme: () => setTheme(t => t === "dark" ? "light" : "dark"),
    favCount: favs.length
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }
  }, compact && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 18px 6px"
    }
  }, /*#__PURE__*/React.createElement(window.Logo, null), /*#__PURE__*/React.createElement(window.ThemeToggle, {
    theme: theme,
    onToggle: () => setTheme(t => t === "dark" ? "light" : "dark")
  })), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: compact ? "8px 18px 20px" : "0 32px 28px",
      paddingBottom: current ? compact ? 150 : 100 : compact ? 80 : 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto"
    }
  }, content)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 45
    }
  }, current && /*#__PURE__*/React.createElement(window.MiniPlayer, {
    station: current,
    playing: playing,
    onToggle: toggle,
    onNext: () => tune(1),
    onExpand: () => setNpOpen(true),
    isFav: isFav(current),
    onFav: () => toggleFav()
  }), compact && /*#__PURE__*/React.createElement(window.MobileNav, {
    view: view,
    onNav: setView,
    favCount: favs.length
  }))), /*#__PURE__*/React.createElement(window.NowPlaying, {
    station: current,
    playing: playing,
    open: npOpen,
    onClose: () => setNpOpen(false),
    onToggle: toggle,
    onNext: () => tune(1),
    onPrev: () => tune(-1),
    isFav: isFav(current),
    onFav: () => toggleFav(),
    volume: volume,
    onVolume: setVolume,
    onShare: share
  }), /*#__PURE__*/React.createElement(window.ShareSheet, {
    open: shareOpen,
    station: current,
    onClose: () => setShareOpen(false)
  })));
}
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio-v2/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio-v2/chrome.jsx
try { (() => {
// V2 chrome — desktop sidebar, mobile bottom nav, top bar.
const {
  Icon
} = window.InternetRadioDesignSystem_7e870d;
const NAV = [{
  key: "home",
  label: "Home",
  icon: "home"
}, {
  key: "search",
  label: "Search",
  icon: "search"
}, {
  key: "browse",
  label: "Browse",
  icon: "globe"
}, {
  key: "library",
  label: "Library",
  icon: "library"
}];

// Extra glyphs not in the DS Icon set.
function NavGlyph({
  name,
  size = 22,
  active
}) {
  const sw = active ? 2.2 : 1.9;
  if (name === "home") return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: active ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 10.5 12 3l9 7.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5",
    fill: active ? "currentColor" : "none"
  }));
  if (name === "library") return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 4v17M10 4v17"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "4",
    width: "6",
    height: "17",
    rx: "1.5",
    fill: active ? "currentColor" : "none",
    transform: "rotate(12 17 12)"
  }));
  return /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: size,
    strokeWidth: sw
  });
}
function Logo({
  compact
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      flexShrink: 0,
      borderRadius: 11,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
      color: "#fff",
      boxShadow: "0 4px 16px rgba(108,92,231,0.4)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "signal",
    size: 20
  })), !compact && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 750,
      letterSpacing: "-0.02em",
      color: "var(--v-fg)"
    }
  }, "Internet Radio"));
}
function Sidebar({
  view,
  onNav,
  theme,
  onToggleTheme,
  favCount
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 248,
      flexShrink: 0,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "20px 14px",
      gap: 6,
      borderRight: "1px solid var(--v-hairline)",
      background: "var(--v-bg-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 10px 18px"
    }
  }, /*#__PURE__*/React.createElement(Logo, null)), NAV.map(n => {
    const active = view === n.key;
    return /*#__PURE__*/React.createElement("button", {
      key: n.key,
      type: "button",
      onClick: () => onNav(n.key),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "11px 14px",
        borderRadius: "var(--v-r-md)",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        background: active ? "var(--v-elev-2)" : "transparent",
        color: active ? "var(--v-fg)" : "var(--v-fg-3)",
        fontSize: 15,
        fontWeight: active ? 700 : 600,
        transition: "background .15s, color .15s"
      }
    }, /*#__PURE__*/React.createElement(NavGlyph, {
      name: n.icon,
      size: 22,
      active: active
    }), /*#__PURE__*/React.createElement("span", null, n.label), n.key === "library" && favCount > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontSize: 11,
        fontWeight: 700,
        color: "var(--v-accent)",
        background: "var(--v-accent-soft)",
        borderRadius: 99,
        padding: "2px 8px"
      }
    }, favCount));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    onToggle: onToggleTheme,
    wide: true
  }));
}
function ThemeToggle({
  theme,
  onToggle,
  wide
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    "aria-label": "Toggle theme",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: wide ? "flex-start" : "center",
      gap: 10,
      padding: wide ? "11px 14px" : 0,
      width: wide ? "100%" : 38,
      height: wide ? "auto" : 38,
      borderRadius: wide ? "var(--v-r-md)" : "var(--v-r-pill)",
      cursor: "pointer",
      border: "1px solid var(--v-hairline)",
      background: "var(--v-elev)",
      color: "var(--v-fg-2)",
      fontSize: 14,
      fontWeight: 600
    }
  }, theme === "dark" ? /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
  })), wide && /*#__PURE__*/React.createElement("span", null, theme === "dark" ? "Light mode" : "Dark mode"));
}

// Sticky top bar inside the main scroll area (desktop): greeting + theme.
function TopBar({
  title,
  theme,
  onToggleTheme,
  onBack
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "16px 4px",
      background: "linear-gradient(var(--v-bg) 60%, transparent)"
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    "aria-label": "Back",
    style: {
      width: 36,
      height: 36,
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      background: "var(--v-elev-2)",
      color: "var(--v-fg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 18,
    strokeWidth: 2.4
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: "-0.03em",
      color: "var(--v-fg)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto"
    }
  }));
}
function MobileNav({
  view,
  onNav,
  favCount
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 40,
      display: "flex",
      borderTop: "1px solid var(--v-hairline)",
      background: "var(--v-mat-chrome)",
      backdropFilter: "var(--v-mat-blur)",
      WebkitBackdropFilter: "var(--v-mat-blur)",
      padding: "8px 8px max(8px, env(safe-area-inset-bottom))"
    }
  }, NAV.map(n => {
    const active = view === n.key;
    return /*#__PURE__*/React.createElement("button", {
      key: n.key,
      type: "button",
      onClick: () => onNav(n.key),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "6px 0",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: active ? "var(--v-accent)" : "var(--v-fg-3)",
        fontSize: 10.5,
        fontWeight: 650
      }
    }, /*#__PURE__*/React.createElement(NavGlyph, {
      name: n.icon,
      size: 23,
      active: active
    }), n.label);
  }));
}
Object.assign(window, {
  Sidebar,
  MobileNav,
  TopBar,
  ThemeToggle,
  Logo,
  NavGlyph
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio-v2/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio-v2/gen.js
try { (() => {
/* ───────────────────────────────────────────────────────────────
   Internet Radio V2 — generative artwork + catalog.
   Every station gets a deterministic, harmonious gradient "cover"
   derived from its name — so the UI is rich even though real radio
   stations only ship a tiny favicon.
   ─────────────────────────────────────────────────────────────── */
(function () {
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // → { from, to, h1, h2, css, cssSoft } — a duotone gradient cover.
  function gradientFor(seed) {
    const h = hash(seed || "radio");
    const h1 = h % 360;
    const h2 = (h1 + 30 + h % 50) % 360;
    const s1 = 68 + h % 18;
    const l1 = 56 + h % 10;
    const s2 = 70 + (h >> 3) % 16;
    const l2 = 34 + (h >> 5) % 10;
    const from = `hsl(${h1} ${s1}% ${l1}%)`;
    const to = `hsl(${h2} ${s2}% ${l2}%)`;
    const ax = 18 + h % 30;
    const ay = 12 + (h >> 4) % 30;
    const css = `radial-gradient(120% 120% at ${ax}% ${ay}%, ${from} 0%, transparent 58%),` + `radial-gradient(130% 130% at ${100 - ax}% ${100 - ay}%, ${to} 0%, transparent 60%),` + `linear-gradient(135deg, hsl(${h1} ${s1}% ${l1 - 8}%), hsl(${h2} ${s2}% ${l2}%))`;
    return {
      from,
      to,
      h1,
      h2,
      css
    };
  }
  function initials(name) {
    const cleaned = (name || "").replace(/^(radio|the)\s+/i, "").trim();
    const parts = cleaned.split(/[\s.\-]+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // ── Catalog ──────────────────────────────────────────────────
  // A broad country list (Radio Browser covers ~230 countries; this is a
  // representative slice). Sorted by station count, like the real /countries feed.
  const COUNTRIES = [{
    name: "United States",
    iso: "US",
    count: 5392
  }, {
    name: "Germany",
    iso: "DE",
    count: 3104
  }, {
    name: "United Kingdom",
    iso: "GB",
    count: 2841
  }, {
    name: "France",
    iso: "FR",
    count: 1876
  }, {
    name: "Brazil",
    iso: "BR",
    count: 1442
  }, {
    name: "India",
    iso: "IN",
    count: 1395
  }, {
    name: "Italy",
    iso: "IT",
    count: 1330
  }, {
    name: "Japan",
    iso: "JP",
    count: 1209
  }, {
    name: "Spain",
    iso: "ES",
    count: 1188
  }, {
    name: "Canada",
    iso: "CA",
    count: 1120
  }, {
    name: "Russia",
    iso: "RU",
    count: 1064
  }, {
    name: "Mexico",
    iso: "MX",
    count: 980
  }, {
    name: "Poland",
    iso: "PL",
    count: 942
  }, {
    name: "Netherlands",
    iso: "NL",
    count: 904
  }, {
    name: "Argentina",
    iso: "AR",
    count: 870
  }, {
    name: "Greece",
    iso: "GR",
    count: 812
  }, {
    name: "Turkey",
    iso: "TR",
    count: 786
  }, {
    name: "Australia",
    iso: "AU",
    count: 742
  }, {
    name: "Indonesia",
    iso: "ID",
    count: 708
  }, {
    name: "Ukraine",
    iso: "UA",
    count: 690
  }, {
    name: "Portugal",
    iso: "PT",
    count: 654
  }, {
    name: "Romania",
    iso: "RO",
    count: 632
  }, {
    name: "South Korea",
    iso: "KR",
    count: 612
  }, {
    name: "Austria",
    iso: "AT",
    count: 590
  }, {
    name: "Colombia",
    iso: "CO",
    count: 566
  }, {
    name: "Switzerland",
    iso: "CH",
    count: 552
  }, {
    name: "Sweden",
    iso: "SE",
    count: 528
  }, {
    name: "Belgium",
    iso: "BE",
    count: 514
  }, {
    name: "Chile",
    iso: "CL",
    count: 498
  }, {
    name: "Czechia",
    iso: "CZ",
    count: 472
  }, {
    name: "Hungary",
    iso: "HU",
    count: 448
  }, {
    name: "Denmark",
    iso: "DK",
    count: 430
  }, {
    name: "Finland",
    iso: "FI",
    count: 412
  }, {
    name: "Norway",
    iso: "NO",
    count: 398
  }, {
    name: "Ireland",
    iso: "IE",
    count: 376
  }, {
    name: "Peru",
    iso: "PE",
    count: 354
  }, {
    name: "Philippines",
    iso: "PH",
    count: 342
  }, {
    name: "South Africa",
    iso: "ZA",
    count: 328
  }, {
    name: "New Zealand",
    iso: "NZ",
    count: 296
  }, {
    name: "Thailand",
    iso: "TH",
    count: 278
  }, {
    name: "China",
    iso: "CN",
    count: 262
  }, {
    name: "Croatia",
    iso: "HR",
    count: 244
  }, {
    name: "Serbia",
    iso: "RS",
    count: 228
  }, {
    name: "Egypt",
    iso: "EG",
    count: 196
  }];

  // Fields mirror Radio Browser: votes (user votes) + clickcount (cumulative plays).
  // clicktrend (the "trending" growth metric) is faked by ordering position here.
  function S(name, country, iso, lang, genres, bitrate, codec) {
    const h = hash(name);
    return {
      stationuuid: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      country,
      iso,
      language: lang,
      tags: genres.join(","),
      genres,
      bitrate,
      codec,
      votes: 80 + h % 9000,
      clickcount: 1000 + h % 240000
    };
  }
  const STATIONS = [S("BBC Radio 6 Music", "United Kingdom", "GB", "English", ["Alternative", "Indie", "Eclectic"], 128, "MP3"), S("KEXP 90.3 FM", "United States", "US", "English", ["Eclectic", "Indie", "Public"], 128, "MP3"), S("FIP", "France", "FR", "French", ["Eclectic", "Jazz", "World"], 192, "MP3"), S("NTS Radio 1", "United Kingdom", "GB", "English", ["Electronic", "Eclectic"], 256, "AAC"), S("Jazz FM", "United Kingdom", "GB", "English", ["Jazz", "Soul", "Blues"], 256, "MP3"), S("J-WAVE 81.3", "Japan", "JP", "Japanese", ["J-Pop", "City Pop"], 128, "AAC"), S("Radio Nova", "France", "FR", "French", ["Eclectic", "Groove"], 128, "AAC"), S("Triple J", "Australia", "AU", "English", ["Alternative", "Indie"], 192, "MP3"), S("WNYC 93.9", "United States", "US", "English", ["News", "Talk", "Public"], 128, "AAC"), S("Classic FM", "United Kingdom", "GB", "English", ["Classical"], 192, "AAC"), S("Hot 97", "United States", "US", "English", ["Hip-Hop", "Rap"], 128, "MP3"), S("FluxFM Berlin", "Germany", "DE", "German", ["Alternative", "Indie"], 128, "MP3"), S("Rinse FM", "United Kingdom", "GB", "English", ["Electronic", "Grime", "House"], 256, "AAC"), S("Tokyo FM", "Japan", "JP", "Japanese", ["Pop", "Talk"], 128, "MP3"), S("Antena 1", "Brazil", "BR", "Portuguese", ["Soft Rock", "Pop"], 128, "MP3"), S("Los 40", "Spain", "ES", "Spanish", ["Pop", "Hits"], 128, "MP3"), S("Radio Deejay", "Italy", "IT", "Italian", ["Pop", "Dance"], 128, "MP3"), S("1LIVE", "Germany", "DE", "German", ["Pop", "Charts"], 128, "AAC"), S("Worldwide FM", "United Kingdom", "GB", "English", ["Jazz", "Soul", "Global"], 256, "AAC"), S("KCRW", "United States", "US", "English", ["Eclectic", "Indie", "Public"], 128, "AAC"), S("Capital London", "United Kingdom", "GB", "English", ["Pop", "Hits"], 128, "MP3"), S("InterFM897", "Japan", "JP", "Japanese", ["Bilingual", "Rock"], 192, "MP3"), S("France Inter", "France", "FR", "French", ["News", "Culture", "Talk"], 128, "MP3"), S("Kiss Fresh", "United Kingdom", "GB", "English", ["Dance", "Electronic"], 128, "MP3")];
  const GENRES = [{
    name: "Jazz & Soul",
    key: "jazz"
  }, {
    name: "Electronic",
    key: "electronic"
  }, {
    name: "Indie & Alternative",
    key: "indie"
  }, {
    name: "Pop & Hits",
    key: "pop"
  }, {
    name: "Classical",
    key: "classical"
  }, {
    name: "News & Talk",
    key: "news"
  }, {
    name: "Hip-Hop",
    key: "hip-hop"
  }, {
    name: "World",
    key: "world"
  }];
  function byGenre(substr) {
    return STATIONS.filter(s => s.genres.some(g => g.toLowerCase().includes(substr)));
  }
  const byVotes = [...STATIONS].sort((a, b) => b.votes - a.votes);
  const byPlays = [...STATIONS].sort((a, b) => b.clickcount - a.clickcount);
  window.IR2 = {
    gradientFor,
    initials,
    hash,
    countries: COUNTRIES,
    stations: STATIONS,
    genres: GENRES,
    // Every shelf below maps to a real Radio Browser ordering / filter:
    topStation: byVotes[0],
    // order=votes, take #1
    trending: STATIONS.slice(0, 8),
    // order=clicktrend
    popular: byPlays.slice(0, 8),
    // order=clickcount
    mostVoted: byVotes.slice(0, 8),
    // order=votes
    byGenre,
    byCountry: iso => {
      const real = STATIONS.filter(s => s.iso === iso);
      if (real.length >= 3) return real;
      // Synthesize a plausible lineup for countries without seeded stations,
      // so every country drills into content (the live API returns real ones).
      const c = COUNTRIES.find(x => x.iso === iso) || {
        name: iso,
        iso
      };
      const kinds = [["FM", ["Pop", "Hits"]], ["Radio Uno", ["Talk", "News"]], ["Classic", ["Classical"]], ["Beat", ["Dance", "Electronic"]], ["Jazz Cafe", ["Jazz", "Soul"]], ["Rock", ["Rock", "Alternative"]], ["Capital", ["Pop", "Top 40"]], ["Cultura", ["Culture", "Talk"]]];
      const synth = kinds.map(([suffix, genres], i) => S(`${c.name.split(" ")[0]} ${suffix}`, c.name, iso, "", genres, [128, 192, 256][i % 3], i % 2 ? "AAC" : "MP3"));
      return real.concat(synth).slice(0, 8);
    },
    search: q => {
      q = q.trim().toLowerCase();
      if (!q) return [];
      return STATIONS.filter(s => s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q) || s.genres.some(g => g.toLowerCase().includes(q)));
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio-v2/gen.js", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio-v2/home.jsx
try { (() => {
// V2 Home / Discover — editorial hero + scrolling shelves.
const {
  Icon,
  Flag
} = window.InternetRadioDesignSystem_7e870d;
function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}
function Hero({
  station,
  playing,
  onPlay,
  onOpen
}) {
  const g = window.IR2.gradientFor(station.name);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onOpen(station),
    style: {
      position: "relative",
      borderRadius: "var(--v-r-xl)",
      overflow: "hidden",
      cursor: "pointer",
      padding: "clamp(20px, 4vw, 36px)",
      marginBottom: 26,
      minHeight: 220,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      background: g.css,
      boxShadow: "var(--v-shadow-card)",
      animation: "v-pop-in .5s var(--v-ease)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.45))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "5px 12px",
      borderRadius: 99,
      background: "rgba(255,255,255,0.18)",
      backdropFilter: "blur(8px)",
      color: "#fff",
      fontSize: 11.5,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 99,
      background: "#fff",
      boxShadow: "0 0 8px #fff"
    }
  }), " Top Station Today"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: "clamp(28px, 5vw, 46px)",
      fontWeight: 820,
      letterSpacing: "-0.035em",
      color: "#fff",
      lineHeight: 1.02,
      textShadow: "0 2px 24px rgba(0,0,0,0.3)"
    }
  }, station.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 18px",
      color: "rgba(255,255,255,0.82)",
      fontSize: 15,
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Flag, {
    code: station.iso,
    width: 18,
    radius: 3
  }), " ", station.country, " \xB7 ", station.genres.join(" · ")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onPlay(station);
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      padding: "12px 24px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      background: "#fff",
      color: "#111",
      fontSize: 15,
      fontWeight: 750,
      boxShadow: "0 8px 28px rgba(0,0,0,0.25)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: playing ? "pause" : "play",
    size: 18
  }), " ", playing ? "Pause" : "Listen Now"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "rgba(255,255,255,0.7)",
      fontSize: 13,
      fontWeight: 600
    }
  }, station.votes.toLocaleString(), " votes"))));
}
function QuickTile({
  station,
  playing,
  onPlay,
  onOpen
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onOpen(station),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      borderRadius: "var(--v-r-md)",
      overflow: "hidden",
      cursor: "pointer",
      background: hover ? "var(--v-elev-3)" : "var(--v-elev-2)",
      transition: "background .18s",
      height: 56
    }
  }, /*#__PURE__*/React.createElement(window.Cover, {
    station: station,
    size: 56,
    radius: "0",
    initials: true,
    playing: playing
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: 13.5,
      fontWeight: 700,
      color: "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: 12,
      opacity: hover ? 1 : 0,
      transition: "opacity .15s"
    }
  }, /*#__PURE__*/React.createElement(window.PlayFab, {
    playing: playing,
    size: 36,
    onClick: e => {
      e.stopPropagation();
      onPlay(station);
    }
  })));
}
function HomeView({
  current,
  playing,
  onPlay,
  onOpen,
  country
}) {
  const G = window.IR2;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "v-fade .35s ease"
    }
  }, /*#__PURE__*/React.createElement(window.TopBar, {
    title: greeting()
  }), /*#__PURE__*/React.createElement(Hero, {
    station: G.topStation,
    playing: playing && current?.stationuuid === G.topStation.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: 10,
      marginBottom: 30
    }
  }, G.trending.slice(0, 6).map(s => /*#__PURE__*/React.createElement(QuickTile, {
    key: s.stationuuid,
    station: s,
    playing: playing && current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }))), /*#__PURE__*/React.createElement(window.Shelf, {
    title: "Trending now"
  }, G.trending.map(s => /*#__PURE__*/React.createElement(window.StationCard, {
    key: s.stationuuid,
    station: s,
    playing: playing && current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }))), /*#__PURE__*/React.createElement(window.Shelf, {
    title: "Most popular"
  }, G.popular.map(s => /*#__PURE__*/React.createElement(window.StationCard, {
    key: s.stationuuid,
    station: s,
    playing: playing && current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }))), /*#__PURE__*/React.createElement(window.Shelf, {
    title: "Jazz & Soul"
  }, G.byGenre("jazz").concat(G.byGenre("soul")).map((s, i) => /*#__PURE__*/React.createElement(window.StationCard, {
    key: s.stationuuid + i,
    station: s,
    playing: playing && current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }))), /*#__PURE__*/React.createElement(window.Shelf, {
    title: "Most voted"
  }, G.mostVoted.map((s, i) => /*#__PURE__*/React.createElement(window.StationCard, {
    key: s.stationuuid + i,
    station: s,
    playing: playing && current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  }))));
}
Object.assign(window, {
  HomeView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio-v2/home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio-v2/player.jsx
try { (() => {
// V2 player — docked mini bar + full-screen Now Playing (parallax, ambient).
const {
  Icon,
  Flag
} = window.InternetRadioDesignSystem_7e870d;
function MiniPlayer({
  station,
  playing,
  onToggle,
  onNext,
  onExpand,
  isFav,
  onFav
}) {
  if (!station) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onExpand,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      cursor: "pointer",
      borderTop: "1px solid var(--v-hairline)",
      background: "var(--v-mat-chrome)",
      backdropFilter: "var(--v-mat-blur)",
      WebkitBackdropFilter: "var(--v-mat-blur)"
    }
  }, /*#__PURE__*/React.createElement(window.Cover, {
    station: station,
    size: 48,
    radius: "10px",
    playing: playing
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--v-fg-3)",
      marginTop: 1,
      display: "flex",
      alignItems: "center",
      gap: 6,
      whiteSpace: "nowrap",
      overflow: "hidden"
    }
  }, playing ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      color: "var(--v-accent)",
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: "var(--v-accent)"
    }
  }), "LIVE") : "Paused", " \xB7 ", station.country)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onFav();
    },
    "aria-label": "Favorite",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: isFav ? "var(--v-accent)" : "var(--v-fg-3)",
      display: "inline-flex",
      padding: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 20,
    style: {
      fill: isFav ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: 2
    }
  })), /*#__PURE__*/React.createElement(window.PlayFab, {
    playing: playing,
    size: 42,
    onClick: e => {
      e.stopPropagation();
      onToggle();
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onNext();
    },
    "aria-label": "Next",
    className: "v-only-wide",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--v-fg-2)",
      display: "inline-flex",
      padding: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "next",
    size: 22
  })));
}
function NowPlaying({
  station,
  playing,
  open,
  onClose,
  onToggle,
  onNext,
  onPrev,
  isFav,
  onFav,
  volume,
  onVolume,
  onShare
}) {
  const ref = React.useRef(null);
  const [px, setPx] = React.useState({
    x: 0,
    y: 0
  });
  const [elapsed, setElapsed] = React.useState(0);
  React.useEffect(() => {
    if (!open || !playing) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [open, playing]);
  React.useEffect(() => {
    setElapsed(0);
  }, [station]);
  if (!station) return null;
  const g = window.IR2.gradientFor(station.name);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setPx({
      x,
      y
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: () => setPx({
      x: 0,
      y: 0
    }),
    "aria-hidden": !open,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 60,
      overflow: "hidden",
      transform: open ? "translateY(0)" : "translateY(100%)",
      transition: "transform .5s var(--v-ease)",
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "-20%",
      background: g.css,
      filter: "blur(80px) saturate(150%)",
      transform: `scale(1.2) translate(${px.x * -24}px, ${px.y * -24}px)`,
      transition: "transform .3s var(--v-ease-soft)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.62))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "clamp(18px, 3vw, 34px)",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 520,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Collapse",
    style: {
      width: 40,
      height: 40,
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      background: "rgba(255,255,255,0.16)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      opacity: 0.8
    }
  }, "Now Playing"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onShare,
    "aria-label": "Share",
    style: {
      width: 40,
      height: 40,
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      background: "rgba(255,255,255,0.16)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      margin: "auto 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: `translate(${px.x * 16}px, ${px.y * 16}px) rotateX(${px.y * -5}deg) rotateY(${px.x * 5}deg)`,
      transition: "transform .25s var(--v-ease-soft)",
      transformStyle: "preserve-3d",
      perspective: 800
    }
  }, /*#__PURE__*/React.createElement(window.Cover, {
    station: station,
    size: "min(64vw, 340px)",
    radius: "var(--v-r-xl)",
    initials: true,
    playing: playing,
    style: {
      boxShadow: "0 40px 90px rgba(0,0,0,0.5)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      marginTop: 30,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: "clamp(24px, 5vw, 34px)",
      fontWeight: 820,
      letterSpacing: "-0.03em",
      lineHeight: 1.08
    }
  }, station.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: 15,
      opacity: 0.82,
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(Flag, {
    code: station.iso,
    width: 18,
    radius: 3
  }), " ", station.country, " \xB7 ", station.genres.join(" · "))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onFav,
    "aria-label": "Favorite",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "#fff",
      display: "inline-flex",
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 28,
    style: {
      fill: isFav ? "#fff" : "none",
      stroke: "#fff",
      strokeWidth: 2
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontVariantNumeric: "tabular-nums",
      opacity: 0.75
    }
  }, mm, ":", ss), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 26,
      display: "flex",
      alignItems: "center",
      gap: 2,
      overflow: "hidden"
    }
  }, Array.from({
    length: 64
  }).map((_, i) => {
    const h = 6 + window.IR2.hash(station.name + i) % 20;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        height: playing ? h + "px" : "4px",
        minWidth: 2,
        borderRadius: 2,
        background: "rgba(255,255,255,0.55)",
        transformOrigin: "center",
        animation: playing ? `v-eq ${0.6 + i % 5 * 0.12}s ease-in-out infinite` : "none",
        animationDelay: `${i % 7 * 0.07}s`
      }
    });
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11.5,
      fontWeight: 800,
      letterSpacing: "0.08em",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 99,
      background: "#fff",
      boxShadow: "0 0 8px #fff"
    }
  }), " LIVE")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onPrev,
    "aria-label": "Previous",
    style: transBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "prev",
    size: 30
  })), /*#__PURE__*/React.createElement(window.PlayFab, {
    playing: playing,
    size: 76,
    onClick: onToggle,
    style: {
      background: "#fff",
      color: "#111",
      boxShadow: "0 12px 40px rgba(0,0,0,0.35)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onNext,
    "aria-label": "Next",
    style: transBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "next",
    size: 30
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: "flex",
      alignItems: "center",
      gap: 12,
      maxWidth: 360,
      margin: "24px auto 8px",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "volume",
    size: 18,
    style: {
      opacity: 0.8
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 1,
    step: 0.01,
    value: volume,
    onChange: e => onVolume(parseFloat(e.target.value)),
    "aria-label": "Volume",
    className: "v-range-light",
    style: {
      flex: 1,
      height: 4
    }
  }))))));
}
const transBtn = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: "#fff",
  display: "inline-flex",
  padding: 4
};
Object.assign(window, {
  MiniPlayer,
  NowPlaying
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio-v2/player.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio-v2/share.jsx
try { (() => {
// V2 Share sheet — an original, on-brand take: ambient gradient header (echoing
// the Now Playing screen), generative cover, glass chips, QR card, and a readable
// link field. Same elements as V1, redesigned in the V2 language.
const {
  Icon
} = window.InternetRadioDesignSystem_7e870d;
function ShareSheet({
  open,
  station,
  onClose
}) {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (!open) setCopied(false);
  }, [open, station]);
  if (!open || !station) return null;
  const g = window.IR2.gradientFor(station.name);
  const tags = (station.genres || (station.tags || "").split(",")).map(t => (t || "").trim()).filter(Boolean).slice(0, 3);
  const meta = [station.country, station.language].filter(Boolean).join(" · ");
  const url = `https://free-internet-radio.vercel.app/?country=${station.iso || ""}&station=${station.stationuuid}`;
  const prettyUrl = url.replace(/^https?:\/\//, "");
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&qzone=1&color=1a0f3c&bgcolor=ffffff&data=${encodeURIComponent(url)}`;
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    },
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 18,
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 372,
      position: "relative",
      borderRadius: "var(--v-r-xl)",
      overflow: "hidden",
      maxHeight: "calc(100% - 24px)",
      overflowY: "auto",
      background: "var(--v-bg-2)",
      border: "1px solid var(--v-hairline-2)",
      boxShadow: "var(--v-shadow-pop)",
      animation: "v-rise .36s var(--v-ease)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 132,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "-30%",
      background: g.css,
      filter: "blur(36px) saturate(150%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,0.15), var(--v-bg-2))"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      position: "absolute",
      top: 14,
      right: 14,
      width: 32,
      height: 32,
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      background: "rgba(0,0,0,0.28)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 15,
    strokeWidth: 2.5
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 14,
      textAlign: "center",
      fontSize: 10.5,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      color: "rgba(255,255,255,0.78)"
    }
  }, "Share station")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px 24px",
      marginTop: -52,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      height: 96,
      borderRadius: "var(--v-r-lg)",
      background: g.css,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14), 0 16px 40px rgba(0,0,0,0.4)",
      border: "3px solid var(--v-bg-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 34,
      color: "rgba(255,255,255,0.95)",
      letterSpacing: "-0.03em"
    }
  }, window.IR2.initials(station.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      maxWidth: "100%"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 19,
      fontWeight: 780,
      letterSpacing: "-0.02em",
      color: "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.name), meta && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "5px 0 0",
      fontSize: 13,
      color: "var(--v-fg-3)"
    }
  }, meta)), (tags.length > 0 || station.codec) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 7
    }
  }, tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      padding: "4px 12px",
      borderRadius: 99,
      fontSize: 11.5,
      fontWeight: 600,
      textTransform: "capitalize",
      background: "var(--v-elev-2)",
      border: "1px solid var(--v-hairline)",
      color: "var(--v-fg-2)"
    }
  }, t)), station.codec && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "4px 10px",
      borderRadius: 99,
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      background: "var(--v-accent-soft)",
      color: "var(--v-accent)"
    }
  }, station.codec, station.bitrate ? ` · ${station.bitrate}k` : ""))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "var(--v-r-lg)",
      padding: 16,
      background: "#fff",
      boxShadow: "0 0 0 1px var(--v-accent-soft), 0 16px 44px rgba(108,92,231,0.26)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: qr,
    alt: "QR code",
    width: 176,
    height: 176,
    style: {
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 0 4px #fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      background: "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "signal",
    size: 19
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 11,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      color: "var(--v-fg-4)"
    }
  }, "Scan to tune in")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px 10px 14px",
      borderRadius: "var(--v-r-md)",
      background: "var(--v-elev-2)",
      border: "1px solid var(--v-hairline)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 16,
    strokeWidth: 2,
    style: {
      color: "var(--v-fg-3)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: 13,
      color: "var(--v-fg-2)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontVariantNumeric: "tabular-nums"
    }
  }, prettyUrl)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setCopied(true);
    },
    style: {
      marginTop: 10,
      width: "100%",
      padding: "14px 0",
      borderRadius: "var(--v-r-md)",
      border: "none",
      cursor: "pointer",
      fontSize: 14.5,
      fontWeight: 700,
      background: copied ? "rgba(52,199,89,0.16)" : "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
      color: copied ? "#34c759" : "#fff",
      boxShadow: copied ? "none" : "0 8px 24px rgba(108,92,231,0.4)",
      transition: "background .2s, color .2s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: copied ? "check" : "copy",
    size: 16,
    strokeWidth: 2.4
  }), copied ? "Link copied to clipboard" : "Copy Link")))));
}
window.ShareSheet = ShareSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio-v2/share.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio-v2/ui.jsx
try { (() => {
// V2 shared primitives — generative cover, equalizer, cards, play button.
const {
  Icon,
  Flag
} = window.InternetRadioDesignSystem_7e870d;
const G = window.IR2;

// Generative gradient cover. `playing` overlays an equalizer.
function Cover({
  station,
  size = 160,
  radius = "var(--v-r-md)",
  initials = true,
  playing = false,
  style = {}
}) {
  const g = G.gradientFor(station.name);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: radius,
      overflow: "hidden",
      background: g.css,
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), var(--v-shadow-card)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style
    }
  }, initials && size >= 96 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      color: "rgba(255,255,255,0.92)",
      letterSpacing: "-0.03em",
      fontSize: size * 0.34,
      textShadow: "0 2px 14px rgba(0,0,0,0.3)",
      userSelect: "none"
    }
  }, G.initials(station.name)), initials && size < 96 && size >= 40 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      color: "rgba(255,255,255,0.92)",
      fontSize: size * 0.4
    }
  }, G.initials(station.name)[0]), playing && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.28)",
      backdropFilter: "blur(1px)"
    }
  }, /*#__PURE__*/React.createElement(Equalizer, {
    size: size > 120 ? 22 : 14
  })));
}
function Equalizer({
  size = 18,
  color = "#fff"
}) {
  const bars = [0, 1, 2, 3];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: size * 0.16,
      height: size
    },
    "aria-hidden": true
  }, bars.map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: size * 0.16,
      height: size,
      borderRadius: 99,
      background: color,
      transformOrigin: "bottom",
      animation: `v-eq ${0.7 + i * 0.18}s ease-in-out infinite`,
      animationDelay: `${i * 0.12}s`
    }
  })));
}

// Circular gradient play/pause button (the brand control).
function PlayFab({
  playing,
  onClick,
  size = 56,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-label": playing ? "Pause" : "Play",
    className: "v-fab",
    style: {
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: "var(--v-r-pill)",
      border: "none",
      cursor: "pointer",
      background: "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
      color: "var(--v-on-accent)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 28px rgba(108,92,231,0.45)",
      transition: "transform .12s var(--v-ease-soft)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: playing ? "pause" : "play",
    size: size * 0.42,
    style: {
      marginLeft: playing ? 0 : size * 0.03
    }
  }));
}

// Discover card (square cover + title + subtitle), used in shelves.
function StationCard({
  station,
  playing,
  onPlay,
  onOpen,
  width = 168
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onOpen(station),
    style: {
      width,
      flexShrink: 0,
      padding: 10,
      borderRadius: "var(--v-r-lg)",
      cursor: "pointer",
      background: hover ? "var(--v-elev-2)" : "transparent",
      transition: "background .2s var(--v-ease-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Cover, {
    station: station,
    size: width - 20,
    radius: "var(--v-r-md)",
    playing: playing
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 8,
      bottom: 8,
      opacity: hover || playing ? 1 : 0,
      transform: hover || playing ? "translateY(0)" : "translateY(8px)",
      transition: "opacity .22s var(--v-ease-soft), transform .22s var(--v-ease-soft)"
    }
  }, /*#__PURE__*/React.createElement(PlayFab, {
    playing: playing,
    size: 44,
    onClick: e => {
      e.stopPropagation();
      onPlay(station);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: "0 2px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 650,
      color: "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      fontSize: 12.5,
      color: "var(--v-fg-3)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.genres.slice(0, 2).join(" · "))));
}

// Horizontal scrolling shelf with a title.
function Shelf({
  title,
  action,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      padding: "0 4px 10px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 21,
      fontWeight: 750,
      letterSpacing: "-0.02em",
      color: "var(--v-fg)"
    }
  }, title), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: action.onClick,
    className: "v-link",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--v-fg-3)"
    }
  }, action.label)), /*#__PURE__*/React.createElement("div", {
    className: "v-shelf",
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      overflowY: "hidden",
      padding: "2px 0 6px",
      scrollSnapType: "x proximity"
    }
  }, children));
}

// Compact list row (Library / search results / now-playing queue).
function ListRow({
  station,
  index,
  playing,
  active,
  onPlay,
  onOpen,
  trailing
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onOpen(station),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "8px 12px",
      borderRadius: "var(--v-r-md)",
      cursor: "pointer",
      background: active ? "var(--v-accent-soft)" : hover ? "var(--v-elev-2)" : "transparent",
      transition: "background .15s var(--v-ease-soft)"
    }
  }, index != null && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      textAlign: "center",
      flexShrink: 0,
      color: active ? "var(--v-accent)" : "var(--v-fg-3)",
      fontSize: 14,
      fontVariantNumeric: "tabular-nums"
    }
  }, hover ? /*#__PURE__*/React.createElement(PlayMini, {
    onClick: e => {
      e.stopPropagation();
      onPlay(station);
    },
    active: active
  }) : active && playing ? /*#__PURE__*/React.createElement(Equalizer, {
    size: 13,
    color: "var(--v-accent)"
  }) : index), /*#__PURE__*/React.createElement(Cover, {
    station: station,
    size: 44,
    radius: "10px",
    initials: true,
    playing: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: active ? "var(--v-accent)" : "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontSize: 12.5,
      color: "var(--v-fg-3)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Flag, {
    code: station.iso,
    width: 15,
    radius: 2
  }), " ", station.country, " \xB7 ", station.genres[0])), trailing, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      fontSize: 12.5,
      color: "var(--v-fg-4)",
      fontVariantNumeric: "tabular-nums"
    }
  }, station.bitrate, "k"));
}
function PlayMini({
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-label": "Play",
    style: {
      border: "none",
      background: "transparent",
      color: "var(--v-fg)",
      cursor: "pointer",
      padding: 0,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 16
  }));
}
Object.assign(window, {
  Cover,
  Equalizer,
  PlayFab,
  StationCard,
  Shelf,
  ListRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio-v2/ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio-v2/views.jsx
try { (() => {
// V2 Search + Browse + Library views.
const {
  Icon,
  Flag
} = window.InternetRadioDesignSystem_7e870d;
function GenreTile({
  genre,
  onClick
}) {
  const g = window.IR2.gradientFor(genre.name + genre.key);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      position: "relative",
      height: 104,
      borderRadius: "var(--v-r-md)",
      overflow: "hidden",
      border: "none",
      cursor: "pointer",
      background: g.css,
      textAlign: "left",
      padding: 16,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontSize: 17,
      fontWeight: 780,
      letterSpacing: "-0.02em",
      textShadow: "0 2px 12px rgba(0,0,0,0.3)"
    }
  }, genre.name), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(120deg, transparent 40%, rgba(0,0,0,0.25))"
    }
  }));
}
function SearchView({
  current,
  playing,
  onPlay,
  onOpen
}) {
  const G = window.IR2;
  const [q, setQ] = React.useState("");
  const [country, setCountry] = React.useState(null);
  const results = G.search(q);
  const countryMatches = q.trim() ? G.countries.filter(c => c.name.toLowerCase().includes(q.trim().toLowerCase())) : [];

  // Drill-in: a country's stations.
  if (country) {
    const list = G.byCountry(country.iso);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        animation: "v-fade .3s ease"
      }
    }, /*#__PURE__*/React.createElement(window.TopBar, {
      title: country.name,
      onBack: () => setCountry(null)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "0 4px 18px",
        color: "var(--v-fg-3)",
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement(Flag, {
      code: country.iso,
      width: 22,
      radius: 3
    }), " ", country.count.toLocaleString(), " stations \xB7 showing top ", list.length), list.map((s, i) => /*#__PURE__*/React.createElement(window.ListRow, {
      key: s.stationuuid,
      station: s,
      index: i + 1,
      playing: playing,
      active: current?.stationuuid === s.stationuuid,
      onPlay: onPlay,
      onOpen: onOpen
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "v-fade .35s ease"
    }
  }, /*#__PURE__*/React.createElement(window.TopBar, {
    title: "Search"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginBottom: 24,
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 20,
    strokeWidth: 2,
    style: {
      position: "absolute",
      left: 16,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--v-fg-3)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Stations, genres, countries\u2026",
    style: {
      width: "100%",
      padding: "14px 16px 14px 46px",
      fontSize: 16,
      fontFamily: "var(--v-font)",
      fontWeight: 500,
      color: "var(--v-fg)",
      background: "var(--v-elev-2)",
      border: "1px solid var(--v-hairline)",
      borderRadius: "var(--v-r-md)",
      outline: "none"
    }
  })), q ? results.length || countryMatches.length ? /*#__PURE__*/React.createElement("div", null, countryMatches.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--v-fg-3)",
      margin: "0 4px 8px"
    }
  }, "Countries"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 10
    }
  }, countryMatches.slice(0, 6).map(c => /*#__PURE__*/React.createElement(CountryCard, {
    key: c.iso,
    c: c,
    onClick: () => setCountry(c)
  })))), results.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--v-fg-3)",
      margin: "0 4px 8px"
    }
  }, results.length, " station", results.length !== 1 ? "s" : ""), results.map((s, i) => /*#__PURE__*/React.createElement(window.ListRow, {
    key: s.stationuuid,
    station: s,
    index: i + 1,
    playing: playing,
    active: current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen
  })))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "60px 0",
      textAlign: "center",
      color: "var(--v-fg-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 650,
      color: "var(--v-fg-2)"
    }
  }, "No matches for \u201C", q, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      marginTop: 6
    }
  }, "Try a genre like \u201Cjazz\u201D or a country like \u201CJapan\u201D.")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, null, "Browse by country"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 10,
      marginBottom: 30
    }
  }, G.countries.map(c => /*#__PURE__*/React.createElement(CountryCard, {
    key: c.iso,
    c: c,
    onClick: () => setCountry(c)
  }))), /*#__PURE__*/React.createElement(SectionHead, null, "Browse all genres"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      gap: 12
    }
  }, G.genres.map(genre => /*#__PURE__*/React.createElement(GenreTile, {
    key: genre.key,
    genre: genre,
    onClick: () => setQ(genre.name.split(" ")[0])
  })))));
}
function SectionHead({
  children
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 4px 14px",
      fontSize: 21,
      fontWeight: 750,
      letterSpacing: "-0.02em",
      color: "var(--v-fg)"
    }
  }, children);
}
function CountryCard({
  c,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: 14,
      borderRadius: "var(--v-r-md)",
      border: "1px solid var(--v-hairline)",
      background: hover ? "var(--v-elev-2)" : "var(--v-elev)",
      cursor: "pointer",
      textAlign: "left",
      transition: "background .15s, transform .15s",
      transform: hover ? "translateY(-2px)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 36,
      borderRadius: 8,
      overflow: "hidden",
      flexShrink: 0,
      boxShadow: "var(--v-shadow-card)"
    }
  }, /*#__PURE__*/React.createElement(Flag, {
    code: c.iso,
    width: 48,
    radius: 0,
    style: {
      height: 36
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "var(--v-fg)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--v-fg-3)",
      marginTop: 2
    }
  }, c.count.toLocaleString(), " stations")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 18,
    strokeWidth: 2.4,
    style: {
      color: "var(--v-fg-4)"
    }
  }));
}
function BrowseView({
  current,
  playing,
  onPlay,
  onOpen
}) {
  const G = window.IR2;
  const [country, setCountry] = React.useState(null);
  if (country) {
    const list = G.byCountry(country.iso);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        animation: "v-fade .3s ease"
      }
    }, /*#__PURE__*/React.createElement(window.TopBar, {
      title: country.name,
      onBack: () => setCountry(null)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "0 4px 18px",
        color: "var(--v-fg-3)",
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement(Flag, {
      code: country.iso,
      width: 22,
      radius: 3
    }), " ", country.count.toLocaleString(), " stations \xB7 showing top ", list.length), list.map((s, i) => /*#__PURE__*/React.createElement(window.ListRow, {
      key: s.stationuuid,
      station: s,
      index: i + 1,
      playing: playing,
      active: current?.stationuuid === s.stationuuid,
      onPlay: onPlay,
      onOpen: onOpen
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "v-fade .35s ease"
    }
  }, /*#__PURE__*/React.createElement(window.TopBar, {
    title: "Browse"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 4px 18px",
      color: "var(--v-fg-3)",
      fontSize: 14.5
    }
  }, "Tune in to live radio from around the world."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 12
    }
  }, G.countries.map(c => /*#__PURE__*/React.createElement(CountryCard, {
    key: c.iso,
    c: c,
    onClick: () => setCountry(c)
  }))));
}
function LibraryView({
  favorites,
  current,
  playing,
  onPlay,
  onOpen,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "v-fade .35s ease"
    }
  }, /*#__PURE__*/React.createElement(window.TopBar, {
    title: "Your Library"
  }), favorites.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "70px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      margin: "0 auto 18px",
      borderRadius: "var(--v-r-lg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--v-elev-2)",
      color: "var(--v-fg-3)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "40",
    height: "40",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 4v17M10 4v17"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "4",
    width: "6",
    height: "17",
    rx: "1.5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 750,
      color: "var(--v-fg)"
    }
  }, "Build your collection"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      color: "var(--v-fg-3)",
      marginTop: 8
    }
  }, "Tap the heart on any station to save it here.")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--v-fg-3)",
      margin: "0 4px 8px"
    }
  }, favorites.length, " saved station", favorites.length !== 1 ? "s" : ""), favorites.map((s, i) => /*#__PURE__*/React.createElement(window.ListRow, {
    key: s.stationuuid,
    station: s,
    index: i + 1,
    playing: playing,
    active: current?.stationuuid === s.stationuuid,
    onPlay: onPlay,
    onOpen: onOpen,
    trailing: /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: e => {
        e.stopPropagation();
        onRemove(s);
      },
      "aria-label": "Remove",
      style: {
        border: "none",
        background: "transparent",
        color: "var(--v-accent)",
        cursor: "pointer",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 18,
      style: {
        fill: "currentColor",
        stroke: "none"
      }
    }))
  }))));
}
Object.assign(window, {
  SearchView,
  BrowseView,
  LibraryView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio-v2/views.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio/BrowseSheet.jsx
try { (() => {
// BrowseSheet — country list → station list, with search.
const {
  Icon,
  Flag,
  Button,
  SearchInput,
  StationRow,
  CountryRow
} = window.InternetRadioDesignSystem_7e870d;
function BrowseSheet({
  open,
  onClose,
  country,
  onPickCountry,
  onBack,
  onPickStation,
  currentUuid
}) {
  const [q, setQ] = React.useState("");
  React.useEffect(() => {
    if (open) setQ("");
  }, [open, country]);
  const D = window.IR_DATA;
  const inStations = !!country;
  const stations = inStations ? D.stations[country.iso_3166_1] || [] : [];
  const countries = D.countries.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));
  const filtered = stations.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement(window.Sheet, {
    open: open,
    onClose: onClose
  }, /*#__PURE__*/React.createElement(window.SheetHeader, {
    onClose: onClose,
    onBack: inStations ? onBack : undefined,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "globe",
      size: 16
    }),
    title: inStations ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Flag, {
      code: country.iso_3166_1,
      width: 18,
      radius: 2
    }), country.name) : "Select Country",
    subtitle: inStations ? `${stations.length} stations loaded` : `${D.countries.length} countries available`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: inStations ? "Search stations…" : "Search countries…"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "0 8px 20px"
    }
  }, inStations ? filtered.map(s => /*#__PURE__*/React.createElement(StationRow, {
    key: s.stationuuid,
    name: s.name,
    tags: (s.tags || "").split(",").map(t => t.trim()).filter(Boolean),
    bitrate: s.bitrate,
    active: currentUuid === s.stationuuid,
    onClick: () => onPickStation(s, country)
  })) : countries.map(c => /*#__PURE__*/React.createElement(CountryRow, {
    key: c.iso_3166_1,
    name: c.name,
    code: c.iso_3166_1,
    stationCount: c.stationcount,
    onClick: () => onPickCountry(c)
  }))));
}
window.BrowseSheet = BrowseSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio/BrowseSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio/FavoritesSheet.jsx
try { (() => {
// FavoritesSheet — saved stations with empty state + remove.
const {
  Icon,
  Flag,
  StationArtwork
} = window.InternetRadioDesignSystem_7e870d;
function FavoritesSheet({
  open,
  onClose,
  favorites,
  onPick,
  onRemove,
  currentUuid
}) {
  return /*#__PURE__*/React.createElement(window.Sheet, {
    open: open,
    onClose: onClose
  }, /*#__PURE__*/React.createElement(window.SheetHeader, {
    onClose: onClose,
    iconTone: "fav",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 16,
      style: {
        fill: "currentColor",
        stroke: "none"
      }
    }),
    title: "Favorites",
    subtitle: favorites.length === 0 ? "No saved stations" : `${favorites.length} saved station${favorites.length !== 1 ? "s" : ""}`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "0 8px 20px"
    }
  }, favorites.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "64px 24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20,
      display: "flex",
      height: 64,
      width: 64,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-xl)",
      background: "var(--glass)",
      border: "1px solid var(--border)",
      color: "var(--fg-3)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 32,
    style: {
      stroke: "currentColor",
      fill: "none",
      strokeWidth: 2
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 500,
      color: "#fff"
    }
  }, "No favorites yet"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 12,
      color: "var(--fg-3)"
    }
  }, "Tap the heart while listening to save a station here.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 0"
    }
  }, favorites.map(fav => {
    const active = currentUuid === fav.station.stationuuid;
    return /*#__PURE__*/React.createElement("div", {
      key: fav.station.stationuuid,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: "var(--radius-lg)",
        background: active ? "var(--fav-soft)" : "transparent",
        boxShadow: active ? "inset 0 0 0 1px var(--fav-border)" : "none"
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onPick(fav),
      style: {
        display: "flex",
        flex: 1,
        minWidth: 0,
        alignItems: "center",
        gap: 12,
        textAlign: "left",
        border: "none",
        background: "transparent",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(StationArtwork, {
      src: fav.station.favicon,
      alt: fav.station.name,
      size: "sm"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        bottom: -2,
        right: -2,
        display: "flex",
        height: 16,
        width: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-full)",
        background: "rgba(10,10,20,0.9)",
        border: "1px solid var(--border)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(Flag, {
      code: fav.country.iso_3166_1,
      width: 14,
      radius: 0,
      style: {
        height: 10
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 14,
        fontWeight: 500,
        color: active ? "#fff" : "rgba(255,255,255,0.85)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, fav.station.name), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "2px 0 0",
        fontSize: 11,
        color: "var(--fg-3)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, fav.country.name, fav.station.bitrate ? ` · ${fav.station.bitrate} kbps` : ""))), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onRemove(fav.station.stationuuid),
      "aria-label": "Remove",
      style: {
        display: "flex",
        height: 28,
        width: 28,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-full)",
        border: "none",
        background: "transparent",
        color: "var(--fg-4)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 14,
      strokeWidth: 2.5
    })));
  }))));
}
window.FavoritesSheet = FavoritesSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio/FavoritesSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio/Header.jsx
try { (() => {
// Header — logo lockup, active country pill, globe + favorites buttons.
const {
  Icon,
  Flag
} = window.InternetRadioDesignSystem_7e870d;
function Header({
  country,
  favCount,
  onOpenBrowse,
  onOpenFavorites
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "glass-panel",
    style: {
      position: "relative",
      zIndex: 10,
      flexShrink: 0,
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      paddingTop: "max(12px, var(--safe-top))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "0 16px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      minWidth: 0,
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
      flexShrink: 0,
      borderRadius: 12,
      background: "linear-gradient(135deg, rgba(148,136,245,0.25), rgba(124,108,240,0.15))",
      border: "1px solid rgba(124,108,240,0.35)",
      color: "var(--accent-hover)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "signal",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "#fff"
    }
  }, "Internet Radio"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      fontSize: 10,
      color: "var(--fg-3)"
    }
  }, "Stream the world"))), country && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onOpenBrowse,
    style: {
      display: "flex",
      flexShrink: 0,
      alignItems: "center",
      gap: 6,
      borderRadius: "var(--radius-full)",
      padding: "6px 12px",
      maxWidth: 160,
      fontSize: 12,
      fontWeight: 500,
      cursor: "pointer",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      color: "var(--fg-2)"
    }
  }, /*#__PURE__*/React.createElement(Flag, {
    code: country.iso_3166_1,
    width: 16,
    radius: 2
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, country.name)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onOpenBrowse,
    "aria-label": "Select country",
    style: {
      display: "flex",
      height: 36,
      width: 36,
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      cursor: "pointer",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      color: "var(--fg-2)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onOpenFavorites,
    "aria-label": "Favorites",
    style: {
      position: "relative",
      display: "flex",
      height: 36,
      width: 36,
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      cursor: "pointer",
      background: favCount > 0 ? "var(--fav-soft)" : "var(--surface)",
      border: favCount > 0 ? "1px solid var(--fav-border)" : "1px solid var(--border)",
      color: favCount > 0 ? "var(--fav)" : "var(--fg-2)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 16,
    style: {
      fill: favCount > 0 ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: 2
    }
  }), favCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -4,
      right: -4,
      display: "flex",
      height: 16,
      width: 16,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      fontSize: 9,
      fontWeight: 700,
      color: "#fff",
      background: "var(--fav)"
    }
  }, favCount > 9 ? "9+" : favCount))));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio/PlayerView.jsx
try { (() => {
// PlayerView — empty state + active now-playing screen with transport controls.
const {
  Icon,
  Badge,
  Tag,
  Button,
  IconButton,
  StationArtwork
} = window.InternetRadioDesignSystem_7e870d;
function EmptyState({
  onBrowse
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      maxWidth: 300
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28,
      display: "flex",
      height: 96,
      width: 96,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-4xl)",
      background: "var(--accent-soft)",
      border: "1px solid rgba(124,108,240,0.2)",
      boxShadow: "0 8px 40px rgba(124,108,240,0.15)",
      color: "var(--accent-hover)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 48,
    strokeWidth: 1.5
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: "var(--text-2xl)",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "#fff"
    }
  }, "Nothing playing"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      fontSize: 14,
      lineHeight: 1.6,
      color: "var(--fg-2)"
    }
  }, "Choose a country and station to start streaming radio from around the world."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    style: {
      marginTop: 32
    },
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "globe",
      size: 16,
      strokeWidth: 2
    }),
    onClick: onBrowse
  }, "Select Country")));
}
function PlayerView({
  station,
  isPlaying,
  isFav,
  volume,
  muted,
  onToggle,
  onPrev,
  onNext,
  onToggleFav,
  onShare,
  onBrowse,
  onToggleMute,
  onVolume,
  canTune
}) {
  const tags = (station.tags || "").split(",").map(t => t.trim()).filter(Boolean).slice(0, 6);
  const meta = [station.country, station.language].filter(Boolean).join(" · ");
  const techMeta = [station.codec, station.bitrate ? station.bitrate + " kbps" : ""].filter(Boolean).join(" · ");
  const volPct = Math.round((muted ? 0 : volume) * 100);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flex: 1,
      minHeight: 0,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(StationArtwork, {
    src: station.favicon,
    alt: station.name,
    size: "lg",
    playing: isPlaying
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12,
      height: 24,
      display: "flex",
      alignItems: "center"
    }
  }, isPlaying ? /*#__PURE__*/React.createElement(Badge, {
    tone: "live"
  }, "Live") : /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    showDot: false
  }, "Paused")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      maxWidth: 460,
      textAlign: "center",
      fontSize: "var(--text-2xl)",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.02em",
      color: "#fff"
    }
  }, station.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      textAlign: "center",
      fontSize: 14,
      color: "var(--fg-2)"
    }
  }, meta, techMeta && " · " + techMeta), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      maxWidth: 360,
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 6
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel",
    style: {
      position: "relative",
      flexShrink: 0,
      borderTop: "1px solid rgba(255,255,255,0.07)",
      paddingBottom: "max(16px, var(--safe-bottom))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      maxWidth: 420,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Share",
    onClick: onShare
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Previous",
    size: "lg",
    disabled: !canTune,
    onClick: onPrev
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "prev",
    size: 20
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    "aria-label": isPlaying ? "Pause" : "Play",
    style: {
      margin: "0 8px",
      display: "flex",
      height: 64,
      width: 64,
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      background: "var(--gradient-accent)",
      boxShadow: "var(--glow-accent-md)"
    }
  }, isPlaying ? /*#__PURE__*/React.createElement(Icon, {
    name: "pause",
    size: 28
  }) : /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 28,
    style: {
      marginLeft: 2
    }
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Next",
    size: "lg",
    disabled: !canTune,
    onClick: onNext
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "next",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Favorite",
    tone: "fav",
    active: isFav,
    onClick: onToggleFav
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 20,
    style: {
      fill: isFav ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: 2
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      maxWidth: 320,
      margin: "16px auto 0"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Browse",
    size: "sm",
    onClick: onBrowse
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "list",
    size: 16,
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: muted ? "Unmute" : "Mute",
    size: "sm",
    onClick: onToggleMute
  }, /*#__PURE__*/React.createElement(Icon, {
    name: muted || volume === 0 ? "volumeMute" : "volume",
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 1,
    step: 0.01,
    value: muted ? 0 : volume,
    onChange: e => onVolume(parseFloat(e.target.value)),
    "aria-label": "Volume",
    style: {
      flex: 1,
      height: 4,
      cursor: "pointer",
      accentColor: "var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      textAlign: "right",
      fontSize: 11,
      fontVariantNumeric: "tabular-nums",
      color: "var(--fg-3)"
    }
  }, volPct)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      textAlign: "center",
      fontSize: 10,
      color: "var(--fg-4)"
    }
  }, "Space \xB7 play/pause\xA0\xA0\u2190 \u2192 \xB7 skip\xA0\xA0M \xB7 mute"))));
}
window.EmptyState = EmptyState;
window.PlayerView = PlayerView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio/PlayerView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio/ShareSheet.jsx
try { (() => {
// ShareSheet — station hero + QR code + copy link.
const {
  Icon,
  Tag
} = window.InternetRadioDesignSystem_7e870d;
function ShareSheet({
  open,
  onClose,
  station,
  country
}) {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);
  if (!station) return null;
  const tags = (station.tags || "").split(",").map(t => t.trim()).filter(Boolean).slice(0, 3);
  const url = `https://free-internet-radio.vercel.app/?country=${country?.iso_3166_1 || ""}&station=${station.stationuuid}`;
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&color=1a0f3c&data=${encodeURIComponent(url)}`;
  return /*#__PURE__*/React.createElement(window.Sheet, {
    open: open,
    onClose: onClose,
    maxWidth: 320
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      zIndex: 10,
      display: "flex",
      height: 28,
      width: 28,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      border: "none",
      background: "var(--surface)",
      color: "var(--fg-2)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 14,
    strokeWidth: 2.5
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "28px 24px 20px",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: 64,
      width: 64,
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      background: "var(--accent-soft)",
      border: "1.5px solid rgba(124,108,240,0.2)",
      boxShadow: "0 0 24px rgba(124,108,240,0.2)",
      color: "var(--accent-hover)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "radio",
    size: 32
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      minWidth: 0,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700,
      color: "#fff",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, station.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 12,
      color: "var(--fg-3)"
    }
  }, [country?.name, station.language].filter(Boolean).join(" · "))), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 6
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    accent: true
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "0 24px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--border-subtle)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      fontWeight: 500,
      color: "var(--fg-4)"
    }
  }, "Scan to tune in"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--border-subtle)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 24px 24px",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "var(--radius-2xl)",
      padding: 16,
      background: "#fff",
      boxShadow: "0 0 0 1px rgba(124,108,240,0.2), 0 8px 40px rgba(124,108,240,0.25)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: qr,
    alt: "QR code",
    width: 188,
    height: 188,
    style: {
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setCopied(true);
    },
    style: {
      width: "100%",
      borderRadius: "var(--radius-lg)",
      padding: "12px 0",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      background: copied ? "rgba(52,199,89,0.15)" : "var(--accent-soft)",
      border: copied ? "1px solid rgba(52,199,89,0.35)" : "1px solid var(--accent-ring)",
      color: copied ? "var(--success)" : "rgba(255,255,255,0.9)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: copied ? "check" : "copy",
    size: 14,
    strokeWidth: 2.5
  }), copied ? "Link copied!" : "Copy Link"))));
}
window.ShareSheet = ShareSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio/ShareSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio/Sheet.jsx
try { (() => {
// Sheet — shared modal scaffold (scrim + rising glass sheet + header).
const {
  Icon
} = window.InternetRadioDesignSystem_7e870d;
function Sheet({
  open,
  onClose,
  children,
  maxWidth = 448
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    },
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      background: "var(--scrim)",
      backdropFilter: "var(--blur-overlay)",
      WebkitBackdropFilter: "var(--blur-overlay)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-sheet",
    style: {
      width: "100%",
      maxWidth,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      maxHeight: "92%",
      borderTopLeftRadius: "var(--radius-3xl)",
      borderTopRightRadius: "var(--radius-3xl)",
      background: "var(--bg-sheet)",
      backdropFilter: "var(--blur-sheet)",
      WebkitBackdropFilter: "var(--blur-sheet)",
      border: "1px solid var(--border-strong)",
      boxShadow: "var(--shadow-sheet)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      paddingTop: 12,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      width: 36,
      borderRadius: "var(--radius-full)",
      background: "rgba(255,255,255,0.18)"
    }
  })), children));
}
function SheetHeader({
  icon,
  iconTone = "accent",
  title,
  subtitle,
  onBack,
  onClose
}) {
  const toneBg = iconTone === "fav" ? "var(--fav-soft)" : "var(--accent-soft)";
  const toneColor = iconTone === "fav" ? "var(--fav)" : "var(--accent-hover)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexShrink: 0,
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      borderBottom: "1px solid rgba(255,255,255,0.07)"
    }
  }, onBack ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    style: iconBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowLeft",
    size: 16,
    strokeWidth: 2.5
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: 32,
      width: 32,
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      background: toneBg,
      color: toneColor
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      color: "#fff",
      lineHeight: 1.2,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "1px 0 0",
      fontSize: 11,
      color: "var(--fg-3)"
    }
  }, subtitle)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    style: iconBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16,
    strokeWidth: 2.5
  })));
}
const iconBtn = {
  display: "flex",
  height: 32,
  width: 32,
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "var(--radius-full)",
  border: "none",
  background: "transparent",
  color: "var(--fg-2)",
  cursor: "pointer"
};
window.Sheet = Sheet;
window.SheetHeader = SheetHeader;
window.sheetIconBtn = iconBtn;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio/Sheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio/app.jsx
try { (() => {
// App — orchestrates the Internet Radio surfaces over a fake catalog.
function App() {
  const D = window.IR_DATA;
  const [country, setCountry] = React.useState(null);
  const [station, setStation] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.8);
  const [muted, setMuted] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);

  // sheets
  const [browseOpen, setBrowseOpen] = React.useState(false);
  const [browseCountry, setBrowseCountry] = React.useState(null); // null = country list
  const [favOpen, setFavOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const list = country ? D.stations[country.iso_3166_1] || [] : [];
  const idx = station ? list.findIndex(s => s.stationuuid === station.stationuuid) : -1;
  const canTune = list.length > 1 && idx >= 0;
  const isFav = !!station && favorites.some(f => f.station.stationuuid === station.stationuuid);
  const openBrowse = () => {
    setBrowseCountry(country || null);
    setBrowseOpen(true);
  };
  const pickStation = (s, c) => {
    setStation(s);
    setCountry(c);
    setIsPlaying(true);
    setBrowseOpen(false);
  };
  const tune = dir => {
    if (!canTune) return;
    const next = list[(idx + dir + list.length) % list.length];
    setStation(next);
    setIsPlaying(true);
  };
  const toggleFav = () => {
    if (!station || !country) return;
    setFavorites(prev => prev.some(f => f.station.stationuuid === station.stationuuid) ? prev.filter(f => f.station.stationuuid !== station.stationuuid) : [...prev, {
      station,
      country
    }]);
  };
  const pickFav = fav => {
    setCountry(fav.country);
    setStation(fav.station);
    setIsPlaying(true);
    setFavOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
      background: "var(--bg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "var(--gradient-bg-glow)"
    }
  }), /*#__PURE__*/React.createElement(window.Header, {
    country: country,
    favCount: favorites.length,
    onOpenBrowse: openBrowse,
    onOpenFavorites: () => setFavOpen(true)
  }), station ? /*#__PURE__*/React.createElement(window.PlayerView, {
    station: station,
    isPlaying: isPlaying,
    isFav: isFav,
    volume: volume,
    muted: muted,
    canTune: canTune,
    onToggle: () => setIsPlaying(p => !p),
    onPrev: () => tune(-1),
    onNext: () => tune(1),
    onToggleFav: toggleFav,
    onShare: () => setShareOpen(true),
    onBrowse: openBrowse,
    onToggleMute: () => setMuted(m => !m),
    onVolume: v => {
      setVolume(v);
      if (v > 0) setMuted(false);
    }
  }) : /*#__PURE__*/React.createElement(window.EmptyState, {
    onBrowse: openBrowse
  }), /*#__PURE__*/React.createElement(window.BrowseSheet, {
    open: browseOpen,
    onClose: () => setBrowseOpen(false),
    country: browseCountry,
    onPickCountry: c => setBrowseCountry(c),
    onBack: () => setBrowseCountry(null),
    onPickStation: pickStation,
    currentUuid: station?.stationuuid
  }), /*#__PURE__*/React.createElement(window.FavoritesSheet, {
    open: favOpen,
    onClose: () => setFavOpen(false),
    favorites: favorites,
    onPick: pickFav,
    onRemove: uuid => setFavorites(p => p.filter(f => f.station.stationuuid !== uuid)),
    currentUuid: station?.stationuuid
  }), /*#__PURE__*/React.createElement(window.ShareSheet, {
    open: shareOpen,
    onClose: () => setShareOpen(false),
    station: station,
    country: country
  }));
}
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/internet-radio/data.js
try { (() => {
// Fake catalog for the Internet Radio UI kit. Shapes mirror lib/types.ts.
window.IR_DATA = {
  countries: [{
    name: "United Kingdom",
    iso_3166_1: "GB",
    stationcount: 2841
  }, {
    name: "United States",
    iso_3166_1: "US",
    stationcount: 5392
  }, {
    name: "Japan",
    iso_3166_1: "JP",
    stationcount: 1209
  }, {
    name: "France",
    iso_3166_1: "FR",
    stationcount: 1876
  }, {
    name: "Germany",
    iso_3166_1: "DE",
    stationcount: 3104
  }, {
    name: "Brazil",
    iso_3166_1: "BR",
    stationcount: 1442
  }, {
    name: "Italy",
    iso_3166_1: "IT",
    stationcount: 1330
  }, {
    name: "Spain",
    iso_3166_1: "ES",
    stationcount: 1188
  }, {
    name: "Mexico",
    iso_3166_1: "MX",
    stationcount: 980
  }, {
    name: "Australia",
    iso_3166_1: "AU",
    stationcount: 742
  }],
  stations: {
    GB: [{
      stationuuid: "gb1",
      name: "BBC Radio 6 Music",
      favicon: "",
      tags: "alternative,indie,eclectic",
      country: "United Kingdom",
      language: "english",
      codec: "MP3",
      bitrate: 128
    }, {
      stationuuid: "gb2",
      name: "BBC Radio 1",
      favicon: "",
      tags: "pop,top 40,dance",
      country: "United Kingdom",
      language: "english",
      codec: "AAC",
      bitrate: 128
    }, {
      stationuuid: "gb3",
      name: "Jazz FM",
      favicon: "",
      tags: "jazz,soul,blues",
      country: "United Kingdom",
      language: "english",
      codec: "MP3",
      bitrate: 256
    }, {
      stationuuid: "gb4",
      name: "Capital London",
      favicon: "",
      tags: "pop,hits",
      country: "United Kingdom",
      language: "english",
      codec: "MP3",
      bitrate: 128
    }, {
      stationuuid: "gb5",
      name: "Classic FM",
      favicon: "",
      tags: "classical",
      country: "United Kingdom",
      language: "english",
      codec: "AAC",
      bitrate: 192
    }, {
      stationuuid: "gb6",
      name: "Kiss Fresh",
      favicon: "",
      tags: "dance,electronic",
      country: "United Kingdom",
      language: "english",
      codec: "MP3",
      bitrate: 128
    }],
    US: [{
      stationuuid: "us1",
      name: "KEXP 90.3 FM Seattle",
      favicon: "",
      tags: "eclectic,public,indie",
      country: "United States",
      language: "english",
      codec: "MP3",
      bitrate: 128
    }, {
      stationuuid: "us2",
      name: "WNYC 93.9 FM",
      favicon: "",
      tags: "news,talk,public",
      country: "United States",
      language: "english",
      codec: "AAC",
      bitrate: 128
    }, {
      stationuuid: "us3",
      name: "Hot 97",
      favicon: "",
      tags: "hip hop,rap",
      country: "United States",
      language: "english",
      codec: "MP3",
      bitrate: 128
    }, {
      stationuuid: "us4",
      name: "WFMU",
      favicon: "",
      tags: "freeform,eclectic",
      country: "United States",
      language: "english",
      codec: "MP3",
      bitrate: 128
    }],
    JP: [{
      stationuuid: "jp1",
      name: "J-WAVE 81.3",
      favicon: "",
      tags: "j-pop,city pop",
      country: "Japan",
      language: "japanese",
      codec: "AAC",
      bitrate: 128
    }, {
      stationuuid: "jp2",
      name: "Tokyo FM",
      favicon: "",
      tags: "pop,talk",
      country: "Japan",
      language: "japanese",
      codec: "MP3",
      bitrate: 128
    }, {
      stationuuid: "jp3",
      name: "InterFM897",
      favicon: "",
      tags: "bilingual,rock",
      country: "Japan",
      language: "japanese",
      codec: "MP3",
      bitrate: 192
    }],
    FR: [{
      stationuuid: "fr1",
      name: "FIP",
      favicon: "",
      tags: "eclectic,jazz,world",
      country: "France",
      language: "french",
      codec: "MP3",
      bitrate: 192
    }, {
      stationuuid: "fr2",
      name: "Radio Nova",
      favicon: "",
      tags: "eclectic,groove",
      country: "France",
      language: "french",
      codec: "AAC",
      bitrate: 128
    }, {
      stationuuid: "fr3",
      name: "France Inter",
      favicon: "",
      tags: "news,talk,culture",
      country: "France",
      language: "french",
      codec: "MP3",
      bitrate: 128
    }],
    DE: [{
      stationuuid: "de1",
      name: "FluxFM Berlin",
      favicon: "",
      tags: "alternative,indie",
      country: "Germany",
      language: "german",
      codec: "MP3",
      bitrate: 128
    }, {
      stationuuid: "de2",
      name: "1LIVE",
      favicon: "",
      tags: "pop,charts",
      country: "Germany",
      language: "german",
      codec: "AAC",
      bitrate: 128
    }],
    BR: [{
      stationuuid: "br1",
      name: "Rádio Globo",
      favicon: "",
      tags: "talk,sports",
      country: "Brazil",
      language: "portuguese",
      codec: "MP3",
      bitrate: 128
    }, {
      stationuuid: "br2",
      name: "Antena 1",
      favicon: "",
      tags: "soft rock,pop",
      country: "Brazil",
      language: "portuguese",
      codec: "MP3",
      bitrate: 128
    }],
    IT: [{
      stationuuid: "it1",
      name: "Radio Deejay",
      favicon: "",
      tags: "pop,dance",
      country: "Italy",
      language: "italian",
      codec: "MP3",
      bitrate: 128
    }],
    ES: [{
      stationuuid: "es1",
      name: "Los 40",
      favicon: "",
      tags: "pop,hits",
      country: "Spain",
      language: "spanish",
      codec: "MP3",
      bitrate: 128
    }],
    MX: [{
      stationuuid: "mx1",
      name: "Los 40 México",
      favicon: "",
      tags: "pop,latin",
      country: "Mexico",
      language: "spanish",
      codec: "MP3",
      bitrate: 128
    }],
    AU: [{
      stationuuid: "au1",
      name: "Triple J",
      favicon: "",
      tags: "alternative,indie",
      country: "Australia",
      language: "english",
      codec: "MP3",
      bitrate: 128
    }]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/internet-radio/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.CountryRow = __ds_scope.CountryRow;

__ds_ns.Flag = __ds_scope.Flag;

__ds_ns.StationArtwork = __ds_scope.StationArtwork;

__ds_ns.StationRow = __ds_scope.StationRow;

})();
