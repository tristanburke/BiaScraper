from itertools import tee, izip
import cPickle as pickle
import spacy
from bson.binary import Binary
from pymongo import MongoClient

nlp = spacy.load("en")


def get_sim_stream(collection):
    static_stream, dynamic_stream = tee(collection.find())

    similarity_stream = izip(static_stream,
                             (nlp.pipe((article["text"] for article in dynamic_stream),
                                       batch_size=50, n_threads=4)))
    return similarity_stream


def main():
    client = MongoClient()
    db = client.article_database

    collections = [db.fox_collection, db.cbs_collection, db.msnbc_collection, db.cnn_collection]

    for c in collections:
        for entry, processed_text in get_sim_stream(c):
            c.update_one({"_id": entry["_id"]},
                         {"$set": {"nlp_text": Binary(pickle.dumps(processed_text.to_bytes()))}}, upsert=False)


if __name__ == '__main__':
    main()
