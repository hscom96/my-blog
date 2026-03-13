import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/blog/PostCard";

export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 5);

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-3">안녕하세요!</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          개발, 기술, 일상을 기록하는 블로그입니다.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">최근 글</h2>
          <Link
            href="/blog"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            전체 보기 →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-500">아직 작성된 글이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
