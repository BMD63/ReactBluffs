import type { VercelRequest, VercelResponse } from '@vercel/node';

export const checkAdmin = (
  request: VercelRequest,
  response: VercelResponse
): boolean => {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    response.status(500).json({
      error: 'Admin token is not configured',
    });

    return false;
  }

  const requestToken = request.headers['x-admin-token'];

  if (requestToken !== adminToken) {
    response.status(401).json({
      error: 'Unauthorized',
    });

    return false;
  }

  return true;
};
