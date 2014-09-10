
Getting started
---------------------
```bash
npm install
npm install -g bower
npm install -g broccoli-cli
```

Running Server
---------------------
```bash
broccoli serve
```

Starts server at http://localhost:4200/


Building production
---------------------
```bash
BROCCOLI_ENV=production broccoli build dist
```

Builds the files and drops them into `dist/`
