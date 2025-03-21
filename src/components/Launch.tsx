import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initializeFhirClient } from '../lib/smart';

const Launch = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const launch = async () => {
      try {
        const apptoken = searchParams.get('apptoken');
        const launchParam = searchParams.get('launch');
        const iss = searchParams.get('iss');

        if (!apptoken) {
          throw new Error('Error: No apptoken provided. Please include an apptoken in the URL.');
        }

        if (!launchParam) {
          throw new Error('Error: No launch token provided. This app must be launched from an EHR context.');
        }

        if (!iss) {
          throw new Error('Error: No iss parameter provided. The FHIR server URL is required.');
        }

        // Map apptoken to server type
        let server: 'epic' | 'cerner';
        switch (apptoken.toLowerCase()) {
          case 'epic':
          case 'epic-sandbox':
            server = 'epic';
            break;
          case 'cerner':
          case 'cerner-sandbox':
            server = 'cerner';
            break;
          default:
            throw new Error('Error: Invalid apptoken. Please use a valid EHR identifier.');
        }

        await initializeFhirClient(server, launchParam, iss);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to launch SMART app';
        console.error('Failed to launch SMART app:', error);
        setError(errorMessage);
      }
    };
    
    launch();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {error ? (
        <div className="text-center">
          <div className="text-red-600 mb-4 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Launch Error</h1>
            <p>{error}</p>
          </div>
          <div className="mt-4 text-gray-600">
            <p>Expected URL format:</p>
            <code className="block mt-2 p-2 bg-gray-100 rounded">
              /launch?apptoken=[apptoken]&launch=[launch_token]&iss=[fhir_server_url]
              <br />
              /launch?apptoken=[apptoken]&launch=[launch_token]&iss=[fhir_server_url]
            </code>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Launching SMART App...</h1>
          <p>Please wait while we connect to your EHR...</p>
        </div>
      )}
    </div>
  );
};

export default Launch; 