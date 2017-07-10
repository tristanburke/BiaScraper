import newspaper
from newspaper import news_pool, Config
from pymongo import MongoClient

client = MongoClient()

db = client.article_database

cnn_collection = db.cnn_collection
fox_collection = db.fox_collection
msnbc_collection = db.msnbc_collection
cbs_collection = db.cbs_collection

# paper_config = Config()
# paper_config.memoize_articles = False

cnn_paper = newspaper.build("http://www.cnn.com/", memoize_articles=False)
fox_paper = newspaper.build("http://www.foxnews.com/", memoize_articles=False)
msnbc_paper = newspaper.build("http://www.msnbc.com/", memoize_articles=False)
cbs_paper = newspaper.build("http://www.cbsnews.com/", memoize_articles=False)

papers = [cnn_paper, fox_paper, msnbc_paper, cbs_paper]
news_pool.set(papers, threads_per_source=2)
news_pool.join()

print "downloaded articles"

collection_dict = {cnn_paper: cnn_collection, fox_paper: fox_collection, msnbc_paper: msnbc_collection, cbs_paper: cbs_collection}

for paper in papers:
    for article in paper.articles:
        try:
            article.parse()
            art_entry = {"title": article.title, "brand": paper.brand, "url": article.url, "image": article.top_image, "text": article.text}
            collection_dict[paper].insert_one(art_entry)
        except Exception:
            print "ERROR!"

print "added to databases"
