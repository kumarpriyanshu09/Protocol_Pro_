import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch, login, logout } from 'store';
import { Button, Card, CardContent, CardHeader, CardTitle, Text } from 'ui';

export const AuthStatus: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login({ email: 'user@example.com', password: 'password123' }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentication Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : user ? (
          <View>
            <Text>Logged in as: {user.email}</Text>
            <Button onPress={handleLogout}>Logout</Button>
          </View>
        ) : (
          <View>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            <Button onPress={handleLogin}>Login</Button>
          </View>
        )}
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: '#ef4444',
    marginTop: 8,
  },
}); 