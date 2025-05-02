# Firebase to Supabase Migration Guide

This project has been migrated from Firebase to Supabase. This document outlines the changes made and any additional steps that may be required.

## Database Structure

Create the following tables in your Supabase project:

### users
- id (UUID, primary key)
- email (varchar)
- display_name (varchar)
- photo_url (varchar)
- created_at (timestamp)
- updated_at (timestamp)
- skill_level (varchar)
- wins (integer)
- losses (integer)
- is_admin (boolean)

### matches
- id (UUID, primary key)
- player1_id (UUID, foreign key to users.id)
- player2_id (UUID, foreign key to users.id)
- winner_id (UUID, foreign key to users.id, nullable)
- score (varchar, nullable)
- location (varchar)
- date (timestamp)
- status (varchar) - 'pending', 'completed', 'cancelled'
- created_at (timestamp)
- updated_at (timestamp)

### challenges
- id (UUID, primary key)
- challenger_id (UUID, foreign key to users.id)
- challenged_id (UUID, foreign key to users.id)
- message (text, nullable)
- status (varchar) - 'pending', 'accepted', 'declined'
- match_id (UUID, foreign key to matches.id, nullable)
- created_at (timestamp)
- updated_at (timestamp)

## Authentication Policies

Set up the following Row Level Security (RLS) policies in Supabase:

### users table
- Allow users to read all user profiles
- Allow users to update only their own profile
- Allow admin users to update any profile

### matches table
- Allow users to read all matches
- Allow users to create matches
- Allow users to update matches they are participating in
- Allow admin users to update any match

### challenges table
- Allow users to read challenges they are involved in
- Allow users to create challenges
- Allow users to update challenges they created
- Allow admin users to update any challenge

## Environment Variables

Update your environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://zpbdpdualydcxotypyep.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Data Migration

To migrate your existing Firebase data to Supabase:

1. Export your Firebase data using the Firebase console
2. Transform the data to match the Supabase schema
3. Import the data into Supabase

Example script for data transformation:
```javascript
// Convert Firebase data to Supabase format
const transformUsers = (firebaseUsers) => {
  return Object.entries(firebaseUsers).map(([id, user]) => ({
    id,
    email: user.email,
    display_name: user.displayName,
    photo_url: user.photoURL,
    created_at: new Date(user.createdAt?._seconds * 1000 || Date.now()),
    skill_level: user.skillLevel || 'beginner',
    wins: user.wins || 0,
    losses: user.losses || 0,
    is_admin: user.isAdmin || false
  }));
};
```

## Additional Changes

1. Replace Firebase authentication with Supabase authentication
2. Replace Firestore queries with Supabase queries
3. Replace Firebase functions with Supabase Edge Functions

## Testing

After migration, test the following functionality:
- User registration and login
- Profile updates
- Player challenges
- Match creation and updates
- Admin dashboard functionality