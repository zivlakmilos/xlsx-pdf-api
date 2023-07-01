FROM python:3-alpine

RUN apk add build-base
RUN pip3 install aspose-cells flask
WORKDIR  /app
COPY . .

CMD ["python", "server.py"]
