function main(text) {
  // 実行判定
  if(typeof text != "object" || text.length == 0 ) return error;

  // 【関数定義】
  register = () => {
    text.shift();

    array_index = {
      money: 0,  // 金額
      pay: 1,    // 支払い方法
      shop: 2,   // 店舗
      date: 3,   // 支払日
      memo: 4,   // 備考
    }

    data = [];
    message = "";
    // [TODO]array_indexに合わせて可変, array_indexもヘッダから取りたい
    data = ["(未入力)", "(未入力)", "(未入力)", TODAY, ""];

    // [@line 登録]以降の半角スペースの数だけ実施する
    for(index in text) {

      // 取得した文字を「は」で分ける。
      word = text[index].split("は");

      // [TODO]入れたい値に「は」が含まれる可能性がある
      if(word.length == 2            // 「は」で区切られていたら2つしか出てこないはず
        && keys[word[0]] != undefined  // keysのkey要素に該当している
        && word[1] != undefined        // 何か入っている
      ) {

        // データの初期値を設定する
        data[ array_index[ keys[word[0]] ] ] = word[1];

      // 不正な入力をしていた場合の処理
      } else {
        message = message + "[Skip]【" + word[0] + "】の登録失敗。区切り文字「は」を間違えてない？\n";
      }
    }

    // 間違えて登録処理が走らないよう、先に弾いておく
    if(data.length == 0) {
      message += "[Skip] 登録処理を中断。";
      return message;
    }

    try {
      add_sheet(data);
      message += "[Info] 処理は正常終了！";
    } catch(e) {
      message += "[ERROR]※※※　異常処理発生　※※※";
    }
    return message;
  }

  search = (today_flag = false) => {
    text.shift();

    args = {};
    if(today_flag){
      args = {date: TODAY};

    // 検索条件がややこしい場合。 if(text.length > 0)で判定していたが0の場合は回らない
    } else {
      for(index in text) {
        word = text[index].split("は");
        if(word.length != 2) continue;

        args[ keys[word[0]] ] = word[1];
      }
    };
    return Object_Sheet().search(args);
  }

  // 【定数定義】
  const TODAY = dayjs.dayjs(new Date()).format("YYYYMMDD");
  const keys = {
    "id": "id",
    "金額": "money",
    "支払い方法": "pay",
    "店名": "shop",
    "支払日": "date",
    "メモ": "memo",
  };
  // 処理が細かく異なるので、全てメソッドを格納する
  const messages = {
    "データを投入したい": () => "「@line 登録 (金額は◯◯)	(支払い方法は◯◯)	(店名は◯◯)	(支払日はYYYYMMDD)	(メモは◯◯)」を入力する。メモは省略可能",
    "今日の支払いを見たい": () => search(true),
    "全件表示": () => search(),
    "使い方" : () => "「@line 検索 (支払い方法は◯◯) (店名は◯◯) (支払日はYYYYMMDD)」を入力する。検索条件を省略すると全件検索する",
    "登録": () => register(),
    "検索": () => search(),
  };
  const error = "入力エラーのため処理を中断";

  // 【実行定義】
  return (messages[text[0]] == undefined) ? error : messages[text[0]]();
}
