import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigation';

export type Props = {
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
};
