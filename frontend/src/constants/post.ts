export const POST_FIELD_CONFIG = {
  TITLE: {
    defaultValue: '',
    rules: {
      required: '게시글 제목을 입력해주세요.',
      minLength: { value: 2, message: '제목은 2자 이상 입력해주세요' },
      maxLength: { value: 20, message: '제목은 20자 이하 입력해주세요' },
    },
  },
  CATEGORY: {
    defaultValue: 'TELESCOPE',
    rules: {
      required: '카테고리를 선택해주세요',
    },
  },
  IMAGES: {},
  BODY: {
    defaultValue: '',
    rules: {
      required: '게시글 내용을 입력해주세요.',
      minLength: { value: 1, message: '게시글은 1자 이상 입력해주세요' },
      maxLength: { value: 1000, message: '게시글은 1000자 이하 입력해주세요' },
    },
  },

  RENTAL_DURATION: {
    defaultValue: '',
    rules: {
      required: '대여 날짜를 골라주세요.',
    },
  },
  RENTAL_ADDRESS: {
    defaultValue: '',
    rules: {
      required: '대여 장소를 입력해주세요.',
    },
  },
  RENTAL_FEE: {
    defaultValue: '',
    rules: {
      required: '대여 금액을 입력해주세요.',
    },
  },
  RETURN_TYPE_LIST: {
    defaultValue: '',
    rules: {
      required: '반납 방법을 정해주세요.',
    },
  },
  RETURN_ADDRESS: {
    defaultValue: '',
    rules: {
      required: '반납 장소를 입력해주세요.',
    },
  },
};
