import sys
from itertools import tee, zip_longest
import pickle
import spacy
from spacy.tokens.doc import Doc
import newspaper
from pymongo import MongoClient

nlp = spacy.load("en")

client = MongoClient()
db = client.article_database

collections = [db.fox_collection, db.cbs_collection, db.msnbc_collection, db.cnn_collection]

"""
TODO: Use pymongo parallel scan to concurrently get article similarities. The Doc.similarity method is currently
the biggest bottleneck in this program, making up over 50% of the program's runtime.
"""


def get_doc(url):
    article = newspaper.Article(url)
    article.download()
    article.parse()
    user_article_text = article.text
    return nlp(user_article_text)


def get_match(collection, doc):
    def get_sim(article):
        try:
            nlp_text = Doc(nlp.vocab).from_bytes(pickle.loads(article["nlp_text"]))
            sim = doc.similarity(nlp_text)
            return sim
        except Exception:
            return 0.0

    article_stream, sim_stream = tee(collection.find())
    combo_stream = zip_longest(article_stream, (get_sim(art) for art in sim_stream))

    return max(combo_stream, key=lambda x: x[1])[0]


def main():
    for c in collections:
        in_doc = get_doc(sys.argv[1])
        match = get_match(c, in_doc)
        print(match["url"])
        print(match["image"])


if __name__ == '__main__':
    main()
