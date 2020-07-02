from flask import Flask ,render_template,url_for , request ,Response , json, jsonify, session, redirect
from .AHP import Consistency_Ratio, get_Ranking
app = Flask(__name__)
 
import os


#app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

app.config["UPLOAD_IMAGE"]="/home/ez/Documents/flask-Project/IMproblem/app/static/img"

@app.route('/')
def index():
   	return render_template('public/index.html')

@app.route('/uploadfile', methods = ['POST'])
def uploadfile():
   file = request.files["file"]
   file.filename = "1234.csv"
   file.save(os.path.join(app.config["UPLOAD_IMAGE"],file.filename))

   return "CSV file Saved ",200


@app.route('/ConsistencyRatio', methods = ['POST'])
def RC():

   array = request.get_json()
   print(array)
   response = Consistency_Ratio(array)


   return jsonify({"CR":response[2]})

@app.route('/DoIt',methods=['POST'])
def getRanking():
	pass

if __name__ == '__main__':
   app.run(debug=True)