import networkx as nx 
import matplotlib.pyplot as plt

def get_Ranking(array, DiGraph = False, Weighted = False):
    

    #make a Graph
    if DiGraph:
        G=nx.DiGraph()
    else:
        G=nx.Graph()
    
    if Weighted:
        G.add_weighted_edges_from(array)
    else:
        G.add_edges_from(array)

    #computing the Centrality Measures

    
    DC = nx.degree_centrality(G)
    CC = nx.closeness_centrality(G)
    BC = nx.betweenness_centrality(G)
    EC = nx.eigenvector_centrality_numpy(G)

    return {"DC":DC, "CC":CC, "BC": BC, "EC":EC}

