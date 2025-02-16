/* @refresh reload */
import { createSignal, For } from 'solid-js';
import axios from 'axios';

export default function top(props) {

    const [data, setData] = createSignal([]);
    
    // ボタンクリック時の処理
    const load = async (e) => {
        // データを取得して設定
        const { data } = await axios.post('/load');
        setData(data);
    };
  
    return (
        <>
            <h1 class="text-xl text-red-500">Top</h1>
            <h3>Data Load Example</h3>
            <div>
                <button onClick={load}>load</button>
            </div>
            <ul>
            <For each={data()}>
                {(item, i) => (
                    <li>{item}</li>
                )}
            </For>
            </ul>

            <a href="/sub">sub</a>
        </>
    );
}