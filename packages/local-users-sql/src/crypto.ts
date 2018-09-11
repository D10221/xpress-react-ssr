import Crypto from "@local/crypto";
const crypto = new Crypto({ password: process.env.USERS_SECRET || "0123456789ABCDEF" });
export default crypto;