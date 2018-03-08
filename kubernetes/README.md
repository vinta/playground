# kubedemo

```bash
$ gcloud config set project albedo-157516 && \
  export PROJECT_ID="$(gcloud config get-value project -q)"

$ docker build --rm -t asia.gcr.io/${PROJECT_ID}/kubedemo-api:v1 kubedemo-api/
```
