export const IMAGE_MAX_LENGTH = 5;
export const IMAGE_MIN_LENGTH = 1;
export const BODY_MAX_LENGTH = 1000;
export const POST_TITLE_MAX_LENGTH = 20;
export const RENTAL_FEE_PER_DAY_MAX_VALUE = 100_000;
export const RENTAL_FEE_PER_DAY_MIN_VALUE = 100;

export const POST_FIELD_CONFIG = {
  TITLE: {
    defaultValue: '',
    rules: {
      required: '게시글 제목을 입력해주세요.',
      minLength: { value: 2, message: '제목은 2자 이상 입력해주세요' },
      maxLength: { value: POST_TITLE_MAX_LENGTH, message: `제목은 ${POST_TITLE_MAX_LENGTH}자 이하 입력해주세요` },
    },
  },
  CATEGORY: {
    defaultValue: 'TELESCOPE',
    rules: {
      required: '카테고리를 선택해주세요',
    },
  },
  IMAGES: {
    defaultValue: [],
    rules: {
      required: '최소 1장의 사진을 등록해주세요.',
    },
  },
  BODY: {
    defaultValue: '',
    rules: {
      required: '게시글 내용을 입력해주세요.',
      minLength: { value: 1, message: '게시글은 1자 이상 입력해주세요' },
      maxLength: { value: BODY_MAX_LENGTH, message: `게시글은 ${BODY_MAX_LENGTH}자 이하 입력해주세요` },
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
      min: {
        value: RENTAL_FEE_PER_DAY_MIN_VALUE,
        message: `대여 금액은 ${RENTAL_FEE_PER_DAY_MIN_VALUE}원 이상으로 입력해주세요.`,
      },
      max: {
        value: RENTAL_FEE_PER_DAY_MAX_VALUE,
        message: `대여 금액은 ${RENTAL_FEE_PER_DAY_MAX_VALUE}원 이하로 입력해주세요.`,
      },
    },
  },
  RETURN_TYPE_LIST: {
    defaultValue: [],
    rules: {
      required: '반납 방법을 선택해주세요.',
      max: { value: 1, message: '최소 1개의 방법을 골라주세요' },
    },
  },
  RETURN_ADDRESS: {
    defaultValue: '',
  },

  PRODUCT_NAME: {
    defaultValue: '',
    rules: {},
  },

  SERIAL_NUMBER: {
    defaultValue: '',
    rules: {},
  },

  REPAIR_VENDOR: {
    defaultValue: '',
    rules: {},
  },

  OVERDUE_CRITERIA: {
    defaultValue: '',
    rules: {},
  },

  OVERDUE_FEE: {
    defaultValue: '',
    rules: {},
  },

  THEFT_CRITERIA: {
    defaultValue: '',
    rules: {},
  },

  REFUND_DEADLINE: {
    defaultValue: '',
    rules: {},
  },
};
