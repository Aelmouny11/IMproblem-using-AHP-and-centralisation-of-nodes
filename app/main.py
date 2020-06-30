from flask import Flask ,render_template,url_for , request ,Response
app = Flask(__name__)
 
import os


app.config["UPLOAD_IMAGE"]="/home/ez/Documents/flask-Project/IMproblem/app/static/img"

@app.route('/')
def index():
   return render_template('public/index.html')

@app.route('/uploadfile', methods = ['POST'])
def uploadfile():
   image = request.files["file"]
   image.save(os.path.join(app.config["UPLOAD_IMAGE"],image.filename))
   print("image saved ")
   return "Good"

if __name__ == '__main__':
   app.run(debug=True)