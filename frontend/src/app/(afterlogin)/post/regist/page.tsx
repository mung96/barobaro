import dynamic from 'next/dynamic';

const PostFunnel = dynamic(() => import('@/components/post/PostFunnel'), {
  ssr: false,
});

function PostRegistPage() {
  return <PostFunnel />;
}

export default PostRegistPage;
