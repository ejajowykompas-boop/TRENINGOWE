const redis = require('./_redis');

const KEY = 'tt_data_v2';

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const data = await redis.get(KEY);
    return res.json(data || { templates: [] });
  }

  if (req.method === 'POST') {
    const body = req.body;
    await redis.set(KEY, JSON.stringify(body));
    return res.json({ ok: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
