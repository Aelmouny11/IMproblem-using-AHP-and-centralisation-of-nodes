## Flask application 
<p>This actually my first application using flask framework and i am excited  especially when it's about network analysis and AHP  (Analytic Hierarchy Process). It's about implementing  IM problem model , which aims to define influential node within a network or in other words the key-players inside a population.I will walk you through application setup and deploying to heroku : 
</p>
### Application layout:
<img src="Screenshot from 2020-06-29 00-24-28.png"><br>
<span>app:</span>contains all app files like <span id=subsp>static:</span> which contains files which handles the syling and js stuff and <span id=subsp>templates:</span> as we all know stands for html files 
<style>
    p {
        color:#333333;
        font-size:15pt;
        font-family:url('https://fonts.google.com/specimen/Kreon');
    }
    span{
        color:lightblue;
    }
    #subsp{
        color:lightgreen;
    }
</style>
<span>wsgi.py:</span>Where the server initialize its magic and other files like *.txt and Procfile are needed for Heroku deployement,i credit [<u>_this_</u>](https://kaushalvivek.github.io/2020-3-30-heroku-flask/) guy who helped out after a whole hostling .This is only the initial setup of the app , it still a lot of work to do in the backend with flask framework to visiti the page go [<u>_here_</u>](https://blooming-brook-40718.herokuapp.com/)
