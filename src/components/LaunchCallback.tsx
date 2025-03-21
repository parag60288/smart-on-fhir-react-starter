import { useEffect, useState } from 'react';
import { getFhirClient } from '../lib/smart';

const LaunchCallback = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const completeAuth = async () => {
      try {
        const client = await getFhirClient();
        // Store the client or necessary data in your app's state management
        console.log('FHIR client ready:', client);
        // Redirect to your main app component
        window.location.href = '/';
      } catch (err) {
        setError('Failed to complete authentication');
        console.error('Auth completion error:', err);
      }
    };

    completeAuth();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Completing Authentication...</h1>
        <p>Please wait while we finish setting up your session...</p>
      </div>
    </div>
  );
};

export default LaunchCallback; 