async function predict() {
  let img = document.getElementById("image");
  let offset = tf.scalar(255);
  let tensorImg = tf.browser
    .fromPixels(img)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();
  let tensorImg_scaled = tensorImg.div(offset);
  prediction = await model.predict(tensorImg_scaled).data();
  // prediction_imagenet = await net.classify(img);
  fetchData().then((data) => {
    predicted_class = tf.argMax(prediction);
    class_idx = Array.from(predicted_class.dataSync())[0];

    // document.querySelector(".imagenet_pred_class").innerHTML = `${
    //   prediction_imagenet[0].className
    // } - ${parseFloat(prediction_imagenet[0].probability * 100).toFixed(2)} % `;
    document.querySelector(".pred_class").innerHTML = data[class_idx];
    document.getElementsByClassName(
      "fix_disease"
    )[0].href = `https://www.google.com/search?q=Cách chữa trị ${data[class_idx]}`;
    document.getElementsByClassName(
      "fix_disease"
    )[0].innerHTML = `Cách chữa trị ${data[class_idx]}`;

    const d = new Date();
    document.getElementsByClassName(
      "weather"
    )[0].href = `https://www.google.com/search?q=d%E1%BB%B1+b%C3%A1o+th%E1%BB%9Di+ti%E1%BA%BFt`;
    document.getElementsByClassName("weather")[0].innerHTML = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()}`;

    document.querySelector(".inner").innerHTML = `${parseFloat(
      prediction[class_idx] * 100
    ).toFixed(2)}% SURE`;

    progressBar.animate(prediction[class_idx] - 0.005); // percent

    pconf.style.display = "block";

    confidence.innerHTML = Math.round(prediction[class_idx] * 100);
    window.scrollTo(0, document.body.scrollHeight);
    LOG_LOAD_MODEL_OK();
  });
}
async function fetchData() {
  let response = await fetch("./model/class_indices.json");
  let data = await response.json();
  classes = data;
  data = JSON.stringify(data);
  data = JSON.parse(data);
  return data;
}
