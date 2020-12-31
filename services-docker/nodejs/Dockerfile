FROM node:latest

RUN mkdir -p /app
WORKDIR /app

ADD ./services-docker/nodejs/start.sh /app/
COPY . /app/

RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
#RUN /app/start.sh
