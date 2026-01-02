# Rufyio Connect

Rufyio Connect - Patreon integration project.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set Patreon environment variables:
   - `PATREON_ACCESS_TOKEN`: Your Patreon access token.
4. Run the backfill script: `npm run backfill:patreon`

This will fetch Patreon members and save them to `patreon_members.json`.

## Dependencies

- `patreon`: Official Patreon API client for Node.js. 
