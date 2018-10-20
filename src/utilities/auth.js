/**
 * Authentication-related utilities
 */

import jwtDecode from "jwt-decode";

const AUTH_TOKEN_KEY = "token";

// JWT expiry is measured in seconds
const MILLISECONDS_IN_SECOND = 1000;

/**
 * Determine when a JWT token will expire
 * @param  {object} jwt     - JWT token
 * @param  {object} jwt.exp - Token expiry time (in seconds from UTC epoch)
 * @return {number}         - Number of seconds until JWT expires
 */
const getTimeToJwtExpiry = (jwt = null) => {
  // JWT can be passed as parameter or taken from local storage
  const token = jwt || localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return 0;

  // JWT expiry checks should be made against Unix epoch time
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now().valueOf() / MILLISECONDS_IN_SECOND;

  return decodedToken.exp - currentTime;
};

/**
 * Whether a JWT token is valid (defaults to current viewer)
 * @param  {object}  jwt     - JWT token
 * @param  {number}  jwt.exp - Token expiry time (in seconds from UTC epoch)
 * @return {boolean}         - Whether the JWT is valid
 */
const isJwtValid = (jwt = null) => {
  // JWT can be passed as parameter or taken from local storage
  const token = jwt || localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return false;

  const timeToExpiry = getTimeToJwtExpiry(token);

  return timeToExpiry > 0;
};

/**
 * Invalidate the viewer JWT in local storage
 */
const invalidateJwt = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export { getTimeToJwtExpiry, isJwtValid, invalidateJwt };
