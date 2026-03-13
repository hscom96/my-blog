---
title: "Tailwind CSS 시작하기"
date: "2026-02-28"
description: "Tailwind CSS의 기본 사용법과 자주 쓰는 클래스를 정리했습니다."
tags: ["Tailwind CSS", "CSS", "프론트엔드"]
---

## Tailwind CSS란?

Tailwind CSS는 **유틸리티 퍼스트(Utility-First)** 방식의 CSS 프레임워크입니다.
미리 정의된 클래스를 HTML에 직접 조합해서 스타일을 만들기 때문에
별도의 CSS 파일 없이도 빠르게 UI를 구성할 수 있습니다.

```html
<!-- 기존 CSS 방식 -->
<div class="card">안녕하세요</div>

<!-- Tailwind 방식 -->
<div class="rounded-lg border p-4 shadow-sm">안녕하세요</div>
```

---

## 자주 쓰는 클래스 정리

### 레이아웃

| 클래스      | 설명                       |
| ----------- | -------------------------- |
| `flex`      | `display: flex`            |
| `grid`      | `display: grid`            |
| `hidden`    | `display: none`            |
| `container` | 반응형 최대 너비           |
| `mx-auto`   | 좌우 마진 자동 (중앙 정렬) |

### 간격 (Spacing)

Tailwind는 `4px` 단위 기반의 스케일을 사용합니다.

```html
<div class="p-4">
  <!-- padding: 16px -->
  <div class="m-2">
    <!-- margin: 8px -->
    <div class="gap-6"><!-- gap: 24px --></div>
  </div>
</div>
```

### 색상

```html
<p class="text-gray-600">회색 텍스트</p>
<div class="bg-blue-500">파란 배경</div>
<div class="border-red-300">빨간 테두리</div>
```

### 반응형 디자인

접두사로 브레이크포인트를 지정합니다.

```html
<div class="text-sm md:text-base lg:text-lg">
  화면 크기에 따라 글자 크기가 달라집니다.
</div>
```

| 접두사 | 기준 너비   |
| ------ | ----------- |
| `sm:`  | 640px 이상  |
| `md:`  | 768px 이상  |
| `lg:`  | 1024px 이상 |
| `xl:`  | 1280px 이상 |

---

## 다크모드 지원

`dark:` 접두사로 다크모드 스타일을 쉽게 추가할 수 있습니다.

```html
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  다크모드를 지원하는 요소
</div>
```

---

## 자주 쓰는 컴포넌트 패턴

### 카드

```html
<div
  class="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
>
  <h3 class="text-lg font-semibold mb-2">카드 제목</h3>
  <p class="text-gray-600 text-sm">카드 내용입니다.</p>
</div>
```

### 버튼

```html
<button
  class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
>
  확인
</button>
```

---

## 마무리

Tailwind CSS는 처음엔 클래스가 많아 낯설 수 있지만,
익숙해지면 CSS를 별도로 작성하지 않아도 빠르게 스타일링할 수 있습니다.
Next.js와 함께 사용하면 특히 강력한 조합이 됩니다.
