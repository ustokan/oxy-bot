const Client = require('./structures/Client');

const client = new Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_TYPING', 'GUILD_MESSAGE_TYPING', 'GUILD_INTEGRATIONS',
        'GUILD_VOICE_STATES'
    ],
    partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'USER', 'REACTION']
});
client.start();

const express = require('express');
const app = express();

app.disable('x-powered-by');
app.use(express.json());

app.get('/', (req, res) => {
    res.sendStatus(200);
});
app.post('/verify', async (req, res) => {
    if (!req.body.code || !req.body.uid)
        return res.sendStatus(403);

    const verify = await client.db.collection('verifications')
        .findOne({ UserID: req.body.uid });

    if (!verify)
        return res.sendStatus(491);

    if (req.body.code !== verify.Code)
        return res.sendStatus(492);

    await client.db.collection('verifications')
        .deleteMany({ UserID: req.body.uid });

    let avatarRequest = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${req.body.rid}&size=250x250&format=Png&isCircular=false`);
    let avatarJson = await avatarRequest.json();

    let check = await client.db.getUserData(verify.UserID);
    if (!check) {
        client.db.collection('users').insertOne({
            UserID: verify.UserID,
            RobloxID: `${req.body.rid}`,
            RobloxAvatar: avatarJson.data[0].imageUrl
        });
    } else {
        client.db.collection('users').updateOne({ UserID: verify.UserID }, {
            $set: {
                RobloxID: `${req.body.rid}`,
                RobloxAvatar: avatarJson.data[0].imageUrl
            }
        });
    }

    try {
        const user = client.users.cache.get(verify.UserID);
        const guild = client.guilds.cache.get('817401465302810676')
        if (!guild) return res.sendStatus(494)
        if (!user) return res.sendStatus(495)
        const member = guild.members.cache.get(user.id);
        if (!member) return res.sendStatus(496);
        try {
            const role = guild.roles.cache.get('872425219774615613');
            member.roles.add(role);
        } catch (error) {
            console.log(error);
            return res.sendStatus(493);
        }

        try {
            await user.send({ content: 'Вы успешно прошли верификацию' });
        } catch {}
    } catch {}

    res.sendStatus(200);
});

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status !== 404)
        console.error(err.message);

    res.sendStatus(err.status || 500);
});

app.listen(process.env.PORT || 8080);