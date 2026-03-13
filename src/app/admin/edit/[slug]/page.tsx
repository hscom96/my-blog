import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import EditForm from "./EditForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">글 수정</h1>
      <EditForm post={post} />
    </div>
  );
}
