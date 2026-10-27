/* ============================================================
 * staticrypt-core.js —— 密码加密底层引擎
 * 来源：StatiCrypt (MIT License)
 * ============================================================ */
(function (global) {
  'use strict';

  const cryptoObj = window.crypto;
  const { subtle } = cryptoObj;

  const IV_BITS = 16 * 8;
  const HEX_BITS = 4;
  const ENCRYPTION_ALGO = "AES-CBC";

  const HexEncoder = {
    parse: function (hexString) {
      if (hexString.length % 2 !== 0) throw "Invalid hexString";
      const arrayBuffer = new Uint8Array(hexString.length / 2);
      for (let i = 0; i < hexString.length; i += 2) {
        const byteValue = parseInt(hexString.substring(i, i + 2), 16);
        if (isNaN(byteValue)) throw "Invalid hexString";
        arrayBuffer[i / 2] = byteValue;
      }
      return arrayBuffer;
    },
    stringify: function (bytes) {
      const hexBytes = [];
      for (let i = 0; i < bytes.length; ++i) {
        let byteString = bytes[i].toString(16);
        if (byteString.length < 2) byteString = "0" + byteString;
        hexBytes.push(byteString);
      }
      return hexBytes.join("");
    },
  };

  const UTF8Encoder = {
    parse: function (str) { return new TextEncoder().encode(str); },
    stringify: function (bytes) { return new TextDecoder().decode(bytes); },
  };

  async function encrypt(msg, hashedPassword) {
    const iv = cryptoObj.getRandomValues(new Uint8Array(IV_BITS / 8));
    const key = await subtle.importKey("raw", HexEncoder.parse(hashedPassword), ENCRYPTION_ALGO, false, ["encrypt"]);
    const encrypted = await subtle.encrypt({ name: ENCRYPTION_ALGO, iv: iv }, key, UTF8Encoder.parse(msg));
    return HexEncoder.stringify(iv) + HexEncoder.stringify(new Uint8Array(encrypted));
  }

  async function hashPassword(password, salt) {
    let hashedPassword = await pbkdf2(password, salt, 1000, "SHA-1");
    hashedPassword = await pbkdf2(hashedPassword, salt, 14000, "SHA-256");
    return pbkdf2(hashedPassword, salt, 585000, "SHA-256");
  }

  async function pbkdf2(password, salt, iterations, hashAlgorithm) {
    const key = await subtle.importKey("raw", UTF8Encoder.parse(password), "PBKDF2", false, ["deriveBits"]);
    const keyBytes = await subtle.deriveBits({ name: "PBKDF2", hash: hashAlgorithm, iterations, salt: UTF8Encoder.parse(salt) }, key, 256);
    return HexEncoder.stringify(new Uint8Array(keyBytes));
  }

  function generateRandomSalt() {
    return HexEncoder.stringify(new Uint8Array(cryptoObj.getRandomValues(new Uint8Array(128 / 8))));
  }

  async function signMessage(hashedPassword, message) {
    const key = await subtle.importKey("raw", HexEncoder.parse(hashedPassword), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = await subtle.sign("HMAC", key, UTF8Encoder.parse(message));
    return HexEncoder.stringify(new Uint8Array(signature));
  }

  // 核心对外暴露
  global.StatiCryptCore = {
    async encode(msg, password, salt) {
      const hashedPassword = await hashPassword(password, salt);
      const encrypted = await encrypt(msg, hashedPassword);
      const hmac = await signMessage(hashedPassword, encrypted);
      return hmac + encrypted;
    },
    generateRandomSalt
  };
})(window);