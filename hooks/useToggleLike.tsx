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

      const previousPosts: any = queryClient.getQueryData(["post"]);
      const previousPost = previousPosts?.find((post) => post.id === postId);
      queryClient.setQueryData(["post"], (oldPosts: any) => {
        return oldPosts.map((post: any) =>
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
        queryKey: ["post"],
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });
};
