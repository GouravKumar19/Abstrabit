-- Create the bookmarks table (Prisma will do this, but RLS needs to be enabled)
-- Actually, let Prisma create the table first. But here are the policies.

-- Enable RLS
alter table bookmarks enable row level security;

-- Policy: Individuals can create bookmarks
create policy "Individuals can create bookmarks."
on bookmarks for insert
with check (auth.uid() = user_id);

-- Policy: Individuals can view their own bookmarks
create policy "Individuals can view their own bookmarks."
on bookmarks for select
using (auth.uid() = user_id);

-- Policy: Individuals can update their own bookmarks
create policy "Individuals can update their own bookmarks."
on bookmarks for update
using (auth.uid() = user_id);

-- Policy: Individuals can delete their own bookmarks
create policy "Individuals can delete their own bookmarks."
on bookmarks for delete
using (auth.uid() = user_id);

-- Enable Realtime for bookmarks table
alter publication supabase_realtime add table bookmarks;
