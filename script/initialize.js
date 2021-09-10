async function initialize() {
  model = await tf.loadLayersModel("./model/model.json");
}
