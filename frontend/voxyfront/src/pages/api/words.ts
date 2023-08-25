// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://backend:8000'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET') {
    try{
      const response = await fetch(API_URL + '?ordering=-created', { method: 'GET' });
      const data = await response.json();
      res.status(response.status).json(data)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method === 'POST') {
    const response = await fetch(API_URL, 
      { method: 'POST', 
        body: (req.body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    res.status(response.status).json(data)
  } else if (req.method === 'DELETE') {
    const response = await fetch(API_URL, { method: 'DELETE' });
    const data = await response.json();
    res.status(response.status).json(data)
  }
}
