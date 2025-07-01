import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ydghorluedeqhuwnokqn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZ2hvcmx1ZWRlcWh1d25va3FuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDc2MDE5MywiZXhwIjoyMDY2MzM2MTkzfQ.6DBeiy1PyluvWsBdKz8fIyFc-sNVBN7yMsD574EELyw"
);
