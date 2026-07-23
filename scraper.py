import os
import sys
import logging
import feedparser
from dotenv import load_dotenv
from supabase import create_client, Client

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

# Load environment variables from .env file if available
load_dotenv()

# Constants / Defaults
DEFAULT_SUPABASE_URL = "https://xidizxbsrwrkbgokxdnu.supabase.co"
DEFAULT_SUPABASE_KEY = "sb_publishable_6KPjtxyVAcRWrXR3CA8fvg_1JIpQMjI"
RSS_FEED_URL = "http://feeds.bbci.co.uk/news/rss.xml"
ARTICLE_LIMIT = 5

def get_supabase_client() -> Client:
    """Initialize and return the official Supabase Python client using env variables or direct fallbacks."""
    supabase_url = os.environ.get("SUPABASE_URL", DEFAULT_SUPABASE_URL)
    supabase_key = os.environ.get("SUPABASE_KEY", DEFAULT_SUPABASE_KEY)
    
    if not supabase_url or not supabase_key:
        raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set.")
        
    logger.info(f"Initializing Supabase client for URL: {supabase_url}")
    return create_client(supabase_url, supabase_key)

def fetch_rss_articles(feed_url: str, limit: int = 5):
    """Fetch and parse RSS feed items using feedparser."""
    logger.info(f"Fetching BBC News RSS feed from: {feed_url}")
    feed = feedparser.parse(feed_url)
    
    if feed.bozo:
        logger.warning(f"Feedparser notice: {feed.get('bozo_exception', 'Malformed feed syntax')}")
        
    entries = feed.entries[:limit]
    logger.info(f"Extracted top {len(entries)} articles from RSS feed.")
    return entries

def process_and_save_articles():
    """Main execution function to extract RSS articles and save to Supabase."""
    try:
        supabase = get_supabase_client()
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {e}")
        return

    try:
        entries = fetch_rss_articles(RSS_FEED_URL, limit=ARTICLE_LIMIT)
    except Exception as e:
        logger.error(f"Network or parsing error while fetching RSS feed: {e}")
        return

    saved_count = 0
    for idx, entry in enumerate(entries, start=1):
        title = getattr(entry, "title", "No Title")
        link = getattr(entry, "link", "")
        summary = getattr(entry, "summary", "")
        published = getattr(entry, "published", "")

        article_data = {
            "title": title,
            "link": link,
            "summary": summary,
            "published": published
        }

        try:
            # Attempt upserting article into 'articles' (or fallback 'Artcles') table
            try:
                response = supabase.table("articles").upsert(article_data, on_conflict="link").execute()
            except Exception as e:
                if "Artcles" in str(e) or "PGRST205" in str(e):
                    response = supabase.table("Artcles").upsert(article_data, on_conflict="link").execute()
                else:
                    raise e
            logger.info(f"[{idx}/{len(entries)}] Successfully saved article: '{title}' ({link})")
            saved_count += 1
        except Exception as db_err:
            logger.warning(f"[{idx}/{len(entries)}] Upsert warning for '{title}': {db_err}. Attempting direct insert...")
            try:
                try:
                    response = supabase.table("articles").insert(article_data).execute()
                except Exception as e:
                    if "Artcles" in str(e) or "PGRST205" in str(e):
                        response = supabase.table("Artcles").insert(article_data).execute()
                    else:
                        raise e
                logger.info(f"[{idx}/{len(entries)}] Successfully inserted article via fallback: '{title}'")
                saved_count += 1
            except Exception as insert_err:
                logger.error(f"[{idx}/{len(entries)}] Failed to save article '{title}': {insert_err}")

    logger.info(f"Scrape completed: {saved_count}/{len(entries)} articles successfully stored in Supabase.")

if __name__ == "__main__":
    process_and_save_articles()
