FROM python:3.10-slim-buster

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

ENV DockerHOME=/usr/src/backend

RUN apt update
RUN apt upgrade -y
RUN apt install -y netcat libpq5

RUN pip install --upgrade pip

RUN mkdir -p $DockerHOME

WORKDIR $DockerHOME

COPY . $DockerHOME

RUN pip install -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/backend/entrypoint.sh
RUN chmod +x /usr/src/backend/entrypoint.sh

ENTRYPOINT ["/usr/src/backend/entrypoint.sh"]
