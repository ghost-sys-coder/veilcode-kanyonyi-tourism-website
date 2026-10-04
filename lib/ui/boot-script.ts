// Runs in <head> before first paint so per-visitor choices never flash:
// the currency toggle (004 section 7) and the session-dismissed demo notice (02-global.md).
// Every storage access is wrapped, because private windows can throw.

export const CURRENCY_STORAGE_KEY = "kx-currency";
export const DEMO_DISMISSED_KEY = "kx-demo-notice-dismissed";
export type Currency = "usd" | "ugx";

export const bootScript = `(function(){var d=document.documentElement;try{if(localStorage.getItem("${CURRENCY_STORAGE_KEY}")==="ugx")d.dataset.currency="ugx"}catch(e){}try{if(sessionStorage.getItem("${DEMO_DISMISSED_KEY}")==="1")d.dataset.demoDismissed="1"}catch(e){}})();`;
