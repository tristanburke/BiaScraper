import spacy
from goose import Goose
from pymongo import MongoClient

# user_article_url = "http://www.cnn.com/2017/07/09/politics/trump-russia-meeting-campaign/index.html"
# user_article_url = "http://www.foxnews.com/politics/2017/07/09/congress-returns-to-obamacare-and-other-key-issues-with-fast-approaching-deadlines.html"
user_article_url = "http://www.foxnews.com/politics/2017/07/09/trump-appears-to-back-off-joint-cyber-security-unit-with-russia-after-criticism.html"

nlp = spacy.load("en")

g = Goose()
user_article = g.extract(url=user_article_url)
user_article_text = user_article.cleaned_text
source_text = nlp(user_article_text)


client = MongoClient()
db = client.article_database

match_sim = 0.0
match_article = None
for article in db.cbs_collection.find():
    curr_text = article["text"]
    nlp_text = nlp(curr_text)
    curr_sim = source_text.similarity(nlp_text)
    if curr_sim > match_sim:
        match_sim = curr_sim
        match_article = article

print match_article["url"]
