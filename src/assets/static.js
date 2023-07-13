const bfs = {
    title: "Breadth First Search (BFS)",
    description: "The breadth-first search (BFS) algorithm is used to search a tree or graph data structure for a node that meets a set of criteria. It starts at the tree’s root or graph and searches/visits all nodes at the current depth level before moving on to the nodes at the next depth level.",
    timeCom: "O(V+E)",
    algo: [
        "the graph you want to navigate.",
        "any vertex in your graph (say v1), from which you want to traverse the graph.",
        "the following two data structures for traversing the graph.",
        "array(size of the graph)",
        "data structure",
        "the starting vertex to the visited array, and afterward, you add v1’s adjacent vertices to the queue data structure.",
        "using the FIFO concept, remove the first element from the queue, put it into the visited array, and then add the adjacent vertices of the removed element to the queue.",
        "step 5 until the queue is not empty and no vertex is left to be visited."
    ]
};


const dfs = {
    title: "Depth First Search (DFS)",
    description: "It is a recursive algorithm to search all the vertices of a tree data structure or a graph. The depth-first search (DFS) algorithm starts with the initial node of graph G and goes deeper until we find the goal node or the node with no children",
    timeCom: "O(V + E)",
    algo: [
        "STATUS = 1 (ready state) for each node in G",
        "the starting node A on the stack and set its STATUS = 2 (waiting state)",
        "Steps 4 and 5 until STACK is empty",
        "the top node N. Process it and set its STATUS = 3 (processed state)",
        "on the stack all the neighbors of N that are in the ready state (whose STATUS = 1) and set their STATUS = 2 (waiting state)",
        "Exit"
    ]
};

const prim = {
    title: "Prim's Algorithm",
    description: "Prim's Algorithm is a greedy algorithm that is used to find the minimum spanning tree from a graph. Prim's algorithm finds the subset of edges that includes every vertex of the graph such that the sum of the weights of the edges can be minimized.Prim's algorithm starts with the single node and explores all the adjacent nodes with all the connecting edges at every step. The edges with the minimal weights causing no cycles in the graph got selected.",
    timeCom: "O(V2)",
    spaceCom: "O(E+V).",

    algo: [
        "Select a starting vertex",
        "Repeat Steps 3 and 4 until there are fringe vertices ",
        "Select an edge 'e' connecting the tree vertex and fringe vertex that has minimum weight",
        "Add the selected edge and the vertex to the minimum spanning tree T  [end of loop] ",
        "EXIT "
    ]
};


const kruskal = {
    title: "Kruskal's Algorithm",
    description: "Kruskal's Algorithm is used to find the minimum spanning tree for a connected weighted graph. The main target of the algorithm is to find the subset of edges by using which we can traverse every vertex of the graph. It follows the greedy approach that finds an optimum solution at every stage instead of focusing on a global optimum.",
    timeCom: "O(E logE)",
    spaceCom: "O(|E| + |V|)",
    algo: [
        "Create a forest F in such a way that every vertex of the graph is a separate tree.",
        "Create a set E that contains all the edges of the graph.",
        "Repeat Steps 4 and 5 while E is NOT EMPTY and F is not spanning ",
        "Remove an edge from E with minimum weight ",
        `IF the edge obtained in Step 4 connects two different trees, then add it to the forest F   
         (for combining two trees into one tree).  
         ELSE  
         Discard the edge`,
        "END"
    ]
};


const dijkstra = {
    title: "Dijkstra's Algorithm",
    description: "Dijkstra algorithm is a single-source shortest path algorithm. Here, single-source means that only one source is given, and we have to find the shortest path from the source to all the nodes.",
    timeCom: "O(V2)",
    spaceCom: "O(V2)",
    timeComDes: "",
    algo: [
        "Mark the source node with a current distance of 0 and the rest with infinity.",
        "Set the non-visited node with the smallest current distance as the current node, lets say C.",
        "For each neighbour N of the current node C: add the current distance of C with the weight of the edge connecting C-N. If it is smaller than the current distance of N, set it as the new current distance of N.",
        "Mark the current node C as visited.",
        "Go to step 2 if there are any nodes are unvisited."
    ]
};
export default { bfs,dfs,kruskal,dijkstra,prim }



