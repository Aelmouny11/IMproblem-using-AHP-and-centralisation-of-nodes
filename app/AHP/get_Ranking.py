import networkx as nx 
import matplotlib.pyplot as plt

def get_Ranking(filename, DiGraph = False, Weighted = False):
    
    filename += ".csv"
    data = open(filename, 'rb')
    #make a Graph
    if DiGraph:
        G = nx.DiGraph()
    else:
        G = nx.Graph()
    
    if Weighted:
        G = nx.read_weighted_edgelist(data,delimiter=',',create_using=G)    
    else:
        G = nx.read_edgelist(data,delimiter=',',create_using=G)

    #computing the Centrality Measures

    
    DC = nx.degree_centrality(G)
    CC = nx.closeness_centrality(G)
    BC = nx.betweenness_centrality(G)
    EC = nx.eigenvector_centrality_numpy(G)

    return {"DC":DC, "CC":CC, "BC": BC, "EC":EC}