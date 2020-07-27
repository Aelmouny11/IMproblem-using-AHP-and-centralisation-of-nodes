import numpy as np 

RI =[0,0,0.58,0.9]

def Make_pairewiseMatrix(d):

    def i(x,rec=1):
        x = float(d[x])
        if x < 1:
            x = np.reciprocal(-x+2)
            print(x)
        if rec:
            return np.reciprocal(x)
        return x
        

    matrix = np.array([[1,i('1',0),i('2',0),i('3',0)],
                     [i('1'),1,i('4',0),i('5',0)],
                     [i('2'),i('4'),1,i('6',0)],
                     [i('3'),i('5'),i('6'),1]]) 

    return matrix


def Consistency_Ratio(data,N=4):

    
    Weighted = np.array([])
    Pairwise_Matrix = np.matrix(Make_pairewiseMatrix(data))
    
    eigvals , eigvects = np.linalg.eig(Pairwise_Matrix)
    lamb = eigvals.max()
    index = np.where(eigvals == lamb)
    for el in eigvects:
        Weighted = np.append(Weighted,el[0,index[0]])
        
    CI=(lamb-N)/(N-1)
    
    
    CR=CI/RI[N-1]
    CR=float(CR)
    lamb=float(lamb)
    
    return [lamb, Weighted, CR]