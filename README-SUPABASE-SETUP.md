# Supabase Authentication Setup

This project uses Supabase for authentication and database functionality. Follow these steps to set up Supabase for your CarbonCorp ESG Platform.

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in your Supabase dashboard

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Database Setup

The application will automatically handle user authentication, but you may want to set up additional tables for ESG data. Here's the basic user metadata structure that will be stored:

### User Metadata Fields
- `full_name`: User's full name
- `company_name`: Company name
- `industry`: Selected industry
- `company_size`: Company size category
- `country`: Primary country of operation
- `role`: User role (admin for first user)

## Authentication Features

The platform includes:
- ✅ Email/Password registration and login
- ✅ Password reset functionality
- ✅ Protected routes (automatic redirect to login)
- ✅ User session management
- ✅ Company and user metadata storage
- 🚧 SSO integration (Google, Microsoft, LinkedIn) - Coming soon

## Security Features

- All routes except `/auth/*` require authentication
- Automatic redirect to login for unauthenticated users
- Session persistence across browser refreshes
- Secure password requirements (8+ chars, uppercase, lowercase, number)

## Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up your `.env.local` file with Supabase credentials

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Navigate to `http://localhost:3000` - you'll be redirected to login if not authenticated

## Testing Authentication

1. Go to `/auth/register` to create a new account
2. Fill in company and user information
3. After successful registration, you'll be redirected to the onboarding flow
4. You can test login/logout functionality

## Next Steps

- Set up additional database tables for ESG data in Supabase
- Configure row-level security (RLS) policies
- Set up real-time subscriptions for collaborative features
- Implement SSO providers if needed 