import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://xidizxbsrwrkbgokxdnu.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || "sb_publishable_6KPjtxyVAcRWrXR3CA8fvg_1JIpQMjI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchArticlesFromSupabase() {
  let data = null;
  let error = null;
  let tableName = 'articles';

  const res1 = await supabase
    .from('articles')
    .select('*')
    .order('id', { ascending: false });

  if (!res1.error && res1.data) {
    data = res1.data;
  } else {
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

  const enriched = (data || []).map(article => {
    let rawTitle = article.title || "Untitled";
    let source = "BBC News";

    if (rawTitle.includes("[Weekly Citizen]") || (article.link && article.link.includes("weeklycitizen"))) {
      source = "Weekly Citizen";
      rawTitle = rawTitle.replace("[Weekly Citizen]", "").strip ? rawTitle.replace("[Weekly Citizen]", "").strip() : rawTitle.replace("[Weekly Citizen]", "").trim();
    } else if (article.source) {
      source = article.source;
    }

    return {
      ...article,
      cleanTitle: rawTitle,
      source: source,
      category: deriveCategory(rawTitle, article.summary),
      formattedDate: formatPublishedDate(article.published || article.created_at)
    };
  });

  return { data: enriched, error: null, tableName };
}

export function deriveCategory(title = "", summary = "") {
  const text = `${title} ${summary}`.toLowerCase();
  
  if (text.includes("kenya") || text.includes("nairobi") || text.includes("africa") || text.includes("rift valley") || text.includes("kisumu")) {
    return "Kenya & East Africa";
  }
  if (text.includes("tech") || text.includes("ai") || text.includes("digital") || text.includes("cyber") || text.includes("hub") || text.includes("phone")) {
    return "Technology";
  }
  if (text.includes("uk") || text.includes("nhs") || text.includes("britain") || text.includes("london") || text.includes("england")) {
    return "UK News";
  }
  if (text.includes("dollar") || text.includes("bank") || text.includes("trade") || text.includes("stock") || text.includes("economy") || text.includes("crop") || text.includes("yield")) {
    return "Business & Economy";
  }
  if (text.includes("drug") || text.includes("ms") || text.includes("health") || text.includes("medical") || text.includes("hospital") || text.includes("energy")) {
    return "Health & Energy";
  }
  return "World & Politics";
}

export function formatPublishedDate(dateString) {
  if (!dateString) return "Recently published";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    
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
      year: "numeric"
    });
  } catch (e) {
    return dateString;
  }
}
