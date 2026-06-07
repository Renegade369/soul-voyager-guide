
CREATE POLICY "Users can upload to own folder in transmissions"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'transmissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own files in transmissions"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'transmissions' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'transmissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own files in transmissions"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'transmissions' AND auth.uid()::text = (storage.foldername(name))[1]);
