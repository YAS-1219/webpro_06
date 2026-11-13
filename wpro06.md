# webpro_06のページ遷移図

### じゃんけん関係
#### ページ遷移図
```mermaid
stateDiagram-v2
[*] --> /public/janken.html
/public/janken.html --> /janken:手を選択(1)
/janken --> /janken:手を選択(2)
```

#### (1)のパラメータ

パラメータ名 | 属性 | 内容 | 値
-|-|-|-
hand | text | ユーザの手 | グー/チョキ/パー
win | hidden | 勝利数 | 0
total | hidden | 対戦数 | 0

#### (2)のパラメータ

パラメータ名 | 属性 | 内容 | 値
-|-|-|-
hand | text | ユーザの手 | グー/チョキ/パー
win | hidden | 勝利数 | これまでの勝利数
total | hidden | 対戦数 | これまでの対戦数


### じゃんけん(ラジオボタン版)
#### ページ遷移図
```mermaid
stateDiagram-v2
[*] --> /public/janken2.html
/public/janken2.html --> /janken2:手を選択(1)
/janken2 --> /janken2:手を選択(2)
```

#### (1)のパラメータ

パラメータ名 | 属性 | 内容 | 値
-|-|-|-
hand | radio | ユーザの手 | グー/チョキ/パー
win | hidden | 勝利数 | 0
total | hidden | 対戦数 | 0

#### (2)のパラメータ

パラメータ名 | 属性 | 内容 | 値
-|-|-|-
hand | radio | ユーザの手 | グー/チョキ/パー
win | hidden | 勝利数 | これまでの勝利数
total | hidden | 対戦数 | これまでの対戦数

### 京葉線の駅(第8回)
#### ページ遷移図
```mermaid
stateDiagram-v2
[*] --> /keiyo
[*] --> /public/keiyo_add.html
/public/keiyo_add.html --> /keiyo_add:登録
/keiyo_add --> db1.ejsによる一覧表示
```

### 京葉線の駅の詳細表示(第9回)
#### ページ遷移図
```mermaid
stateDiagram-v2
[*] --> /keiyo2
/keiyo2 --> /keiyo2/:number:駅名を選択
/keiyo2/:number --> /keiyo2:一覧に戻る
/keiyo2 --> /public/keiyo2_add.html:駅を追加する
/public/keiyo2_add.html --> /keiyo2_add:登録
/keiyo2_add --> /keiyo2:リダイレクト
```

### 映画の一覧(第8回 やってみよう)
#### ページ遷移図
```mermaid
stateDiagram-v2
[*] --> /movie
/movie --> /public/movie_add.html:映画を追加する
/public/movie_add.html --> /movie_add:登録
/movie_add --> movie.ejsによる一覧表示
```
