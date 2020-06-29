from flask import Flask ,render_template,url_for
app = Flask(__name__, static_url_path='/static')
@app.route('/')
def index():
   return render_template('public/index.html')
if __name__ == '__main__':
   app.run(debug=True)
   
