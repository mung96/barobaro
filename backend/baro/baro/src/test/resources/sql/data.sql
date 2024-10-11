-- Member
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

-- Product
insert into product (product_id, member_id, title, content, start_date,
                     end_date, rental_fee, wish_count, category, product_status,
                     place, latitude, longitude, return_address,
                     created_at, last_modified_at, location_id, dong)
values (20000, 20000, '대여할 사람', '대여하라고', '2024-08-27'::date,
        '2024-09-27'::date, 10000, 1, 'ETC', 'AVAILABLE',
        '우리집', 1.0, 1.0, '우리집',
        '2024-08-27'::timestamp, '2024-08-27'::timestamp, '20000', '20000'),
       (20001, 20001, '대여할 사람', '대여하라고', '2024-08-27'::date,
    '2024-09-27'::date, 10000, 1, 'ETC', 'AVAILABLE',
    '우리집', 1.0, 1.0, '우리집',
    '2024-08-27'::timestamp, '2024-08-27'::timestamp, '20000', '20000'),
       (20002, 123, '대여할 사람', '대여하라고', '2024-08-27'::date,
        '2024-09-27'::date, 10000, 1, 'ETC', 'AVAILABLE',
        '우리집', 1.0, 1.0, '우리집',
        '2024-08-27'::timestamp, '2024-08-27'::timestamp, '20000', '20000'),
       (20003, 20001, '대여할 사람', '대여하라고', '2024-08-27'::date,
        '2024-09-27'::date, 10000, 1, 'ETC', 'IN_PROGRESS',
        '우리집', 1.0, 1.0, '우리집',
        '2024-08-27'::timestamp, '2024-08-27'::timestamp, '20000', '20000')
;

-- Product return types
insert into product_return_types (product_id, return_type)
values (20000, 0)
;

-- ChatRoom
insert into chat_room (chat_room_id, product_id, owner_id, rental_id, rental_status, last_chat, last_chat_time, is_deleted)
values (1, 20000, 20000, 123, 'AVAILABLE', '춤출테니까 빌려줘', CAST('2023-09-30 12:00:00' AS TIMESTAMP),false)
;
