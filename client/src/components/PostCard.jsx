import { Link } from "react-router-dom";
import { useState } from "react";

export default function PostCard({ post }) {
  const [following, setFollowing] = useState(false);
  const [followCount, setFollowCount] = useState(post.followCount || 0);

  const handleFollow = async () => {
    try {
      setFollowing(!following);
      setFollowCount(following ? followCount - 1 : followCount + 1);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="group relative w-full  bg-blog hover:border-2 h-[480px]  overflow-hidden rounded-2xl sm:w-[430px] transition-all">
      <div className="flex gap-2 p-3 ">
        <Link to="/dashboard?tab=profile">
          <Avatar rounded />
        </Link>

        <p className="text-lg font-bold text-white line-clamp-2">User</p>
        <Rating>
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star filled={false} />
        </Rating>
        <button
          onClick={handleFollow}
          className="p-3 ml-auto font-bold bg-white rounded-md"
        >
          {following ? "Unfollow" : "Follow"} ({followCount})
        </button>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <div className="flex italic text-acc">
          {post && post.content && (post.content.length / 1000).toFixed(0)} mins
          read
          <div className="inline-flex ml-auto text-white">
            {post && formatTimeAgo(new Date(post.createdAt))}
          </div>
        </div>
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.image}
            alt="post cover"
            className="rounded-lg  h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
          />
        </Link>
        <p className="text-lg font-bold text-white line-clamp-2">
          {post.title}
        </p>
        <span className="flex text-sm italic font-bold text-acc">
          #{post.category}
        </span>

        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-light text-acc hover:bg-light hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}

import PropTypes from "prop-types";
import { Avatar, Rating } from "flowbite-react";

PostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    followCount: PropTypes.number,
  }).isRequired,
};

function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval === 1 ? "" : "s"} ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval === 1 ? "" : "s"} ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval === 1 ? "" : "s"} ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval === 1 ? "" : "s"} ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval === 1 ? "" : "s"} ago`;
  }
  return `${Math.floor(seconds)} second${seconds === 1 ? "" : "s"} ago`;
}
