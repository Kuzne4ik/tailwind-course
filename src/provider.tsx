import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

// Создаем экземпляр QueryClient - это центральный "мозг" React Query
// QueryClient управляет кэшем запросов, состоянием загрузки, ошибками и т.д.
// Он хранит все данные, полученные с сервера, и обеспечивает их синхронизацию между компонентами
const queryClient = new QueryClient();

/**
 * Provider компонент для React Query
 * 
 * Этот компонент необходим для того, чтобы все дочерние компоненты в приложении
 * могли использовать хуки React Query (useQuery, useMutation и др.)
 * 
 * Как это работает:
 * 1. QueryClientProvider создает контекст, через который передается queryClient
 * 2. Любой компонент внутри этого провайдера может получить доступ к queryClient
 * 3. Через queryClient компоненты могут выполнять запросы к API, кэшировать данные,
 *    отслеживать состояние загрузки/ошибок и автоматически обновлять устаревшие данные
 * 
 * Преимущества использования React Query:
 * - Автоматическое кэширование данных и предотвращение дублирующих запросов
 * - Управление состоянием загрузки и ошибок
 * - Автоматическое обновление устаревших данных (refetching)
 * - Возможность предзагрузки данных и мутаций
 * - Оптимистичные обновления для лучшего UX
 * 
 * Как использовать:
 * Оберните корневой компонент приложения в этот Provider:
 * 
 * ```tsx
 * import React from 'react';
 * import ReactDOM from 'react-dom/client';
 * import App from './App';
 * import { Provider } from './provider';
 * 
 * ReactDOM.createRoot(document.getElementById('root')!).render(
 *   <React.StrictMode>
 *     <Provider>
 *       <App />
 *     </Provider>
 *   </React.StrictMode>
 * );
 * ```
 * 
 * После этого все компоненты внутри App смогут использовать хуки React Query:
 * ```tsx
 * import { useQuery } from '@tanstack/react-query';
 * 
 * function MyComponent() {
 *   const { data, isLoading, error } = useQuery({
 *     queryKey: ['myData'],
 *     queryFn: () => fetch('/api/data').then(res => res.json())
 *   });
 *   
 *   // ... компонент использует данные
 * }
 * ```
 */
export function Provider({children}: PropsWithChildren){
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}