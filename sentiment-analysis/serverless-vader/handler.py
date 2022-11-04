import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def handle(event, context):

    analyzer = SentimentIntensityAnalyzer()
    sentence = "The plot was good, but the characters are uncompelling and the dialog is not great."

    body = json.loads(event["body"])
    text = body["text"]

    vs = analyzer.polarity_scores(text)

    body = {
        "sentence": sentence,
        "score": str(vs),
        "event": event
    }

    response = {"statusCode": 200, "body": json.dumps(body)}

    return response
