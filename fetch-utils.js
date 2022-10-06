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

export async function createPost(post) {
    return await client.from('reddit_clone').insert(post).single();
}

export async function getPosts(name) {
    let query = client.from('reddit_clone').select('*').limit(100);

    if (name) {
        query = query.ilike('name', `%${name}%`);
    }

    return await query;
}

// Will need to add comment table info later!
export async function getPost(id) {
    return await client
        .from('reddit_clone')
        .select('*, comments(*)')
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
}

export async function createComment(comment) {
    return client.from('comments').insert(comment).single();
}

//Storage Function

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });

    if (response.error) {
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    return url;
}
