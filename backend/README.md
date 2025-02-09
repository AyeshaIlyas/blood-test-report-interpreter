# Running the Backend Server

NOTE: You need to download redis. If you have brew you can use `brew install redis`

## Starting Everything 
1. Nagivate to the backend directory: `cd backend`
2. If you don't have a virtual environment, create one: `python -m venv <venv-name>`
3. Activate the virtual environment: `source <venv-name>/bin/activate`
4. Download dependencies: `pip install -r requirements.txt`
5. Start the redis cli: `redis-server`
6. Start the celery worker **__from the parent directory__**: `celery -A backend.celery_app worker --loglevel=info --pool=solo`
7. Start the flask app: `flask run`

## Stopping Everything
- shut down flask server with `Ctrl + C`
```bash
redis-cli shutdown
pkill -9 -f celery
```