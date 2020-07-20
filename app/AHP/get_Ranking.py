import networkx as nx
import json

def get_Centrality(filepath, DiGraph = False, Weighted = False):
    
    # load data from csv file 
    data = open(filepath, 'rb')

    # make a Graph
    if DiGraph:
        G = nx.DiGraph()
    else:
        G = nx.Graph()
    
    if Weighted:
        G = nx.read_weighted_edgelist(data,delimiter=',',create_using=G)    
    else:
        G = nx.read_edgelist(data,delimiter=',',create_using=G)
        

    # computing the Centrality Measures  
    DC = nx.degree_centrality(G)
    CC = nx.closeness_centrality(G)
    BC = nx.betweenness_centrality(G)
    if DiGraph:
        G = G.reverse()
    EC = nx.eigenvector_centrality(G,1000)

    return {"DC":DC, "CC":CC, "BC": BC, "EC":EC}

def get_Ranking(csvpath, jsonpath, DiGraph = False, Weighted = False):

    data = {}
    rows = []
    Centrality = get_Centrality(csvpath,DiGraph,Weighted)
    with open(jsonpath) as json_file:
        w = json.load(json_file)
        for el in Centrality["DC"]:
            if el!="source" and el!="target":
                score=w['w0']*Centrality["DC"][el]+w['w1']*Centrality["CC"][el]+w['w2']*Centrality["BC"][el]+w['w3']*Centrality["EC"][el]
                rows.append({"name":el,"score":score,"DC":Centrality["DC"][el],"CC":Centrality["CC"][el],"BC":Centrality["BC"][el],"EC":Centrality["EC"][el]})


    data["total"]=len(rows)
    data["totalNotFiltered"]=len(rows)
    data["rows"]=rows

    
    return data