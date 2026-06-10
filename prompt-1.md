blank@zenith-production:/var/www$ cd zenith
blank@zenith-production:/var/www/zenith$ git pull && rm -rf .next && npm install && npm run build && pm2 restart zenith
remote: Enumerating objects: 8, done.
remote: Counting objects: 100% (8/8), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 8 (delta 5), reused 8 (delta 5), pack-reused 0 (from 0)
Unpacking objects: 100% (8/8), 926 bytes | 42.00 KiB/s, done.
From https://github.com/7blank-07/Zenith-app-Max
   322d918..08b1c69  rush       -> origin/rush
Updating 322d918..08b1c69
Fast-forward
 next.config.js                         | 34 +---------------------------------
 src/lib/server/player-seo-contract.mjs |  3 ++-
 src/lib/server/prerender-rollout.mjs   | 13 +++++++------
 3 files changed, 10 insertions(+), 40 deletions(-)

up to date, audited 74 packages in 5s

9 packages are looking for funding
  run `npm fund` for details

3 vulnerabilities (2 moderate, 1 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

> zenith-app-max@1.0.0 prebuild
> node scripts/prepare-legacy.mjs

[prepare-legacy] Done: public assets, body HTML, and legacy bundle generated (CSS preserved).

> zenith-app-max@1.0.0 build
> next build

 ⨯ Failed to load next.config.js, see more info here https://nextjs.org/docs/messages/next-config-error

> Build error occurred
/var/www/zenith/next.config.js:1
/** @type {import('next').NextConfig} */`nconst nextConfig = {`n  reactStrictMode: false,`n  staticPageGenerationTimeout: 600,`n  eslint: {`n    ignoreDuringBuilds: true,`n  },`n  typescript: {`n    ignoreBuildErrors: true,`n  },`n  async redirects() {`n    return [`n      {`n        source: '/compare',`n        destination: '/tools/player-compare',`n        permanent: true,`n      },`n      {`n        source: '/watchlist',`n        destination: '/tools/watchlist',`n        permanent: true,`n      }`n    ];`n  }`n};`n`nmodule.exports = nextConfig;
                                                               ^

SyntaxError: Unexpected identifier 'n'
    at wrapSafe (node:internal/modules/cjs/loader:1464:18)
    at Module._compile (node:internal/modules/cjs/loader:1495:20)
    at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)
    at Module.load (node:internal/modules/cjs/loader:1266:32)
    at Module._load (node:internal/modules/cjs/loader:1091:12)
    at cjsLoader (node:internal/modules/esm/translators:298:15)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:240:7)
    at ModuleJob.run (node:internal/modules/esm/module_job:325:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:606:24)
    at async loadConfig (/var/www/zenith/node_modules/next/dist/server/config.js:711:36)
blank@zenith-production:/var/www/zenith$ n\
