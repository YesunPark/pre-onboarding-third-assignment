# 프리온보딩 Project

#### 음성 녹음 프로그램

<br/>

# 소개

#### ✅ 프리온보딩 3차 과제

<br />

# 기간

2022/10/10 ~ 13

<br/>

# 배포 링크

https://pre-onboarding-2team-record-program.netlify.app/

<br/>

# 기술 스택

> React

> JavaScript

> Vite

> styled-components

<br/>

# 팀 노션

https://www.notion.so/wecode/2-2-d719d47f9ca94539b2443e385673bcf9

# 프로젝트 설치 및 실행 방법

✅ 설치방법

1. Node.JS를 다운받아 설치해주세요. vite를 사용하였기 때문에 최소 14.18 버전 이상이 요구됩니다. https://nodejs.org/

2. 리포지토리를 클론해주세요.

```
 git clone https://github.com/kkukileon305/pre-onboarding-third-assignment.git
```

3. dependencies를 설치해주세요.

```
npm install
```

✅ 실행방법

1. 다음 명령어를 이용해 Dev server를 실행해주세요.

```
npm run dev
```

2. 브라우저에서 <http://localhost:3000>에 접속해주세요.

<br/>

# 주요기능 및 설명

## ✅ 녹음 페이지

![record1](https://user-images.githubusercontent.com/102274941/195581351-9f6ffae7-9d83-48ed-9f1c-498c018981f4.png)

- 오디오 녹음, 재생 기능 구현
- 오디오 녹음 중일 때, 녹음 중 UI 구현
- 녹음 중에는 녹음이 되고 있는 시간 표시
- 재생 중일 때, 재생된 시간 표시 구현
- 슬라이더로 input값을 받아 최대 녹음 가능 시간을 조절 기능 구현
- 오디오 녹음 완료 후에는 firebase firestorage를 이용하여 음성 파일을 저장 기능 구현
- 오디오 파일을 다운로드 기능 구현

## ✅ 플레이 리스트 페이지

![record2](https://user-images.githubusercontent.com/102274941/195581362-197c6ac5-f76e-45d3-bd23-94da414e9484.png)

- firebase storage에서 저장된 파일들을 불러와 리스트 UI 구현
- 리스트를 선택하여 재생하고 싶은 음원을 재생하는 기능, 재생중인 시간 표시 기능 구현
- 선택한 리스트의 파일 다운로드 기능 구현
- 선택한 리스트의 파일을 storage에서 삭제하는 기능 구현

<br/>

## 담당 기능 및 설명

- 이다익: 여러가지등등

- 박예선:

- 유광현:
