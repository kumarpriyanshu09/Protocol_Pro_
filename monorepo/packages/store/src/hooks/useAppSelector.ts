import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../store';

/**
 * Custom hook for selecting state with the correct TypeScript types
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 