// Soul True email brand tokens. Body MUST stay #ffffff for deliverability.
export const BRAND = {
  gold: '#C9A84C',
  goldAlt: '#D4A017',
  amber: '#E8821A',
  dark: '#0A0A0A',
  deep: '#1A1209',
  body: '#F5F0E8',
} as const;

export const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Outfit', 'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: '40px 0',
};

export const container = {
  backgroundColor: BRAND.dark,
  borderRadius: '4px',
  padding: '48px 40px',
  maxWidth: '560px',
  margin: '0 auto',
  border: `1px solid ${BRAND.gold}33`,
};

export const brandMark = {
  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
  fontSize: '28px',
  fontWeight: 400,
  color: BRAND.gold,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: '0 0 32px',
};

export const h1 = {
  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
  fontSize: '28px',
  fontWeight: 400,
  fontStyle: 'italic' as const,
  color: BRAND.body,
  margin: '0 0 24px',
  lineHeight: 1.3,
};

export const text = {
  fontSize: '15px',
  color: BRAND.body,
  lineHeight: 1.7,
  margin: '0 0 20px',
  fontWeight: 300,
};

export const link = {
  color: BRAND.gold,
  textDecoration: 'underline',
};

export const button = {
  backgroundColor: BRAND.gold,
  color: BRAND.dark,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  borderRadius: '4px',
  padding: '16px 32px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '12px 0 24px',
};

export const codeStyle = {
  fontFamily: "'Courier New', monospace",
  fontSize: '26px',
  fontWeight: 700,
  color: BRAND.gold,
  letterSpacing: '0.3em',
  textAlign: 'center' as const,
  padding: '20px',
  backgroundColor: BRAND.deep,
  borderRadius: '4px',
  margin: '0 0 28px',
};

export const footer = {
  fontSize: '12px',
  color: '#888888',
  margin: '32px 0 0',
  lineHeight: 1.6,
  borderTop: `1px solid ${BRAND.gold}22`,
  paddingTop: '20px',
};

export const SITE_NAME_DISPLAY = 'Soul True';
