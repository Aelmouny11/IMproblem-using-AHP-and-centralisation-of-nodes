from flask import Flask ,render_template,url_for , request ,Response , make_response , json, jsonify, session, redirect
from .AHP import Consistency_Ratio, get_Centrality , get_Ranking
app = Flask(__name__)
 
import os


#app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
# __file__ refers to the file settings.py 
APP_ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top
APP_Data = os.path.join(APP_ROOT, 'static/Data')
app.config["UPLOAD_FILE"]=APP_Data

@app.route('/')
def index():
   	return render_template('public/index.html')

@app.route('/uploadfile', methods = ['POST'])
def uploadfile():

   resp = {}

   file = request.files["file"]
   # file.filename = "1234.csv"
   file.save(os.path.join(app.config["UPLOAD_FILE"],file.filename))
   

   if 'CNA_AHP_Key' in request.cookies:
      resp = "we have alredy cookie"
   else:
      resp = make_response()
      resp.set_cookie("CNA_AHP_Key","secret_key")
      resp.set_cookie("namefile",file.filename)
   
   return resp,200
   

@app.route('/ConsistencyRatio', methods = ['POST'])
def RC():

   array = request.get_json()
   # print(array)
   response = Consistency_Ratio(array)


   return jsonify({"CR":response[2]})


@app.route('/DoIt',methods=['GET'])
def getRanking():
	
   filepath = os.path.join(app.config["UPLOAD_FILE"], 'data.csv')
   get_Ranking(1,filepath)
   


   return '''<h1>GOOD</h1>''',200


if __name__ == '__main__':
   app.run(debug=True)