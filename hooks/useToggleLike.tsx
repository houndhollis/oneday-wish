import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "actions/postActions";
import { PostProps } from "components/Home/HomeSection/HomeItem";

export const useToggleLike = (userId, postId, currentLikeStatus) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return toggleLike(userId, postId, currentLikeStatus);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["post", postId],
      });

      const previousPosts: PostProps = queryClient.getQueryData(["post"]);
      queryClient.setQueryData(["post"], (oldPosts: PostProps[]) => {
        return oldPosts.map((post: PostProps) =>
          post.id === postId
            ? {
                ...post,
                likes_count: post.likes_count + (currentLikeStatus ? -1 : 1),
                liked_by_user: !currentLikeStatus,
              }
            : post
        );
      });

      return { previousPosts };
    },
    onError: (err, variables, context) => {
      console.error("Error toggling like:", err);
      queryClient.setQueryData(["post", postId], context.previousPosts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
    },
  });
};
