import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def hello(event, context):

    analyzer = SentimentIntensityAnalyzer()
    sentence = "The plot was good, but the characters are uncompelling and the dialog is not great."
    vs = analyzer.polarity_scores(sentence)

    body = {
        "sentence": sentence,
        "score": str(vs),
        "event": event,
        "body": json.loads(event["body"])
    }

    response = {"statusCode": 200, "body": json.dumps(body)}

    return response
