interface getRowColType {
  left: number;
  right: number;
  up: number;
  down: number;
}

function getRowCol(
  col1: number,
  col2: number,
  row1: number,
  row2: number,
): getRowColType {
  const left: number = col1 < col2 ? col1 : col2;
  const right: number = col1 > col2 ? col1 : col2;
  const up: number = row1 < row2 ? row1 : row2;
  const down: number = row1 > row2 ? row1 : row2;

  return { left, right, up, down };
}

export default getRowCol;
