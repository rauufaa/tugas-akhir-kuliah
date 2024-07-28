module.exports = {
  apps: [
    {
      name: "express-node-runtime",
      script: "node-framework/src/index.js",
      interpreter: "/home/rauufaa/.local/share/fnm/node-versions/v22.5.1/installation/bin/node",
      env: {
        PORT: 5000
      },
    },
    {
      name: "express-bun-runtime",
      interpreter: "/home/rauufaa/.bun/bin/bun",
      script: "bun-framework/src/index.js",
      env: {
        PORT: 8000
      },
    }
  ]
}
