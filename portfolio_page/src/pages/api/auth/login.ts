import { NextApiRequest, NextApiResponse } from 'next';

function validateAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    return false;
  }

  return password === adminPassword;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { password } = req.body;

  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ message: 'Admin password not configured' });
  }

  if (validateAdminPassword(password)) {
    // In a real app, you'd use JWT or sessions
    return res.status(200).json({ 
      success: true, 
      message: 'Authentication successful',
      token: 'admin-authenticated' // Simple token for demo
    });
  } else {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid password' 
    });
  }
}
