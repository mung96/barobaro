insert into member (member_id, email, nickname, profile_image, address,
                    uuid, name, birth_date, phone_number, fcm_token,
                    provider_type, is_deleted, is_certificated, created_at)
values (123, 'ssafy123@email.com', 'ssafy123', 'image 123', '주소',
        'uuid123', 'ssafy123', '2000-09-27', '01011111111', null,
        'GOOGLE', false, true, '2024-09-27'::timestamp),
       (20000, 'ssafy20000@email.com', 'ssafy20000', 'image 20000', '주소',
        'uuid20000', 'ssafy20000', '2000-09-27', '01022222222', null,
        'GOOGLE', false, true, '2024-09-27'::timestamp),
       (20001, 'ssafy20001@email.com', 'ssafy20001', 'image 20001', '주소',
        'uuid20001', 'ssafy20001', '2000-09-27', '01033333333', null,
        'GOOGLE', true, true, '2024-09-27'::timestamp)
;

insert into account (account_id, member_id, bank, account_number, main)
values(1, 123, '싸피은행', 9992678903441444, true),
      (2, 123, '싸피은행', 9990922075160138, false),
      (3, 123, '싸피은행', 9999078627963564, false),
      (4, 123, '싸피은행', 9996856657136140, false)
;
