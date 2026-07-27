import os
import sys
import json
import logging
from dotenv import load_dotenv
from supabase import create_client, Client

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

load_dotenv()

DEFAULT_SUPABASE_URL = "https://xidizxbsrwrkbgokxdnu.supabase.co"
DEFAULT_SUPABASE_KEY = "sb_publishable_6KPjtxyVAcRWrXR3CA8fvg_1JIpQMjI"
INPUT_FILE = "weekly_citizen_articles.json"

def get_supabase_client() -> Client:
    supabase_url = os.environ.get("SUPABASE_URL", DEFAULT_SUPABASE_URL)
    supabase_key = os.environ.get("SUPABASE_KEY", DEFAULT_SUPABASE_KEY)
    return create_client(supabase_url, supabase_key)

def upload_articles():
    if not os.path.exists(INPUT_FILE):
        logger.error(f"Input file '{INPUT_FILE}' not found.")
        return

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        articles = json.load(f)

    logger.info(f"Loaded {len(articles)} articles from {INPUT_FILE}.")
    supabase = get_supabase_client()

    saved_count = 0
    for idx, article in enumerate(articles, start=1):
        title = article.get("title", "No Title")
        link = article.get("link", "")
        summary = article.get("summary", "")
        published = article.get("published", "")
        source = article.get("source", "Weekly Citizen")

        # Basic payload matching standard table schema
        base_payload = {
            "title": f"[{source}] {title}",
            "link": link,
            "summary": summary,
            "published": published
        }

        # Extended payload if table supports extended columns
        extended_payload = {
            **base_payload,
            "content": article.get("content", ""),
            "image_url": article.get("image_url", ""),
            "source": source
        }

        try:
            # Try extended payload first
            try:
                response = supabase.table("articles").upsert(extended_payload, on_conflict="link").execute()
            except Exception as e:
                # Fallback to base schema payload if extended columns do not exist in DB schema
                response = supabase.table("articles").upsert(base_payload, on_conflict="link").execute()
                
            logger.info(f"[{idx}/{len(articles)}] Successfully synced: '{title}'")
            saved_count += 1
        except Exception as err:
            logger.warning(f"[{idx}/{len(articles)}] Upsert warning for '{title}': {err}. Trying direct insert...")
            try:
                try:
                    response = supabase.table("articles").insert(extended_payload).execute()
                except Exception:
                    response = supabase.table("articles").insert(base_payload).execute()
                logger.info(f"[{idx}/{len(articles)}] Successfully inserted: '{title}'")
                saved_count += 1
            except Exception as insert_err:
                logger.error(f"[{idx}/{len(articles)}] Failed to save '{title}': {insert_err}")

    logger.info(f"Supabase Migration Complete: {saved_count}/{len(articles)} articles synchronized.")

if __name__ == "__main__":
    upload_articles()
