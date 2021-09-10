let model,
  net,
  class_indices,
  fileUpload = document.getElementById("upload_widget"),
  img = document.getElementById("image"),
  boxResult = document.querySelector(".box-result"),
  confidence = document.querySelector(".confidence"),
  pconf = document.querySelector(".box-result p"),
  classes = [],
  status = document.querySelector(".init_status"),
  log_status = document.querySelector(".log_init_status"),
  progressBar = new ProgressBar.Circle("#progress", {
    color: "limegreen",
    strokeWidth: 10,
    duration: 2000,
    easing: "easeInOut",
  }),
  log = "";

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);
