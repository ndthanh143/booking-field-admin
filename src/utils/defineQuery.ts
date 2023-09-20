type Options = Partial<{
  signal: AbortSignal;
}>;

type QueryFnProps<TQueryKey, TOptions> = {
  queryKey: TQueryKey;
  options?: TOptions;
};

export const defineQuery = <
  TQueryKey,
  TQueryFunc extends (props: QueryFnProps<TQueryKey, TOptions>) => ReturnType<TQueryFunc>,
  TOptions = Options,
>(
  queryKey: TQueryKey,
  queryFn: TQueryFunc,
) => {
  return {
    queryKey,
    queryFn: (options?: TOptions) =>
      queryFn({
        queryKey,
        options,
      }),
  };
};
