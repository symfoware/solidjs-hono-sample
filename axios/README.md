# SolidJS + Hono + Vite url分岐のサンプル

Hono Serverをnodemonで実行  
Vite HMRはデフォルトサーバーで実行する構成  
urlにより/resources/js/pagesの中から表示するページを変更する
axiosを使用してSolidJS - Hono間のデータ取得確認

## 内容

- /public  
ファイルを公開するディレクトリ  

- /resources  
ビルド対象の資産で、公開時には不要なファイル群  

- /src  
サーバー関連(Hono)のソースを保存するディレクトリ  
