let net;
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

async function fetchData() {}

async function initialize() {
  let status = document.querySelector(".init_status");
  status.innerHTML =
    "Loading Model ... <spam><i class='fa fa-spinner fa-spin'></i></spam>";
  status.className = "init_status width_100 text-center ";
  net = await mobilenet.load();
  status.innerHTML = "Model Loaded Successfully!";
  status.className = "init_status width_100 text-center";
}

async function predict() {
  console.log(tf);
  let img = document.getElementById("image");
  // prediction = await model.predict(tensorImg_scaled).data();
  prediction = await net.classify(img);
  console.log(prediction);
  // let max = prediction[0];
  // for (let i = 0; i < 2; i++) {
  //   if (max.probability < prediction[i].probability) {
  //     max = predict[i];
  //   }
  // }
  // console.log(max);
  fetchData().then((data) => {
    // predicted_class = tf.argMax(prediction);

    // class_idx = Array.from(predicted_class.dataSync())[0];
    document.querySelector(".pred_class").innerHTML = prediction[0].className;

    document.querySelector(".inner").innerHTML = `${parseFloat(
      prediction[0].probability * 100
    ).toFixed(2)}% SURE`;

    progressBar.animate(prediction[0].probability - 0.005); // percent

    pconf.style.display = "block";

    confidence.innerHTML = Math.round(prediction[0].probability * 100);
  });
}

fileUpload.addEventListener("change", function (e) {
  let uploadedImage = e.target.value;
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
