-include .env
.PHONY: build push deploy check-env
SHELL := bash

GIT_VERSION_HASH := $(shell git rev-parse --short HEAD)
NODE_ENV ?= dev

PROJECT_ID := puc-projects
IMAGE_TAG := treasure-erp-orders:${GIT_VERSION_HASH}
REMOTE_IMAGE_TAG := gcr.io/${PROJECT_ID}/${IMAGE_TAG}

check-env:
	( [ ${NODE_ENV} == "prd" ] || [ ${NODE_ENV} == "stg" ] || [ ${NODE_ENV} == "dev" ] ) || false

build: Dockerfile check-env
	gcloud debug source gen-repo-info-file --output-directory=.
	docker build . -t ${IMAGE_TAG}  --platform linux/amd64
	docker tag ${IMAGE_TAG} ${REMOTE_IMAGE_TAG}

push: build check-env
	docker push ${REMOTE_IMAGE_TAG}

deploy: push check-env
	gcloud beta run deploy treasure-erp-orders \
		--project ${PROJECT_ID} \
		--image ${REMOTE_IMAGE_TAG} \
		--allow-unauthenticated \
		--platform managed \
		--region us-east1 \
		--set-env-vars=NODE_ENV=${NODE_ENV},DB_HOST=${DB_HOST},DB_USERNAME=${DB_USERNAME},DB_PASSWORD=${DB_PASSWORD},DB_DATABASE=${DB_DATABASE} \
		--memory=1Gi
