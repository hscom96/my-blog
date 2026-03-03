# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 개발 서버 시작 (기본 포트 3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
npm run start    # 프로덕션 서버 시작 (build 후)
```

테스트 프레임워크는 설정되어 있지 않습니다.

## Architecture

Next.js 15 App Router 기반 Markdown 블로그입니다.

### 데이터 흐름

포스트는 파일시스템에서 직접 읽힙니다. DB나 외부 API 없음.

- **포스트 저장소**: `content/posts/*.md` (또는 `.mdx`)
- **포스트 파싱**: `src/lib/posts.ts` — `gray-matter`로 frontmatter 파싱, `getAllPosts` / `getPost` / `writePost` 제공
- **포스트 렌더링**: `src/app/blog/[slug]/page.tsx` — `next-mdx-remote/rsc`의 `MDXRemote`로 MDX 렌더링
- **포스트 작성 API**: `POST /api/posts` → `src/app/api/posts/route.ts` → `writePost()`로 파일 생성

### 주요 경로

| URL | 파일 |
|-----|------|
| `/` | `src/app/page.tsx` |
| `/blog` | `src/app/blog/page.tsx` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/admin/write` | `src/app/admin/write/page.tsx` (글 작성 UI, 인증 없음) |
| `POST /api/posts` | `src/app/api/posts/route.ts` |

### 타입

`src/types/index.ts`에 `Post`, `PostMeta`, `WritePostInput` 인터페이스 정의.

### 슬러그 규칙

슬러그는 영문 소문자, 숫자, 한글, 하이픈만 허용됩니다 (`/^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ-]+$/`). URL 접근 시 `decodeURIComponent`로 디코딩됩니다.

### Frontmatter 형식

```yaml
---
title: "제목"
date: "YYYY-MM-DD"
description: "설명"
tags: ["tag1", "tag2"]
---
```

### 주의사항

- `/admin/write`에는 인증이 없습니다. 프로덕션 배포 시 보호 필요.
- `writePost()`는 개발 서버 런타임에서 파일을 직접 씁니다. 정적 호스팅(Vercel 등)에서는 동작하지 않습니다.
- `generateStaticParams`가 빌드 타임에 슬러그를 수집하므로, 새 포스트는 재빌드 전까지 정적 경로에 포함되지 않습니다.
