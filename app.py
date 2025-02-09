from tasks import interpret_report
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import pdfplumber
import os
from celery_app import make_celery

# create and configure flask app
app = Flask(__name__, 
            static_url_path='/static')
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = '.'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# create celery instance
celery = make_celery(app)  # Initialize Celery with Flask app

def get_text(file_name):
    with pdfplumber.open(file_name) as pdf:
        pages = []
        for page in pdf.pages:
            pages.append(page.extract_text())
        return pages

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/interpret', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({"error": "file not found"})
    file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return jsonify({"error": "file not provided"})
    if file and allowed_file(file.filename):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        file.save(filepath)
        pages = get_text(filepath)
        task = interpret_report.delay(pages)
        print(task.id)
        os.remove(filepath)
        return jsonify({"task_id": task.id, "message": "Processing started"}), 202

@app.route('/results/<task_id>')
def get_results(task_id):
    task = celery.AsyncResult(task_id)
    if task.ready():
        return jsonify(task.result)
    return jsonify({"status": task.status}) # Or return a processing message
