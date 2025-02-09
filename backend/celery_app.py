from celery import Celery

# Create the Celery app instance
celery = Celery('blood_test_tasks',  # Name of Celery app
                broker='redis://localhost:6379/0',  # URL of your message broker (Redis)
                backend='redis://localhost:6379/0',  # URL of your result store (Redis)
                include=['backend.tasks'])  # List of modules where your tasks are defined

# Important for Flask integration
def make_celery(app):
    celery = Celery(__name__,
                    broker='redis://localhost:6379/0',
                    backend='redis://localhost:6379/0',
                    include=['backend.tasks'])
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery