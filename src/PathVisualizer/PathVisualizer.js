import React, { Component } from "react";
import Node from "./Node/Node";

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

  render() {
    const { grid } = this.state;
    return (
      <>
        <div className="grid">
          {/* rendering the grid */}
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  return <Node key={`${rowIdx} ${nodeIdx}`} />;
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
  };
};
