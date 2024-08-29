"use server";

import { PostProps } from "components/Home/HomeItem";
import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function getPost(post_id): Promise<PostProps> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("oneday")
    .select("*")
    .eq("id", post_id)
    .single();

  if (error) {
    handleError(error);
  }

  return data;
}

export async function getPosts(userId) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("oneday")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    handleError(error);
    return [];
  }

  if (userId) {
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
  } else {
    return data.map((post) => ({
      ...post,
      liked_by_user: false,
    }));
  }
}

export async function createPost(post) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("oneday").insert({
    ...post,
    created_at: new Date().toISOString(),
  });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function toggleLike(userId, postId, currentLikeStatus) {
  const supabase = await createServerSupabaseClient();

  if (userId === null || userId === undefined) {
    throw new Error("User not authenticated");
  }

  if (currentLikeStatus) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", userId)
      .eq("post_id", postId);

    if (error) {
      handleError(error);
      return false;
    }
    // likes 감소 쿼리
    const { data: postData, error: postError } = await supabase
      .from("oneday")
      .select("likes_count")
      .eq("id", postId)
      .single();

    if (postError) {
      handleError(postError);
      return false;
    }

    const currentLikesCount = postData.likes_count;

    const { error: decrementError } = await supabase
      .from("oneday")
      .update({ likes_count: currentLikesCount - 1 })
      .eq("id", postId);

    if (decrementError) {
      handleError(decrementError);
      return false;
    }
  } else {
    const { error } = await supabase
      .from("likes")
      .insert([{ user_id: userId, post_id: postId }]);

    if (error) {
      handleError(error);
      return false;
    }
    // likes_count를 증가시키는 쿼리
    const { data: postData, error: postError } = await supabase
      .from("oneday")
      .select("likes_count")
      .eq("id", postId)
      .single();

    if (postError) {
      handleError(postError);
      return false;
    }

    const currentLikesCount = postData.likes_count;

    const { error: incrementError } = await supabase
      .from("oneday")
      .update({ likes_count: currentLikesCount + 1 })
      .eq("id", postId);

    if (incrementError) {
      handleError(incrementError);
      return false;
    }
  }

  return true;
}

export async function deletePost(postId) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("oneday")
    .delete()
    .eq("id", postId);

  if (error) {
    handleError(error);
  }
  return data;
}
