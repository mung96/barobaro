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
  IMAGES: {
    rules: {
      required: '최소 1장이 사진을 등록해주세요.',
    },
  },
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
  },

  PRODUCT_NAME: {
    defaultValue: '',
    rules: {
      // required: '제품 이름을 입력해주세요.',
    },
  },

  SERIAL_NUMBER: {
    defaultValue: '',
    rules: {
      // required: '일련 번호를 입력해주세요.',
    },
  },

  REPAIR_VENDOR: {
    defaultValue: '',
    rules: {
      // required: '수리업체를 선택해주세요.',
    },
  },

  OVERDUE_CRITERIA: {
    defaultValue: '',
    rules: {
      // required: '무단연체 기준을 입력해주세요.',
    },
  },

  OVERDUE_FEE: {
    defaultValue: '',
    rules: {
      // required: '무단연체시 가격을 입력해주세요.',
    },
  },

  THEFT_CRITERIA: {
    defaultValue: '',
    rules: {
      // required: '도난 취급 기준을 입력해주세요.',
    },
  },

  REFUND_DEADLINE: {
    defaultValue: '',
    rules: {
      // required: '청구 비용 일수를 입려갷주세요.',
    },
  },
};
