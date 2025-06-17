// src/lib/rateLimiter.js
const rateLimitMap = new Map();

export function rateLimit(
  identifier,
  limit = 5,
  windowMs = 60000,
  blockDurationMs = 300000 // 5 minutes block
) {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Get or create user data
  const userData = rateLimitMap.get(identifier) || {
    requests: [],
    blockedUntil: 0,
  };

  // Check if user is currently blocked
  if (userData.blockedUntil > now) {
    return {
      success: false,
      error: "Rate limit exceeded. Please try again later.",
      resetTime: userData.blockedUntil,
      remaining: 0,
    };
  }

  // Filter requests within the current window
  const validRequests = userData.requests.filter((time) => time > windowStart);

  // Check if limit is exceeded
  if (validRequests.length >= limit) {
    userData.blockedUntil = now + blockDurationMs;
    rateLimitMap.set(identifier, userData);

    return {
      success: false,
      error: `Too many requests. Blocked for ${
        blockDurationMs / 60000
      } minutes.`,
      resetTime: userData.blockedUntil,
      remaining: 0,
    };
  }

  // Add current request
  validRequests.push(now);
  userData.requests = validRequests;
  userData.blockedUntil = 0;
  rateLimitMap.set(identifier, userData);

  return {
    success: true,
    remaining: limit - validRequests.length,
    resetTime: windowStart + windowMs,
  };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  const oneHourAgo = now - 3600000; // 1 hour

  for (const [key, value] of rateLimitMap.entries()) {
    if (
      value.blockedUntil < now &&
      value.requests.every((req) => req < oneHourAgo)
    ) {
      rateLimitMap.delete(key);
    }
  }
}, 3600000); // Run every hour

export default rateLimit;
