import newspaper
from pymongo import MongoClient


def main():
    client = MongoClient()

    db = client.article_database

    cnn_collection = db.cnn_collection
    fox_collection = db.fox_collection
    msnbc_collection = db.msnbc_collection
    cbs_collection = db.cbs_collection

    cnn_paper = newspaper.build("http://www.cnn.com/", memoize_articles=False)
    fox_paper = newspaper.build("http://www.foxnews.com/", memoize_articles=False)
    msnbc_paper = newspaper.build("http://www.msnbc.com/", memoize_articles=False)
    cbs_paper = newspaper.build("http://www.cbsnews.com/", memoize_articles=False)

    papers = [cnn_paper, fox_paper, msnbc_paper, cbs_paper]
    newspaper.news_pool.set(papers, threads_per_source=2)
    newspaper.news_pool.join()

    print "DOWNLOADED ARTICLES"

    collection_dict = {cnn_paper: cnn_collection, fox_paper: fox_collection, msnbc_paper: msnbc_collection,
                       cbs_paper: cbs_collection}
    for paper in papers:
        for article in paper.articles:
            try:
                article.parse()

                article_data = {
                    "title": article.title,
                    "brand": paper.brand,
                    "url": article.url,
                    "image": article.top_image,
                    "text": article.text,
                    "nlp_text": None
                }

                collection_dict[paper].insert_one(article_data)
            except Exception:
                print "ERROR!"

    print "UPDATED DATABASES"


if __name__ == '__main__':
    main()
