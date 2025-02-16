import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import fs from 'fs';

// viteのデバッグが起動中かの判定
// デバッグサーバー起動時、.hotファイルを作成して判定に使用する
let exitHandlersBound = false;
const hotwatch = () => {
    return {
        name: 'hotwatch',
        enforce: 'post',
        configureServer(server) {
            server.httpServer?.once('listening', () => {
                const address = server.httpServer?.address();
                const isAddressInfo = (x) => typeof x === 'object';
                if (isAddressInfo(address)) {
                    fs.writeFileSync('./hot', `on`);
                }
            });

            if (!exitHandlersBound) {
                const clean = () => {
                    if (fs.existsSync('./hot')) {
                        fs.rmSync('./hot');
                    }
                };
                process.on('exit', clean);
                process.on('SIGINT', () => process.exit());
                process.on('SIGTERM', () => process.exit());
                process.on('SIGHUP', () => process.exit());
                exitHandlersBound = true;
            }
        }
    };
}

export default defineConfig({
    publicDir: false, // 静的ファイルはビルドの対象外
    build: {
        rollupOptions: {
            input: './resources/js/app.jsx',
            output: {
                dir: './public/build/'
            }
        },
        manifest: 'manifest.json',
        target: 'esnext',
    },
    plugins: [solidPlugin(), hotwatch()],
});
