import Crypto from "@local/crypto";
const crypto = new Crypto({ password: process.env.USERS_SECRET || "" });
export default crypto;