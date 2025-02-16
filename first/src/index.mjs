import fs from 'fs';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { html, raw } from 'hono/html';

const app = new Hono();

// トップページとして表示するhtml
const Main = (props) => html`
<html>
    <head>
        ${raw(props.scripts)}
    </head>
    <body>
        <h1>Hello! ${props.name}</h1>
        <div id="app"></div>
        <img src="/static/solidjs.jpg" style="max-width:160px">
        <img src="/static/hono.png" style="max-width:160px">
    </body>
</html>
`;

// 静的ファイルの配信
app.use('/static/*', serveStatic({ root: './public/' }));
// solid-jsのビルド結果を公開
app.use('/build/*', serveStatic({ root: './public/' }));

app.get('/', (c) => {
    const props = {
        name: 'Symfoware'
    };

    const hot = fs.existsSync('./hot');
    let scripts = '';

    // scriptタグとして挿入するタグを生成
    // vite起動中
    if (hot) {
        scripts = `<script src="http://localhost:5173/resources/js/app.jsx" type="module"></script>`;
  
    // 通常モード
    } else {
        // public/buildにsolid-jsのビルド結果がある前提
        const manifests = JSON.parse(fs.readFileSync('./public/build/manifest.json'));
        for (const [key, value] of Object.entries(manifests)) {
            // @todo cssの対応
            scripts += `<link rel="modulepreload" href="/build/${value.file}" />`;
            scripts += `<script src="/build/${value.file}" type="module"></script>`;
        }
    }
    props.scripts = scripts;
    return c.html(Main(props));
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port
});
