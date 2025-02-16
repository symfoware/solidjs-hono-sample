import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import page from './page.mjs';


const app = new Hono();

// 静的ファイルの公開
app.use('/static/*', serveStatic({ root: './public/' }));
// ビルド結果の公開
app.use('/build/*', serveStatic({ root: './public/' }));

// トップページ
app.get('/', (c) => {
    return c.html(page('top'));
});

// サブページ
app.get('/sub', (c) => {
    return c.html(page('sub'));
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port
});
