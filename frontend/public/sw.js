if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const r=e=>a(e,t),d={module:{uri:t},exports:n,require:r};s[t]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(c(...e),n)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"56af6b6059e2ebe28f85e5dd95628251"},{url:"/_next/static/chunks/1694-7521f2a734f4bbe4.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/231-5d810987dd4c9b54.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/38a131f1-ee9f4bd12795e162.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/3943-6e17a61f81a26a48.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/452-4d3b0cf857b76044.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/4643-35ec6ee239b057dc.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/53c13509-252551d3b1273197.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/5868-14ece91f867eaf87.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/5e22fd23-34076da8a4cd7f52.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/6300-4f3d5d6914b0aabd.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/6510-3e91225db8c7d9da.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/6648-73ca22166b5d1d85.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/7023-19f87b1897c7872d.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/7583-145bce5e8c7b4030.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/78433572-bfe5af034f00145f.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/795d4814-91235ab355f493f0.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/8e1d74a4-eb6c361f48a520fc.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/90514150-3baa025ef02847fc.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/9c4e2130-fea374b4e59c9a8f.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/a40b642f-aec0b22665845357.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/ae06ae70-244c48cb8bc17122.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/affd4379-959bbb85655e1a86.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/home/page-5e505ded13e872a1.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/like/page-39af0c141a1ceca9.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/message/chat/%5Bchat_id%5D/page-fbb2723419feee57.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/message/page-ab839410d28264e7.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/alarm/page-87b2257f034b4d9e.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/current/borrow/page-db8f8e6c04c39c64.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/current/lent/page-0d51ff8cb3d0ec15.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/help/question/page-cb7fd8c65cfaf720.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/help/terms/page-f515a74a9849d71c.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/layout-e608c9d10d51eddb.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/page-d5b8de1a8f2c69cb.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/payment/connect_account/page-d98d967466b22469.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/payment/main_account/page-737e6cbadd4166ae.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/profile/page-6aaabf69a06ceb8a.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/user/password/page-f9b01b4cbf9382b8.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/user/verification/page-768aed1e2cb3d725.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/post/%5Bpost_id%5D/page-6a0a32ec6fb0ba7f.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/post/edit/page-91acedae495b44cd.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/post/layout-34e036fd2afd874e.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/post/page-c2fce506bfd54d97.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/post/regist/layout-bd8136792488a731.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/post/regist/page-e6be4dca3f418f3f.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/registration/page-db2cdb9d21c3365a.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(afterlogin)/search/page-787629fb964108f9.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(beforelogin)/layout-2a0ae63d2a6f0184.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(beforelogin)/login/page-efe90c16551a294b.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(beforelogin)/page-cc90257c37861744.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(beforelogin)/signup/%5Bprocess%5D/page-dea486c1b2542f1e.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/(beforelogin)/signup/layout-ce7c4a9af4a0decb.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/_not-found/page-ac492d0408983750.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/layout-1ccf73fe5e8d7138.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/app/not-found-001f9d2eb439f78d.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/eeac573e-8a342b8300c7cc6e.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/f7333993-876253c345e1b403.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/fd9d1056-f8c5d1e71c81c54d.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/framework-a63c59c368572696.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/main-app-97c6ca76916c42b2.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/main-c0b2ee9dbb372810.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/pages/_app-00b74eae5e8dab51.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/pages/_error-c72a1f77a3c0be1b.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-4aa74fab5a2a23f0.js",revision:"xd5pQiUvjtKgYjQcT00U1"},{url:"/_next/static/css/126acce611cc7b99.css",revision:"126acce611cc7b99"},{url:"/_next/static/css/c6d24b3bad4a881a.css",revision:"c6d24b3bad4a881a"},{url:"/_next/static/css/e262d6195f38206e.css",revision:"e262d6195f38206e"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/Google.d6f6e19d.png",revision:"cbd7e0b08fb8bdabf2eaf757aab3b6f0"},{url:"/_next/static/media/KB_mark.be50f03a.png",revision:"b9b9a753a3ddae303d355153f46833ef"},{url:"/_next/static/media/Kakao.dfc60f1f.png",revision:"bc3fe549e4fdcfebb8cb3f3abac19789"},{url:"/_next/static/media/Naver.993df08c.png",revision:"012cd4cd0a841d686b403a08852564e7"},{url:"/_next/static/media/Shinhan_mark.b8bf2ecc.png",revision:"b02f2562433b571f7a8bf4f3cde7cad2"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/barobaro_logo.8e773b57.png",revision:"eaf3ad0fed491894f6d7b043e5ef436c"},{url:"/_next/static/media/camera_lens.4d2d20cd.png",revision:"7ab5029bc7fb9cb60c989c4efcf518ab"},{url:"/_next/static/media/camera_lens_blue.4d5b4546.png",revision:"11f8463dc513307b654c388881844f90"},{url:"/_next/static/media/camera_lens_gray.b0bfb018.png",revision:"8cc9812eb334eda413fbcc861c65c557"},{url:"/_next/static/media/camera_lens_white.c2b5970d.png",revision:"eee5377f703ae5fab5688463961650fb"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/xd5pQiUvjtKgYjQcT00U1/_buildManifest.js",revision:"b222cbf4d8e1f47e27a8925222733e53"},{url:"/_next/static/xd5pQiUvjtKgYjQcT00U1/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/assets/png/bank/KB_mark.png",revision:"b9b9a753a3ddae303d355153f46833ef"},{url:"/assets/png/bank/Shinhan_mark.png",revision:"b02f2562433b571f7a8bf4f3cde7cad2"},{url:"/assets/png/barobaro_logo.png",revision:"eaf3ad0fed491894f6d7b043e5ef436c"},{url:"/assets/png/baroping.png",revision:"de86b59c08d039d15de539ada769be98"},{url:"/assets/png/camera_lens.png",revision:"7ab5029bc7fb9cb60c989c4efcf518ab"},{url:"/assets/png/camera_lens_blue.png",revision:"11f8463dc513307b654c388881844f90"},{url:"/assets/png/camera_lens_gray.png",revision:"8cc9812eb334eda413fbcc861c65c557"},{url:"/assets/png/camera_lens_white.png",revision:"eee5377f703ae5fab5688463961650fb"},{url:"/assets/png/login/Google.png",revision:"cbd7e0b08fb8bdabf2eaf757aab3b6f0"},{url:"/assets/png/login/Kakao.png",revision:"bc3fe549e4fdcfebb8cb3f3abac19789"},{url:"/assets/png/login/Naver.png",revision:"012cd4cd0a841d686b403a08852564e7"},{url:"/assets/svg/add_message.svg",revision:"a7e8525555f93b6f3270dbfc2753bdda"},{url:"/assets/svg/alarm.svg",revision:"7a4aabfffd7ed5d1ba4fdcb816a15a69"},{url:"/assets/svg/attatchImage.svg",revision:"aa729b04fd20bad43683e37e51e63a9a"},{url:"/assets/svg/borrow.svg",revision:"8039d0d150719606228bff66b30eac1f"},{url:"/assets/svg/calendar.svg",revision:"4eb3c63dc8bc61074f61c2eeca33f324"},{url:"/assets/svg/camerabody.svg",revision:"540e7de33406324389336234e2e5810b"},{url:"/assets/svg/cameralens.svg",revision:"ed92dadd502afc382b71b6518e3194e9"},{url:"/assets/svg/cameralens_white.svg",revision:"0f81d2662e9a2fee5067925dbd613e66"},{url:"/assets/svg/carousel_left.svg",revision:"b9457eca7300938b225e08ec8fb60d24"},{url:"/assets/svg/carousel_right.svg",revision:"8ff90a6524e0afe3dc6327b861c0311c"},{url:"/assets/svg/checked.svg",revision:"f2fe8f9785c5901eea5c1ac88d690312"},{url:"/assets/svg/clipboard.svg",revision:"e0225fe27cd157000e2e74846672c1bf"},{url:"/assets/svg/connect_account.svg",revision:"e77e242513d1f3388f738eed6d3f681f"},{url:"/assets/svg/contractpaper.svg",revision:"560d120a258e17faeec7ff4d0a762fed"},{url:"/assets/svg/delete.svg",revision:"9dae2cf04578dca0639f9a2cfef6285f"},{url:"/assets/svg/etc.svg",revision:"0b44e8dd32be0f0252783621f89ce575"},{url:"/assets/svg/expand_down.svg",revision:"79093429b6b98a69352a2ad4831a7a84"},{url:"/assets/svg/favorite.svg",revision:"a33f440da6297dc316bbe31f455498af"},{url:"/assets/svg/go_back.svg",revision:"3c7ad57d5e3b582738c4b42e4625ef19"},{url:"/assets/svg/hearticon.svg",revision:"903416e71b2bb3cd145c603527fe8162"},{url:"/assets/svg/home.svg",revision:"2b5c1b9f09c119a551281f3d721ca96a"},{url:"/assets/svg/lent.svg",revision:"609996acf3841e1feae94aa64f8f17b4"},{url:"/assets/svg/lightstick.svg",revision:"640cb00125028555af19bb6cdac8b136"},{url:"/assets/svg/location.svg",revision:"7cbd22171f37d29d215dbe80547fc37c"},{url:"/assets/svg/main_account.svg",revision:"71f9ed4f2641a0ddec37c105471eae6d"},{url:"/assets/svg/message.svg",revision:"46582cbb5fffe834bf16b826cdfa76cb"},{url:"/assets/svg/modal_close.svg",revision:"cd4719d08989c5d7603e068d6ad59df5"},{url:"/assets/svg/modal_warning.svg",revision:"0d087b8367be1c3070d936b9663d6fb6"},{url:"/assets/svg/mypage.svg",revision:"39acc01248c275497b0e1819168ef1d7"},{url:"/assets/svg/notification.svg",revision:"20ff111273980e75f5a678ef651152f7"},{url:"/assets/svg/notification_with_noti.svg",revision:"95f9a4292b8f23eba8da4beef29c2f32"},{url:"/assets/svg/openedbox.svg",revision:"68d914a7e9b4c9aa03d13f2d30905a1d"},{url:"/assets/svg/password.svg",revision:"63eef2835ca49586064d343e963b05bd"},{url:"/assets/svg/place_marker.svg",revision:"96506fa67ac3b947c9a831795555407b"},{url:"/assets/svg/post.svg",revision:"870f3760bf2979892fce53f1bab6111b"},{url:"/assets/svg/question.svg",revision:"0ff1422b28b265ee9fc9e6631fe4b8e2"},{url:"/assets/svg/search.svg",revision:"f351a47889f55b54b6c1dd3fea13877c"},{url:"/assets/svg/searchbutton.svg",revision:"1336ec86d1a427eaf596b43f4342729d"},{url:"/assets/svg/sendButton.svg",revision:"d15174a086325e3b85ccf20a12fe52d4"},{url:"/assets/svg/signature_clear.svg",revision:"e64f0417eeeec41ce303c3564e1ee955"},{url:"/assets/svg/smartphone.svg",revision:"ac19f85c1907fba8800432a14b670f2a"},{url:"/assets/svg/telescope.svg",revision:"898648ce26e1acf1cebb3dfd4a4b42eb"},{url:"/assets/svg/terms_of_use.svg",revision:"6c22b377541612bfddd264eb68beab0a"},{url:"/assets/svg/threedot.svg",revision:"f198b2162a46c8fe25b9ce81478517ba"},{url:"/assets/svg/uploadvideo.svg",revision:"75cc620e4755725c35713aa13dd70661"},{url:"/assets/svg/verification.svg",revision:"59f4f2fe2c024a27db1b8b7c312b73c9"},{url:"/images/icons/icon-128x128.png",revision:"6cd759f93a5bf21a5168822f93f6378b"},{url:"/images/icons/icon-144x144.png",revision:"d3d6af14c9f0c6b13eb6d2f080610eac"},{url:"/images/icons/icon-152x152.png",revision:"ed7befdfd212f04b124e140571522b32"},{url:"/images/icons/icon-192x192.png",revision:"a6471b4414c9a52bb688edb401b1bb11"},{url:"/images/icons/icon-384x384.png",revision:"0277f87afb91a27d83c887553a73f835"},{url:"/images/icons/icon-512x512.png",revision:"61aee8ccd7d177701ee47efafc71f3a2"},{url:"/images/icons/icon-72x72.png",revision:"ffb2200497e4eb0bcad8382b7d0b9faf"},{url:"/images/icons/icon-96x96.png",revision:"69e875c87f6ed5d7d3d96c759e1365d2"},{url:"/manifest.json",revision:"870efa941804034994ea6f4b3f920d55"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/tempdata/bong.jpeg",revision:"ebfa50835948090454bd66a3614f4146"},{url:"/tempdata/bong2.jpg",revision:"c58e5ade5120fd831153aaa334937da4"},{url:"/tempdata/bong3.jpg",revision:"f86e0bdf3e65c5cd03fdb10159e3456c"},{url:"/tempdata/bong4.jpg",revision:"d87ff7f7d5984121fb1c4b51a6155bd5"},{url:"/tempdata/bong5.jpg",revision:"bef1983710400b28642aafa33e035af0"},{url:"/tempdata/bong6.jpg",revision:"388efb2d7352e25b043c37fef6d3dc4e"},{url:"/tempdata/bong7.jpg",revision:"c6a9f51d8d6a9e2b4e555acd34b0f59e"},{url:"/tempdata/cat.jpg",revision:"1d2d7dd6c2f86e834a615e4e2af087f3"},{url:"/tempdata/cat2.jpg",revision:"69eaf17f4998a0feee24f07acffd8283"},{url:"/tempdata/cat3.jpg",revision:"33e8a201b3536b9cf3e78a9532e79ae5"},{url:"/tempdata/cat4.jpg",revision:"23ea2ff010929c79aff02cac45a234b3"},{url:"/tempdata/cat5.jpg",revision:"3e72021309bc11fdef8712a20444f4ed"},{url:"/tempdata/cat6.jpg",revision:"2d37c16c90e689b57cef81db9fb13c76"},{url:"/tempdata/cat7.jpg",revision:"7b01c4d145b86ed35fee4dc061e7acc3"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
