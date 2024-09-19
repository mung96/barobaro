import dynamic from 'next/dynamic';

const PostFunnel = dynamic(() => import('@/components/post/PostFunnel'), {
  ssr: false,
});

function PostRegistPage() {
  return (
    <main>
      <PostFunnel />
    </main>
  );
}

export default PostRegistPage;
