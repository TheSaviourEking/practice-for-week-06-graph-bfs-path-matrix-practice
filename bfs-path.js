function findNeighbors(node, matrix) {
    const row = node[0];
    const col = node[1];

    const result = [];
    
    // Up
    const up = [ row - 1, col ];
    // Down
    const down = [ row + 1, col ]

    // Left
    const left = [ row, col -  1 ];

    // Right
    const right = [ row, col + 1 ];

    // Your code here
    // let neighbors = [ right, left, down, up ];
    let neighbors = [ down, left, right, up ];
    for (let i = 0; i < neighbors.length; i++) {
	let neighbor = neighbors[i];
	
	if (isValidIndex(neighbor, matrix)) {
	    result.push(neighbor);
	}
    };

    // console.log(node, left, right, down, up);
    //return [ up, down, right, left ]
    return result;
}

function isValidIndex(neighbor, matrix) {
    const neighborRow = neighbor[0];
    const neighborCol = neighbor[1];

    if ((neighborRow >= 0 && neighborRow < matrix.length) && (neighborCol >= 0 && neighborCol < matrix.length)) {
	return true;
    }

    return false;
}


function bfsPath(matrix, startNode, endValue) {
    // Your code here
    const queue = [ [ startNode ] ];
    const visited = new Set();

    const result = [];
    
    while (queue.length > 0) {
	let currentPath = queue.shift();
	let lastNode = currentPath[currentPath.length - 1];

	if (!visited.has(lastNode.toString())) {
	    result.push(lastNode); // push each last node to result array
     	    if (matrix[lastNode[0]][lastNode[1]] === endValue) return result;
     	    visited.add(lastNode.toString());
	    
     	    let neighbors = findNeighbors(lastNode, matrix)
	    neighbors.forEach(neighbor => {
		queue.push([...currentPath, neighbor]);
	    });
     	}
    }
    return false;
}


// ***** UNCOMMENT FOR LOCAL TESTING *****

const matrix1 = [ 
    [  1,  2,  3,  4 ],
    [  5,  6,  7,  8 ],
    [  9, 10, 11, 12 ],
    [ 13, 14, 15, 16 ]
];

// EXAMPLE TESTS #1. Tests for findNeighbors function
// console.log(findNeighbors([1,1], matrix1)) // Finds all 4 neighbors from an
// internal node (left, right, down, up)
// [ [ 0, 1 ], [ 2, 1 ], [ 1, 2 ], [ 1, 0 ] ]

// console.log(findNeighbors([0,0], matrix1)); // Finds two neighbors from a
// corner node // [ [ 1, 0 ], [ 0, 1 ] ]

// console.log(findNeighbors([3,1], matrix1)); // Finds three neighbors from
// an edge node // [ [ 2, 1 ], [ 3, 2 ], [ 3, 0 ] ]


// EXAMPLE TESTS #2. Tests for bfsPath function

console.log(bfsPath(matrix1, [0,0], 16)); // can traverse the entire matrix
// returns an array of coordinates with no duplicates:

[
    [ 0, 0 ], [ 1, 0 ],
    [ 0, 1 ], [ 2, 0 ],
    [ 1, 1 ], [ 0, 2 ],
    [ 3, 0 ], [ 2, 1 ],
    [ 1, 2 ], [ 0, 3 ],
    [ 3, 1 ], [ 2, 2 ],
    [ 1, 3 ], [ 3, 2 ],
    [ 2, 3 ], [ 3, 3 ]
 ]

// Note for debugging purposes: The coordinates should represent the following matrix values, in order:
// 1 5 2 9 6 3 13 10 7 4 14 11 8 15 12 1
// 6

// console.log(bfsPath(matrix1, [2,2], 11)); // returns a single node if end
// value is located at start node
// [ [ 2, 2 ] ]

//console.log(bfsPath(matrix1, [1,2], 8)); // can handle various start nodes 
// and end values
// [ [ 1, 2 ], [ 0, 2 ], [ 2, 2 ], [ 1, 1 ], [ 1, 3 ] ]

//console.log(bfsPath(matrix1, [0,0], 17)); // can return false if end value 
// is not found
// false

/*************DO NOT MODIFY UNDER THIS LINE ***************/
module.exports = [findNeighbors, bfsPath];
