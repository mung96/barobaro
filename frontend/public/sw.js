if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const o=e=>a(e,i),r={module:{uri:i},exports:t,require:o};s[i]=Promise.all(c.map((e=>r[e]||o(e)))).then((e=>(n(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d67db02fb20111d8904edc11284a0a9b"},{url:"/_next/static/9ZoDQ4oun-c-RY5mxcgQE/_buildManifest.js",revision:"b222cbf4d8e1f47e27a8925222733e53"},{url:"/_next/static/9ZoDQ4oun-c-RY5mxcgQE/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/231-5d810987dd4c9b54.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/2311-42597567c7f8a80f.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/26-fa63a9d468692950.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/345-71b4862c19e909e6.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/38a131f1-ee9f4bd12795e162.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/3943-6e17a61f81a26a48.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/452-4d3b0cf857b76044.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/53c13509-252551d3b1273197.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/5e22fd23-34076da8a4cd7f52.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/6103-9a496a79af3714cd.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/6300-4f3d5d6914b0aabd.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/6648-73ca22166b5d1d85.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/7023-19f87b1897c7872d.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/78433572-bfe5af034f00145f.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/795d4814-91235ab355f493f0.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/8124-ea45eb375718f219.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/8e1d74a4-eb6c361f48a520fc.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/90514150-3baa025ef02847fc.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/9277-ac92b22991553abf.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/9c4e2130-fea374b4e59c9a8f.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/a40b642f-aec0b22665845357.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/ae06ae70-244c48cb8bc17122.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/affd4379-959bbb85655e1a86.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/home/page-ebb3962a06470805.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/layout-d4b02d39ba3d62c5.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/like/page-ef945e8592446fd5.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/message/chat/%5Bchat_id%5D/page-24c49befe1b489a5.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/message/page-0b3b904ae5394b1f.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/alarm/page-335ec252164bb55d.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/current/borrow/page-88cb934b03280a14.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/current/lent/page-3cda20e9ae0ce308.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/help/question/page-5603929517922085.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/help/terms/page-80358c0eb7197d6a.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/layout-6ad2cfdbc0a1cf15.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/page-7d77547a24f6dfa9.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/payment/connect_account/page-6a761948bf3bf3cd.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/payment/main_account/page-844e78646bd927c2.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/profile/page-ee39ff1a379f16c7.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/user/password/page-b2b481a804730667.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/mypage/user/verification/page-461de3553d049e4b.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/post/%5Bpost_id%5D/layout-700e20a1917c33ba.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/post/%5Bpost_id%5D/page-465570ef5435e875.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/post/edit/page-85a4fde7b431b58f.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/post/layout-9645fceeaf77bb99.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/post/page-db0760a2da3e25a2.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/post/regist/layout-c64b6123fcca3631.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/post/regist/page-be14a6229aeba9e9.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/registration/page-1ac7b798d3c64eff.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/search/category/%5Bname%5D/page-0593318f8df7a22c.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(afterlogin)/search/category/layout-c585f1a3b6d0fa12.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(beforelogin)/layout-dc3d6b2edac9b695.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(beforelogin)/login/page-0decb58c9006ec1e.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(beforelogin)/page-707bc00f96cb0c0f.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(beforelogin)/signup/%5Bprocess%5D/page-5a0329e8f537a23d.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/(beforelogin)/signup/layout-69a5472c0c369419.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/_not-found/page-1776350a4b45f44b.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/layout-cf1b3c797a6198ec.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/app/not-found-52ddea81a44298fe.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/eeac573e-8a342b8300c7cc6e.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/f7333993-876253c345e1b403.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/fd9d1056-f8c5d1e71c81c54d.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/framework-a63c59c368572696.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/main-app-fb8e0c753b45a74e.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/main-bb8f10c2b79a1156.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/pages/_app-00b74eae5e8dab51.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/pages/_error-c72a1f77a3c0be1b.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-716e7ebbe779d33a.js",revision:"9ZoDQ4oun-c-RY5mxcgQE"},{url:"/_next/static/css/126acce611cc7b99.css",revision:"126acce611cc7b99"},{url:"/_next/static/css/5b22314b53fd764b.css",revision:"5b22314b53fd764b"},{url:"/_next/static/css/e262d6195f38206e.css",revision:"e262d6195f38206e"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/Google.d6f6e19d.png",revision:"cbd7e0b08fb8bdabf2eaf757aab3b6f0"},{url:"/_next/static/media/KB_mark.be50f03a.png",revision:"b9b9a753a3ddae303d355153f46833ef"},{url:"/_next/static/media/Kakao.dfc60f1f.png",revision:"bc3fe549e4fdcfebb8cb3f3abac19789"},{url:"/_next/static/media/Naver.993df08c.png",revision:"012cd4cd0a841d686b403a08852564e7"},{url:"/_next/static/media/Shinhan_mark.b8bf2ecc.png",revision:"b02f2562433b571f7a8bf4f3cde7cad2"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/barobaro_logo.8e773b57.png",revision:"eaf3ad0fed491894f6d7b043e5ef436c"},{url:"/_next/static/media/baroping.b2e2c6f5.png",revision:"de86b59c08d039d15de539ada769be98"},{url:"/_next/static/media/camera_lens.4d2d20cd.png",revision:"7ab5029bc7fb9cb60c989c4efcf518ab"},{url:"/_next/static/media/camera_lens_blue.4d5b4546.png",revision:"11f8463dc513307b654c388881844f90"},{url:"/_next/static/media/camera_lens_gray.b0bfb018.png",revision:"8cc9812eb334eda413fbcc861c65c557"},{url:"/_next/static/media/camera_lens_white.c2b5970d.png",revision:"eee5377f703ae5fab5688463961650fb"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/assets/png/bank/KB_mark.png",revision:"b9b9a753a3ddae303d355153f46833ef"},{url:"/assets/png/bank/Shinhan_mark.png",revision:"b02f2562433b571f7a8bf4f3cde7cad2"},{url:"/assets/png/barobaro_logo.png",revision:"eaf3ad0fed491894f6d7b043e5ef436c"},{url:"/assets/png/baroping.png",revision:"de86b59c08d039d15de539ada769be98"},{url:"/assets/png/camera_lens.png",revision:"7ab5029bc7fb9cb60c989c4efcf518ab"},{url:"/assets/png/camera_lens_blue.png",revision:"11f8463dc513307b654c388881844f90"},{url:"/assets/png/camera_lens_gray.png",revision:"8cc9812eb334eda413fbcc861c65c557"},{url:"/assets/png/camera_lens_white.png",revision:"eee5377f703ae5fab5688463961650fb"},{url:"/assets/png/login/Google.png",revision:"cbd7e0b08fb8bdabf2eaf757aab3b6f0"},{url:"/assets/png/login/Kakao.png",revision:"bc3fe549e4fdcfebb8cb3f3abac19789"},{url:"/assets/png/login/Naver.png",revision:"012cd4cd0a841d686b403a08852564e7"},{url:"/assets/svg/add_message.svg",revision:"a0a24f683a5e65d90c494f5a62cef3df"},{url:"/assets/svg/alarm.svg",revision:"4cba7c91e6842884e29768a5fa0dd224"},{url:"/assets/svg/attatchImage.svg",revision:"a3ab355edb934d529f48b61274957cdd"},{url:"/assets/svg/borrow.svg",revision:"1a2462dd3f2ebcab10d9e2a225156c65"},{url:"/assets/svg/calendar.svg",revision:"dc030ddfc9606aebc171e7f9ea179bf9"},{url:"/assets/svg/camerabody.svg",revision:"27b26a7699fe5bc358cbf2f425e33038"},{url:"/assets/svg/cameralens.svg",revision:"c95c1e88363aa69acb92a570f6d0fb60"},{url:"/assets/svg/cameralens_white.svg",revision:"1b11917b98b66c8e0c8a9c79bee0d207"},{url:"/assets/svg/carousel_left.svg",revision:"b9457eca7300938b225e08ec8fb60d24"},{url:"/assets/svg/carousel_right.svg",revision:"8ff90a6524e0afe3dc6327b861c0311c"},{url:"/assets/svg/checked.svg",revision:"7753cdf8c2e9de2acd01ab0d36b9289a"},{url:"/assets/svg/clipboard.svg",revision:"23ad36856729d140fb1fbe23ba8e9b2b"},{url:"/assets/svg/connect_account.svg",revision:"2213c1b1f838dc3162c0a0197500a5dd"},{url:"/assets/svg/contractpaper.svg",revision:"c2d9a88178c1222e6b619d74aa26c525"},{url:"/assets/svg/delete.svg",revision:"70870f78e6f7bf9131ede4f316e7de2c"},{url:"/assets/svg/etc.svg",revision:"c62da3f6537439f529921312b5545065"},{url:"/assets/svg/expand_down.svg",revision:"1835bde0af742eff7ea6b543557ad17d"},{url:"/assets/svg/favorite.svg",revision:"dbc63d580175b91d83bf7813086e9b97"},{url:"/assets/svg/go_back.svg",revision:"2174a5ba48f36c0c715b3f0061c5ca73"},{url:"/assets/svg/hearticon.svg",revision:"967bda1b0312372bf9112b6a5e3b0a08"},{url:"/assets/svg/home.svg",revision:"da8c7b5fc4f3f07f86affaca675dc95c"},{url:"/assets/svg/lent.svg",revision:"bf0bd6a1500b1606a8da6468dfb05e51"},{url:"/assets/svg/lightstick.svg",revision:"8b84c66fc1b60dcbe9111d9012b65b7c"},{url:"/assets/svg/location.svg",revision:"835d8c37e7a37094ad343f6bd04d9aba"},{url:"/assets/svg/main_account.svg",revision:"82e5ca4f4b80be066bf100ff0e8462dd"},{url:"/assets/svg/message.svg",revision:"e8ba5f343a2d0b76654943384c1ef5cd"},{url:"/assets/svg/modal_warning.svg",revision:"0d087b8367be1c3070d936b9663d6fb6"},{url:"/assets/svg/mypage.svg",revision:"0a0f59bcb38b295bfae9ae339b421be2"},{url:"/assets/svg/notification.svg",revision:"41d7a028acb6f149345264488ad9359a"},{url:"/assets/svg/notification_with_noti.svg",revision:"5f4dbc0e418e41763934dc5c9f842224"},{url:"/assets/svg/openedbox.svg",revision:"68d914a7e9b4c9aa03d13f2d30905a1d"},{url:"/assets/svg/password.svg",revision:"8dd05db422bae89190b788199b2afc05"},{url:"/assets/svg/place_marker.svg",revision:"96506fa67ac3b947c9a831795555407b"},{url:"/assets/svg/post.svg",revision:"ee90c488e66ceeebd6ac6995f63b17fc"},{url:"/assets/svg/question.svg",revision:"0bfdebad5df7a05a3b0d23f103e2ea7b"},{url:"/assets/svg/search.svg",revision:"454e9bb3e2f40a45ede464a1d97724c1"},{url:"/assets/svg/searchbutton.svg",revision:"2650ce8b2cb462c00d8b28fa176e07f1"},{url:"/assets/svg/sendButton.svg",revision:"c36d42a8cd59bbbfa2568ad6ca235b5b"},{url:"/assets/svg/smartphone.svg",revision:"019c50ee96f15c94c83bcbf36823fa09"},{url:"/assets/svg/telescope.svg",revision:"ce7a49102d84c9bb560a622aa74d0a28"},{url:"/assets/svg/terms_of_use.svg",revision:"fe9e5317a328104112333b127328e244"},{url:"/assets/svg/threedot.svg",revision:"3a5330115e5f5b33bbf67e1ee6a80bfc"},{url:"/assets/svg/uploadvideo.svg",revision:"75cc620e4755725c35713aa13dd70661"},{url:"/assets/svg/verification.svg",revision:"7b1046949d1e3ec4ab4fcd0d8c19e5a5"},{url:"/images/icons/icon-128x128.png",revision:"6cd759f93a5bf21a5168822f93f6378b"},{url:"/images/icons/icon-144x144.png",revision:"d3d6af14c9f0c6b13eb6d2f080610eac"},{url:"/images/icons/icon-152x152.png",revision:"ed7befdfd212f04b124e140571522b32"},{url:"/images/icons/icon-192x192.png",revision:"a6471b4414c9a52bb688edb401b1bb11"},{url:"/images/icons/icon-384x384.png",revision:"0277f87afb91a27d83c887553a73f835"},{url:"/images/icons/icon-512x512.png",revision:"61aee8ccd7d177701ee47efafc71f3a2"},{url:"/images/icons/icon-72x72.png",revision:"ffb2200497e4eb0bcad8382b7d0b9faf"},{url:"/images/icons/icon-96x96.png",revision:"69e875c87f6ed5d7d3d96c759e1365d2"},{url:"/manifest.json",revision:"870efa941804034994ea6f4b3f920d55"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/tempdata/bong.jpeg",revision:"ebfa50835948090454bd66a3614f4146"},{url:"/tempdata/bong2.jpg",revision:"c58e5ade5120fd831153aaa334937da4"},{url:"/tempdata/bong3.jpg",revision:"f86e0bdf3e65c5cd03fdb10159e3456c"},{url:"/tempdata/bong4.jpg",revision:"d87ff7f7d5984121fb1c4b51a6155bd5"},{url:"/tempdata/bong5.jpg",revision:"bef1983710400b28642aafa33e035af0"},{url:"/tempdata/bong6.jpg",revision:"388efb2d7352e25b043c37fef6d3dc4e"},{url:"/tempdata/bong7.jpg",revision:"c6a9f51d8d6a9e2b4e555acd34b0f59e"},{url:"/tempdata/cat.jpg",revision:"1d2d7dd6c2f86e834a615e4e2af087f3"},{url:"/tempdata/cat2.jpg",revision:"69eaf17f4998a0feee24f07acffd8283"},{url:"/tempdata/cat3.jpg",revision:"33e8a201b3536b9cf3e78a9532e79ae5"},{url:"/tempdata/cat4.jpg",revision:"23ea2ff010929c79aff02cac45a234b3"},{url:"/tempdata/cat5.jpg",revision:"3e72021309bc11fdef8712a20444f4ed"},{url:"/tempdata/cat6.jpg",revision:"2d37c16c90e689b57cef81db9fb13c76"},{url:"/tempdata/cat7.jpg",revision:"7b01c4d145b86ed35fee4dc061e7acc3"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
