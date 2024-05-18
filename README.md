# 북런 booklearn

<img width="900" alt="before1" src="https://github.com/yeongjuyun/booklearn/assets/79828924/4fea4a63-fa17-413d-b74c-b71443f10aa8.png">

<br>
<br>

## 📚 1. 서비스 소개

### 앱 다운로드 링크
- App Store: https://apps.apple.com/kr/app/%EB%B6%81%EB%9F%B0-booklearn/id6484270603
- Google Play: 작년 11월 규정 변경으로 2주간 20명 테스트 진행중

### 1-1. 어떤 서비스인가요?

- 북런은 책을 읽고 인상깊은 구절을 메모하고 에세이를 작성하여 독서 기록을 남길 수 있는 독서 기록 앱입니다.
- 독서 기록을 편리하게 할 수 있는 기능들이 추가적으로 개발될 예정입니다.

### 1-2 누구를 위한 서비스인가요?

- 단순하고 직관적인 독서 기록 어플이 필요하신 분

### 1-3 어떤 기능이 있나요?

```
- 나의 책장
    - 메인
         - 전체 책 목록 조회
    - 상세
         - 기본 기능: 책 상세 정보 조회, 책 삭제
         - 독서 메모: 추가, 수정, 삭제, 정렬
         - 독서 에세이: 추가, 수정, 삭제

- 로그인
    - 로그인, 소셜로그인(google, kakao, apple)
    - 회원가입
    - 비밀번호 초기화

- 설정
    - 계정: 프로필 조회, 닉네임 변경, 비밀번호 변경, 회원 탈퇴
    - 문의하기
    - 로그아웃
```

<br>
<br>

## 2. 기획

### 2-1. 기획의도

- 많은 독서 기록 앱이 시중에 있지만 기능이 다양해지면서 복잡성이 높아져 어플 사용성이 낮아짐
- 타 어플의 단점을 보완하여 "독서 기록"을 핵심으로 하는 서비스를 만들고자 함

### 2-2. 시장조사

- 다양한 독서기록 앱을 써보며 서비스 기획 컨셉 구체화
   - 독서 기록을 기반으로 기록을 공유하는 서비스를 제공하는 앱이 많음 -> 피드, 독서 모임 등
   - 기능이 많은 어플일수록 사용성이 좋지 않고 복잡해서 독서 기록을 위해 태우는 플로우가 많음

### 2-3. 디자인

- Figma를 활용하여 UI 및 디자인 제작

<img width="500" alt="design-figma" src="https://github.com/yeongjuyun/blok/assets/79828924/eb3a93f2-d3f1-441c-a614-965889be295a">

<br>
<br>

- 다크/라이트 테마를 정의하여 시스템 설정 따라 자동으로 설정
 
<img width="200" alt="design-code-theme" src="https://github.com/yeongjuyun/blok/assets/79828924/74b0e49c-8fb3-4540-bba7-f52306831f55">
<img width="400" alt="design" src="https://github.com/yeongjuyun/blok/assets/79828924/f8b98430-6516-4fe7-be84-45917870e6de">


<br>
<br>

## 3. 구현

### 3-1. 테크스택

<img width="500" alt="기술스택" src="https://user-images.githubusercontent.com/32115010/180592777-693bd01c-e531-4e77-899d-20d0d55ac9f3.png">

- 프론트엔드
  - 코어: TypeScript, React Native
  - 상태관리: SWR, Firebase

<br> 
  
- 백엔드 
  - 서버: TypeScript, Nest.js
  - DataBase: MongoDB
  - Infra : aws EC2

<br>

- 이 테크스택을 사용한 이유
  - React Native는 IOS와 Android 플랫폼 모두에서 동작하는 크로스 플랫폼 개발이 가능
  - 대중적인 커뮤니티와 생태계를 가지고 있어 추후 기능 추가에 대비하여 다양한 리소스 및 라이브러리 등을 활용 가능
  - 스프린트 개발 방식을 채택하여 속도감 있는 개발을 진행하기 위해 사용해본 기술 위주로 테크스택을 선택함

<br>
<br>
  
## 4.회고

### 4-1. 2개월 동안 기획부터 앱 런칭까지 완료
- 애자일하게 개발 프로세스가 진행되다보니 추가되는 기능을 빠르게 개발하고 테스트하는 과정을 경험할 수 있었음
- Android, IOS 플랫폼에 따라 지원하는 기능이 다르고 모션과 색상 차이이가 있어서 지속적인 테스트 과정을 거쳐서 개발함


### 4-2. 2차 개발 기능
- 디자인 시스템 구축하여 적용
- OCR 기능 추가
- 독서 기록 공유 기능 추가
- 책장 관리 기능 추가
