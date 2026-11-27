const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// ===== 第8回 データの流れ =====
let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  // 例1：データ登録のページを返す場合は次の行を使う
  // res.redirect('/public/keiyo_add.html');
  // 例2：データ一覧ページを返す
  res.render('db1', { data: station });
});

// ===== 第9回 データの詳細表示 =====
let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

function hasStation2( number ) {
  return Number.isInteger( number ) && number >= 0 && number < station2.length;
}

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = Number( req.params.number );
  if( !hasStation2( number ) ) return res.status(404).send('該当する駅がありません');
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number, data: detail} );
});

app.get("/keiyo2/delete/:number", (req, res) => {
  const number = Number( req.params.number );
  if( !hasStation2( number ) ) return res.status(404).send('該当する駅がありません');
  station2.splice( number, 1 );
  res.redirect('/keiyo2');
});

app.post("/keiyo2", (req, res) => {
  let id = 1;
  for( const row of station2 ) {
    if( row.id >= id ) id = row.id + 1;
  }
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = Number( req.body.passengers );
  const distance = Number( req.body.distance );
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.redirect('/keiyo2');
});

app.get("/keiyo2/edit/:number", (req, res) => {
  const number = Number( req.params.number );
  if( !hasStation2( number ) ) return res.status(404).send('該当する駅がありません');
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

app.post("/keiyo2/update/:number", (req, res) => {
  const number = Number( req.params.number );
  if( !hasStation2( number ) ) return res.status(404).send('該当する駅がありません');
  station2[number].code = req.body.code;
  station2[number].name = req.body.name;
  station2[number].change = req.body.change;
  station2[number].passengers = Number( req.body.passengers );
  station2[number].distance = Number( req.body.distance );
  console.log( station2 );
  res.redirect('/keiyo2/' + number);
});


app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/janken2", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // 勝敗の判定
  if( hand == cpu ) {
    judgement = 'あいこ';
  } else if( (hand=='グー' && cpu=='チョキ') ||
             (hand=='チョキ' && cpu=='パー') ||
             (hand=='パー' && cpu=='グー') ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken2', display );
});

// ===== 第8回 やってみよう(2)(3) 映画のデータ =====
let movie = [
  { id:1, title:"千と千尋の神隠し", director:"宮崎駿", year:2001, genre:"アニメ" },
  { id:2, title:"君の名は。", director:"新海誠", year:2016, genre:"アニメ" },
  { id:3, title:"ショーシャンクの空に", director:"フランク・ダラボン", year:1994, genre:"ドラマ" },
  { id:4, title:"バック・トゥ・ザ・フューチャー", director:"ロバート・ゼメキス", year:1985, genre:"SF" },
  { id:5, title:"インセプション", director:"クリストファー・ノーラン", year:2010, genre:"SF" },
];

app.get("/movie", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('movie', { data: movie });
});

app.get("/movie_add", (req, res) => {
  let id = Number( req.query.id );
  let title = req.query.title;
  let director = req.query.director;
  let year = Number( req.query.year );
  let genre = req.query.genre;
  let newdata = { id: id, title: title, director: director, year: year, genre: genre };
  movie.push( newdata );
  res.render('movie', { data: movie });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
