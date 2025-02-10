from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv()

# Create the Celery app instance
celery = Celery("blood_test_tasks",  # Name of Celery app
                broker=os.getenv("CELERY_BROKER_URL"), # URL of your message broker (Redis)
                backend=os.getenv("CELERY_BROKER_URL"),
                include=["tasks"])  # List of modules where your tasks are defined

def make_celery(app):
    celery = Celery(__name__,
                    broker=os.getenv("CELERY_BROKER_URL"), # URL of your message broker (Redis)
                    backend=os.getenv("CELERY_BROKER_URL"),
                    include=["tasks"])
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery
