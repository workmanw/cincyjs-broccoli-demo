Presentation
---------------------
Slides: https://docs.google.com/presentation/d/157p-rxEbjeJCART38ynttUlSwTJ3G_8v01YuDPDilC0/pub?start=false&loop=false&delayms=3000
Video: https://www.youtube.com/watch?v=uJ1p6U1D800

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
