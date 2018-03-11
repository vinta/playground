# simple-project

```bash
$ cd kubernetes

$ gcloud config set compute/region asia-east1
$ gcloud config set compute/zone asia-east1-a
$ gcloud container clusters create albedo \
--cluster-version=1.9.2-gke.1 \
--node-version=1.9.2-gke.1 \
--scopes=storage-rw,compute-ro \
--num-nodes=3 \
--machine-type=g1-small

$ gcloud config set project albedo-157516 && \
  export PROJECT_ID="$(gcloud config get-value project -q)"

$ docker build --rm -t asia.gcr.io/${PROJECT_ID}/simple-api:v1 simple-api/
$ gcloud docker -- push asia.gcr.io/${PROJECT_ID}/simple-api:v1

$ kubectl apply -f infrastructure/simple-api/*
```
