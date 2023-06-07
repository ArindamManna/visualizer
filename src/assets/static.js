const bfs={
    title:"Breadth First Search (BFS)",
    description:"The breadth-first search (BFS) algorithm is used to search a tree or graph data structure for a node that meets a set of criteria. It starts at the tree’s root or graph and searches/visits all nodes at the current depth level before moving on to the nodes at the next depth level.",
    timeCom:"O(V+E)",
    timeComDes:"",
    algo:[
        "Consider the graph you want to navigate.",
        "Select any vertex in your graph (say v1), from which you want to traverse the graph.",
        "Utilize the following two data structures for traversing the graph.",
        "Visited array(size of the graph)",
        "Queue data structure",
        "Add the starting vertex to the visited array, and afterward, you add v1’s adjacent vertices to the queue data structure.",
        "Now using the FIFO concept, remove the first element from the queue, put it into the visited array, and then add the adjacent vertices of the removed element to the queue.",
        "Repeat step 5 until the queue is not empty and no vertex is left to be visited."
    ]
}
export default {bfs}