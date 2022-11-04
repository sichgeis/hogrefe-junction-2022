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

fetch("http://localhost:3000/dairy/entry", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

#### cURL
```bash
curl --location --request POST 'http://localhost:3000/dairy/entry' \
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
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
```

Start api locally with:

```commandline
serverless offline
```