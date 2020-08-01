## Flask application 
<p>This actually my first application using flask framework and i am excited  especially when it's about network analysis and AHP  (Analytic Hierarchy Process). It's about implementing  IM problem model , which aims to define influential node within a network or in other words the key-players inside a population.I will walk you through application setup and deploying to heroku : 
</p>
<h3> Application layout:</h3>
<img src="Screenshot from 2020-06-29 00-24-28.png"><br>
<span style="color:green;">app: </span>contains all app files like <span style="color:green;">static:</span> which contains files which handles the syling and js stuff and <span style="color:green;">templates:</span> as we all know stands for html files 

<span style="color:green;"> wsgi.py:</span>  Where the server initialize its magic and other files like *.txt and Procfile are needed for Heroku deployement,i credit [<u>_this_</u>](https://kaushalvivek.github.io/2020-3-30-heroku-flask/) guy who helped out after a whole hostling .This is only the initial setup of the app , it still a lot of work to do in the backend with flask framework to visiti the page go [<u>_here_</u>](https://improblemandahp2020.herokuapp.com/)
<h4>Run application locally</h4>


Clone the repo:
```shell


git clone https://github.com/Aelmouny11/IMproblem-using-AHP-and-centralisation-of-nodes.git
```
Change diirectory:
```shell
cd IMproblem-using-AHP-and-centralisation-of-nodes
```
Set up your virtual environment:
```shell
virtualen -p `which python3.7` env
```
Activate yoour enviroment:
```shell
source env/bin/activate
```
Install requirements:
```shell
pip install -r requirements.txt
```
Run Application:
```shell
python wsgi.py
```
Open  locally:

 localhost:3030

Port may differ for you
