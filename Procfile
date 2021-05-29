release: python manage.py migrate
web: gunicorn project.wsgi
web: daphne project.routing:application --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker channels --settings=project.settings -v2