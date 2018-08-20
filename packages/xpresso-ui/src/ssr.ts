/**
 * server-side-request ? 
 */
export default function () {
    const win: Window | null = typeof window !== "undefined" && window;
    const el = win.document.getElementById("root");
    const dataSet = el && el.dataset && el.dataset.req;
    return JSON.parse(dataSet || "null");
}