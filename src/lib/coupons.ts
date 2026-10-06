// ============================================================================
// SISTEMA DE CUPONES Y RULETA DE DESCUENTOS
// ============================================================================

export interface Coupon {
  code: string;
  discount: number; // 0.01 = 1%
  label: { es: string; en: string };
  weight: number;
}

export const COUPONS: Coupon[] = [
  { code: "CREO1",  discount: 0.01, label: { es: "1% de descuento",  en: "1% off" },  weight: 35 },
  { code: "CREO3",  discount: 0.03, label: { es: "3% de descuento",  en: "3% off" },  weight: 30 },
  { code: "CREO5",  discount: 0.05, label: { es: "5% de descuento",  en: "5% off" },  weight: 20 },
  { code: "CREO8",  discount: 0.08, label: { es: "8% de descuento",  en: "8% off" },  weight: 10 },
  { code: "CREO10", discount: 0.10, label: { es: "10% de descuento", en: "10% off" }, weight: 5  },
];

export const MAX_SPINS = 2;
export const MAX_ACTIVE_COUPONS = 2;

const LS_SPINS = "innovatrend_wheel_spins";
const SS_SPINS = "innovatrend_wheel_session";
const LS_FP = "innovatrend_fingerprint";

export function getFingerprint(): string {
  if (typeof window === "undefined") return "ssr";

  const cached = localStorage.getItem(LS_FP);
  if (cached) return cached;

  const raw = [
    navigator.userAgent,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    String(screen.width),
    String(screen.height),
    String(screen.colorDepth),
    String(new Date().getTimezoneOffset()),
  ].join("|");

  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  const fp = `fp_${Math.abs(hash).toString(36)}`;
  localStorage.setItem(LS_FP, fp);
  return fp;
}

interface SpinsData {
  count: number;
  fingerprint: string;
  lastSpin: number;
  obtainedCodes: string[];
}

function readSpins(storage: Storage, key: string): SpinsData | null {
  try {
    const raw = storage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as SpinsData;
  } catch {
    return null;
  }
}

function writeSpins(storage: Storage, key: string, data: SpinsData) {
  try {
    storage.setItem(key, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function getSpinCount(): number {
  if (typeof window === "undefined") return 0;
  const fp = getFingerprint();
  const ls = readSpins(localStorage, LS_SPINS);
  const ss = readSpins(sessionStorage, SS_SPINS);

  const lsCount = ls && ls.fingerprint === fp ? ls.count : 0;
  const ssCount = ss && ss.fingerprint === fp ? ss.count : 0;

  return Math.max(lsCount, ssCount);
}

export function canSpin(): boolean {
  return getSpinCount() < MAX_SPINS;
}

export function registerSpin(code: string): boolean {
  if (typeof window === "undefined") return false;
  if (!canSpin()) return false;

  const fp = getFingerprint();
  const ls = readSpins(localStorage, LS_SPINS) || {
    count: 0,
    fingerprint: fp,
    lastSpin: 0,
    obtainedCodes: [],
  };
  const ss = readSpins(sessionStorage, SS_SPINS) || {
    count: 0,
    fingerprint: fp,
    lastSpin: 0,
    obtainedCodes: [],
  };

  if (ls.fingerprint !== fp) {
    ls.count = 0;
    ls.fingerprint = fp;
    ls.obtainedCodes = [];
  }
  if (ss.fingerprint !== fp) {
    ss.count = 0;
    ss.fingerprint = fp;
    ss.obtainedCodes = [];
  }

  ls.count += 1;
  ls.lastSpin = Date.now();
  ls.obtainedCodes.push(code);

  ss.count += 1;
  ss.lastSpin = Date.now();
  ss.obtainedCodes.push(code);

  writeSpins(localStorage, LS_SPINS, ls);
  writeSpins(sessionStorage, SS_SPINS, ss);

  return true;
}

export function getObtainedCodes(): string[] {
  if (typeof window === "undefined") return [];
  const fp = getFingerprint();
  const ls = readSpins(localStorage, LS_SPINS);
  if (!ls || ls.fingerprint !== fp) return [];
  return ls.obtainedCodes;
}

export function resetSpins() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LS_SPINS);
  sessionStorage.removeItem(SS_SPINS);
}

export function pickWeightedCoupon(): Coupon {
  const totalWeight = COUPONS.reduce((acc, c) => acc + c.weight, 0);
  let random = Math.random() * totalWeight;
  for (const coupon of COUPONS) {
    random -= coupon.weight;
    if (random <= 0) return coupon;
  }
  return COUPONS[0];
}

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find((c) => c.code === normalized);
}

export function isCouponValid(code: string): boolean {
  return !!findCoupon(code);
}