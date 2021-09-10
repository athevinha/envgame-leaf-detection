function SHOW_TOAST() {
  // Hiển thị là model đang load...
  toast.className = "show";
}
function END_TOAST() {
  // Hiển thị là model đã load xong
  // Hide toast đi
  toast.innerHTML = "Loaded model successfully !";
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
