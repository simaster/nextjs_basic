# Prisma Studio 이슈 정리

- 날짜: 2026-06-17
- 대상: `npx prisma studio`

## 증상

`npx prisma studio` 실행 시 Studio 서버는 뜨지만, 브라우저 자동 실행 단계에서 다음 오류가 발생했다.

```text
[Prisma Studio] Error [ERR_STREAM_UNABLE_TO_PIPE]: Cannot pipe to a closed or destroyed stream
```

## 확인한 내용

- `prisma.config.ts`와 `prisma/prisma.config.ts`가 둘 다 존재했다.
- 실제 Studio 실행 자체는 정상적으로 시작됐다.
- `npx prisma studio --browser none`에서는 오류 없이 실행됐다.
- `BROWSER=none npx prisma studio`도 동일하게 정상 동작했다.

## 원인 판단

문제의 핵심은 데이터베이스 설정이 아니라, Prisma Studio의 브라우저 자동 오픈 경로였다.

이 저장소에서는 자동 브라우저 실행이 현재 환경과 맞지 않아, 내부적으로 열린 브라우저 프로세스의 스트림 파이프 단계에서 예외가 난 것으로 판단했다.

## 처리 내용

- `package.json`에 Studio 전용 스크립트 `studio`를 추가했다.
- 해당 스크립트는 `prisma studio --browser none`으로 실행되도록 했다.
- `README.md`에 `npm run studio` 사용법을 추가했다.

## 검증

다음 명령은 정상적으로 Studio URL을 출력하고 오류 없이 시작됐다.

```bash
npm run studio
```

## 권장 사용법

- 기본 실행: `npm run studio`
- 브라우저를 명시하고 싶을 때: `npx prisma studio --browser chrome`

