import React, { Component } from "react";
import "./PathVisualizer.css";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    //   creating grid of indexes and updating the state, in initial render
    const grid = getInintialGrid();
    this.setState({ grid });
  }

  // animate the searching patter of dijkstras
  animateDijkstra(visitedNodesInorder) {
    // iterate all nodes...
    for (let i = 0; i < visitedNodesInorder.length; i++) {
      // set timeout for each node, depending upon the distance (say index)
      setTimeout(() => {
        const node = visitedNodesInorder[i];
        // get the node and update its className as visited
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10*i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInorder = dijkstra(grid, startNode, finishNode);
    // console.log(visitedNodesInorder);
    this.animateDijkstra(visitedNodesInorder);

    // const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    // console.log(nodesInShortestPathOrder);
  }

  render() {
    const { grid } = this.state;
    return (
      <>
        <button
          onClick={() => {
            this.visualizeDijkstra();
          }}
        >
          Visualize Dijkstra's Algorithm
        </button>
        <div className="grid">
          {/* rendering the grid */}
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

// function to build and return 2d array,
// each cell of an array will contain all required properties
// in order to ditinguish each Node
const getInintialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

// return an object of properties for each Node
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};
