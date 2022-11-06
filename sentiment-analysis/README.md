# Senetiment Analysis

This folder contains the code to create the serverless functions that do the sentiment analysis.

## Links

* https://docs.aws.amazon.com/comprehend/latest/dg/how-sentiment.html
* https://github.com/cjhutto/vaderSentiment

## Requirements

* Api that takes a dairy entry and response with an aggregate result from comprehend.

## Implementation

* Serveless project that creates a lambda that uses e.g. boto3 library to call aws comprehend service. (https://docs.aws.amazon.com/comprehend/latest/APIReference/welcome.html)

# Vader with Serverless Framework Python HTTP API on AWS

## Requirements

Install requires plugin. Run

```
serverless plugin install -n serverless-python-requirements
serverless plugin install -n serverless-offline
```

to install it.

## Usage

### Deployment

```
$ serverless deploy
```

### Invocation

After successful deployment, you can call the created application via HTTP:

#### JavaScript - Fetch
```bash
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "text": "The plot was fucking awesome."
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://y6ma0p9s09.execute-api.eu-central-1.amazonaws.com/dev/dairy/entry", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

#### cURL
```bash
curl --location --request POST 'https://y6ma0p9s09.execute-api.eu-central-1.amazonaws.com/dev/dairy/entry' \
--header 'Content-Type: application/json' \
--data-raw '{
    "text": "The plot was fucking awesome."
}'
```

Which should result in response similar to the following:

```json
0.659
```

### Local Development

Enter the python environment with:

```commandline
source bin/activate
```

Start api locally with:

```commandline
serverless offline
```