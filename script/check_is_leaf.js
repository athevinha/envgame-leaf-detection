function check_is_leaf(list_detect) {
  console.log("list tagging:", list_detect);
  show_result_is_leaf = ``;
  for (let i = 0; i < 5; i++) {
    let detection = JSON.parse(list_detect).result.tags[i];
    show_result_is_leaf += `${
      detection.tag.en + ": " + parseFloat(detection.confidence).toFixed(2)
    }% || `;
  }
  document.querySelector(".imagenet_pred_class").innerHTML =
    show_result_is_leaf;
  document.querySelector(".imagenet_pred_class").style = "color:red";
  if (check_is_leaf_imagga(list_detect)) {
    is_leaf();
    // initialize().then(() => { // load từ khi onload...
    if (model) predict();
    else {
      alert('đợi model load đã nhé ^^ !');
    }
    // });
  } else {
    not_leaf();
  }
}
// let url = "https://envgame.online/static/media/content1.096191ea.jpg";

function is_leaf() {
  document.querySelector(".imagenet_pred_class").style = "color:20c997";
  document.querySelector(".pred_class").style = "color:20c997";
  document.getElementsByClassName("fix_disease")[0].style = "color:20c997";
  document.getElementsByClassName("weather")[0].style = "color:20c997";
  document.querySelector(".pred_class").innerHTML = "";
  document.getElementsByClassName("fix_disease")[0].innerHTML = "";
  document.getElementsByClassName("weather")[0].innerHTML = "";
}
function not_leaf() {
  LOG_LOAD_MODEL_OK();
  document.querySelector(".pred_class").style = "color:red";
  document.querySelector(".pred_class").innerHTML =
    "Hình ảnh bạn đưa vào không phải lá";
  document.getElementsByClassName("fix_disease")[0].innerHTML =
    "không phân tích được";
  document.getElementsByClassName("fix_disease")[0].style = "color:red";
  document.getElementsByClassName("weather")[0].style = "color:red";
  document.querySelector(".inner").innerHTML = ``;
  progressBar.animate(0.005 - 0.005);
  pconf.style.display = "block";
  confidence.innerHTML = Math.round(0 * 100);
}
function check_is_leaf_imagga(list_detect) {
  for (let i = 0; i < 10; i++) {
    let detection = JSON.parse(list_detect).result.tags[i];
    if (["plant", "leaf"].includes(detection.tag.en)) {
      return true;
    }
    console.log(detection.tag.en + ":" + detection.confidence);
  }
  return false;
}
// function check_is_leaf_vision(list_detect) {
//   for (let i = 0; i < 10; i++) {
//     let detection = JSON.parse(list_detect)[i];
//     if (["plant", "leaf"].includes(detection.description)) {
//       return true;
//     }
//     console.log(detection.tag.en + ":" + detection.confidence);
//   }
//   return false;
// }
// // dự phòng nếu model thứ 1 hỏng....
// let list_detect = detect_is_leaf.detection;
// console.log(list_detect);
// show_result_is_leaf = ``;
// for (let i = 0; i < 5; i++) {
//   let detection = JSON.parse(list_detect)[i];
//   show_result_is_leaf += `${
//     detection.description + ": " + parseFloat(detection.score).toFixed(2)
//   }% || `;
// }
// document.querySelector(".imagenet_pred_class").innerHTML =
//   show_result_is_leaf;
// document.querySelector(".imagenet_pred_class").style = "color:red";
// if (check_is_leaf_vision(list_detect)) {
//   is_leaf();
//   initialize().then(() => {
//     predict();
//   });
// } else {
//   not_leaf();
// }
