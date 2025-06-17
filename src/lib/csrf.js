// src/lib/csrf.js
import crypto from "crypto";

export function generateCSRFToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function verifyCSRFToken(token, sessionToken) {
  return token === sessionToken;
}
