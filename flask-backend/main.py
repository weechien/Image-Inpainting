from edgeconnect.main import main
import os
import io
import re
import sys
import flask
import base64
import numpy as np
import tensorflow as tf
from flask import *
from PIL import Image
from os.path import *

sys.path.append(join(os.getcwd(), 'edgeconnect'))

# Files for the model to work with
current_dir = dirname(__file__)
checkpoint_path = join(current_dir, 'edgeconnect', 'checkpoints', 'places2')
input_path = join(current_dir, 'IO', 'inputs')
mask_path = join(current_dir, 'IO', 'masks')
output_path = join(current_dir, 'IO', 'outputs')

app = Flask(__name__)


@app.route('/')
def home():
    return flask.render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    # Remove meta string with regex
    img_base64 = re.sub('^data:image/.+;base64,', '', request.form['image'])
    mask_base64 = re.sub('^data:image/.+;base64,', '', request.form['mask'])

    # Load as file
    img = Image.open(io.BytesIO(base64.b64decode(img_base64)))
    mask = Image.open(io.BytesIO(base64.b64decode(mask_base64)))

    # Save image and mask
    filename = 'file.png'
    img.save(join(input_path, filename))
    mask.save(join(mask_path, 'mask.png'))

    # Run the model
    main(checkpoint_path=checkpoint_path, input_path=input_path,
         mask_path=mask_path, output_path=output_path)

    # Get the output file
    pred_img = Image.open(join(output_path, filename))

    # File to binary
    img_buffer = io.BytesIO()
    pred_img.save(img_buffer, format=pred_img.format)
    img_buffer.seek(0)

    return send_file(img_buffer, mimetype='image/png')


if __name__ == '__main__':
    app.run(debug=True)
