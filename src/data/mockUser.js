export const MOCK_USER = {
  id: 'mock123',
  email: 'test@example.com',
  password: 'password123', // In a real app, never store passwords in plain text
  name: 'John Doe',
  premium: true,
  avatar: 'https://via.placeholder.com/150',
  watchlist: [
    { id: 1, title: 'The Shawshank Redemption', lastWatched: '2024-02-20' },
    { id: 2, title: 'The Godfather', lastWatched: '2024-02-18' },
    { id: 3, title: 'The Dark Knight', lastWatched: '2024-02-15' }
  ]
}; 