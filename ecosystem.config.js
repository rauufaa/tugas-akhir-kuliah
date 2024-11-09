module.exports = {
  apps: [
    {
      name: "express-node-runtime",
      script: "node-framework-original/src/index.js",
      // interpreter: "/home/rauufaa/.local/share/fnm/node-versions/v22.5.1/installation/bin/node",
      exec_mode: "cluster",
      instances: 4,
      watch: true
    },
    {
      name: "express-bun-runtime",
      interpreter: "/home/wsl-ubuntu/.bun/bin/bun",
      script: "bun-framework-original/src/index.js",
      // cwd: "/home/wsl-ubuntu/tugas-akhir-kuliah/bun-framework-original/src",
      exec_mode: "cluster",
      instances: 4,
      watch: true
    }
  ]
}
