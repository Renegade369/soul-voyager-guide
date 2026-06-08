
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-monthly-journal') THEN
    PERFORM cron.unschedule('send-monthly-journal');
  END IF;
END $$;

SELECT cron.schedule(
  'send-monthly-journal',
  '0 13 1 * *',
  $cron$
  SELECT net.http_post(
    url := 'https://project--6b1d5b22-48bd-4874-861e-25c7727c1da0.lovable.app/api/public/hooks/send-monthly-journal',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $cron$
);
