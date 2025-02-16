import fs from 'fs';
import { html, raw } from 'hono/html';

// htmlのテンプレート
const base = (props) => html`
<html>
    <head>
        ${raw(props.scripts)}
    </head>
    <body>
        <div id="app" data-page="${JSON.stringify(props.page).replaceAll("'", "&#39;")}"></div>
    </body>
</html>
`;

export default function page(name) {

    const props = {
        page: {
            name: name
        }
    };

    // vite起動中チェックはhotファイルの存在で行う
    const hot = fs.existsSync('./hot');
    let scripts = '';

    // vite起動中
    if (hot) {
        scripts = `<script src="http://localhost:5173/resources/js/app.jsx" type="module"></script>`;
    // 通常モード
    } else {
        const manifests = JSON.parse(fs.readFileSync('./public/build/manifest.json'));
        for (const [key, value] of Object.entries(manifests)) {
            scripts += `<link rel="modulepreload" href="/build/${value.file}" />`;
            scripts += `<script src="/build/${value.file}" type="module"></script>`;
            
            // css未設定の場合はスキップ
            if (!('css' in value)) {
                continue;
                
            }

            // cssのロード処理を追加
            for(const css of value.css) {
                scripts += `<link rel="preload" as="style" href="/build/${css}" />`;
                scripts += `<link rel="stylesheet" href="/build/${css}" />`;
            }
        }

    }
    props.scripts = scripts;

    return base(props);
};