import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyWishlist } from "../api/getMyWishlist";
import { postMyWishlist } from "../api/postMyWishlist";
import { deleteMyWishlist } from "../api/deleteMyWishlist";
import { putMyWishlist } from "../api/putMyWishlist";
import { queryClient } from "../queryClient";

export const useWishlist = () => {
  const query = useQuery({
    queryKey: ["my-wishlist"],
    queryFn: getMyWishlist,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["my-wishlist"] });

  const add = useMutation({
    mutationFn: postMyWishlist,
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      putMyWishlist(id, name),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: deleteMyWishlist,
    onSuccess: invalidate,
  });

  return {
    wishlist: query.data ?? [],
    isLoading: query.isLoading,
    add,
    update,
    remove,
  };
};