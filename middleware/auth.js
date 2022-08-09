import supabase from 'lib/supabase';

export default async function authMiddleware(req, res, next) {
    const jwt = req.headers['x-supabase-auth'];
    const unauthorized = (str) => res.status(401).send(str);

    if (!jwt) unauthorized('No JWT specified');

    const { user } = await supabase.auth.api.getUser(jwt);
    if (!user) unauthorized('User not found');

    next();
}
