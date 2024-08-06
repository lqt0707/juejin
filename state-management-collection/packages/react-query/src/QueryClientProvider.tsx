import { createContext, useContext } from 'react'
import type { QueryClient } from './queryClient'

export const QueryClientClientContext = createContext<QueryClient | undefined>(
  undefined,
)

export const useQueryClient = () => {
  const client = useContext(QueryClientClientContext)
  if (!client) {
    // 这里需要做一个判断，如果拿到的 `client` 为 undefined 就代表没被 `QueryClientProvider` 包裹，需要报错
    throw new Error('未设置 QueryClient，请使用 QueryClientProvider 设置一个')
  }
  return client
}

export type QueryClientProviderProps = {
  children?: React.ReactNode
  client: QueryClient
}

export const QueryClientProvider = ({
  children,
  client,
}: QueryClientProviderProps) => {
  return (
    <QueryClientClientContext.Provider value={client}>
      {children}
    </QueryClientClientContext.Provider>
  )
}
