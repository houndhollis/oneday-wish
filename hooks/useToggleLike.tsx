import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "actions/postActions";
import { PostProps } from "components/Home/HomeSection/HomeItem";

type useToggleLikeProps = {
  userId: string;
  postId: number;
  currentLikeStatus: boolean;
};

export const useToggleLike = ({
  userId,
  postId,
  currentLikeStatus,
}: useToggleLikeProps) => {
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
    onError: (error, variables, context) => {
      console.error("Error toggling like:", error);
      queryClient.setQueryData(["post", postId], context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
    },
  });
};
