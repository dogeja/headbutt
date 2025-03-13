import { createClient } from "@supabase/supabase-js";

// Supabase 환경 변수
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Supabase 클라이언트 초기화
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
