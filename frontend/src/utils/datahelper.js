/*
    This data helper file helps to mutate the data receved by the API, by formatting the
    values and adding a unique ID
*/

// To meet our requirements we wish to do the following with the data:
// 1. Add a unique ID to each record, 2. Format the price to THB and 3. Format the date.
export const addUniqueIdToTheData = async (data) => {
  //TODO: Error Handling
  const dataWithUniqueId = addUniqueIDToReturnedData(data);
  return dataWithUniqueId;
};

// Add a unique ID to the data so that we can use this for rendering and selecting by ID.
const addUniqueIDToReturnedData = (jsonData) => {
  jsonData.data.map((obj, index) => {
    obj.id = index;
  });
  return jsonData;
};

// For collecting all Materials from the API data
export const collectAllMaterials = async (data) => {
  const uniqueMaterials = [];
  // We want to make sure it is unique, so only add to array if it doesn't already appear on there.
  data.forEach((robot) => {
    if (uniqueMaterials.indexOf(robot.material) === -1) {
      uniqueMaterials.push(robot.material);
    }
  });
  uniqueMaterials.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  return uniqueMaterials;
};

/* We pass through the data and return an array of robots filtered with that array */
export const filterByMaterial = (data, material) => {
  const filteredRobotsByMaterial = data.filter((robot) => {
    return robot.material === material;
  });
  return filteredRobotsByMaterial;
};
