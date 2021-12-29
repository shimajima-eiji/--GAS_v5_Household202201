// 
function add_sheet(data) {
  if(data == undefined) {
    message = "[デバッグ: add_sheet]データが見つからない";
    Logger.log(message);
    send_message(message, 'https://api.line.me/v2/bot/message/push', "リプライトークン")
    return;
  }

  const sheet = Object_Sheet();
  sheet.add_row(data);
}

// 本当はclassにしたかったが、プライベートメンバを作るのが面倒くさかったのでfunctionにする
props = PropertiesService.getScriptProperties();
Object_Sheet = (id = props.getProperty("spreadsheet_id"), name = props.getProperty("spreadsheet_sheetname")) => {
  sheet = SpreadsheetApp.openById(id).getSheetByName(name);
  all_range = () => sheet.getDataRange();
  all_data = all_range().getValues();

  return {
    search: (args = {}, or_flag = false) => {
      view = "";

      search_flag = (!args) ? false  // 入力がない場合
      : (!args.id) ? true
      : (!args.shop) ? true
      : (!args.date) ? true
      : false;  // 入力値が不正な場合

      for(row in all_data) {
        add_counter = 0;
        if(row == 0        // ヘッダー
          || !search_flag  // 検索条件がない
        ) {
          add_counter = Object.keys(args).length;
        } else {
          // [TODO]filterが使えるか？ カラム毎に抜き出して比較
          for(column in all_data[row]) {
            target = all_data[row][column];

            if(target == args.id      // id検索
              || target == args.shop  // 店舗検索
              || target == args.date  // 日付検索
            ) {
              add_counter++;
            }
          }
        }

        // 追加したいケースを選択
        if(add_counter == Object.keys(args).length
        || (add_counter > 0 && or_flag)) {
          view += all_data[row];
          view += "\n";
        }
      }

      // Logger.log(view);
      return view;
      // send_message(view, 'https://api.line.me/v2/bot/message/push', "リプライトークン")
    },
    data: (values) => (values == undefined)
      ? all_data
      : ((values) => {all_range().setValues(values); all_data = all_range().getValues()}),
    add_row: (row_value) => {
      if(row_value == undefined) {
        return;               // 中断する
        // row_value = [""];  // 実行する
      }
      row_value.unshift(all_data.length);  // IDを自動採番
      sheet = sheet.appendRow(row_value);
    }
  }
}
