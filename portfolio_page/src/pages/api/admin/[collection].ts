import { NextApiRequest, NextApiResponse } from 'next';
import { handlerRequest } from '../../../service/DBFunction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simple authentication check
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer admin-authenticated') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { collection } = req.query;
  
  if (!collection || typeof collection !== 'string') {
    return res.status(400).json({ message: 'Collection name is required' });
  }

  try {
    let result;
    
    switch (req.method) {
      case 'GET':
        result = await handlerRequest(collection, 'GET');
        break;
      
      case 'POST':
        if (!req.body) {
          return res.status(400).json({ message: 'Request body is required' });
        }
        result = await handlerRequest(collection, 'POST', req.body);
        break;
      
      case 'PUT':
        if (!req.body || !req.body.filter || !req.body.data) {
          return res.status(400).json({ 
            message: 'Both filter and data are required for update operation' 
          });
        }
        result = await handlerRequest(collection, 'PUT', req.body.data, req.body.filter);
        break;
      
      case 'DELETE':
        if (!req.body || !req.body.filter) {
          return res.status(400).json({ message: 'Filter is required for delete operation' });
        }
        result = await handlerRequest(collection, 'DELETE', undefined, req.body.filter);
        break;
      
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Database operation error:', error);
    res.status(500).json({ 
      message: 'Database operation failed', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
