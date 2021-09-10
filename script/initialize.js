async function initialize() {
  model = await tf.loadLayersModel("./model/model.json");
}
function onload_model() {
  SHOW_TOAST();
  initialize().then(() => {
    END_TOAST();
    console.log(model);
  });
}
