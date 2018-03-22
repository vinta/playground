# simple-project

## minikube

```console
$ minikube start --cpus=4 --memory=8000
$ eval $(minikube docker-env)

$ export PROJECT_ID=simple-project-198818

$ minikube ip
192.168.99.100

$ minikube dashboard
Opening kubernetes dashboard in default browser... http://192.168.99.100:30000/

$ docker build --rm -t asia.gcr.io/${PROJECT_ID}/simple-api:v1 simple-api/

$ kubectl apply -f infrastructure/simple-api/ -R

$ kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP                      21h
simple-api   NodePort    10.104.48.197   <none>        80:30723/TCP,443:32082/TCP   1m

$ minikube service simple-api

$ curl http://192.168.99.100:30723/
You hit "simple-api-778c45c897-fl5sn" at 2018-03-11T11:57:35.319047+00:00

$ kubectl delete -f infrastructure/simple-api/ -R

$ docker build --rm -t asia.gcr.io/${PROJECT_ID}/simple-frontend:v1 simple-frontend/
```

## minikube with skaffold

```console
$ cd simple-api

```

## Google Kubernetes Engine

```console
$ gcloud config set compute/region asia-east1
$ gcloud config set compute/zone asia-east1-a
$ gcloud container clusters create albedo \
--cluster-version=1.9.2-gke.1 \
--node-version=1.9.2-gke.1 \
--scopes=storage-rw,compute-ro \
--num-nodes=3 \
--machine-type=g1-small

$ gcloud config set project simple-project-198818 && \
  export PROJECT_ID="$(gcloud config get-value project -q)"

$ docker build --rm -t asia.gcr.io/${PROJECT_ID}/simple-api:v1 simple-api/
$ gcloud docker -- push asia.gcr.io/${PROJECT_ID}/simple-api:v1
```
