# Voxy Software Engineer Challenge

## Introduction

As a user when I view the application then I see a form containing a text box to enter a body of text and when I submit the form with some text then I see a result containing the number of words in the text box
and when I submit the form with an empty text then I see a form error telling me that some text input is required.

As an engineer when I look at your project then I should understand how to install and run it.

## Tecnologies used

- Orchestration: Docker and docker compose
- Backend: Python (Django Framework)
- Frontend: React (Next.js)

## Requirements

- Docker
- Docker compose

## Network Ports

- PostgreSQL: 5432
- Backend: 8000
- Frontend: 3000

## How to Run

Run the following command at root

`docker compose up`

to stop press CTRL+X and after that run

`docker compose down`

The frontend will open at: <https://localhost:3000/>
The backend interactive at: <http://0.0.0.0:8000/>

### Run Unit Test

To run the unit test of the backend, you need to up the test compose with:

```docker compose -f docker-compose.test.yml up```

and after that on a separate terminal run

`./backend/runTests.sh`
