/**
 * server-side-request ? 
 */
export default function () {
    const win: Window | null = (typeof window !== "undefined" && window) || null;
    const el = win && win.document.getElementById("root");
    const dataSet = el && el.dataset && el.dataset.req;
    return JSON.parse(dataSet || "null");
}