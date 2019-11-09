const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        proxy({
            target: "https://frontend-test-api-server.herokuapp.com",
            changeOrigin: true,
        })
    );
};