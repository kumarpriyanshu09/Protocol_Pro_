import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

/**
 * Custom hook for dispatching actions with the correct TypeScript types
 */
export const useAppDispatch = () => useDispatch<AppDispatch>(); 