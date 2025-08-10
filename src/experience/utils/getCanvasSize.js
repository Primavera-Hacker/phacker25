/**
   Función para calcular tamaño de Canvas, considerando tamaños
   definidos en /src/styles/tokens.css

  --element-height-sobremenu: 16px;
  --element-height-menu: 28px;
  --element-height-footer: 28px;
  --element-padding-y-main: var(--space-3xs); -> 6px * 2
  --element-padding-x-main: var(--space-3xs); -> 6px * 2
 */

const breakpoint = 680;
const footer = 28;
const nav_desktop = 16 + 28;
const nav_mobile = 28;
const padding_x = 12;
const padding_y = 12;
const gap = 8;
const ratio_logo = 99 / 341;

export default function getCanvasSize() {
  let canvasWidth = window.innerWidth - padding_x;
  let canvasHeight = window.innerHeight - padding_y - footer - gap;
  let logoHeight = canvasWidth * ratio_logo;
  canvasHeight -= logoHeight;

  let isMobile = window.innerWidth < breakpoint;
  if (isMobile) {
    canvasHeight -= nav_mobile;
  } else {
    canvasHeight -= nav_desktop;
  }

  return { canvasWidth, canvasHeight };
}
