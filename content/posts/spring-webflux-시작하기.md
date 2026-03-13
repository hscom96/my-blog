---
title: "Spring Webflux 시작하기"
date: "2026-03-03"
description: "Spring Webflux의 기본 개념과 사용법을 정리했습니다."
tags: ["Spring", "Webflux", "Java", "백엔드"]
---

## Spring Webflux란?

Spring Webflux는 Spring 5에서 도입된 **리액티브(Reactive)** 웹 프레임워크입니다. 기존 Spring MVC와 달리 논블로킹(Non-blocking) 방식으로 동작합니다.

## 주요 특징

- **논블로킹 I/O**: 스레드를 점유하지 않아 높은 동시성 처리 가능
- **Reactor 기반**: `Mono`(0~1개)와 `Flux`(0~N개) 타입 사용
- **함수형 엔드포인트**: 기존 어노테이션 방식 외에 함수형 라우팅 지원

## 간단한 예제

```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    public Mono<String> hello() {
        return Mono.just("Hello, Webflux!");
    }
}
```

## 마무리

Spring Webflux는 높은 트래픽을 처리해야 하는 서비스에 적합합니다. 단, 리액티브 프로그래밍에 익숙하지 않다면 학습 곡선이 있으니 참고하세요.
