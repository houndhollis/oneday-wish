"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function getMyPosts(userId, author) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("oneday")
    .select("*")
    .eq("author", author)
    .order("created_at", { ascending: false });

  if (error) {
    handleError(error);
    return [];
  }

  const postIds = data.map((post) => post.id);
  const { data: likesData, error: likesError } = await supabase
    .from("likes")
    .select("post_id")
    .eq("user_id", userId)
    .in("post_id", postIds);

  if (likesError) {
    handleError(likesError);
    return [];
  }

  const likedPosts = likesData.map((like) => like.post_id);

  return data.map((post) => ({
    ...post,
    liked_by_user: likedPosts.includes(post.id),
  }));
}
