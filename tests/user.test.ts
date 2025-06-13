import { describe, it, expect } from 'vitest';
import createConvoy from '../src';

describe('User API', () => {
  const convoy = createConvoy({
    baseUrl: process.env.CONVOY_URL || 'http://localhost',
    token: process.env.CONVOY_TOKEN || '',
  });

  let testUserId: number;

  it('should list users', async () => {
    const users = await convoy.users.listUsers({
      page: 1,
      per_page: 10,
      filter: {
        name: 'Test User',
      },
    });
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
  });

  it('should create a new user', async () => {
    const newUser = await convoy.users.createUser({
      root_admin: true,
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123!',
    });
    expect(newUser).toBeDefined();
    expect(newUser.name).toBe('Test User');
    testUserId = newUser.id;
  });

  it('should get user details', async () => {
    const user = await convoy.users.getUser(testUserId);
    expect(user).toBeDefined();
    expect(user.id).toBe(testUserId);
  });

  it('should update user', async () => {
    const updatedUser = await convoy.users.updateUser(testUserId, {
      name: 'Updated Test User',
      email: 'updated@example.com',
      password: null, // Keep existing password
    });
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('Updated Test User');
  });

  it('should delete user', async () => {
    await convoy.users.deleteUser(testUserId);
    // Verify user is deleted by trying to get it (should throw)
    await expect(convoy.users.getUser(testUserId)).rejects.toThrow();
  });
}); 