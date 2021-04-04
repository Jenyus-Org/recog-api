import * as ms from "ms";

export default () => {
  const _jwtKeyExpiresIn = process.env.JWT_EXPIRES_IN || "15m";
  const jwtKeyExpiresIn = ms(_jwtKeyExpiresIn) / 1000;

  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    auth: {
      jwtKey: process.env.JWT_KEY,
      jwtKeyExpiresIn,
    },
  };
};
