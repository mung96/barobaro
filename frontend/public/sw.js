if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
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
  self.define = (n, i) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => a(e, c),
      f = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(n.map((e) => f[e] || r(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'afc44aa688b0c87e28178347123dfcd1' },
        { url: '/_next/static/KUOEQLQTDRepwHDBnIJUk/_buildManifest.js', revision: '3e2d62a10f4d6bf0b92e14aecf7836f4' },
        { url: '/_next/static/KUOEQLQTDRepwHDBnIJUk/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
        { url: '/_next/static/chunks/1364.aa522c46badbbeb0.js', revision: 'aa522c46badbbeb0' },
        { url: '/_next/static/chunks/1836-1d71c80e57e1722d.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/2067.1388a22bbe99f61f.js', revision: '1388a22bbe99f61f' },
        { url: '/_next/static/chunks/2078.7950bbf409c5f16b.js', revision: '7950bbf409c5f16b' },
        { url: '/_next/static/chunks/231-7869c796f6f4cae6.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/2878.77151ad9fcf62928.js', revision: '77151ad9fcf62928' },
        { url: '/_next/static/chunks/3027-975389f1e5f5112c.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/3474-eedbca5f29eae562.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/3733.4039c29ceb5400a7.js', revision: '4039c29ceb5400a7' },
        { url: '/_next/static/chunks/4396.ab28b51c7c4ec99a.js', revision: 'ab28b51c7c4ec99a' },
        { url: '/_next/static/chunks/455.b82f43fb37a4e5f0.js', revision: 'b82f43fb37a4e5f0' },
        { url: '/_next/static/chunks/4766.8150139a5b58ba2c.js', revision: '8150139a5b58ba2c' },
        { url: '/_next/static/chunks/4782-be224d7b31ae9c6f.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/4845.86668313167e8e8d.js', revision: '86668313167e8e8d' },
        { url: '/_next/static/chunks/4923-b40fead0aa905046.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/5054.c9914d7754fede16.js', revision: 'c9914d7754fede16' },
        { url: '/_next/static/chunks/5223-71a28db942051994.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/5269.625c671f59e714a1.js', revision: '625c671f59e714a1' },
        { url: '/_next/static/chunks/5375-0ad4b6cb7cc7aec8.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/53c13509-fd1073411ae518fb.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/5e22fd23-b290f77046af9f6a.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/6037.37495161063b47ae.js', revision: '37495161063b47ae' },
        { url: '/_next/static/chunks/6213.3e6a5454adfd21d6.js', revision: '3e6a5454adfd21d6' },
        { url: '/_next/static/chunks/6648-b2a1f4dbf64c0ec6.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/7023-05dbd5a02fa4e940.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/7583-ca38efe8fd5130f2.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/7955-0b79a0df79c5fc8a.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/795d4814-79d11fb8a1d5af90.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/8041-7ac5e96684fd52ab.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/8153-6c0ab704c45a487e.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/8293.621070391f336e74.js', revision: '621070391f336e74' },
        { url: '/_next/static/chunks/8472-6cb4547b56c6e34b.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/8825.55cd78d4d7de38a7.js', revision: '55cd78d4d7de38a7' },
        { url: '/_next/static/chunks/8e1d74a4-6f6a59804bedde31.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/8ed4c79e.ea6dfc30742e4eb7.js', revision: 'ea6dfc30742e4eb7' },
        { url: '/_next/static/chunks/9031.397acc48ec749ac6.js', revision: '397acc48ec749ac6' },
        { url: '/_next/static/chunks/9067.2be53bc3cb17d8d0.js', revision: '2be53bc3cb17d8d0' },
        { url: '/_next/static/chunks/9372.ae8efdf0721768ba.js', revision: 'ae8efdf0721768ba' },
        { url: '/_next/static/chunks/9477.e3ee48b6b7d54073.js', revision: 'e3ee48b6b7d54073' },
        { url: '/_next/static/chunks/9842.393f7bb902b78b5d.js', revision: '393f7bb902b78b5d' },
        { url: '/_next/static/chunks/9c4e2130-d2d03356edcf5b01.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/a747335f.9cf29bd68007f55b.js', revision: '9cf29bd68007f55b' },
        {
          url: '/_next/static/chunks/app/(afterlogin)/alert/page-5d33edb2b5389e11.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/contract/page-7098dde58979f639.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/home/page-b73cd7f2531146ca.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        { url: '/_next/static/chunks/app/(afterlogin)/layout-2294526759ab57b3.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        {
          url: '/_next/static/chunks/app/(afterlogin)/like/page-7c81ee989a56b70e.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/message/chat/%5Bchat_id%5D/page-9f2ab6522633156f.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/message/page-74d3048eac481db7.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/alarm/page-bb07aa5cbe4d0d11.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/current/borrow/page-3fda4f53f7cf0e2a.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/current/lent/page-71dce26b8b950b1b.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/help/question/page-d9cd23c3a846d74a.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/help/terms/page-1aa4610163b121b5.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/layout-804041af682dd1e3.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/page-665ad58633719f4f.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/payment/connect_account/page-1f60dae7d6ecc938.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/payment/main_account/page-6f5f4a2e9a026dfc.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/profile/page-c20765bfda33794f.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/user/password/%5BpasswordChangeStep%5D/page-9a748e1ca136f385.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/mypage/verify/page-5d49db26520634a4.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/portone/page-0cc7fe85117f8cf7.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/%5Bpost_id%5D/page-0f2970d81b8b5cfa.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/edit/page-ef78ed66468e4247.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/layout-138348d19109ef2f.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/page-e411d4395bb6866d.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/regist/layout-54e983afe459c694.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/post/regist/page-2a1acbde34f53baa.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/registration/page-bd4ef46f0c7f0c48.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/search/page-94953e54fb6bd0b0.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(afterlogin)/searchmain/page-56e4b0af10f091ec.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(beforelogin)/exist/page-57a05a888720c21c.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        { url: '/_next/static/chunks/app/(beforelogin)/layout-294cdf9e8ce2da87.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        {
          url: '/_next/static/chunks/app/(beforelogin)/login/page-2083e81f7ea44a14.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        { url: '/_next/static/chunks/app/(beforelogin)/page-c90c55b11bf47888.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        {
          url: '/_next/static/chunks/app/(beforelogin)/signup/info/page-07a4cd4a8eb22ad3.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        {
          url: '/_next/static/chunks/app/(beforelogin)/signup/layout-dfd47442f7dde520.js',
          revision: 'KUOEQLQTDRepwHDBnIJUk',
        },
        { url: '/_next/static/chunks/app/_not-found/page-6e20907e3a5ab337.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/app/layout-a038b4b6a29d7325.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/app/not-found-15a9a390c8c8c734.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/eeac573e-3534956a5554d9c7.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/f7333993-08fa3371a8c232c1.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/fd9d1056-61881a358f53d49b.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/framework-8e0e0f4a6b83a956.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/main-919cebe7726d9580.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/main-app-951443d7de9a9928.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/pages/_app-f870474a17b7f2fd.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js', revision: '79330112775102f91e1010318bae2bd3' },
        { url: '/_next/static/chunks/webpack-ca598cfa0f5db50e.js', revision: 'KUOEQLQTDRepwHDBnIJUk' },
        { url: '/_next/static/css/126acce611cc7b99.css', revision: '126acce611cc7b99' },
        { url: '/_next/static/css/aa4a8cfca33098a1.css', revision: 'aa4a8cfca33098a1' },
        { url: '/_next/static/css/e262d6195f38206e.css', revision: 'e262d6195f38206e' },
        { url: '/_next/static/media/Google.d6f6e19d.png', revision: 'cbd7e0b08fb8bdabf2eaf757aab3b6f0' },
        { url: '/_next/static/media/KB_mark.be50f03a.png', revision: 'b9b9a753a3ddae303d355153f46833ef' },
        { url: '/_next/static/media/Kakao.dfc60f1f.png', revision: 'bc3fe549e4fdcfebb8cb3f3abac19789' },
        { url: '/_next/static/media/Kakao_mark.92d671ab.png', revision: '2eba13333a7a5768d5acb890a8ba6463' },
        { url: '/_next/static/media/Naver.993df08c.png', revision: '012cd4cd0a841d686b403a08852564e7' },
        { url: '/_next/static/media/SSAFY_mark.7e586f65.png', revision: '6fd940e0dea88af55504fad9007bdf0b' },
        { url: '/_next/static/media/Shinhan_mark.b8bf2ecc.png', revision: 'b02f2562433b571f7a8bf4f3cde7cad2' },
        { url: '/_next/static/media/barobaro_logo.8e773b57.png', revision: 'eaf3ad0fed491894f6d7b043e5ef436c' },
        { url: '/_next/static/media/camera_lens.4d2d20cd.png', revision: '7ab5029bc7fb9cb60c989c4efcf518ab' },
        { url: '/_next/static/media/camera_lens_blue.4d5b4546.png', revision: '11f8463dc513307b654c388881844f90' },
        { url: '/_next/static/media/camera_lens_gray.b0bfb018.png', revision: '8cc9812eb334eda413fbcc861c65c557' },
        { url: '/_next/static/media/camera_lens_white.c2b5970d.png', revision: 'eee5377f703ae5fab5688463961650fb' },
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
        { url: '/assets/svg/add_message.svg', revision: 'a7e8525555f93b6f3270dbfc2753bdda' },
        { url: '/assets/svg/alarm.svg', revision: '7a4aabfffd7ed5d1ba4fdcb816a15a69' },
        { url: '/assets/svg/attatchImage.svg', revision: 'aa729b04fd20bad43683e37e51e63a9a' },
        { url: '/assets/svg/borrow.svg', revision: '8039d0d150719606228bff66b30eac1f' },
        { url: '/assets/svg/calendar.svg', revision: '4eb3c63dc8bc61074f61c2eeca33f324' },
        { url: '/assets/svg/camerabody.svg', revision: '540e7de33406324389336234e2e5810b' },
        { url: '/assets/svg/cameralens.svg', revision: 'ed92dadd502afc382b71b6518e3194e9' },
        { url: '/assets/svg/cameralens_white.svg', revision: '0f81d2662e9a2fee5067925dbd613e66' },
        { url: '/assets/svg/carousel_left.svg', revision: 'b9457eca7300938b225e08ec8fb60d24' },
        { url: '/assets/svg/carousel_right.svg', revision: '8ff90a6524e0afe3dc6327b861c0311c' },
        { url: '/assets/svg/checked.svg', revision: 'f2fe8f9785c5901eea5c1ac88d690312' },
        { url: '/assets/svg/circle_plus.svg', revision: '3a2b16fcb36583d1bc2390b6bc06efe1' },
        { url: '/assets/svg/clipboard.svg', revision: 'e0225fe27cd157000e2e74846672c1bf' },
        { url: '/assets/svg/connect_account.svg', revision: 'e77e242513d1f3388f738eed6d3f681f' },
        { url: '/assets/svg/contractpaper.svg', revision: '560d120a258e17faeec7ff4d0a762fed' },
        { url: '/assets/svg/delete.svg', revision: '9dae2cf04578dca0639f9a2cfef6285f' },
        { url: '/assets/svg/download_document.svg', revision: '8095a2bd2adaba7e5861b955f0242203' },
        { url: '/assets/svg/etc.svg', revision: '0b44e8dd32be0f0252783621f89ce575' },
        { url: '/assets/svg/expand_down.svg', revision: '79093429b6b98a69352a2ad4831a7a84' },
        { url: '/assets/svg/favorite.svg', revision: 'a33f440da6297dc316bbe31f455498af' },
        { url: '/assets/svg/go_back.svg', revision: '3c7ad57d5e3b582738c4b42e4625ef19' },
        { url: '/assets/svg/hearticon.svg', revision: '903416e71b2bb3cd145c603527fe8162' },
        { url: '/assets/svg/home.svg', revision: '2b5c1b9f09c119a551281f3d721ca96a' },
        { url: '/assets/svg/lent.svg', revision: '609996acf3841e1feae94aa64f8f17b4' },
        { url: '/assets/svg/lightstick.svg', revision: '640cb00125028555af19bb6cdac8b136' },
        { url: '/assets/svg/location.svg', revision: '7cbd22171f37d29d215dbe80547fc37c' },
        { url: '/assets/svg/main_account.svg', revision: '71f9ed4f2641a0ddec37c105471eae6d' },
        { url: '/assets/svg/message.svg', revision: '46582cbb5fffe834bf16b826cdfa76cb' },
        { url: '/assets/svg/modal_close.svg', revision: 'cd4719d08989c5d7603e068d6ad59df5' },
        { url: '/assets/svg/modal_warning.svg', revision: '0d087b8367be1c3070d936b9663d6fb6' },
        { url: '/assets/svg/mypage.svg', revision: '39acc01248c275497b0e1819168ef1d7' },
        { url: '/assets/svg/notification.svg', revision: '20ff111273980e75f5a678ef651152f7' },
        { url: '/assets/svg/notification_with_noti.svg', revision: '95f9a4292b8f23eba8da4beef29c2f32' },
        { url: '/assets/svg/openedbox.svg', revision: '68d914a7e9b4c9aa03d13f2d30905a1d' },
        { url: '/assets/svg/password.svg', revision: '63eef2835ca49586064d343e963b05bd' },
        { url: '/assets/svg/place_marker.svg', revision: '96506fa67ac3b947c9a831795555407b' },
        { url: '/assets/svg/post.svg', revision: '870f3760bf2979892fce53f1bab6111b' },
        { url: '/assets/svg/question.svg', revision: '0ff1422b28b265ee9fc9e6631fe4b8e2' },
        { url: '/assets/svg/search.svg', revision: 'f351a47889f55b54b6c1dd3fea13877c' },
        { url: '/assets/svg/searchbutton.svg', revision: '1336ec86d1a427eaf596b43f4342729d' },
        { url: '/assets/svg/sendButton.svg', revision: 'd15174a086325e3b85ccf20a12fe52d4' },
        { url: '/assets/svg/signature_clear.svg', revision: 'e64f0417eeeec41ce303c3564e1ee955' },
        { url: '/assets/svg/smartphone.svg', revision: 'ac19f85c1907fba8800432a14b670f2a' },
        { url: '/assets/svg/telescope.svg', revision: '898648ce26e1acf1cebb3dfd4a4b42eb' },
        { url: '/assets/svg/terms_of_use.svg', revision: '6c22b377541612bfddd264eb68beab0a' },
        { url: '/assets/svg/threedot.svg', revision: 'f198b2162a46c8fe25b9ce81478517ba' },
        { url: '/assets/svg/uploadvideo.svg', revision: '75cc620e4755725c35713aa13dd70661' },
        { url: '/assets/svg/verification.svg', revision: '59f4f2fe2c024a27db1b8b7c312b73c9' },
        { url: '/assets/svg/verify_paper.svg', revision: 'ff56dc7718da5922ab86bd4b72687112' },
        { url: '/firebase-messaging-sw.js', revision: 'd19d709b0f6d1175188cc5d151c704fd' },
        { url: '/images/icons/icon-128x128.png', revision: '6cd759f93a5bf21a5168822f93f6378b' },
        { url: '/images/icons/icon-144x144.png', revision: 'd3d6af14c9f0c6b13eb6d2f080610eac' },
        { url: '/images/icons/icon-152x152.png', revision: 'ed7befdfd212f04b124e140571522b32' },
        { url: '/images/icons/icon-192x192.png', revision: 'a6471b4414c9a52bb688edb401b1bb11' },
        { url: '/images/icons/icon-384x384.png', revision: '0277f87afb91a27d83c887553a73f835' },
        { url: '/images/icons/icon-512x512.png', revision: '61aee8ccd7d177701ee47efafc71f3a2' },
        { url: '/images/icons/icon-72x72.png', revision: 'ffb2200497e4eb0bcad8382b7d0b9faf' },
        { url: '/images/icons/icon-96x96.png', revision: '69e875c87f6ed5d7d3d96c759e1365d2' },
        { url: '/manifest.json', revision: '870efa941804034994ea6f4b3f920d55' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: n }) =>
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
