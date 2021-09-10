LOG_LOAD_IMAGE = () => {
  log_status.innerHTML =
    "<b>Log:</b> Loading image... <spam><i class='fa fa-spinner fa-spin'></i></spam>";
};
LOG_LOAD_IMAGE_OK = () => {
  log_status.innerHTML = "<b>Log:</b> Load image successfuly!</br>";
};
LOG_LOAD_MODEL = () => {
  log_status.innerHTML =
    "<b>Log:</b> Loading leaf disease model... <spam><i class='fa fa-spinner fa-spin'></i></spam></br><b>Log:</b> Loading mobileNet model... <spam><i class='fa fa-spinner fa-spin'></i></spam></br> <b>Log:</b> Loading image... <spam><i class='fa fa-spinner fa-spin'></i></spam>";
  status.innerHTML =
    "Loading... <spam><i class='fa fa-spinner fa-spin'></i></spam>";
  status.className = "init_status width_100 text-center ";
};
LOG_LOAD_MODEL_OK = () => {
  log_status.innerHTML =
    "<b>Log:</b> Loaded image successfully! </br><b>Log:</b> Loaded mobileNet model successfully! </br><b>Log:</b> loaded Leaf disease model successfully! ";
  status.innerHTML = "Loaded Successfully! ";
};
