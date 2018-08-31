import { AddressInfo } from "net";
/** */
export default (aa: AddressInfo | string) =>
  (aa =
    typeof aa === "string"
      ? aa
      : ((a: AddressInfo) => `${a.family}${a.address}:${a.port}`)(aa));
