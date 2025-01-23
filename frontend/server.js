const cors_proxy = require('cors-anywhere');
const host = '0.0.0.0';
const port = 8081;

cors_proxy.createServer({
    originWhitelist: [], // Разрешает все домены
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log(`CORS Anywhere сервер запущен на ${host}:${port}`);
});
