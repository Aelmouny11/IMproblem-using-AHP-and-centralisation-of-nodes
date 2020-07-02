from flask import Flask ,render_template,url_for , request ,Response , make_response , json, jsonify, session, redirect
from .AHP import Consistency_Ratio, get_Centrality , get_Ranking
import os
import secrets

app = Flask(__name__)
 



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


   file = request.files["file"]
   resp = make_response()
   resp.set_cookie("namefile",file.filename)

   name =""

   if 'CNA_AHP_Key' in request.cookies:
      name = request.cookies.get('CNA_AHP_Key')
   else:
      name=secrets.token_urlsafe(16)
      resp.set_cookie("CNA_AHP_Key",name)
      
   name += '.csv'
   # file.filename = "1234.csv"
   file.save(os.path.join(app.config["UPLOAD_FILE"],name))
   

   
   
   return resp,200
   

@app.route('/ConsistencyRatio', methods = ['POST'])
def RC():

   array = request.get_json()
   resp = Consistency_Ratio(array)

   name = ""

   if 'CNA_AHP_Key' in request.cookies:
      name = request.cookies.get('CNA_AHP_Key')
   else:
      name=secrets.token_urlsafe(16)
      response = make_response()
      response.set_cookie("CNA_AHP_Key",name)

   name += '.json'
   
   with open(os.path.join(app.config["UPLOAD_FILE"],name), 'w') as f:
      json.dump({"w0":float(resp[1][0]),"w1":float(resp[1][1]),"w2":float(resp[1][2]),"w3":float(resp[1][3])}, f)


   return jsonify({"CR":resp[2]}),200


@app.route('/DoIt',methods=['GET'])
def getRanking():

   name = ""
   # print(request.cookies.get('CNA_AHP_Key'))
   if 'CNA_AHP_Key' in request.cookies:
      name = request.cookies.get('CNA_AHP_Key')
   else:
      name=secrets.token_urlsafe(16)
      response = make_response()
      response.set_cookie("CNA_AHP_Key",name)

   csvname = name + '.csv'
   jsonname = name + '.json'

   CSVpath = os.path.join(app.config["UPLOAD_FILE"], csvname)
   Jsonpath = os.path.join(app.config["UPLOAD_FILE"], jsonname)

   rank = get_Ranking(1,CSVpath,Jsonpath)

   return jsonify(rank),200


if __name__ == '__main__':
   app.run(debug=True)