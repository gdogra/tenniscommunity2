// Custom hook for Supabase Functions (replacing Firebase Functions)
function useFirebaseFunctions() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Call a Supabase edge function
  const callFunction = async (functionName, data = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Call the Supabase Edge function
      const { data: result, error: functionError } = await supabase.functions.invoke(functionName, {
        body: data
      });

      if (functionError) throw functionError;

      setLoading(false);
      return result;
    } catch (err) {
      console.error(`Error calling function ${functionName}:`, err);

      // Check if this is a "function not found" error
      if (err.message && err.message.includes('not found')) {
        console.warn(`Function ${functionName} not found. Using mock data.`);
        setLoading(false);

        if (functionName === 'testFunction') {
          return { success: true, message: 'This is a mock response since the function is not deployed yet.' };
        }

        return { success: false, message: `Function ${functionName} not available` };
      }

      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Test function (for demo purposes)
  const testFirebaseFunction = async () => {
    try {
      return await callFunction('testFunction', { test: true });
    } catch (err) {
      // Return mock data if function is not deployed
      return { success: true, message: 'This is a mock response since the function is not deployed yet.' };
    }
  };

  return {
    loading,
    error,
    callFunction,
    testFirebaseFunction
  };
}