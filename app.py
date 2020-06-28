from flask import Flask ,render_template,url_for
app = Flask(__name__)
@app.route('/',method=['get','post'])
def index():
   return render_template('public/index.html')
if __name__ == '__main__':
   app.run(debug=True)
   
