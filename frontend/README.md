# url
## home
- 첫 화면, 메인 화면
- '/'
  - beforelogin, afterlogin 처리 필요

## category
- 카테고리 검색 (혹은 선택)시 리스트를 보여주는 공간
- '/category + [카테고리 명]'
  - '/category' 뒤에 선택한 category 값
  - 최근 올라온 물품도 활용 가능

## post
- 빌리는 물건 게시물을 확인 할 수 있는 공간
- '/post + [게시글 번호]'
  - 물건 사진, 게시글 제목, 내용, 계약서 내용 확인 버튼 존재

## post edit
- 게시글을 수정하는 공간
  - '/post/edit/ + [게시글 번호]'

## 전자계약서 작성
- 전자계약서 작성 공간
  - '/contract'

## 전자계약서 수정
- 전자계약서 수정 공간
  - '/contract/edit'

## 전자계약서 확인
- 전자계약서 확인
  - '/contract/check + [전자계약서 고유 id]'

## 계약
- 대여하기 위해 계약을 맺는 공간
  - '/contract/try + [계약서 고유 id]'

## chat
- 채팅하는 공간
  - '/message/chat + [채팅방 고유 아이디]'

## 대화 목록
- '/message/list'

## like
- 찜목록
  - '/like'

## mypage
- '/mypage'

# 폴더구조
