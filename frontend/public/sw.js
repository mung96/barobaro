if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => a(e, c),
      f = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(i.map((e) => f[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '2f14cfd00073edd0e882e888a226525e' },
        { url: '/_next/static/chunks/1181-216594460dffac44.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/2078.60c7a68f76fe7618.js', revision: '60c7a68f76fe7618' },
        { url: '/_next/static/chunks/2121-a5d57691bad37a8f.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/231-048c684713081db2.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/3769-2f386308139b4f54.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/4782-be224d7b31ae9c6f.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/523-a116ad8d2671cb18.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/53c13509-fd1073411ae518fb.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/5e22fd23-b290f77046af9f6a.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/6033-936c90bb67770d4f.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/6341-5c4ba8955fc7c32c.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/6648-a05aa20eab3a948f.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/6955-4e4b670a72ce3946.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/7023-e27860482cc3b394.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/7068-ecd53468de44ea35.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/7842-7a28c8983673e70a.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/795d4814-79d11fb8a1d5af90.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/8472-6cb4547b56c6e34b.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/8e1d74a4-6f6a59804bedde31.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/9c4e2130-d2d03356edcf5b01.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        {
          url: '/_next/static/chunks/app/(afterlogin)/alert/page-b7e5fada5e045d27.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/home/page-a036f16c7b5a8171.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        { url: '/_next/static/chunks/app/(afterlogin)/layout-5a1a6a5f5526bdbc.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        {
          url: '/_next/static/chunks/app/(afterlogin)/like/page-9204520a34b9ea60.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/message/chat/%5Bchat_id%5D/page-95ae17b187aedafe.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/message/page-8a2031064d9f58de.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/alarm/page-6bef8c8cf4061874.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/current/borrow/page-0eb489d9f9296a09.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/current/lent/page-0891434aa3fc6cfb.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/help/question/page-4c8d711df9ad7e52.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/help/terms/page-e11a4325bf67835c.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/layout-f8d165babfa8f2c9.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/page-f2eef76852e84712.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/payment/connect_account/page-3131b7dad18430d4.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/payment/main_account/page-b70671293decdd7e.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/profile/page-bed171e6fb8eea8b.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/user/password/page-75821652c4247c1b.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/%5Bpost_id%5D/page-ea401795e31066f2.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/edit/page-ef78ed66468e4247.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/layout-138348d19109ef2f.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/page-74285694d69f4ab0.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/regist/layout-43bb14d773d1d329.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/regist/page-fbe4b69ded096c41.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/registration/page-7b3d891551cf1642.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/search/page-da5731274b2df95c.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/searchmain/page-21b1de297ab20c92.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(beforelogin)/exist/page-46a3347f7ad45eb6.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        { url: '/_next/static/chunks/app/(beforelogin)/layout-0f333de32e8e9580.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        {
          url: '/_next/static/chunks/app/(beforelogin)/login/page-40c41b9948176fe3.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        { url: '/_next/static/chunks/app/(beforelogin)/page-bac4023ae0566b13.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        {
          url: '/_next/static/chunks/app/(beforelogin)/signup/info/page-afacaea89edf3e97.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        {
          url: '/_next/static/chunks/app/(beforelogin)/signup/layout-e6ae4ea2a60251db.js',
          revision: 'z6S466hZDi8JvnQ-4xRx6',
        },
        { url: '/_next/static/chunks/app/_not-found/page-57989dad512a726d.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/app/layout-e1897a9cbc928c7b.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/app/not-found-eb48103f1f1f0998.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/eeac573e-27a89aae67c68ace.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/f7333993-08fa3371a8c232c1.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/fd9d1056-7790f5148d36038b.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/framework-8e0e0f4a6b83a956.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/main-74b5b00bcea75dde.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/main-app-a4d24fa2c5856823.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/pages/_app-f870474a17b7f2fd.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js', revision: '79330112775102f91e1010318bae2bd3' },
        { url: '/_next/static/chunks/webpack-2b4b808ed6eb1eba.js', revision: 'z6S466hZDi8JvnQ-4xRx6' },
        { url: '/_next/static/css/126acce611cc7b99.css', revision: '126acce611cc7b99' },
        { url: '/_next/static/css/6c8e1ebbc5c47efa.css', revision: '6c8e1ebbc5c47efa' },
        { url: '/_next/static/css/e262d6195f38206e.css', revision: 'e262d6195f38206e' },
        { url: '/_next/static/media/26a46d62cd723877-s.woff2', revision: 'befd9c0fdfa3d8a645d5f95717ed6420' },
        { url: '/_next/static/media/55c55f0601d81cf3-s.woff2', revision: '43828e14271c77b87e3ed582dbff9f74' },
        { url: '/_next/static/media/581909926a08bbc8-s.woff2', revision: 'f0b86e7c24f455280b8df606b89af891' },
        { url: '/_next/static/media/6d93bde91c0c2823-s.woff2', revision: '621a07228c8ccbfd647918f1021b4868' },
        { url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2', revision: 'e360c61c5bd8d90639fd4503c829c2dc' },
        { url: '/_next/static/media/Google.d6f6e19d.png', revision: 'cbd7e0b08fb8bdabf2eaf757aab3b6f0' },
        { url: '/_next/static/media/KB_mark.be50f03a.png', revision: 'b9b9a753a3ddae303d355153f46833ef' },
        { url: '/_next/static/media/Kakao.dfc60f1f.png', revision: 'bc3fe549e4fdcfebb8cb3f3abac19789' },
        { url: '/_next/static/media/Kakao_mark.92d671ab.png', revision: '2eba13333a7a5768d5acb890a8ba6463' },
        { url: '/_next/static/media/Naver.993df08c.png', revision: '012cd4cd0a841d686b403a08852564e7' },
        { url: '/_next/static/media/SSAFY_mark.7e586f65.png', revision: '6fd940e0dea88af55504fad9007bdf0b' },
        { url: '/_next/static/media/Shinhan_mark.b8bf2ecc.png', revision: 'b02f2562433b571f7a8bf4f3cde7cad2' },
        { url: '/_next/static/media/a34f9d1faa5f3315-s.p.woff2', revision: 'd4fe31e6a2aebc06b8d6e558c9141119' },
        { url: '/_next/static/media/barobaro_logo.8e773b57.png', revision: 'eaf3ad0fed491894f6d7b043e5ef436c' },
        { url: '/_next/static/media/camera_lens.4d2d20cd.png', revision: '7ab5029bc7fb9cb60c989c4efcf518ab' },
        { url: '/_next/static/media/camera_lens_blue.4d5b4546.png', revision: '11f8463dc513307b654c388881844f90' },
        { url: '/_next/static/media/camera_lens_gray.b0bfb018.png', revision: '8cc9812eb334eda413fbcc861c65c557' },
        { url: '/_next/static/media/camera_lens_white.c2b5970d.png', revision: 'eee5377f703ae5fab5688463961650fb' },
        { url: '/_next/static/media/df0a9ae256c0569c-s.woff2', revision: 'd54db44de5ccb18886ece2fda72bdfe0' },
        { url: '/_next/static/z6S466hZDi8JvnQ-4xRx6/_buildManifest.js', revision: '3e2d62a10f4d6bf0b92e14aecf7836f4' },
        { url: '/_next/static/z6S466hZDi8JvnQ-4xRx6/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
        { url: '/assets/png/bank/KB_mark.png', revision: 'b9b9a753a3ddae303d355153f46833ef' },
        { url: '/assets/png/bank/Kakao_mark.png', revision: '2eba13333a7a5768d5acb890a8ba6463' },
        { url: '/assets/png/bank/SSAFY_mark.png', revision: '6fd940e0dea88af55504fad9007bdf0b' },
        { url: '/assets/png/bank/Shinhan_mark.png', revision: 'b02f2562433b571f7a8bf4f3cde7cad2' },
        { url: '/assets/png/barobaro_logo.png', revision: 'eaf3ad0fed491894f6d7b043e5ef436c' },
        { url: '/assets/png/baroping.png', revision: 'de86b59c08d039d15de539ada769be98' },
        { url: '/assets/png/camera_lens.png', revision: '7ab5029bc7fb9cb60c989c4efcf518ab' },
        { url: '/assets/png/camera_lens_blue.png', revision: '11f8463dc513307b654c388881844f90' },
        { url: '/assets/png/camera_lens_gray.png', revision: '8cc9812eb334eda413fbcc861c65c557' },
        { url: '/assets/png/camera_lens_white.png', revision: 'eee5377f703ae5fab5688463961650fb' },
        { url: '/assets/png/login/Google.png', revision: 'cbd7e0b08fb8bdabf2eaf757aab3b6f0' },
        { url: '/assets/png/login/Kakao.png', revision: 'bc3fe549e4fdcfebb8cb3f3abac19789' },
        { url: '/assets/png/login/Naver.png', revision: '012cd4cd0a841d686b403a08852564e7' },
        { url: '/assets/svg/add_message.svg', revision: 'a0a24f683a5e65d90c494f5a62cef3df' },
        { url: '/assets/svg/alarm.svg', revision: '4cba7c91e6842884e29768a5fa0dd224' },
        { url: '/assets/svg/attatchImage.svg', revision: 'a3ab355edb934d529f48b61274957cdd' },
        { url: '/assets/svg/borrow.svg', revision: '1a2462dd3f2ebcab10d9e2a225156c65' },
        { url: '/assets/svg/calendar.svg', revision: 'dc030ddfc9606aebc171e7f9ea179bf9' },
        { url: '/assets/svg/camerabody.svg', revision: '27b26a7699fe5bc358cbf2f425e33038' },
        { url: '/assets/svg/cameralens.svg', revision: 'c95c1e88363aa69acb92a570f6d0fb60' },
        { url: '/assets/svg/cameralens_white.svg', revision: '1b11917b98b66c8e0c8a9c79bee0d207' },
        { url: '/assets/svg/carousel_left.svg', revision: 'a3843a99acc0ada10c2b582553dfbd06' },
        { url: '/assets/svg/carousel_right.svg', revision: '7d6f71988ea3f5ad41705a61d2847ffa' },
        { url: '/assets/svg/checked.svg', revision: '7753cdf8c2e9de2acd01ab0d36b9289a' },
        { url: '/assets/svg/circle_plus.svg', revision: 'ba19a7576e54246ca3a0cd4fdef880a5' },
        { url: '/assets/svg/clipboard.svg', revision: '23ad36856729d140fb1fbe23ba8e9b2b' },
        { url: '/assets/svg/connect_account.svg', revision: '2213c1b1f838dc3162c0a0197500a5dd' },
        { url: '/assets/svg/contractpaper.svg', revision: 'c2d9a88178c1222e6b619d74aa26c525' },
        { url: '/assets/svg/delete.svg', revision: '70870f78e6f7bf9131ede4f316e7de2c' },
        { url: '/assets/svg/etc.svg', revision: 'c62da3f6537439f529921312b5545065' },
        { url: '/assets/svg/expand_down.svg', revision: '1835bde0af742eff7ea6b543557ad17d' },
        { url: '/assets/svg/favorite.svg', revision: 'dbc63d580175b91d83bf7813086e9b97' },
        { url: '/assets/svg/go_back.svg', revision: '2174a5ba48f36c0c715b3f0061c5ca73' },
        { url: '/assets/svg/hearticon.svg', revision: '967bda1b0312372bf9112b6a5e3b0a08' },
        { url: '/assets/svg/home.svg', revision: 'da8c7b5fc4f3f07f86affaca675dc95c' },
        { url: '/assets/svg/lent.svg', revision: 'bf0bd6a1500b1606a8da6468dfb05e51' },
        { url: '/assets/svg/lightstick.svg', revision: '8b84c66fc1b60dcbe9111d9012b65b7c' },
        { url: '/assets/svg/location.svg', revision: '835d8c37e7a37094ad343f6bd04d9aba' },
        { url: '/assets/svg/main_account.svg', revision: '82e5ca4f4b80be066bf100ff0e8462dd' },
        { url: '/assets/svg/message.svg', revision: 'e8ba5f343a2d0b76654943384c1ef5cd' },
        { url: '/assets/svg/modal_close.svg', revision: 'cd4719d08989c5d7603e068d6ad59df5' },
        { url: '/assets/svg/modal_warning.svg', revision: '34655367024bb9d6c9582111b0f10077' },
        { url: '/assets/svg/mypage.svg', revision: '0a0f59bcb38b295bfae9ae339b421be2' },
        { url: '/assets/svg/notification.svg', revision: '41d7a028acb6f149345264488ad9359a' },
        { url: '/assets/svg/notification_with_noti.svg', revision: '5f4dbc0e418e41763934dc5c9f842224' },
        { url: '/assets/svg/openedbox.svg', revision: '68d914a7e9b4c9aa03d13f2d30905a1d' },
        { url: '/assets/svg/password.svg', revision: '8dd05db422bae89190b788199b2afc05' },
        { url: '/assets/svg/place_marker.svg', revision: '69287c338293238993f6ee6d4adbd244' },
        { url: '/assets/svg/post.svg', revision: 'ee90c488e66ceeebd6ac6995f63b17fc' },
        { url: '/assets/svg/question.svg', revision: '0bfdebad5df7a05a3b0d23f103e2ea7b' },
        { url: '/assets/svg/search.svg', revision: '454e9bb3e2f40a45ede464a1d97724c1' },
        { url: '/assets/svg/searchbutton.svg', revision: '2650ce8b2cb462c00d8b28fa176e07f1' },
        { url: '/assets/svg/sendButton.svg', revision: 'c36d42a8cd59bbbfa2568ad6ca235b5b' },
        { url: '/assets/svg/signature_clear.svg', revision: 'e64f0417eeeec41ce303c3564e1ee955' },
        { url: '/assets/svg/smartphone.svg', revision: '019c50ee96f15c94c83bcbf36823fa09' },
        { url: '/assets/svg/telescope.svg', revision: 'ce7a49102d84c9bb560a622aa74d0a28' },
        { url: '/assets/svg/terms_of_use.svg', revision: 'fe9e5317a328104112333b127328e244' },
        { url: '/assets/svg/threedot.svg', revision: '3a5330115e5f5b33bbf67e1ee6a80bfc' },
        { url: '/assets/svg/uploadvideo.svg', revision: '75cc620e4755725c35713aa13dd70661' },
        { url: '/assets/svg/verification.svg', revision: '7b1046949d1e3ec4ab4fcd0d8c19e5a5' },
        { url: '/firebase-messaging-sw.js', revision: 'c5532d88b6ed0695c3c90b6545431d66' },
        { url: '/images/icons/icon-128x128.png', revision: '6cd759f93a5bf21a5168822f93f6378b' },
        { url: '/images/icons/icon-144x144.png', revision: 'd3d6af14c9f0c6b13eb6d2f080610eac' },
        { url: '/images/icons/icon-152x152.png', revision: 'ed7befdfd212f04b124e140571522b32' },
        { url: '/images/icons/icon-192x192.png', revision: 'a6471b4414c9a52bb688edb401b1bb11' },
        { url: '/images/icons/icon-384x384.png', revision: '0277f87afb91a27d83c887553a73f835' },
        { url: '/images/icons/icon-512x512.png', revision: '61aee8ccd7d177701ee47efafc71f3a2' },
        { url: '/images/icons/icon-72x72.png', revision: 'ffb2200497e4eb0bcad8382b7d0b9faf' },
        { url: '/images/icons/icon-96x96.png', revision: '69e875c87f6ed5d7d3d96c759e1365d2' },
        { url: '/manifest.json', revision: 'f2b2601851f1df66f3d539866f48b340' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/tempdata/bong.jpeg', revision: 'ebfa50835948090454bd66a3614f4146' },
        { url: '/tempdata/bong2.jpg', revision: 'c58e5ade5120fd831153aaa334937da4' },
        { url: '/tempdata/bong3.jpg', revision: 'f86e0bdf3e65c5cd03fdb10159e3456c' },
        { url: '/tempdata/bong4.jpg', revision: 'd87ff7f7d5984121fb1c4b51a6155bd5' },
        { url: '/tempdata/bong5.jpg', revision: 'bef1983710400b28642aafa33e035af0' },
        { url: '/tempdata/bong6.jpg', revision: '388efb2d7352e25b043c37fef6d3dc4e' },
        { url: '/tempdata/bong7.jpg', revision: 'c6a9f51d8d6a9e2b4e555acd34b0f59e' },
        { url: '/tempdata/cat.jpg', revision: '1d2d7dd6c2f86e834a615e4e2af087f3' },
        { url: '/tempdata/cat2.jpg', revision: '69eaf17f4998a0feee24f07acffd8283' },
        { url: '/tempdata/cat3.jpg', revision: '33e8a201b3536b9cf3e78a9532e79ae5' },
        { url: '/tempdata/cat4.jpg', revision: '23ea2ff010929c79aff02cac45a234b3' },
        { url: '/tempdata/cat5.jpg', revision: '3e72021309bc11fdef8712a20444f4ed' },
        { url: '/tempdata/cat6.jpg', revision: '2d37c16c90e689b57cef81db9fb13c76' },
        { url: '/tempdata/cat7.jpg', revision: '7b01c4d145b86ed35fee4dc061e7acc3' },
        { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: i }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET',
    );
});
