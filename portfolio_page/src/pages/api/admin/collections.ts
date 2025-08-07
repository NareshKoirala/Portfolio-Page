import { NextApiRequest, NextApiResponse } from 'next';
import { getCollectionNames } from '../../../service/DBFunction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Simple authentication check (in production, use proper JWT validation)
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer admin-authenticated') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const collections = await getCollectionNames();
    res.status(200).json({ collections });
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ message: 'Failed to fetch collections' });
  }
}
