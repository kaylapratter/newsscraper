import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://xidizxbsrwrkbgokxdnu.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || "sb_publishable_6KPjtxyVAcRWrXR3CA8fvg_1JIpQMjI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Fetch articles with automatic table fallback ('articles' vs 'Artcles')
 */
export async function fetchArticlesFromSupabase() {
  let data = null;
  let error = null;
  let tableName = 'articles';

  // Try 'articles' table first
  const res1 = await supabase
    .from('articles')
    .select('*')
    .order('id', { ascending: false });

  if (!res1.error && res1.data) {
    data = res1.data;
  } else {
    // Fallback to 'Artcles' table
    const res2 = await supabase
      .from('Artcles')
      .select('*')
      .order('id', { ascending: false });

    if (!res2.error && res2.data) {
      data = res2.data;
      tableName = 'Artcles';
    } else {
      error = res1.error || res2.error;
    }
  }

  if (error) {
    console.warn("Supabase fetch error:", error);
    return { data: [], error, tableName };
  }

  // Format and enrich articles
  const enriched = (data || []).map(article => ({
    ...article,
    category: deriveCategory(article.title, article.summary),
    formattedDate: formatPublishedDate(article.published || article.created_at)
  }));

  return { data: enriched, error: null, tableName };
}

/**
 * Helper to derive intuitive category tags from news content
 */
export function deriveCategory(title = "", summary = "") {
  const text = `${title} ${summary}`.toLowerCase();
  
  if (text.includes("tech") || text.includes("ai") || text.includes("digital") || text.includes("cyber") || text.includes("apple") || text.includes("google") || text.includes("phone")) {
    return "Technology";
  }
  if (text.includes("uk") || text.includes("nhs") || text.includes("britain") || text.includes("london") || text.includes("england") || text.includes("scotland") || text.includes("wales")) {
    return "UK News";
  }
  if (text.includes("dollar") || text.includes("bank") || text.includes("trade") || text.includes("stock") || text.includes("economy") || text.includes("oil") || text.includes("deal")) {
    return "Business";
  }
  if (text.includes("drug") || text.includes("ms") || text.includes("health") || text.includes("patient") || text.includes("medical") || text.includes("hospital") || text.includes("virus")) {
    return "Health";
  }
  if (text.includes("us") || text.includes("saudi") || text.includes("iran") || text.includes("houthis") || text.includes("strike") || text.includes("war") || text.includes("nuclear")) {
    return "World & Politics";
  }
  return "World";
}

/**
 * Format RSS published dates into human friendly string
 */
export function formatPublishedDate(dateString) {
  if (!dateString) return "Recently published";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    
    // Relative time calculations
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMins = Math.max(1, Math.floor(diffMs / (1000 * 60)));
      return `${diffMins} mins ago`;
    }
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    }
    
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (e) {
    return dateString;
  }
}
