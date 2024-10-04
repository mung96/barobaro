insert into member (member_id, email, nickname, profile_image, address,
                    uuid, name, birth_date, phone_number, fcm_token,
                    provider_type, is_deleted, is_certificated, created_at)
values (123, 'ssafy123@email.com', 'ssafy123', 'image 123', '주소',
        'uuid123', 'ssafy123', '2000-09-27', '01011111111', 'fcm123',
        'GOOGLE', false, true, '2024-09-27'::timestamp),
       (20000, 'ssafy20000@email.com', 'ssafy20000', 'image 20000', '주소',
        'uuid20000', 'ssafy20000', '2000-09-27', '01022222222', 'fcm20000',
        'GOOGLE', false, true, '2024-09-27'::timestamp),
       (20001, 'ssafy20001@email.com', 'ssafy20001', 'image 20001', '주소',
        'uuid20001', 'ssafy20001', '2000-09-27', '01033333333', 'fcm20001',
        'GOOGLE', true, true, '2024-09-27'::timestamp)
;