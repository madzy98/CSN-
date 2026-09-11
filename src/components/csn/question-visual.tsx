// @ts-nocheck — regulatory SVG pack ported from live CSN+ (sign colours locked).
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

const t = { jsx, jsxs, Fragment };

const n = `#D32F2F`;
const r = `#1E5AA8`;
const i = `#F5C400`;
const a = `#F7F7F7`;
const o = `#161616`;
const s = `#1B7A3D`;
function c({ children: e, bg: n = `transparent`, className: r }) {
  return (0, t.jsxs)(`svg`, {
    viewBox: `0 0 120 120`,
    className: r,
    role: `img`,
    style: { filter: `drop-shadow(0 8px 18px rgba(0,0,0,.35))` },
    children: [
      (0, t.jsx)(`rect`, {
        x: 0,
        y: 0,
        width: `120`,
        height: `120`,
        rx: `10`,
        fill: n,
      }),
      e,
    ],
  });
}
function l({ children: e }) {
  return (0, t.jsxs)(c, {
    children: [
      (0, t.jsx)(`polygon`, {
        points: `60,10 112,108 8,108`,
        fill: a,
        stroke: n,
        strokeWidth: `8`,
        strokeLinejoin: `round`,
      }),
      e,
    ],
  });
}
function u({ children: e, filled: r }) {
  return (0, t.jsxs)(c, {
    children: [
      (0, t.jsx)(`circle`, {
        cx: `60`,
        cy: `60`,
        r: `48`,
        fill: r ? n : a,
        stroke: n,
        strokeWidth: `8`,
      }),
      e,
    ],
  });
}
function d({ children: e }) {
  return (0, t.jsxs)(c, {
    children: [
      (0, t.jsx)(`circle`, { cx: `60`, cy: `60`, r: `48`, fill: r }),
      e,
    ],
  });
}
function f({ children: e, color: n = r }) {
  return (0, t.jsxs)(c, {
    children: [
      (0, t.jsx)(`rect`, {
        x: 12,
        y: 12,
        width: `96`,
        height: `96`,
        rx: `8`,
        fill: n,
      }),
      e,
    ],
  });
}
function p({ n: e }) {
  return (0, t.jsx)(u, {
    children: (0, t.jsx)(`text`, {
      x: 60,
      y: 72,
      textAnchor: `middle`,
      fontSize: e >= 100 ? 36 : 42,
      fontWeight: `700`,
      fontFamily: `Manrope, sans-serif`,
      fill: o,
      children: e,
    }),
  });
}
function m() {
  return (0, t.jsx)(`line`, {
    x1: `28`,
    y1: `92`,
    x2: `92`,
    y2: `28`,
    stroke: n,
    strokeWidth: `10`,
    strokeLinecap: `round`,
  });
}
function h({ x: e = 60, y: n = 70, scale: r = 1, fill: i = o }) {
  return (0, t.jsxs)(`g`, {
    transform: `translate(${e} ${n}) scale(${r})`,
    children: [
      (0, t.jsx)(`rect`, {
        x: -18,
        y: -8,
        width: `36`,
        height: `14`,
        rx: `3`,
        fill: i,
      }),
      (0, t.jsx)(`rect`, {
        x: -12,
        y: -16,
        width: `24`,
        height: `10`,
        rx: `3`,
        fill: i,
      }),
    ],
  });
}
function g({ x: e = 60, y: n = 62, fill: r = o }) {
  return (0, t.jsxs)(`g`, {
    transform: `translate(${e} ${n})`,
    children: [
      (0, t.jsx)(`circle`, { cx: `0`, cy: `-16`, r: `6`, fill: r }),
      (0, t.jsx)(`path`, {
        d: `M0 -8 L0 8 M0 0 L-10 6 M0 0 L10 4 M0 8 L-8 22 M0 8 L8 22`,
        stroke: r,
        strokeWidth: `4`,
        fill: `none`,
        strokeLinecap: `round`,
      }),
    ],
  });
}
var _ = {
  stop: () =>
    (0, t.jsxs)(c, {
      children: [
        (0, t.jsx)(`polygon`, {
          points: `60,8 96,22 112,58 96,94 60,112 24,94 8,58 24,22`,
          fill: n,
          stroke: a,
          strokeWidth: `5`,
        }),
        (0, t.jsx)(`text`, {
          x: 60,
          y: 68,
          textAnchor: `middle`,
          fontSize: `18`,
          fontWeight: `800`,
          fill: a,
          fontFamily: `Manrope, sans-serif`,
          children: `STOP`,
        }),
      ],
    }),
  yield: () =>
    (0, t.jsx)(c, {
      children: (0, t.jsx)(`polygon`, {
        points: `60,108 112,16 8,16`,
        fill: a,
        stroke: n,
        strokeWidth: `8`,
        strokeLinejoin: `round`,
      }),
    }),
  "no-entry": () =>
    (0, t.jsx)(u, {
      filled: !0,
      children: (0, t.jsx)(`rect`, {
        x: 26,
        y: 52,
        width: `68`,
        height: `16`,
        rx: `2`,
        fill: a,
      }),
    }),
  "no-vehicles": () => (0, t.jsx)(u, { children: (0, t.jsx)(m, {}) }),
  "no-overtaking": () =>
    (0, t.jsxs)(u, {
      children: [
        (0, t.jsx)(h, { x: 42, y: 70, fill: o }),
        (0, t.jsx)(h, { x: 74, y: 70, fill: n }),
      ],
    }),
  "end-no-overtaking": () =>
    (0, t.jsxs)(u, {
      children: [
        (0, t.jsx)(h, { x: 42, y: 70, fill: o }),
        (0, t.jsx)(h, { x: 74, y: 70, fill: n }),
        (0, t.jsx)(`line`, {
          x1: `24`,
          y1: `96`,
          x2: `96`,
          y2: `24`,
          stroke: o,
          strokeWidth: `5`,
        }),
      ],
    }),
  "speed-30": () => (0, t.jsx)(p, { n: 30 }),
  "speed-50": () => (0, t.jsx)(p, { n: 50 }),
  "speed-70": () => (0, t.jsx)(p, { n: 70 }),
  "speed-90": () => (0, t.jsx)(p, { n: 90 }),
  "speed-110": () => (0, t.jsx)(p, { n: 110 }),
  "end-speed": () =>
    (0, t.jsxs)(u, {
      children: [
        (0, t.jsx)(`text`, {
          x: 60,
          y: 72,
          textAnchor: `middle`,
          fontSize: `36`,
          fontWeight: `700`,
          fill: o,
          fontFamily: `Manrope, sans-serif`,
          children: `50`,
        }),
        (0, t.jsx)(`line`, {
          x1: `26`,
          y1: `94`,
          x2: `94`,
          y2: `26`,
          stroke: o,
          strokeWidth: `5`,
        }),
      ],
    }),
  "end-all-limits": () =>
    (0, t.jsxs)(c, {
      children: [
        (0, t.jsx)(`circle`, {
          cx: `60`,
          cy: `60`,
          r: `48`,
          fill: a,
          stroke: o,
          strokeWidth: `4`,
        }),
        (0, t.jsx)(`line`, {
          x1: `26`,
          y1: `94`,
          x2: `94`,
          y2: `26`,
          stroke: o,
          strokeWidth: `6`,
        }),
      ],
    }),
  "no-stopping": () =>
    (0, t.jsxs)(c, {
      children: [
        (0, t.jsx)(`circle`, { cx: `60`, cy: `60`, r: `48`, fill: r }),
        (0, t.jsx)(`circle`, {
          cx: `60`,
          cy: `60`,
          r: `40`,
          fill: `none`,
          stroke: n,
          strokeWidth: `8`,
        }),
        (0, t.jsx)(`line`, {
          x1: `32`,
          y1: `32`,
          x2: `88`,
          y2: `88`,
          stroke: n,
          strokeWidth: `8`,
        }),
        (0, t.jsx)(`line`, {
          x1: `88`,
          y1: `32`,
          x2: `32`,
          y2: `88`,
          stroke: n,
          strokeWidth: `8`,
        }),
      ],
    }),
  "no-parking": () =>
    (0, t.jsxs)(c, {
      children: [
        (0, t.jsx)(`circle`, { cx: `60`, cy: `60`, r: `48`, fill: r }),
        (0, t.jsx)(`circle`, {
          cx: `60`,
          cy: `60`,
          r: `40`,
          fill: `none`,
          stroke: n,
          strokeWidth: `8`,
        }),
        (0, t.jsx)(`line`, {
          x1: `32`,
          y1: `32`,
          x2: `88`,
          y2: `88`,
          stroke: n,
          strokeWidth: `8`,
        }),
      ],
    }),
  "no-u-turn": () =>
    (0, t.jsxs)(u, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M40 80 V48 a16 16 0 0 1 32 0 V62`,
          fill: `none`,
          stroke: o,
          strokeWidth: `7`,
        }),
        (0, t.jsx)(`polygon`, { points: `72,74 64,62 80,62`, fill: o }),
        (0, t.jsx)(m, {}),
      ],
    }),
  "no-left": () =>
    (0, t.jsxs)(u, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M70 86 V50 H46`,
          fill: `none`,
          stroke: o,
          strokeWidth: `8`,
          strokeLinecap: `square`,
        }),
        (0, t.jsx)(`polygon`, { points: `46,50 58,42 58,58`, fill: o }),
        (0, t.jsx)(m, {}),
      ],
    }),
  "no-right": () =>
    (0, t.jsxs)(u, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M50 86 V50 H74`,
          fill: `none`,
          stroke: o,
          strokeWidth: `8`,
          strokeLinecap: `square`,
        }),
        (0, t.jsx)(`polygon`, { points: `74,50 62,42 62,58`, fill: o }),
        (0, t.jsx)(m, {}),
      ],
    }),
  "pedestrian-warn": () =>
    (0, t.jsx)(l, { children: (0, t.jsx)(g, { y: 68 }) }),
  "pedestrian-info": () =>
    (0, t.jsxs)(f, {
      children: [
        (0, t.jsx)(`polygon`, { points: `60,28 92,84 28,84`, fill: a }),
        (0, t.jsx)(g, { y: 64, fill: r }),
      ],
    }),
  children: () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`g`, {
          transform: `translate(44 68) scale(0.72)`,
          children: (0, t.jsx)(g, {}),
        }),
        (0, t.jsx)(`g`, {
          transform: `translate(74 72) scale(0.55)`,
          children: (0, t.jsx)(g, {}),
        }),
      ],
    }),
  slippery: () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M36 86 Q50 50 60 70 Q72 92 86 52`,
          fill: `none`,
          stroke: o,
          strokeWidth: `6`,
          strokeLinecap: `round`,
        }),
        (0, t.jsx)(`circle`, { cx: `48`, cy: `84`, r: `4`, fill: o }),
        (0, t.jsx)(`circle`, { cx: `78`, cy: `84`, r: `4`, fill: o }),
      ],
    }),
  "curve-left": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M78 86 Q78 52 48 52`,
          fill: `none`,
          stroke: o,
          strokeWidth: `8`,
        }),
        (0, t.jsx)(`polygon`, { points: `48,52 60,44 60,60`, fill: o }),
      ],
    }),
  "curve-right": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M42 86 Q42 52 72 52`,
          fill: `none`,
          stroke: o,
          strokeWidth: `8`,
        }),
        (0, t.jsx)(`polygon`, { points: `72,52 60,44 60,60`, fill: o }),
      ],
    }),
  "double-curve": () =>
    (0, t.jsx)(l, {
      children: (0, t.jsx)(`path`, {
        d: `M34 86 Q34 58 52 58 Q72 58 72 42 Q72 30 86 30`,
        fill: `none`,
        stroke: o,
        strokeWidth: `7`,
      }),
    }),
  "roundabout-warn": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`circle`, {
          cx: `60`,
          cy: `64`,
          r: `16`,
          fill: `none`,
          stroke: o,
          strokeWidth: `6`,
        }),
        (0, t.jsx)(`polygon`, { points: `76,54 88,64 76,62`, fill: o }),
      ],
    }),
  "roundabout-mand": () =>
    (0, t.jsxs)(d, {
      children: [
        (0, t.jsx)(`circle`, {
          cx: `60`,
          cy: `60`,
          r: `16`,
          fill: `none`,
          stroke: a,
          strokeWidth: `6`,
        }),
        (0, t.jsx)(`polygon`, { points: `76,50 90,60 76,58`, fill: a }),
        (0, t.jsx)(`polygon`, { points: `44,70 30,60 44,62`, fill: a }),
      ],
    }),
  "traffic-lights": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 50,
          y: 36,
          width: `20`,
          height: `48`,
          rx: `6`,
          fill: o,
        }),
        (0, t.jsx)(`circle`, { cx: `60`, cy: `46`, r: `5`, fill: n }),
        (0, t.jsx)(`circle`, { cx: `60`, cy: `60`, r: `5`, fill: i }),
        (0, t.jsx)(`circle`, { cx: `60`, cy: `74`, r: `5`, fill: `#2E9B4A` }),
      ],
    }),
  "road-works": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`polygon`, { points: `60,42 84,86 36,86`, fill: o }),
        (0, t.jsx)(`rect`, { x: 56, y: 54, width: `8`, height: `20`, fill: a }),
      ],
    }),
  railway: () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 36,
          y: 48,
          width: `48`,
          height: `10`,
          fill: o,
        }),
        (0, t.jsx)(`rect`, {
          x: 36,
          y: 64,
          width: `48`,
          height: `10`,
          fill: o,
        }),
        (0, t.jsx)(`rect`, { x: 52, y: 42, width: `6`, height: `40`, fill: o }),
        (0, t.jsx)(`rect`, { x: 62, y: 42, width: `6`, height: `40`, fill: o }),
      ],
    }),
  "railway-none": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`text`, {
          x: 60,
          y: 58,
          textAnchor: `middle`,
          fontSize: `22`,
          fontWeight: `800`,
          fill: o,
          children: `×`,
        }),
        (0, t.jsx)(`rect`, { x: 38, y: 66, width: `44`, height: `8`, fill: o }),
        (0, t.jsx)(`rect`, { x: 38, y: 80, width: `44`, height: `8`, fill: o }),
      ],
    }),
  "wild-animals": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M40 86 L50 60 L58 70 L66 48 L82 86 Z`,
          fill: o,
        }),
        (0, t.jsx)(`circle`, { cx: `68`, cy: `46`, r: `5`, fill: o }),
      ],
    }),
  tram: () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 38,
          y: 50,
          width: `44`,
          height: `28`,
          rx: `4`,
          fill: o,
        }),
        (0, t.jsx)(`rect`, {
          x: 44,
          y: 56,
          width: `12`,
          height: `10`,
          fill: a,
        }),
        (0, t.jsx)(`rect`, {
          x: 64,
          y: 56,
          width: `12`,
          height: `10`,
          fill: a,
        }),
        (0, t.jsx)(`line`, {
          x1: `40`,
          y1: `44`,
          x2: `80`,
          y2: `44`,
          stroke: o,
          strokeWidth: `4`,
        }),
      ],
    }),
  "oncoming-priority": () =>
    (0, t.jsxs)(c, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 16,
          y: 16,
          width: `88`,
          height: `88`,
          rx: `8`,
          fill: a,
          stroke: `#c9c9c9`,
          strokeWidth: `2`,
        }),
        (0, t.jsx)(`polygon`, {
          points: `44,88 44,36 32,36 60,18 88,36 76,36 76,88`,
          fill: n,
        }),
        (0, t.jsx)(`polygon`, {
          points: `76,32 76,84 88,84 60,102 32,84 44,84 44,32`,
          fill: o,
          transform: `translate(0 0)`,
        }),
        (0, t.jsx)(`rect`, {
          x: 32,
          y: 70,
          width: `22`,
          height: `28`,
          fill: o,
        }),
      ],
    }),
  "give-way-oncoming": () =>
    (0, t.jsxs)(c, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 16,
          y: 16,
          width: `88`,
          height: `88`,
          rx: `8`,
          fill: a,
          stroke: `#c9c9c9`,
          strokeWidth: `2`,
        }),
        (0, t.jsx)(`polygon`, {
          points: `48,92 48,40 36,40 60,22 84,40 72,40 72,92`,
          fill: n,
        }),
        (0, t.jsx)(`rect`, {
          x: 52,
          y: 54,
          width: `20`,
          height: `38`,
          fill: o,
        }),
      ],
    }),
  "priority-road": () =>
    (0, t.jsxs)(c, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 20,
          y: 20,
          width: `80`,
          height: `80`,
          rx: `6`,
          fill: a,
          transform: `rotate(45 60 60)`,
        }),
        (0, t.jsx)(`rect`, {
          x: 32,
          y: 32,
          width: `56`,
          height: `56`,
          fill: i,
          transform: `rotate(45 60 60)`,
        }),
      ],
    }),
  "end-priority": () =>
    (0, t.jsxs)(c, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 20,
          y: 20,
          width: `80`,
          height: `80`,
          rx: `6`,
          fill: a,
          transform: `rotate(45 60 60)`,
        }),
        (0, t.jsx)(`rect`, {
          x: 32,
          y: 32,
          width: `56`,
          height: `56`,
          fill: i,
          transform: `rotate(45 60 60)`,
        }),
        (0, t.jsx)(`line`, {
          x1: `28`,
          y1: `92`,
          x2: `92`,
          y2: `28`,
          stroke: o,
          strokeWidth: `6`,
        }),
      ],
    }),
  "stop-ahead": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 44,
          y: 44,
          width: `32`,
          height: `32`,
          rx: `4`,
          fill: n,
        }),
        (0, t.jsx)(`text`, {
          x: 60,
          y: 66,
          textAnchor: `middle`,
          fontSize: `8`,
          fontWeight: `800`,
          fill: a,
          children: `STOP`,
        }),
      ],
    }),
  "yield-ahead": () =>
    (0, t.jsx)(l, {
      children: (0, t.jsx)(`polygon`, {
        points: `60,84 84,44 36,44`,
        fill: a,
        stroke: n,
        strokeWidth: `5`,
      }),
    }),
  "built-up": () =>
    (0, t.jsxs)(f, {
      color: a,
      children: [
        (0, t.jsx)(`rect`, {
          x: 14,
          y: 14,
          width: `92`,
          height: `92`,
          fill: a,
          stroke: o,
          strokeWidth: `3`,
        }),
        (0, t.jsx)(`path`, { d: `M28 86 V58 L44 44 L60 58 V86`, fill: o }),
        (0, t.jsx)(`rect`, {
          x: 70,
          y: 50,
          width: `22`,
          height: `36`,
          fill: o,
        }),
      ],
    }),
  "end-built-up": () =>
    (0, t.jsxs)(f, {
      color: a,
      children: [
        (0, t.jsx)(`rect`, {
          x: 14,
          y: 14,
          width: `92`,
          height: `92`,
          fill: a,
          stroke: o,
          strokeWidth: `3`,
        }),
        (0, t.jsx)(`path`, { d: `M28 86 V58 L44 44 L60 58 V86`, fill: o }),
        (0, t.jsx)(`rect`, {
          x: 70,
          y: 50,
          width: `22`,
          height: `36`,
          fill: o,
        }),
        (0, t.jsx)(`line`, {
          x1: `24`,
          y1: `96`,
          x2: `96`,
          y2: `24`,
          stroke: n,
          strokeWidth: `6`,
        }),
      ],
    }),
  motorway: () =>
    (0, t.jsxs)(f, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M28 88 L48 36 H72 L92 88`,
          fill: `none`,
          stroke: a,
          strokeWidth: `8`,
        }),
        (0, t.jsx)(`path`, {
          d: `M44 88 Q60 60 76 88`,
          fill: `none`,
          stroke: a,
          strokeWidth: `6`,
        }),
      ],
    }),
  "end-motorway": () =>
    (0, t.jsxs)(f, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M28 88 L48 36 H72 L92 88`,
          fill: `none`,
          stroke: a,
          strokeWidth: `8`,
        }),
        (0, t.jsx)(`line`, {
          x1: `28`,
          y1: `92`,
          x2: `92`,
          y2: `28`,
          stroke: n,
          strokeWidth: `8`,
        }),
      ],
    }),
  expressway: () =>
    (0, t.jsx)(f, {
      children: (0, t.jsx)(`path`, {
        d: `M32 86 L52 40 H68 L88 86`,
        fill: `none`,
        stroke: a,
        strokeWidth: `8`,
      }),
    }),
  "end-expressway": () =>
    (0, t.jsxs)(f, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M32 86 L52 40 H68 L88 86`,
          fill: `none`,
          stroke: a,
          strokeWidth: `8`,
        }),
        (0, t.jsx)(`line`, {
          x1: `28`,
          y1: `92`,
          x2: `92`,
          y2: `28`,
          stroke: n,
          strokeWidth: `8`,
        }),
      ],
    }),
  "one-way": () =>
    (0, t.jsx)(f, {
      children: (0, t.jsx)(`polygon`, {
        points: `60,28 92,70 74,70 74,92 46,92 46,70 28,70`,
        fill: a,
      }),
    }),
  parking: () =>
    (0, t.jsx)(f, {
      children: (0, t.jsx)(`text`, {
        x: 60,
        y: 78,
        textAnchor: `middle`,
        fontSize: `56`,
        fontWeight: `800`,
        fill: a,
        fontFamily: `Manrope, sans-serif`,
        children: `P`,
      }),
    }),
  hospital: () =>
    (0, t.jsx)(f, {
      children: (0, t.jsx)(`text`, {
        x: 60,
        y: 78,
        textAnchor: `middle`,
        fontSize: `52`,
        fontWeight: `800`,
        fill: a,
        fontFamily: `Manrope, sans-serif`,
        children: `H`,
      }),
    }),
  "first-aid": () =>
    (0, t.jsxs)(c, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 12,
          y: 12,
          width: `96`,
          height: `96`,
          rx: `8`,
          fill: a,
          stroke: s,
          strokeWidth: `4`,
        }),
        (0, t.jsx)(`rect`, {
          x: 52,
          y: 32,
          width: `16`,
          height: `56`,
          fill: s,
        }),
        (0, t.jsx)(`rect`, {
          x: 32,
          y: 52,
          width: `56`,
          height: `16`,
          fill: s,
        }),
      ],
    }),
  "bus-stop": () =>
    (0, t.jsx)(f, {
      children: (0, t.jsx)(`text`, {
        x: 60,
        y: 78,
        textAnchor: `middle`,
        fontSize: `42`,
        fontWeight: `800`,
        fill: a,
        fontFamily: `Manrope, sans-serif`,
        children: `A`,
      }),
    }),
  "mandatory-right": () =>
    (0, t.jsx)(d, {
      children: (0, t.jsx)(`polygon`, {
        points: `36,60 78,32 78,48 96,48 96,72 78,72 78,88`,
        fill: a,
      }),
    }),
  "mandatory-left": () =>
    (0, t.jsx)(d, {
      children: (0, t.jsx)(`polygon`, {
        points: `84,60 42,32 42,48 24,48 24,72 42,72 42,88`,
        fill: a,
      }),
    }),
  "mandatory-straight": () =>
    (0, t.jsx)(d, {
      children: (0, t.jsx)(`polygon`, {
        points: `60,24 88,58 70,58 70,92 50,92 50,58 32,58`,
        fill: a,
      }),
    }),
  "mandatory-right-or-straight": () =>
    (0, t.jsxs)(d, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M60 92 V48 L88 48`,
          fill: `none`,
          stroke: a,
          strokeWidth: `12`,
        }),
        (0, t.jsx)(`polygon`, { points: `60,28 72,48 48,48`, fill: a }),
        (0, t.jsx)(`polygon`, { points: `96,48 76,38 76,58`, fill: a }),
      ],
    }),
  "living-street": () =>
    (0, t.jsxs)(f, {
      color: r,
      children: [
        (0, t.jsx)(`rect`, {
          x: 22,
          y: 70,
          width: `76`,
          height: `10`,
          fill: a,
        }),
        (0, t.jsx)(`rect`, {
          x: 30,
          y: 46,
          width: `22`,
          height: `24`,
          fill: a,
        }),
        (0, t.jsx)(`circle`, { cx: `78`, cy: `54`, r: `10`, fill: a }),
        (0, t.jsx)(g, { x: 78, y: 54, fill: r }),
      ],
    }),
  "end-living-street": () =>
    (0, t.jsxs)(f, {
      color: r,
      children: [
        (0, t.jsx)(`rect`, {
          x: 22,
          y: 70,
          width: `76`,
          height: `10`,
          fill: a,
        }),
        (0, t.jsx)(`rect`, {
          x: 30,
          y: 46,
          width: `22`,
          height: `24`,
          fill: a,
        }),
        (0, t.jsx)(`line`, {
          x1: `24`,
          y1: `96`,
          x2: `96`,
          y2: `24`,
          stroke: n,
          strokeWidth: `8`,
        }),
      ],
    }),
  "two-way": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`polygon`, { points: `60,40 72,56 48,56`, fill: o }),
        (0, t.jsx)(`polygon`, { points: `60,88 48,72 72,72`, fill: o }),
        (0, t.jsx)(`rect`, { x: 56, y: 54, width: `8`, height: `16`, fill: o }),
      ],
    }),
  tunnel: () =>
    (0, t.jsx)(l, {
      children: (0, t.jsx)(`path`, {
        d: `M30 86 V58 A30 30 0 0 1 90 58 V86`,
        fill: `none`,
        stroke: o,
        strokeWidth: `7`,
      }),
    }),
  icy: () =>
    (0, t.jsx)(l, {
      children: (0, t.jsx)(`path`, {
        d: `M60 44 L68 58 L84 58 L72 68 L76 84 L60 74 L44 84 L48 68 L36 58 L52 58 Z`,
        fill: o,
      }),
    }),
  "side-wind": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`path`, { d: `M30 56 H70`, stroke: o, strokeWidth: `6` }),
        (0, t.jsx)(`path`, { d: `M30 72 H80`, stroke: o, strokeWidth: `6` }),
        (0, t.jsx)(`polygon`, { points: `88,72 74,64 74,80`, fill: o }),
      ],
    }),
  "falling-rocks": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`polygon`, { points: `40,50 52,38 64,50`, fill: o }),
        (0, t.jsx)(`polygon`, { points: `70,58 84,46 90,64`, fill: o }),
        (0, t.jsx)(`path`, { d: `M28 86 H92`, stroke: o, strokeWidth: `6` }),
      ],
    }),
  "no-horn": () =>
    (0, t.jsxs)(u, {
      children: [
        (0, t.jsx)(`path`, { d: `M40 60 L52 48 V72 Z`, fill: o }),
        (0, t.jsx)(`path`, {
          d: `M56 50 Q70 60 56 70`,
          fill: `none`,
          stroke: o,
          strokeWidth: `4`,
        }),
        (0, t.jsx)(m, {}),
      ],
    }),
  "min-speed-50": () =>
    (0, t.jsx)(d, {
      children: (0, t.jsx)(`text`, {
        x: 60,
        y: 72,
        textAnchor: `middle`,
        fontSize: `36`,
        fontWeight: `700`,
        fill: a,
        fontFamily: `Manrope, sans-serif`,
        children: `50`,
      }),
    }),
  "height-limit": () =>
    (0, t.jsxs)(u, {
      children: [
        (0, t.jsx)(`text`, {
          x: 60,
          y: 58,
          textAnchor: `middle`,
          fontSize: `16`,
          fontWeight: `700`,
          fill: o,
          children: `3,5 m`,
        }),
        (0, t.jsx)(`path`, { d: `M36 70 H84`, stroke: o, strokeWidth: `4` }),
        (0, t.jsx)(`path`, {
          d: `M40 70 V80 M80 70 V80`,
          stroke: o,
          strokeWidth: `4`,
        }),
      ],
    }),
  "weight-limit": () =>
    (0, t.jsx)(u, {
      children: (0, t.jsx)(`text`, {
        x: 60,
        y: 68,
        textAnchor: `middle`,
        fontSize: `22`,
        fontWeight: `700`,
        fill: o,
        children: `3,5 t`,
      }),
    }),
  bike: () =>
    (0, t.jsxs)(d, {
      children: [
        (0, t.jsx)(`circle`, {
          cx: `44`,
          cy: `70`,
          r: `12`,
          fill: `none`,
          stroke: a,
          strokeWidth: `5`,
        }),
        (0, t.jsx)(`circle`, {
          cx: `76`,
          cy: `70`,
          r: `12`,
          fill: `none`,
          stroke: a,
          strokeWidth: `5`,
        }),
        (0, t.jsx)(`path`, {
          d: `M44 70 L58 46 H74 L76 70`,
          fill: `none`,
          stroke: a,
          strokeWidth: `5`,
        }),
      ],
    }),
  "no-pedestrians": () =>
    (0, t.jsxs)(u, { children: [(0, t.jsx)(g, {}), (0, t.jsx)(m, {})] }),
  "pedestrian-zone": () =>
    (0, t.jsx)(f, { children: (0, t.jsx)(g, { fill: a, y: 58 }) }),
  "bus-lane": () =>
    (0, t.jsx)(f, {
      children: (0, t.jsx)(`text`, {
        x: 60,
        y: 74,
        textAnchor: `middle`,
        fontSize: `28`,
        fontWeight: `800`,
        fill: a,
        fontFamily: `Manrope, sans-serif`,
        children: `BUS`,
      }),
    }),
  taxi: () =>
    (0, t.jsx)(f, {
      children: (0, t.jsx)(`text`, {
        x: 60,
        y: 74,
        textAnchor: `middle`,
        fontSize: `22`,
        fontWeight: `800`,
        fill: a,
        fontFamily: `Manrope, sans-serif`,
        children: `TAXI`,
      }),
    }),
  danger: () =>
    (0, t.jsx)(l, {
      children: (0, t.jsx)(`text`, {
        x: 60,
        y: 78,
        textAnchor: `middle`,
        fontSize: `48`,
        fontWeight: `800`,
        fill: o,
        children: `!`,
      }),
    }),
  uneven: () =>
    (0, t.jsx)(l, {
      children: (0, t.jsx)(`path`, {
        d: `M28 80 Q44 40 60 80 Q76 110 92 70`,
        fill: `none`,
        stroke: o,
        strokeWidth: `7`,
      }),
    }),
  narrows: () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M32 40 L48 64 L32 88`,
          fill: `none`,
          stroke: o,
          strokeWidth: `7`,
        }),
        (0, t.jsx)(`path`, {
          d: `M88 40 L72 64 L88 88`,
          fill: `none`,
          stroke: o,
          strokeWidth: `7`,
        }),
      ],
    }),
  quay: () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`path`, { d: `M28 70 H92`, stroke: o, strokeWidth: `7` }),
        (0, t.jsx)(`path`, {
          d: `M28 82 Q60 100 92 82`,
          fill: `none`,
          stroke: o,
          strokeWidth: `5`,
        }),
      ],
    }),
  "movable-bridge": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`path`, {
          d: `M28 80 L48 80 L72 48 L92 48`,
          fill: `none`,
          stroke: o,
          strokeWidth: `7`,
        }),
        (0, t.jsx)(`circle`, { cx: `48`, cy: `80`, r: `4`, fill: o }),
      ],
    }),
  intersection: () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 54,
          y: 38,
          width: `12`,
          height: `48`,
          fill: o,
        }),
        (0, t.jsx)(`rect`, {
          x: 36,
          y: 56,
          width: `48`,
          height: `12`,
          fill: o,
        }),
      ],
    }),
  "side-road-right": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 54,
          y: 38,
          width: `12`,
          height: `48`,
          fill: o,
        }),
        (0, t.jsx)(`rect`, {
          x: 66,
          y: 54,
          width: `26`,
          height: `12`,
          fill: o,
        }),
      ],
    }),
  "side-road-left": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 54,
          y: 38,
          width: `12`,
          height: `48`,
          fill: o,
        }),
        (0, t.jsx)(`rect`, {
          x: 28,
          y: 54,
          width: `26`,
          height: `12`,
          fill: o,
        }),
      ],
    }),
  merge: () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`path`, { d: `M50 88 V44`, stroke: o, strokeWidth: `8` }),
        (0, t.jsx)(`path`, { d: `M78 88 L58 56`, stroke: o, strokeWidth: `8` }),
      ],
    }),
  "lane-end": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`path`, { d: `M40 40 V88`, stroke: o, strokeWidth: `8` }),
        (0, t.jsx)(`path`, {
          d: `M80 40 V60 L56 88`,
          stroke: o,
          strokeWidth: `8`,
          fill: `none`,
        }),
      ],
    }),
  fog: () =>
    (0, t.jsx)(l, {
      children: (0, t.jsx)(`path`, {
        d: `M34 56 H86 M30 68 H90 M38 80 H82`,
        stroke: o,
        strokeWidth: `6`,
        strokeLinecap: `round`,
      }),
    }),
  "cycle-crossing": () =>
    (0, t.jsxs)(f, {
      children: [
        (0, t.jsx)(`polygon`, { points: `60,26 94,86 26,86`, fill: a }),
        (0, t.jsx)(`circle`, {
          cx: `46`,
          cy: `70`,
          r: `8`,
          fill: `none`,
          stroke: r,
          strokeWidth: `4`,
        }),
        (0, t.jsx)(`circle`, {
          cx: `70`,
          cy: `70`,
          r: `8`,
          fill: `none`,
          stroke: r,
          strokeWidth: `4`,
        }),
      ],
    }),
  "tram-crossing": () =>
    (0, t.jsxs)(l, {
      children: [
        (0, t.jsx)(`rect`, {
          x: 34,
          y: 52,
          width: `52`,
          height: `22`,
          rx: `3`,
          fill: o,
        }),
        (0, t.jsx)(`line`, {
          x1: `36`,
          y1: `44`,
          x2: `84`,
          y2: `44`,
          stroke: o,
          strokeWidth: `4`,
        }),
      ],
    }),
  "no-motor": () =>
    (0, t.jsxs)(u, { children: [(0, t.jsx)(h, {}), (0, t.jsx)(m, {})] }),
};
function v({ sign: e, className: n, style: r }) {
  let i = _[e] ?? _.danger;
  return (0, t.jsx)(`div`, {
    className: n,
    style: r,
    "aria-hidden": !0,
    children: i(),
  });
}
function y({ children: e }) {
  return (0, t.jsxs)(`svg`, {
    viewBox: `0 0 320 180`,
    className: `w-full`,
    role: `img`,
    children: [
      (0, t.jsx)(`rect`, {
        width: `320`,
        height: `180`,
        fill: `#3a3f38`,
        rx: `12`,
      }),
      (0, t.jsx)(`rect`, {
        x: 0,
        y: 0,
        width: `320`,
        height: `180`,
        fill: `#2c302b`,
        rx: `12`,
      }),
      e,
    ],
  });
}
function b({ x: e, y: n, rot: r = 0, color: i = `#00D0EA`, label: a }) {
  return (0, t.jsxs)(`g`, {
    transform: `translate(${e} ${n}) rotate(${r})`,
    children: [
      (0, t.jsx)(`rect`, {
        x: -14,
        y: -22,
        width: `28`,
        height: `44`,
        rx: `6`,
        fill: i,
      }),
      (0, t.jsx)(`rect`, {
        x: -10,
        y: -16,
        width: `20`,
        height: `12`,
        rx: `2`,
        fill: `#d9fbff`,
        opacity: `0.85`,
      }),
      a
        ? (0, t.jsx)(`text`, {
            y: 6,
            textAnchor: `middle`,
            fill: `#061218`,
            fontSize: `12`,
            fontWeight: `700`,
            fontFamily: `Manrope, sans-serif`,
            children: a,
          })
        : null,
    ],
  });
}
function x({ scene: e }) {
  switch (e) {
    case `uncontrolled-cross`:
    case `priority-right`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 138,
            y: 0,
            width: `44`,
            height: `180`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 0,
            y: 68,
            width: `320`,
            height: `44`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 158,
            y: 8,
            width: `4`,
            height: `28`,
            fill: `#f5f5f5`,
          }),
          (0, t.jsx)(`rect`, {
            x: 158,
            y: 144,
            width: `4`,
            height: `28`,
            fill: `#f5f5f5`,
          }),
          (0, t.jsx)(`rect`, {
            x: 16,
            y: 88,
            width: `28`,
            height: `4`,
            fill: `#f5f5f5`,
          }),
          (0, t.jsx)(`rect`, {
            x: 276,
            y: 88,
            width: `28`,
            height: `4`,
            fill: `#f5f5f5`,
          }),
          (0, t.jsx)(b, { x: 160, y: 150, label: `A` }),
          (0, t.jsx)(b, {
            x: 60,
            y: 90,
            rot: 90,
            color: `#F5C400`,
            label: `B`,
          }),
          (0, t.jsx)(b, {
            x: 250,
            y: 90,
            rot: -90,
            color: `#f07a7a`,
            label: `C`,
          }),
        ],
      });
    case `roundabout`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`circle`, {
            cx: `160`,
            cy: `90`,
            r: `54`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`circle`, {
            cx: `160`,
            cy: `90`,
            r: `22`,
            fill: `#2f4a36`,
          }),
          (0, t.jsx)(`rect`, {
            x: 148,
            y: 0,
            width: `24`,
            height: `40`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 148,
            y: 140,
            width: `24`,
            height: `40`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 0,
            y: 78,
            width: `40`,
            height: `24`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 280,
            y: 78,
            width: `40`,
            height: `24`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(b, { x: 160, y: 158, label: `A` }),
          (0, t.jsx)(b, {
            x: 214,
            y: 90,
            rot: -90,
            color: `#F5C400`,
            label: `B`,
          }),
        ],
      });
    case `t-junction`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 0,
            y: 68,
            width: `320`,
            height: `44`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 138,
            y: 68,
            width: `44`,
            height: `112`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(b, { x: 80, y: 90, rot: 90, label: `A` }),
          (0, t.jsx)(b, { x: 160, y: 150, color: `#F5C400`, label: `B` }),
        ],
      });
    case `traffic-light-amber`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 138,
            y: 0,
            width: `44`,
            height: `180`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 0,
            y: 68,
            width: `320`,
            height: `44`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 196,
            y: 18,
            width: `18`,
            height: `46`,
            rx: `4`,
            fill: `#111`,
          }),
          (0, t.jsx)(`circle`, {
            cx: `205`,
            cy: `28`,
            r: `5`,
            fill: `#3a1111`,
          }),
          (0, t.jsx)(`circle`, {
            cx: `205`,
            cy: `41`,
            r: `5`,
            fill: `#F5C400`,
          }),
          (0, t.jsx)(`circle`, { cx: `205`, cy: `54`, r: `5`, fill: `#143` }),
          (0, t.jsx)(b, { x: 160, y: 150, label: `A` }),
        ],
      });
    case `pedestrian-zebra`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 0,
            y: 50,
            width: `320`,
            height: `80`,
            fill: `#454b42`,
          }),
          Array.from({ length: 8 }).map((e, n) =>
            (0, t.jsx)(
              `rect`,
              {
                x: 40 + n * 32,
                y: 58,
                width: `16`,
                height: `64`,
                fill: `#f5f5f5`,
              },
              n,
            ),
          ),
          (0, t.jsx)(b, { x: 28, y: 90, rot: 90, label: `A` }),
          (0, t.jsx)(`circle`, {
            cx: `200`,
            cy: `90`,
            r: `8`,
            fill: `#f5f5f5`,
          }),
          (0, t.jsx)(`rect`, {
            x: 196,
            y: 98,
            width: `8`,
            height: `18`,
            fill: `#f5f5f5`,
          }),
        ],
      });
    case `overtake-solid`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 20,
            width: `240`,
            height: `140`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 158,
            y: 28,
            width: `4`,
            height: `124`,
            fill: `#f5c400`,
          }),
          (0, t.jsx)(b, { x: 120, y: 130, label: `A` }),
          (0, t.jsx)(b, { x: 120, y: 70, color: `#888` }),
        ],
      });
    case `emergency-vehicle`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 20,
            width: `240`,
            height: `140`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 158,
            y: 28,
            width: `4`,
            height: `16`,
            fill: `#f5f5f5`,
          }),
          (0, t.jsx)(`rect`, {
            x: 158,
            y: 52,
            width: `4`,
            height: `16`,
            fill: `#f5f5f5`,
          }),
          (0, t.jsx)(`rect`, {
            x: 158,
            y: 76,
            width: `4`,
            height: `16`,
            fill: `#f5f5f5`,
          }),
          (0, t.jsx)(b, { x: 200, y: 130, color: `#1E5AA8`, label: `A` }),
          (0, t.jsxs)(`g`, {
            transform: `translate(200 50)`,
            children: [
              (0, t.jsx)(`rect`, {
                x: -16,
                y: -24,
                width: `32`,
                height: `48`,
                rx: `4`,
                fill: `#c0392b`,
              }),
              (0, t.jsx)(`rect`, {
                x: -16,
                y: -8,
                width: `32`,
                height: `8`,
                fill: `#3aa0ff`,
              }),
            ],
          }),
        ],
      });
    case `tram-stop`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 20,
            y: 70,
            width: `280`,
            height: `40`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 20,
            y: 40,
            width: `280`,
            height: `18`,
            fill: `#6a6e68`,
          }),
          (0, t.jsx)(`rect`, {
            x: 80,
            y: 36,
            width: `90`,
            height: `26`,
            rx: `4`,
            fill: `#222`,
          }),
          (0, t.jsx)(b, { x: 240, y: 90, rot: -90, label: `A` }),
        ],
      });
    case `narrow-bridge`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 120,
            y: 20,
            width: `80`,
            height: `140`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 140,
            width: `240`,
            height: `28`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(b, { x: 160, y: 150, label: `A` }),
          (0, t.jsx)(b, {
            x: 160,
            y: 40,
            rot: 180,
            color: `#F5C400`,
            label: `B`,
          }),
        ],
      });
    case `night-dazzle`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            width: `320`,
            height: `180`,
            fill: `#12141a`,
            rx: `12`,
          }),
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 20,
            width: `240`,
            height: `140`,
            fill: `#1c2230`,
          }),
          (0, t.jsx)(b, { x: 120, y: 130, label: `A` }),
          (0, t.jsx)(b, { x: 200, y: 50, rot: 180, color: `#f0f0f0` }),
          (0, t.jsx)(`ellipse`, {
            cx: `188`,
            cy: `78`,
            rx: `28`,
            ry: `14`,
            fill: `#fff6c4`,
            opacity: `0.7`,
          }),
        ],
      });
    case `fog-follow`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            width: `320`,
            height: `180`,
            fill: `#6b716c`,
            rx: `12`,
          }),
          (0, t.jsx)(`rect`, {
            x: 90,
            y: 10,
            width: `140`,
            height: `160`,
            fill: `#7a8078`,
          }),
          (0, t.jsx)(b, { x: 160, y: 140, label: `A` }),
          (0, t.jsx)(b, { x: 160, y: 70, color: `#bbb` }),
          (0, t.jsx)(`rect`, {
            width: `320`,
            height: `180`,
            fill: `#cfd6d0`,
            opacity: `0.35`,
            rx: `12`,
          }),
        ],
      });
    case `ice-brake`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 20,
            width: `240`,
            height: `140`,
            fill: `#8aa0b0`,
          }),
          (0, t.jsx)(b, { x: 160, y: 130, label: `A` }),
          (0, t.jsx)(`ellipse`, {
            cx: `160`,
            cy: `70`,
            rx: `40`,
            ry: `16`,
            fill: `#d9eef8`,
            opacity: `0.8`,
          }),
        ],
      });
    case `child-ball`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 0,
            y: 70,
            width: `220`,
            height: `44`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 220,
            y: 20,
            width: `80`,
            height: `140`,
            fill: `#3d5a40`,
          }),
          (0, t.jsx)(b, { x: 80, y: 92, rot: 90, label: `A` }),
          (0, t.jsx)(`circle`, {
            cx: `200`,
            cy: `92`,
            r: `8`,
            fill: `#F5C400`,
          }),
          (0, t.jsx)(`circle`, {
            cx: `248`,
            cy: `70`,
            r: `7`,
            fill: `#f5f5f5`,
          }),
        ],
      });
    case `parked-door`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 20,
            width: `240`,
            height: `140`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(b, { x: 110, y: 90, rot: 0, color: `#888` }),
          (0, t.jsx)(`rect`, {
            x: 124,
            y: 70,
            width: `22`,
            height: `8`,
            fill: `#c0392b`,
          }),
          (0, t.jsx)(b, { x: 180, y: 140, label: `A` }),
        ],
      });
    case `highway-merge`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`path`, {
            d: `M80 0 H160 L200 180 H80 Z`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`path`, { d: `M160 80 L280 180 H200 Z`, fill: `#454b42` }),
          (0, t.jsx)(b, { x: 120, y: 50, label: `A` }),
          (0, t.jsx)(b, { x: 210, y: 150, color: `#F5C400`, label: `B` }),
        ],
      });
    case `bus-overtake`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 20,
            width: `240`,
            height: `140`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 96,
            y: 40,
            width: `36`,
            height: `80`,
            rx: `6`,
            fill: `#1E5AA8`,
          }),
          (0, t.jsx)(b, { x: 180, y: 140, label: `A` }),
        ],
      });
    case `rail-crossing`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 70,
            width: `240`,
            height: `40`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 40,
            width: `240`,
            height: `10`,
            fill: `#222`,
          }),
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 56,
            width: `240`,
            height: `10`,
            fill: `#222`,
          }),
          (0, t.jsx)(b, { x: 80, y: 90, rot: 90, label: `A` }),
        ],
      });
    case `cycle-left`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 40,
            y: 20,
            width: `180`,
            height: `140`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 220,
            y: 20,
            width: `40`,
            height: `140`,
            fill: `#2f4a36`,
          }),
          (0, t.jsx)(b, { x: 130, y: 140, label: `A` }),
          (0, t.jsx)(`circle`, {
            cx: `240`,
            cy: `80`,
            r: `10`,
            fill: `none`,
            stroke: `#f5f5f5`,
            strokeWidth: `3`,
          }),
        ],
      });
    case `right-turn-ped`:
      return (0, t.jsxs)(y, {
        children: [
          (0, t.jsx)(`rect`, {
            x: 138,
            y: 0,
            width: `44`,
            height: `180`,
            fill: `#454b42`,
          }),
          (0, t.jsx)(`rect`, {
            x: 138,
            y: 68,
            width: `182`,
            height: `44`,
            fill: `#454b42`,
          }),
          Array.from({ length: 5 }).map((e, n) =>
            (0, t.jsx)(
              `rect`,
              {
                x: 170 + n * 22,
                y: 72,
                width: `10`,
                height: `36`,
                fill: `#f5f5f5`,
              },
              n,
            ),
          ),
          (0, t.jsx)(b, { x: 160, y: 150, label: `A` }),
          (0, t.jsx)(`circle`, {
            cx: `250`,
            cy: `90`,
            r: `7`,
            fill: `#f5f5f5`,
          }),
        ],
      });
    default:
      return (0, t.jsx)(y, {
        children: (0, t.jsx)(b, { x: 160, y: 90, label: `A` }),
      });
  }
}
function S({ marking: e }) {
  return (0, t.jsxs)(`svg`, {
    viewBox: `0 0 320 160`,
    className: `w-full`,
    role: `img`,
    children: [
      (0, t.jsx)(`rect`, {
        width: `320`,
        height: `160`,
        rx: `12`,
        fill: `#3a3f38`,
      }),
      (0, t.jsx)(`rect`, {
        x: 36,
        y: 16,
        width: `248`,
        height: `128`,
        fill: `#454b42`,
      }),
      e === `solid-center` &&
        (0, t.jsx)(`rect`, {
          x: 158,
          y: 24,
          width: `5`,
          height: `112`,
          fill: `#f5f5f5`,
        }),
      e === `dashed-center` &&
        [0, 1, 2, 3, 4].map((e) =>
          (0, t.jsx)(
            `rect`,
            {
              x: 158,
              y: 24 + e * 24,
              width: `5`,
              height: `12`,
              fill: `#f5f5f5`,
            },
            e,
          ),
        ),
      e === `double-solid` &&
        (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(`rect`, {
              x: 152,
              y: 24,
              width: `4`,
              height: `112`,
              fill: `#f5f5f5`,
            }),
            (0, t.jsx)(`rect`, {
              x: 164,
              y: 24,
              width: `4`,
              height: `112`,
              fill: `#f5f5f5`,
            }),
          ],
        }),
      e === `solid-dash` &&
        (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(`rect`, {
              x: 152,
              y: 24,
              width: `4`,
              height: `112`,
              fill: `#f5f5f5`,
            }),
            [0, 1, 2, 3, 4].map((e) =>
              (0, t.jsx)(
                `rect`,
                {
                  x: 164,
                  y: 24 + e * 24,
                  width: `4`,
                  height: `12`,
                  fill: `#f5f5f5`,
                },
                e,
              ),
            ),
          ],
        }),
      e === `stop-line` &&
        (0, t.jsx)(`rect`, {
          x: 48,
          y: 110,
          width: `224`,
          height: `10`,
          fill: `#f5f5f5`,
        }),
      e === `give-way-line` &&
        Array.from({ length: 14 }).map((e, n) =>
          (0, t.jsx)(
            `rect`,
            {
              x: 48 + n * 16,
              y: 110,
              width: `10`,
              height: `8`,
              fill: `#f5f5f5`,
            },
            n,
          ),
        ),
      e === `zebra` &&
        Array.from({ length: 9 }).map((e, n) =>
          (0, t.jsx)(
            `rect`,
            {
              x: 50 + n * 26,
              y: 40,
              width: `14`,
              height: `80`,
              fill: `#f5f5f5`,
            },
            n,
          ),
        ),
      e === `shark-teeth` &&
        Array.from({ length: 8 }).map((e, n) =>
          (0, t.jsx)(
            `polygon`,
            {
              points: `${50 + n * 28},120 ${64 + n * 28},88 ${78 + n * 28},120`,
              fill: `#f5f5f5`,
            },
            n,
          ),
        ),
      e === `hatched` &&
        (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(`rect`, {
              x: 110,
              y: 30,
              width: `100`,
              height: `100`,
              fill: `none`,
              stroke: `#f5c400`,
              strokeWidth: `4`,
            }),
            Array.from({ length: 7 }).map((e, n) =>
              (0, t.jsx)(
                `line`,
                {
                  x1: 120 + n * 12,
                  y1: `34`,
                  x2: 110 + n * 12,
                  y2: `126`,
                  stroke: `#f5c400`,
                  strokeWidth: `3`,
                },
                n,
              ),
            ),
          ],
        }),
      e === `bus-box` &&
        (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(`rect`, {
              x: 90,
              y: 40,
              width: `140`,
              height: `80`,
              fill: `none`,
              stroke: `#f5f5f5`,
              strokeWidth: `4`,
            }),
            (0, t.jsx)(`text`, {
              x: 160,
              y: 88,
              textAnchor: `middle`,
              fill: `#f5f5f5`,
              fontSize: `22`,
              fontWeight: `700`,
              fontFamily: `Manrope, sans-serif`,
              children: `BUS`,
            }),
          ],
        }),
      e === `bike-lane` &&
        (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(`rect`, {
              x: 36,
              y: 16,
              width: `70`,
              height: `128`,
              fill: `#2f4a36`,
            }),
            (0, t.jsx)(`circle`, {
              cx: `72`,
              cy: `80`,
              r: `16`,
              fill: `none`,
              stroke: `#f5f5f5`,
              strokeWidth: `3`,
            }),
          ],
        }),
      e === `arrow-straight` &&
        (0, t.jsx)(`polygon`, {
          points: `160,36 176,70 166,70 166,124 154,124 154,70 144,70`,
          fill: `#f5f5f5`,
        }),
      e === `arrow-left` &&
        (0, t.jsx)(`polygon`, {
          points: `90,80 130,64 130,74 200,74 200,86 130,86 130,96`,
          fill: `#f5f5f5`,
        }),
      e === `arrow-right` &&
        (0, t.jsx)(`polygon`, {
          points: `230,80 190,64 190,74 120,74 120,86 190,86 190,96`,
          fill: `#f5f5f5`,
        }),
      e === `parking-box` &&
        (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(`rect`, {
              x: 70,
              y: 36,
              width: `50`,
              height: `90`,
              fill: `none`,
              stroke: `#f5f5f5`,
              strokeWidth: `3`,
            }),
            (0, t.jsx)(`rect`, {
              x: 130,
              y: 36,
              width: `50`,
              height: `90`,
              fill: `none`,
              stroke: `#f5f5f5`,
              strokeWidth: `3`,
            }),
            (0, t.jsx)(`rect`, {
              x: 190,
              y: 36,
              width: `50`,
              height: `90`,
              fill: `none`,
              stroke: `#f5f5f5`,
              strokeWidth: `3`,
            }),
          ],
        }),
      e === `edge-line` &&
        (0, t.jsx)(`rect`, {
          x: 44,
          y: 20,
          width: `6`,
          height: `120`,
          fill: `#f5f5f5`,
        }),
      e === `yellow-solid` &&
        (0, t.jsx)(`rect`, {
          x: 44,
          y: 20,
          width: `6`,
          height: `120`,
          fill: `#f5c400`,
        }),
      e === `yellow-dash` &&
        [0, 1, 2, 3, 4].map((e) =>
          (0, t.jsx)(
            `rect`,
            {
              x: 44,
              y: 20 + e * 24,
              width: `6`,
              height: `12`,
              fill: `#f5c400`,
            },
            e,
          ),
        ),
      e === `crossing-advance` &&
        (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(`rect`, {
              x: 70,
              y: 70,
              width: `180`,
              height: `10`,
              fill: `#f5f5f5`,
            }),
            (0, t.jsx)(`rect`, {
              x: 70,
              y: 90,
              width: `180`,
              height: `10`,
              fill: `#f5f5f5`,
            }),
          ],
        }),
    ],
  });
}
function C({ visual: e }) {
  return e.type === `none`
    ? null
    : (0, t.jsx)(`div`, {
        className: `mx-auto flex w-full max-w-md items-center justify-center rounded-2xl bg-elevated p-4 shadow-border`,
        children:
          e.type === `sign`
            ? (0, t.jsx)(v, { sign: e.sign, className: `w-36 sm:w-40` })
            : e.type === `marking`
              ? (0, t.jsx)(S, { marking: e.marking })
              : (0, t.jsx)(x, { scene: e.scene }),
      });
}

export function QuestionVisual({
  visual,
}: {
  visual: { type: string; sign?: string; marking?: string; scene?: string };
}) {
  return C({ visual });
}

