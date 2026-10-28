import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface EnquiryItem { code: string; qty: number }

interface Ctx {
  items: EnquiryItem[];
  count: number;
  add: (code: string, qty?: number) => void;
  setQty: (code: string, qty: number) => void;
  remove: (code: string) => void;
  clear: () => void;
  has: (code: string) => boolean;
}

const KEY = "cg-enquiry-list";
const EnquiryContext = createContext<Ctx | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  const add = useCallback((code: string, qty = 10) => {
    setItems((prev) => prev.some((i) => i.code === code)
      ? prev.map((i) => (i.code === code ? { ...i, qty: i.qty + qty } : i))
      : [...prev, { code, qty }]);
  }, []);
  const setQty = useCallback((code: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.code === code ? { ...i, qty: Math.max(1, qty) } : i))), []);
  const remove = useCallback((code: string) => setItems((prev) => prev.filter((i) => i.code !== code)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<Ctx>(() => ({
    items, count: items.length, add, setQty, remove, clear,
    has: (c) => items.some((i) => i.code === c),
  }), [items, add, setQty, remove, clear]);

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be inside EnquiryProvider");
  return ctx;
}
