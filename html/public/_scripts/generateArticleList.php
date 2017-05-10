<?php

require_once "./libs/Parsedown.php";

mb_internal_encoding("UTF-8");

$currentDir = dirname(__FILE__);

// pullを先にする
{
  echo exec("cd " . $currentDir . ";");
  echo exec("git pull origin master;");
}

{
  $postsDir = $currentDir . "/../posts";

  /***********************************************************************
  対象記事ディレクトリのメタ情報を返却
  メタファイルが存在しないまたは不正（created_atが存在しない）など、
  取得に失敗した場合falseを返却
  **********************************************************************/
  function getArticleMetaFile($articleDir)
  {
    $filePath = $articleDir . "/meta.json";

    if (is_file($filePath))
    {
      $metaJSON = file_get_contents($filePath);
      $meta = json_decode($metaJSON);

      if (isset($meta->created_at))
      {
        return $meta;
      }
    }

    return false;
  }

  /***********************************************************************
  対象記事ディレクトリの記事のタイトルと要約を取得
  情報が存在しない、又は不正な場合はfalseを返却
  **********************************************************************/
  function getArticleInfo($articleDir)
  {
    $info = [
      "title" => "",
      "excerpt" => ""
    ];

    $filePath = $articleDir . "/README.md";

    if (is_file($filePath))
    {
      $mdDataArray = file($filePath);

      // 記事タイトルの取得
      {
        // 改行コードを削除
        $tmpArray = array_map(function($item) {
          return str_replace(["\r\n", "\r", "\n"], "", $item);
        }, $mdDataArray);
        $line01 = $tmpArray[0];

        // TODO:substrで「２文字目から取得」って感じで、柔軟性がない。
        // （#の後に空白２個とか入れてしまうと変になる）のでもうちょっとなんとか
        $info["title"] = mb_substr($line01, 2);
      }

      // 要約の取得
      {
        unset($mdDataArray[0]);
        $mdData = implode($mdDataArray);

        $pd = new Parsedown();
        $html = $pd->text($mdData);
        $tagRemovedStr = strip_tags($html);
        $tagRemovedStr = str_replace(["\r\n", "\r", "\n"], "", $tagRemovedStr);

        $info["excerpt"] = mb_substr($tagRemovedStr, 0, 100);
      }

      return $info;
    }

    return false;
  }

  /***********************************************************************
  postsディレクトリ直下にある記事のディレクトリ一覧を取得
  **********************************************************************/
  function getArticleDatas($postsDir)
  {
    $articleDatas = [];

    $items = scandir($postsDir);
    $items = array_filter($items, function($item) {
      return ($item !== "." && $item !== "..");
    });

    foreach ($items as $item) {
      $fullPath = $postsDir . "/" . $item;

      if (is_dir($fullPath)) {
        $meta = getArticleMetaFile($fullPath);
        if ($meta !== false) {
          $info = getArticleInfo($fullPath);
          if ($info !== false) {
            $articleDatas[] = [
              "perma_link" => $item,
              "created_at" => $meta->created_at,
              "title" => $info["title"],
              "excerpt" => $info["excerpt"]
            ];
          }
        }
      }
    }

    // 日付降順にソート
    usort($articleDatas, function($a, $b) {
      return $b["created_at"] - $a["created_at"];
    });

    var_dump($articleDatas);

    return $articleDatas;
  }

  $jsonObj = [
    "meta" => [
      "status" => 200
    ],
    "data" => getArticleDatas($postsDir)
  ];

  $json = json_encode($jsonObj);
  file_put_contents($postsDir . '/articles.json', $json);
}
