import type Big from 'big.js'

function formatBigIntl(b: Big, locale = 'cs-CZ', min = 0, max = 2) {
  const num = Number(b) // ok for |num| <= Number.MAX_SAFE_INTEGER and not too many decimals
  if (!Number.isFinite(num)) return formatBigString(b, locale, min, max)
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  }).format(num)
}

function formatBigString(b: Big, locale = 'cs-CZ', min = 0, max = 2) {
  // build a fixed string, then group integer part
  const s = b.toFixed(max) // rounds; adjust if you want truncation (use toPrecision/toFixed)
  const [intPart, fracPartRaw] = s.split('.')
  const fracPart =
    max > 0
      ? (min > 0 ? (fracPartRaw ?? '').padEnd(min, '0') : (fracPartRaw ?? '').replace(/0+$/, ''))
      : undefined

  // group thousands with locale-specific separators
  const groupSep = locale.startsWith('cs') ? '\u00A0' // NBSP for cs-CZ
                  : locale.startsWith('de') ? '.' 
                  : ','

  const intGrouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSep)
  return fracPart ? `${intGrouped}${locale.startsWith('de') || locale.startsWith('cs') ? ',' : '.'}${fracPart}` : intGrouped
}

export function useNumberFormat(locale = 'cs-CZ') {
  const nf = new Intl.NumberFormat(locale)
  return {
    fmtBig: (b: Big) => formatBigIntl(b, locale, 0, 2),
    fmtBigExact: (b: Big, min = 0, max = 6) => formatBigString(b, locale, min, max),
    fmt: (n: number) => nf.format(n),
  }
}
