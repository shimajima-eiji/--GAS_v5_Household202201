function doPost(e) {
  // 引数に必要なデータを検証
  if(e == undefined
    && e.postData == undefined
    && e.postData.contents == undefined
  ) return;

  // [TODO] parse処理自体の成功チェックや、parseしたjsonの妥当性検証
  let json = JSON.parse(e.postData.contents);

  // 反応する処理を決定する
  text = json.events[0].message.text.split(" ");
  if(text.length == 0 && text.shift() != "@line") {
    return;
  }

  // 処理を実行
  message = main(text);

  // 送信元がトークかグループか判定して、適切な方へ返す
  let endpoint = (json.events[0].source.type == 'group')
    ? 'https://api.line.me/v2/bot/message/push'   // グループ
    : 'https://api.line.me/v2/bot/message/reply'  // トーク
  ;

  // デバッグする時は JSON.stringify(json)
  // テキストだけを撮りたい場合は json.events[0].message.text
  send_message(message, endpoint, json.events[0].replyToken);
}

function send_message(message, endpoint, reply_token) {
  // 引数チェック
  if(typeof message === 'undefined'
  || typeof endpoint === 'undefined'
  || typeof reply_token === 'undefined') return;

  //LINE Developersで取得したアクセストークンを入れる
  const property = PropertiesService.getScriptProperties();

  // メッセージを返信    
  UrlFetchApp.fetch(endpoint, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + property.getProperty("channel_access_token"),
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': property.getProperty("group_id"),  // グループの場合必須。トークの場合は無視される
      'replyToken': reply_token,  // トークの場合必須。グループに送信した場合でも項目は存在する
      'messages': [{
        'type': 'text',
        'text': message,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}