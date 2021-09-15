var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "envgame",
    uploadPreset: "ml_default",
    resource_type: "image",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      LOG_LOAD_MODEL();
      console.log("Done! Here is the image info: ", result.info);
      boxResult.style.display = "block";
      img.style.display = "block";
      img.crossOrigin = "anonymous";
      img.setAttribute("src", result.info.url);
      img.onload = function () {
        // initialize().then(() => {
        //   predict();
        // });
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          let max_width = document.getElementById("box_img").offsetWidth;
          let op = this.width / max_width;
          this.style.width = max_width;
        } else {
          let op = this.height / 280;
          this.style.height = `${this.height / op}px`;
          let max_width = document.getElementById("box_img").offsetWidth;
          let max_height = document.getElementById("box_img").offsetHeight;
          this.style.marginLeft = `${(max_width - this.width - 30) / 2}px`;
          this.style.marginTop = `${(max_height - this.height) / 2}px`;
        }
      };
      document.getElementById("choose-text-1").innerText =
        "Change Selected Image";
      document.querySelector(".success-1").style.display = "inline-block";
      let AI_SEND_IN4 = {
        url: result.info.url,
        mode: localStorage.AI_MODE,
      };
      // if(localStorage.AI_MODE == null || localStorage.AI_MODE = 'imagga')
      // socket.emit("AI detect", AI_SEND_IN4);
      // send request here
      console.log("predict imagga model:" + AI_SEND_IN4.url);
      detect_is_leaf(AI_SEND_IN4.url);
    }
  }
);
function detect_is_leaf(url) {
  axios
    .post(".......... your api.........", {
      url: url,
    })
    .then(function (res) {
      check_is_leaf(res.data.detection);
    })
    .catch(function (err) {
      console.error(err);
    });
}
