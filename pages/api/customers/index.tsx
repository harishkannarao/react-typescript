import type { NextApiRequest, NextApiResponse } from 'next';

type Customer = {
    id: number,
    firstName: string,
    lastName: string,
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Customer[] | undefined>) {
    if (req.method === 'GET') {
        const responseJson = [];
        for (let i = 1; i <= 50; i++) {
            responseJson.push(
                {
                    "id": i,
                    "firstName": `First Name ${i}`,
                    "lastName": `Last Name ${i}`
                }
            );
        }
        res.status(200).json(responseJson);
    } else {
        res.status(204).json(undefined);
    }
}