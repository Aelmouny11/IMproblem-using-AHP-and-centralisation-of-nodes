from flask import Flask ,render_template,url_for , request ,Response , jsonify, session, redirect
from 
app = Flask(__name__)
 
import os


app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

app.config["UPLOAD_IMAGE"]="/home/ez/Documents/flask-Project/IMproblem/app/static/img"

@app.route('/')
def index():
   	return render_template('public/index.html')

@app.route('/uploadfile', methods = ['POST'])
def uploadfile():
   image = request.files["file"]
   image.save(os.path.join(app.config["UPLOAD_IMAGE"],image.filename))
   print("image saved ")
   return "1"


@app.route('/ConsistencyRatio', methods = ['POST'])
def RC():
   array = request.get_json()

   return "1"

if __name__ == '__main__':
   app.run(debug=True)