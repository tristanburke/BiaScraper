import sys
import cPickle as pickle
import spacy
import operator
from spacy.tokens.doc import Doc
from goose import Goose
from pymongo import MongoClient

user_article_url = sys.argv[1]

nlp = spacy.load("en")

g = Goose()
user_article = g.extract(url=user_article_url)
user_article_text = user_article.cleaned_text

in_text = nlp(user_article_text)

client = MongoClient()
db = client.article_database

collections = [db.fox_collection, db.cbs_collection, db.msnbc_collection, db.cnn_collection]


def get_match(collection):
    article_dict = {}
    for article in collection.find():
        try:
            nlp_text = Doc(nlp.vocab).from_bytes(pickle.loads(article["nlp_text"]))
            article_dict[article["_id"]] = in_text.similarity(nlp_text)
        except Exception:
            pass
    return max(article_dict.iteritems(), key=operator.itemgetter(1))[0]


def main():
    for c in collections:
        match_id = get_match(c)
        match = c.find_one({"_id": match_id})
        print match["url"]
        print match["image"]


if __name__ == '__main__':
    main()
