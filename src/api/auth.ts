import { LoginFormValues } from '@/forms/login-form/LoginForm';
import { User } from '@/types/user';

const testUser: User = {
  id: 1,
  email: 'test@example.com',
  password: "password123",
  role: 'admin',
};

export async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const authToken = generateAuthToken();

  return [200, { authToken, user: testUser }] as const;
}

export async function login(data: LoginFormValues) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (data.email === 'test@example.com' && data.password === 'password123') {
    const authToken = generateAuthToken();
  
  return [200, { authToken, user: testUser }] as const;
  }
  throw new Error('Invalid credentials')

}

function generateAuthToken() {
  return Math.random().toString(36).substring(2);
}