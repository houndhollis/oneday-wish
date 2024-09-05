"use server";

import { GetMyPostsResponse } from "components/Profile/ProfilePostSection";
import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function getMyPosts({
  userId,
  author,
  page,
  pageSize,
}: {
  userId: string;
  author: string;
  page: number;
  pageSize: number;
}): Promise<GetMyPostsResponse> {
  const supabase = await createServerSupabaseClient();

  const { data, count, error } = await supabase
    .from("oneday")
    .select("*", { count: "exact" })
    .eq("author", author)
    .range((page - 1) * pageSize, page * pageSize - 1)
    .order("created_at", { ascending: false });

  const hasNextPage = count > page * pageSize;

  if (error) {
    handleError(error);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      hasNextPage: false,
      error,
    };
  }

  const postIds = data.map((post) => post.id);
  const { data: likesData, error: likesError } = await supabase
    .from("likes")
    .select("post_id")
    .eq("user_id", userId)
    .in("post_id", postIds);

  if (likesError) {
    handleError(likesError);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      hasNextPage: false,
      error: likesError,
    };
  }

  const likedPosts = likesData.map((like) => like.post_id);

  const likeData = data.map((post) => ({
    ...post,
    liked_by_user: likedPosts.includes(post.id),
  }));

  return {
    data: likeData,
    page,
    pageSize,
    hasNextPage,
  };
}
