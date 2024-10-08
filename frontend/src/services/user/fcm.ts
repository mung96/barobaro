import { patchFcmToken } from '@/apis/memberApi';
import { FCM_VAPID_KEY } from '@/constants/api';
import { initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAXrfPPgJZ0a0Xcbdsv9oamFvFvIzcCJs0",
    authDomain: "barobaro-aa63c.firebaseapp.com",
    projectId: "barobaro-aa63c",
    storageBucket: "barobaro-aa63c.appspot.com",
    messagingSenderId: "435135981874",
    appId: "1:435135981874:web:5e8de150b29eef0bdf4f2b",
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const requestPermissionAndGetToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: FCM_VAPID_KEY,
            });
            console.log('Token', token);
            if (token) { // 토큰 받아온 경우, postFcmToken메소드 호출해서 서버측에서 member fcm token 유지할 수 있게.
                const tokenResult = await patchFcmToken(token);
                console.log('FCM Token Result:', tokenResult);
                return;
            } else {
                alert(
                    "토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요"
                );
            }
        } else if (permission === "denied") {
            alert(
                "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
            );
        }
    } catch (err) {
        console.error('토큰 가져오다 오류발생', err);
        throw err;
    }
};