FROM python:alpine3.19 as development

RUN apk update && apk add --no-cache \
  build-base

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip && \
  pip install -r requirements.txt
