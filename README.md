## 経緯
毎年恒例のアレ。ついでにLINEアプリとAndorid / iPhoneアプリを共存させる仕組みを作る練習

## 主要リンク
- [開発リポジトリ](https://github.com/shimajima-eiji/--GAS_v5_Household202201)
- [デバッグリポジトリ](https://github.com/shimajima-eiji/GAS_v5_LINEdebug)
- [Gdrive:ディレクトリ](https://drive.google.com/drive/my-drive)
- [Gdrive:スクリプト](https://script.google.com/home)
- [Gdrive:スプレッドシート](https://docs.google.com/spreadsheets)
- [LineBot:Webhook](https://manager.line.biz/account/@？？？/setting/messaging-api)
  - アカウントID: 
- [LineBot:リッチメニュー](https://manager.line.biz/account/@？？？/richmenu)
  - アカウントID: 

## バージョン
### 試行版：ver1.0.4.2

## 環境変数
|key|value|用途|備考|
|---|---|---|---|
|channel_access_token||認証||
|group_id||グループに送信するために必要|

## デバッガ
### doPost.gs
```
function doPost_debug() {
  e = {};
  e.postData = {};
  e.postData.contents = '{"events":[{"message":{"text":"@line 登録 支払い方法はGAS"},"source":{"type":"group","groupId":"(グループ)","userId":"(ユーザー)"},"replyToken":"hoge"}]}';
  doPost(e);
}

// GASのWebhookのデバッグ用
// 解放すると通信があるたびに動くので、デバッグが終わったらコメントアウトする
function doGet(e) {
  // ここのリプライトークンは意味のないものにしているが、groupには送れる
  // send_message("curlデバッグ: アクセスポイントチェック", 'https://api.line.me/v2/bot/message/push', "リプライトークン");
}
```

## パラメータ
### 引数
|リクエストボディ|概要|
|---|---|
|?key=(環境変数)|キーの値を取得|
|key=(環境変数)&value=(該当する任意の値)|キーに値を登録|

### 戻り値
JSON形式

|パラメータ|動作|出力例|
|---|---|---|
|result|get/set|`Success` or `Failed`|
|message|get|`key's value` or `comment`|

## READMEのバージョン
ver2022.01.11
