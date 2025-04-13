## ✅ 프로젝트에서 맡은 역할 위주로 기술되었습니다.

# 바로바로 - 콘서트 제품 대여 플랫폼

<div align="center">

> **개발기간: 2024.08 ~ 2024.10 (7주)**

</div>

# 🛠️ 기술 스택

#### 🖼️ Frontend

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 🤝 Communication

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitLab](https://img.shields.io/badge/GitLab-FCA121?style=for-the-badge&logo=gitlab&logoColor=white)
![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Mattermost](https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white)

# 💪 맡은 역할

## ⭐️ 1. 물품 등록 페이지

<p>
<img width="200px" src="https://i.postimg.cc/TwBj2rLB/Group-8968.png" alt="Group-8968"/>
<img width="200px" src="https://i.postimg.cc/hjXbqCj9/Group-8969.png" alt="Group-8969"/>
<img width="200px" src="https://i.postimg.cc/KYvD0chp/Group-8970.png" alt="Group-8970"/>
<img width="200px" src="https://i.postimg.cc/7LsMdvxH/Group-8971.png" alt="Group-8971"/>
</p>

### 💡 구현 방식

#### ✅ useFunnel 라이브러리를 활용해 Funnel을 구현했습니다. 지역 상태로 입력 값을 관리하면서 브라우저 히스토리와 step을 매핑해주는 기능이 있어 선택했습니다.

#### ✅ 유효성 검사는 React Hook Form 을 활용해 구현했으며, 각 페이지에서 유효성 검사를 통과해야만 버튼이 활성화되어 다음 단계로 진행할 수 있습니다.

#### ✅ 더 나은 사용자 경험을 위해 framer-motion 을 사용하여 페이지 전환 시 애니메이션을 적용했습니다.

➡️ [물품 등록 페이지](https://github.com/mung96/barobaro/blob/develop-fe/frontend/src/components/post/PostFunnel.tsx) 코드 보기

## ⭐️ 2. 회원가입 페이지

<p>
<img width="200px" src="https://i.postimg.cc/0yCCGMFJ/Group-8966.png" alt="Group-8966"/>
<img width="200px" src="https://i.postimg.cc/3rynMw4P/Group-8967.png" alt="Group-8967"/>
<img width="200px" src="https://i.postimg.cc/3xhBDCST/Group-8965.png" alt="Group-8965"/>
<img width="200px"  src="https://i.postimg.cc/fW65MhYk/Group-8964.png" alt="Group-8964"/>
<img width="200px" src="https://i.postimg.cc/vHfhBSvh/Group-8963.png" alt="Group-8963"/>
</p>

### 💡 구현 방식

#### ✅ 카카오 API를 사용해 지역 선택 기능을 구현하고, 재사용성을 위해 useLocationModel 커스텀 훅으로 분리했습니다.

#### ✅ 서비스에서 본인 인증을 위해 사용할 PIN번호를 회원가입 과정 중에 등록하도록 했습니다.

➡️ [회원가입 페이지](https://github.com/mung96/barobaro/blob/develop-fe/frontend/src/components/signup/SignUpFunnel.tsx) 코드 보기  
➡️ [지역 검색 커스텀 훅](https://github.com/mung96/barobaro/blob/develop-fe/frontend/src/hooks/shared/useLocationModel.ts) 코드 보기
