from app.main import app

if __name__ == "__main__":
	# app.run(debug=True)
	app.run(host='0.0.0.0', debug=True, port=3030)