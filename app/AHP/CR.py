import numpy as np 


RI =[0,0,0.58,0.9]

def Consistency_Ratio(array,N=4):

    if N <= 2:
        return 0
    
    Weighted = np.array([])
    Pairwise_Matrix = np.matrix(array)
    
    eigvals , eigvects = np.linalg.eig(Pairwise_Matrix)

    lamb = eigvals.max()
    index = np.where(eigvals == lamb)
    for el in eigvects:
        Weighted = np.append(Weighted,el[0,index[0]])

    CI=(lamb-N)/(N-1)
    
    
    RC=CI/RI[N-1]

    return {"lambda" : lamb , "weighted" : Weighted , "RC" : RC}