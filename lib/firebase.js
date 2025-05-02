// This file is now a compatibility layer for legacy Firebase code.
// It forwards calls to the Supabase client and provides Firebase-like interfaces.

// For backward compatibility with Firebase auth
const auth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    // This will be immediately replaced by Supabase's auth listener
    return () => {}; // noop unsubscribe
  },
  signInWithEmailAndPassword: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  createUserWithEmailAndPassword: async (email, password) => {
    return await supabase.auth.signUp({ email, password });
  },
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  signInWithPopup: async (provider) => {
    return await supabase.auth.signInWithOAuth({ provider: provider.providerId });
  }
};

// For backward compatibility with Firestore
const firestore = {
  collection: (collectionName) => {
    return {
      doc: (docId) => {
        return {
          get: async () => {
            const { data, error } = await supabase.
            from(collectionName).
            select('*').
            eq('id', docId).
            single();

            if (error && error.code !== 'PGRST116') throw error;

            return {
              exists: !!data,
              id: docId,
              data: () => data || null
            };
          },
          set: async (data) => {
            const { error } = await supabase.
            from(collectionName).
            upsert([{ id: docId, ...data }]);

            if (error) throw error;
            return true;
          },
          update: async (data) => {
            const { error } = await supabase.
            from(collectionName).
            update(data).
            eq('id', docId);

            if (error) throw error;
            return true;
          },
          delete: async () => {
            const { error } = await supabase.
            from(collectionName).
            delete().
            eq('id', docId);

            if (error) throw error;
            return true;
          },
          onSnapshot: (onNext, onError) => {
            // Simulate onSnapshot with polling
            const poll = async () => {
              try {
                const { data, error } = await supabase.
                from(collectionName).
                select('*').
                eq('id', docId).
                single();

                if (error && error.code !== 'PGRST116') {
                  if (onError) onError(error);
                  return;
                }

                if (onNext) {
                  onNext({
                    exists: !!data,
                    id: docId,
                    data: () => data || null
                  });
                }
              } catch (error) {
                if (onError) onError(error);
              }
            };

            // Initial call
            poll();

            // Set up polling
            const interval = setInterval(poll, 5000);

            // Return unsubscribe function
            return () => clearInterval(interval);
          }
        };
      },
      add: async (data) => {
        // Generate a UUID for the new document
        const id = crypto.randomUUID();
        const { error } = await supabase.
        from(collectionName).
        insert([{ id, ...data }]);

        if (error) throw error;

        return { id };
      },
      get: async () => {
        const { data, error } = await supabase.
        from(collectionName).
        select('*');

        if (error) throw error;

        return {
          docs: (data || []).map((doc) => ({
            id: doc.id,
            data: () => doc
          }))
        };
      },
      where: (field, operator, value) => {
        // This is a simplified implementation
        let query = supabase.from(collectionName).select('*');

        // Map Firebase operators to Supabase
        switch (operator) {
          case '==':
            query = query.eq(field, value);
            break;
          case '!=':
            query = query.neq(field, value);
            break;
          case '>':
            query = query.gt(field, value);
            break;
          case '>=':
            query = query.gte(field, value);
            break;
          case '<':
            query = query.lt(field, value);
            break;
          case '<=':
            query = query.lte(field, value);
            break;
          default:
            console.warn(`Operator ${operator} not directly supported in compatibility layer`);
        }

        return {
          get: async () => {
            const { data, error } = await query;

            if (error) throw error;

            return {
              docs: (data || []).map((doc) => ({
                id: doc.id,
                data: () => doc
              }))
            };
          },
          orderBy: (field, direction = 'asc') => {
            query = query.order(field, { ascending: direction === 'asc' });
            return {
              limit: (limit) => {
                query = query.limit(limit);
                return {
                  get: async () => {
                    const { data, error } = await query;

                    if (error) throw error;

                    return {
                      docs: (data || []).map((doc) => ({
                        id: doc.id,
                        data: () => doc
                      }))
                    };
                  }
                };
              },
              get: async () => {
                const { data, error } = await query;

                if (error) throw error;

                return {
                  docs: (data || []).map((doc) => ({
                    id: doc.id,
                    data: () => doc
                  }))
                };
              }
            };
          },
          limit: (limit) => {
            query = query.limit(limit);
            return {
              get: async () => {
                const { data, error } = await query;

                if (error) throw error;

                return {
                  docs: (data || []).map((doc) => ({
                    id: doc.id,
                    data: () => doc
                  }))
                };
              }
            };
          }
        };
      },
      orderBy: (field, direction = 'asc') => {
        return {
          limit: (limit) => {
            return {
              get: async () => {
                const { data, error } = await supabase.
                from(collectionName).
                select('*').
                order(field, { ascending: direction === 'asc' }).
                limit(limit);

                if (error) throw error;

                return {
                  docs: (data || []).map((doc) => ({
                    id: doc.id,
                    data: () => doc
                  }))
                };
              }
            };
          },
          get: async () => {
            const { data, error } = await supabase.
            from(collectionName).
            select('*').
            order(field, { ascending: direction === 'asc' });

            if (error) throw error;

            return {
              docs: (data || []).map((doc) => ({
                id: doc.id,
                data: () => doc
              }))
            };
          }
        };
      },
      limit: (limit) => {
        return {
          get: async () => {
            const { data, error } = await supabase.
            from(collectionName).
            select('*').
            limit(limit);

            if (error) throw error;

            return {
              docs: (data || []).map((doc) => ({
                id: doc.id,
                data: () => doc
              }))
            };
          }
        };
      },
      onSnapshot: (onNext, onError) => {
        // Simulate onSnapshot with polling
        const poll = async () => {
          try {
            const { data, error } = await supabase.
            from(collectionName).
            select('*');

            if (error) {
              if (onError) onError(error);
              return;
            }

            if (onNext) {
              onNext({
                docs: (data || []).map((doc) => ({
                  id: doc.id,
                  data: () => doc
                }))
              });
            }
          } catch (error) {
            if (onError) onError(error);
          }
        };

        // Initial call
        poll();

        // Set up polling
        const interval = setInterval(poll, 5000);

        // Return unsubscribe function
        return () => clearInterval(interval);
      }
    };
  },
  FieldValue: {
    serverTimestamp: () => new Date()
  }
};

// For backward compatibility with Firebase Functions
const functions = {
  httpsCallable: (functionName) => {
    return async (data) => {
      const { data: result, error } = await supabase.functions.invoke(functionName, {
        body: data
      });

      if (error) throw error;

      return { data: result };
    };
  }
};

// Mock Firebase global for backward compatibility
const firebase = {
  auth: () => auth,
  firestore: () => firestore,
  functions: () => functions,
  firestore: {
    FieldValue: {
      serverTimestamp: () => new Date()
    }
  },
  auth: {
    GoogleAuthProvider: class GoogleAuthProvider {
      constructor() {
        this.providerId = 'google';
      }
    }
  }
};

// Collection references for backward compatibility
const usersCollection = firestore.collection('users');
const matchesCollection = firestore.collection('matches');
const challengesCollection = firestore.collection('challenges');

// Test function call (for Firebase Functions demo)
const testFunction = functions.httpsCallable('testFunction');