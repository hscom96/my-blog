import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:opacity-80 transition-opacity"
        >
          My Blog
        </Link>
        <ul className="flex gap-6 text-sm">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              홈
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="hover:text-blue-600 transition-colors"
            >
              블로그
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-blue-600 transition-colors"
            >
              소개
            </Link>
          </li>
          <li>
            <Link
              href="/admin/write"
              className="hover:text-blue-600 transition-colors"
            >
              글쓰기
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
