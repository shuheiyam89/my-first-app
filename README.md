# my-first-app

依存パッケージなしで動く、シンプルな ToDo Web アプリです。

- フロントエンド: HTML / CSS / JavaScript（ブラウザの localStorage に保存）
- サーバー: Node.js 標準の `http` モジュールによる静的ファイル配信

## 使い方

```bash
npm start        # http://localhost:3000 で起動（PORT 環境変数で変更可）
npm test         # テストを実行
```

## 構成

```
.
├── server.js          # 静的ファイルサーバー
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js         # ToDo の追加・完了・削除
└── test/
    └── server.test.js # サーバーのテスト（node:test）
```
