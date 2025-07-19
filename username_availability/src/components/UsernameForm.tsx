'use client';

import { useState, useEffect } from 'react';

interface CheckResult {
  available: boolean;
  error?: string;
}

export default function UsernameForm() {
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);

  useEffect(() => {
    const checkUsername = async () => {
      if (!username || username.length < 3) {
        setCheckResult(null);
        return;
      }

      setIsChecking(true);
      try {
        const response = await fetch(`/api/username?username=${encodeURIComponent(username)}`);
        const data = await response.json();
        
        if (response.ok) {
          setCheckResult({ available: data.available });
        } else {
          setCheckResult({ available: false, error: data.error });
        }
      } catch (error) {
        setCheckResult({ available: false, error: 'Failed to check username' });
      } finally {
        setIsChecking(false);
      }
    };

    const timeoutId = setTimeout(checkUsername, 500); // 500ms debounce
    return () => clearTimeout(timeoutId);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !checkResult?.available) return;

    try {
      const response = await fetch('/api/username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (response.ok) {
        setUsername('');
        setCheckResult(null);
        alert('Username registered successfully!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to register username');
      }
    } catch (error) {
      alert('Failed to register username');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Check Username Availability
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter username"
              minLength={3}
              required
            />
            {isChecking && (
              <div className="absolute right-3 top-2.5">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>

        {checkResult && !isChecking && (
          <div className={`text-sm ${checkResult.available ? 'text-green-600' : 'text-red-600'}`}>
            {checkResult.error || (checkResult.available ? '✓ Username is available!' : '✗ Username is taken')}
          </div>
        )}

        <button
          type="submit"
          disabled={!checkResult?.available || isChecking}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${checkResult?.available && !isChecking
              ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Register Username
        </button>
      </form>
    </div>
  );
} 