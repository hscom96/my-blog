import { NextRequest, NextResponse } from 'next/server'
import { writePost, slugExists } from '@/lib/posts'
import { WritePostInput } from '@/types'

export async function POST(request: NextRequest) {
  let body: WritePostInput

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '잘못된 요청 형식입니다.' }, { status: 400 })
  }

  if (!body.title?.trim())
    return NextResponse.json({ error: '제목을 입력해주세요.' }, { status: 400 })
  if (!body.slug?.trim())
    return NextResponse.json({ error: '슬러그를 입력해주세요.' }, { status: 400 })
  if (!body.date?.trim())
    return NextResponse.json({ error: '날짜를 입력해주세요.' }, { status: 400 })
  if (!body.content?.trim())
    return NextResponse.json({ error: '본문을 입력해주세요.' }, { status: 400 })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date))
    return NextResponse.json({ error: '날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)' }, { status: 400 })
  if (!/^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ-]+$/.test(body.slug))
    return NextResponse.json({ error: '슬러그에 허용되지 않는 문자가 포함되어 있습니다.' }, { status: 400 })

  if (await slugExists(body.slug))
    return NextResponse.json({ error: '이미 존재하는 슬러그입니다.' }, { status: 409 })

  try {
    await writePost(body)
    return NextResponse.json({ slug: body.slug }, { status: 201 })
  } catch {
    return NextResponse.json({ error: '글 저장 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
