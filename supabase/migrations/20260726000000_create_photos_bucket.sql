-- Create the "photos" storage bucket used by PhotoUpload (src/components/photo-upload.tsx)
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

-- No auth is wired up in this app (anon key only), so allow anon read/write to this bucket.
create policy "Public read access for photos"
on storage.objects for select
to public
using (bucket_id = 'photos');

create policy "Public upload access for photos"
on storage.objects for insert
to public
with check (bucket_id = 'photos');
