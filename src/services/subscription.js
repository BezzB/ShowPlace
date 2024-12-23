// Mock subscription service
export const fetchUserSubscription = async (uid) => {
  // This is a mock implementation. In a real app, this would call your backend
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve({
        status: 'active',
        type: 'premium',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      });
    }, 500);
  });
}; 