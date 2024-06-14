import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();

      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full gap-3 px-3 mx-auto sm:w-full p-28 ">
        <img src="/image.png" width="full" alt="blog" />
      </div>

      <div className="flex flex-col w-full gap-8 p-3 mx-auto py-7 bg-none ">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-center text-teal-500 hover:underline"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
