import * as jwtDecode from "jwt-decode";

class Jwt {
  _offset = 30 * 24 * 60 * 1000; // 1 month

  constructor() {
    this.jwt = jwtDecode;
  }

  decode(token) {
    try {
      return this.jwt(token);
    } catch (err) {
      return null;
    }
  }

  isValid(token, offset = this._offset) {
    const decoded = this.decode(token);

    if (!decoded) return false;

    const isValid = decoded.exp * 1000 - new Date().getTime() > offset;

    return !decoded || isValid;
  }

  getPaymentStatus(token) {
    const decoded = this.decode(token);

    if (!decoded) return false;

    return decoded.ps;
  }
}

const jwt = new Jwt();

export default jwt;
