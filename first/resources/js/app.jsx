/* @refresh reload */
import { render } from 'solid-js/web';
import { onCleanup, createSignal } from 'solid-js';

const CountingComponent = () => {
    const [count, setCount] = createSignal(0);
    const interval = setInterval(
      () => setCount(count => count + 2),
      1000
    );
    onCleanup(() => clearInterval(interval));
    return (
        <>
            <h2>Solid Test</h2>
            <div>Count value is {count()}</div>
        </>
    );
};

const app = document.getElementById('app');
render(() => <CountingComponent />, app);
