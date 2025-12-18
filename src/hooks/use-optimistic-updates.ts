import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type UseOptimisticUpdateOptions<TData, TVariables> = {
    mutationFn: (variables: TVariables) => Promise<TData>;
    queryKey: string[];
    updater?: (oldData: TData | undefined, variables: TVariables) => TData;
    successMessage?: string;
    errorMessage?: string;
};

export function useOptimisticUpdate<TData, TVariables>({
    mutationFn,
    queryKey,
    updater,
    successMessage,
    errorMessage = "Operation failed",
}: UseOptimisticUpdateOptions<TData, TVariables>) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn,
        onMutate: async (variables) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey });

            // Snapshot previous value
            const previousData = queryClient.getQueryData<TData>(queryKey);

            // Optimistically update
            if (updater && previousData) {
                queryClient.setQueryData<TData>(
                    queryKey,
                    updater(previousData, variables)
                );
            }

            return { previousData };
        },
        onError: (_error, _variables, context) => {
            // Rollback on error
            if (context?.previousData) {
                queryClient.setQueryData(queryKey, context.previousData);
            }
            toast.error(errorMessage);
        },
        onSuccess: () => {
            if (successMessage) {
                toast.success(successMessage);
            }
        },
        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries({ queryKey });
        },
    });

    return mutation;
}
