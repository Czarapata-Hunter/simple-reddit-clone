const SUPABASE_URL = 'https://mqrgczjtydwiutvkmqzb.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xcmdjemp0eWR3aXV0dmttcXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4MzE5MjUsImV4cCI6MTk4MDQwNzkyNX0.RTgJzRMr4xwGyH5Zwv_OWR5ycHxM0MeERyPJ9FEPgto';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
