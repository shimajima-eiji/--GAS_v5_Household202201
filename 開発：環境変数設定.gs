// 新エディタで作成する場合、GUIでプロパティを追加できないらしく不便なので、開発専用の関数を用意した。
// 他プロジェクトでも使いまわそう。

/* 開発中に間違えて実行すると悲惨なので、コメントアウトしておく(1敗)
function initialize() {
  local_set("channel_access_token", "(your access token)")
  local_set("group_id", "(your group id)");
  local_set("spreadsheet_id", "1_Ry3hQB1JNmJ_ijONtqyx56kC9Lnt3hrPD7KbENuK24")
  local_set("spreadsheet_sheetname", "家計簿_202201");
}
// */

function local_set(key, value) {
  if(key == undefined || value == undefined) {
    Logger.log("[Stop:local_set] key or value not found.");
    return;
  }
  PropertiesService.getScriptProperties().setProperty(key, value);

  // 入力したプロパティが表示されればOK
  Logger.log("[Complate:local_set] key:" +key + " / value:" + PropertiesService.getScriptProperties().getProperty(key));
}