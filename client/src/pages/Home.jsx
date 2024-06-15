import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Typewriter from "typewriter-effect";

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
      <div className="relative flex flex-col items-center justify-center w-full h-[480px]">
        <div className="absolute top-0 left-0 w-full h-[480px] bg-gray-800 opacity-75">
          {" "}
          <img
            src="/image.png"
            alt="blog"
            className="absolute top-0 left-0 object-cover w-full h-full opacity-75"
          />
        </div>
        <div className="z-40 flex items-center justify-center text-5xl font-bold text-center text-black sm:justify-normal dark:text-white">
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: [
                "Welcome To Socialize Blog",
                "Your One Stop Blog App For all Genres.",
                "Music",
                "Politics",
                "Entertaiment",
                "And Many Many More",
                "Socialize is For Everyone.",
              ],
              delay: 75,
              deleteSpeed: 50,
            }}
          />
        </div>
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
              className="text-lg text-center hover:underline"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
