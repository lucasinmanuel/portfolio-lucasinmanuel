/**
 * Gera public/og.png, a imagem de preview que Slack, LinkedIn e WhatsApp mostram
 * quando o link é colado. Rodar com `npm run og` depois de mexer no texto.
 *
 * As plataformas não renderizam SVG de forma confiável, por isso o raster.
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const W = 1200
const H = 630

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="badge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c5cff"/>
      <stop offset="100%" stop-color="#4c2fd6"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.14" cy="0.1" r="0.85">
      <stop offset="0%" stop-color="#7c5cff" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#7c5cff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#08080b"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <rect x="80" y="80" width="88" height="88" rx="20" fill="url(#badge)"/>
  <text x="124" y="140" font-family="Consolas, 'Courier New', monospace" font-size="34"
        font-weight="700" fill="#ffffff" text-anchor="middle">LS</text>

  <text x="80" y="296" font-family="'Segoe UI', Arial, sans-serif" font-size="68"
        font-weight="700" fill="#ececf4">Lucas Emanuel</text>
  <text x="80" y="360" font-family="'Segoe UI', Arial, sans-serif" font-size="38"
        font-weight="600" fill="#a08fff">Engenheiro Backend</text>

  <text x="80" y="436" font-family="'Segoe UI', Arial, sans-serif" font-size="27" fill="#9b9bb0">
    APIs em produção: filas com retry, cache com invalidação
  </text>
  <text x="80" y="476" font-family="'Segoe UI', Arial, sans-serif" font-size="27" fill="#9b9bb0">
    declarada e sincronização de fontes externas.
  </text>

  <rect x="80" y="536" width="248" height="2" fill="#23232e"/>
  <text x="80" y="580" font-family="Consolas, 'Courier New', monospace" font-size="23" fill="#6a6a80">
    TypeScript · Node · PostgreSQL · Redis
  </text>
</svg>`

await mkdir('public', { recursive: true })
await sharp(Buffer.from(svg)).png().toFile('public/og.png')
console.log(`public/og.png — ${W}x${H}`)
