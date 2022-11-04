# Senetiment Analysis

This folder contains the code to create the serverless functions that do the sentiment analysis.

## Links

* https://docs.aws.amazon.com/comprehend/latest/dg/how-sentiment.html
* https://github.com/cjhutto/vaderSentiment

## Requirements

* Api that takes a dairy entry and response with an aggregate result from comprehend.

## Implementation

* Serveless project that creates a lambda that uses e.g. boto3 library to call aws comprehend service. (https://docs.aws.amazon.com/comprehend/latest/APIReference/welcome.html)
