import './bootstrap';
import '../css/app.css'; // この行を追加

import { render } from 'solid-js/web';

// タグから表示するページ名を取得
const el = document.getElementById('app');
const page = JSON.parse(el.dataset.page);
const name = page.name;

// 指定された名称のページをロード
import(`./pages/${name}.jsx`)
.then((component) => {
    const App = component.default;
    render(() => <App />, el);
});

