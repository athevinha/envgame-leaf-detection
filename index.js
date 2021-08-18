let model, net;
let class_indices;
let fileUpload = document.getElementById("uploadImage");
let img = document.getElementById("image");
let boxResult = document.querySelector(".box-result");
let confidence = document.querySelector(".confidence");
let pconf = document.querySelector(".box-result p");
let classes = [];
let progressBar = new ProgressBar.Circle("#progress", {
  color: "limegreen",
  strokeWidth: 10,
  duration: 2000, // milliseconds
  easing: "easeInOut",
});

async function fetchData() {
  let response = await fetch("./model/class_indices.json");
  let data = await response.json();
  classes = data;
  console.log(classes);
  data = JSON.stringify(data);
  data = JSON.parse(data);
  return data;
}

async function initialize() {
  let status = document.querySelector(".init_status");
  let log_status = document.querySelector(".log_init_status");
  status.innerHTML =
    "Loading Model ... <spam><i class='fa fa-spinner fa-spin'></i></spam>";
  // log_status.innerHTML = "Log: ";
  status.className = "init_status width_100 text-center ";
  log_status.innerHTML =
    "<b>Log:</b> Loading leaf disease model... <spam><i class='fa fa-spinner fa-spin'></i></spam> ";
  model = await tf.loadLayersModel("./model/model.json");
  log_status.innerHTML =
    "<b>Log:</b> Leaf disease model loaded Successfully! <br/> <b>Log:</b> Loading Mobilenet model... <spam><i class='fa fa-spinner fa-spin'></i></spam> ";
  net = await mobilenet.load();
  log_status.innerHTML =
    "<b>Log:</b> Leaf disease model loaded Successfully! <br/> <b>Log:</b> Mobilenet model loaded Successfully! ";
  status.innerHTML = "Model Loaded Successfully! ";
  status.className = "init_status width_100 text-center";
}

async function predict() {
  console.log(tf);
  let img = document.getElementById("image");
  let offset = tf.scalar(255);
  let tensorImg = tf.browser
    .fromPixels(img)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();
  let tensorImg_scaled = tensorImg.div(offset);
  prediction = await model.predict(tensorImg_scaled).data();
  prediction_imagenet = await net.classify(img);
  console.log(prediction_imagenet);
  fetchData().then((data) => {
    predicted_class = tf.argMax(prediction);
    class_idx = Array.from(predicted_class.dataSync())[0];
    document.querySelector(".imagenet_pred_class").innerHTML = `${
      prediction_imagenet[0].className
    } - ${parseFloat(prediction_imagenet[0].probability * 100).toFixed(2)} % `;
    document.querySelector(".pred_class").innerHTML = data[class_idx];
    document.getElementsByClassName(
      "fix_disease"
    )[0].href = `https://www.google.com/search?q=Cách chữa trị ${data[class_idx]}`;
    document.getElementsByClassName(
      "fix_disease"
    )[0].innerHTML = `Cách chữa trị ${data[class_idx]}`;
    document.querySelector(".inner").innerHTML = `${parseFloat(
      prediction[class_idx] * 100
    ).toFixed(2)}% SURE`;
    console.log(data[class_idx]);
    console.log(prediction);

    progressBar.animate(prediction[class_idx] - 0.005); // percent

    // pconf.style.display = "block";

    confidence.innerHTML = Math.round(prediction[class_idx] * 100);
  });
}
fileUpload.addEventListener("change", function (e) {
  let uploadedImage = e.target.value;
  img.onload = function () {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      let max_width = document.getElementById("box_img").offsetWidth;
      let op = this.width / max_width;
      this.style.width = max_width;
    } else {
      let op = this.height / 300;
      this.style.height = `${this.height / op}px`;
      let max_width = document.getElementById("box_img").offsetWidth;
      this.style.marginLeft = `${(max_width - this.width - 30) / 2}px`;
    }
  };
  if (uploadedImage) {
    document.getElementById("blankFile-1").innerHTML = uploadedImage.replace(
      "C:\\fakepath\\",
      ""
    );
    document.getElementById("choose-text-1").innerText =
      "Change Selected Image";
    document.querySelector(".success-1").style.display = "inline-block";

    let extension = uploadedImage.split(".")[1];
    if (!["doc", "docx", "pdf"].includes(extension)) {
      document.querySelector(".success-1 i").style.border =
        "1px solid limegreen";
      document.querySelector(".success-1 i").style.color = "limegreen";
    } else {
      document.querySelector(".success-1 i").style.border =
        "1px solid rgb(25,110,180)";
      document.querySelector(".success-1 i").style.color = "rgb(25,110,180)";
    }
  }
  let file = this.files[0];
  if (file) {
    boxResult.style.display = "block";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.addEventListener("load", function () {
      img.style.display = "block";
      img.setAttribute("src", this.result);
    });
  } else {
    img.setAttribute("src", "");
  }

  initialize().then(() => {
    predict();
  });
});
