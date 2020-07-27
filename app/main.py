from flask import Flask ,render_template,url_for , request ,Response , make_response , json, jsonify, session, redirect
from .AHP import Consistency_Ratio, get_Centrality , get_Ranking
import os
import secrets

app = Flask(__name__)
 

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

#app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
# __file__ refers to the file settings.py 
APP_ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top
APP_Data = os.path.join(APP_ROOT, 'static/Data')
app.config["UPLOAD_FILE"]=APP_Data




@app.route('/')
def index():
   response = make_response(render_template('public/index.html'))
   if 'CNA_AHP_Key' not in request.cookies:
      name=secrets.token_urlsafe(16)
      response.set_cookie("CNA_AHP_Key",name)

   return response

@app.route('/uploadfile', methods = ['POST'])
def uploadfile():

   file = request.files["file"]
   resp = make_response()
   resp.set_cookie("namefile",file.filename)

   name = request.cookies.get('CNA_AHP_Key')
   name += '.csv'

   file.save(os.path.join(app.config["UPLOAD_FILE"],name))

   with open(os.path.join(app.config["UPLOAD_FILE"],name), 'r+') as new:
      lines = new.readlines()
      lines.insert(0,"source,target\n")
      new.seek(0)
      new.writelines(lines)

   return resp,200
   

@app.route('/ConsistencyRatio', methods = ['POST'])
def CR():

   array = request.get_json()
   resp = Consistency_Ratio(array)

   name = request.cookies.get('CNA_AHP_Key')
   name += '.json'
   if resp[1][0] < 0:
      resp[1][0]*=-1
      resp[1][1]*=-1
      resp[1][2]*=-1
      resp[1][3]*=-1

   with open(os.path.join(app.config["UPLOAD_FILE"],name), 'w') as f:
      json.dump({"w0":float(resp[1][0]),"w1":float(resp[1][1]),"w2":float(resp[1][2]),"w3":float(resp[1][3])}, f)


   return  jsonify({"CR":resp[2]}),200


@app.route('/DoIt',methods=['POST'])
def getRanking():


   infGraph = request.get_json() # infoGraph[1]==> weighted Graph(True) or not(False)
                                 # infoGraph[2]==> DiGraph(True) or UnDiGraph(False)

   name = request.cookies.get('CNA_AHP_Key')

   csvname = name + '.csv'
   jsonname = name + '.json'

   CSVpath = os.path.join(app.config["UPLOAD_FILE"], csvname)
   Jsonpath = os.path.join(app.config["UPLOAD_FILE"], jsonname)


   rank = get_Ranking(CSVpath,Jsonpath,infGraph['1'],infGraph['2'])

   return jsonify(rank),200


# @app.after_request
# def add_header(r):
#     """
#     Add headers to both force latest IE rendering engine or Chrome Frame,
#     and also to cache the rendered page for 10 minutes.
#     """
#     r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
#     r.headers["Pragma"] = "no-cache"
#     r.headers["Expires"] = "0"
#     r.headers['Cache-Control'] = 'public, max-age=0'
#     return r
# if __name__ == '__main__':
#    # app.run(debug=True)
#    app.run(host='0.0.0.0', debug=True, port=3134)