import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def handle(event, context):

    analyzer = SentimentIntensityAnalyzer()
    sentence = "The plot was good, but the characters are uncompelling and the dialog is not great."

    body = json.loads(event["body"])
    text = body["text"]

    score = analyzer.polarity_scores(text)
    compoundScore = score["compound"]

    response = {"statusCode": 200,
                "headers": {
                    'Access-Control-Allow-Origin': '*'
                },
                "body": json.dumps(compoundScore)}

    return response
