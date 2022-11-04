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

```bash
curl http://localhost:3000/
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  "message": "Go Serverless v3.0! Your function executed successfully!",
  "input": {
    "some": "thing"
  }
}
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