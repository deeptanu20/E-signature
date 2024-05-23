document.addEventListener("DOMContentLoaded", function () {
    const colorPicker = document.getElementById("colorPicker");
    const canvasColor = document.getElementById("canvasColor");
    const canvas = document.getElementById("myCanvas");
    const clearButton = document.getElementById("clearButton");
    const saveButton = document.getElementById("saveButton");
    const fontPicker = document.getElementById("fontPicker");
    const retrieveButton = document.getElementById("retrieveButton");
  
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
  
    function getCoordinates(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
  
      let x, y;
      if (e.touches && e.touches.length > 0) {
        x = (e.touches[0].clientX - rect.left) * scaleX;
        y = (e.touches[0].clientY - rect.top) * scaleY;
      } else {
        x = (e.clientX - rect.left) * scaleX;
        y = (e.clientY - rect.top) * scaleY;
      }
      return { x, y };
    }
  
    function drawLine(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  
    canvas.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  
    canvas.addEventListener("mousedown", (e) => {
      const { x, y } = getCoordinates(e);
      isDrawing = true;
      lastX = x;
      lastY = y;
    });
  
    canvas.addEventListener("mousemove", (e) => {
      if (isDrawing) {
        const { x, y } = getCoordinates(e);
        drawLine(lastX, lastY, x, y);
        lastX = x;
        lastY = y;
      }
    });
  
    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
      localStorage.setItem("canvasContents", canvas.toDataURL());
    });
  
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const { x, y } = getCoordinates(e);
      isDrawing = true;
      lastX = x;
      lastY = y;
    });
  
    canvas.addEventListener("touchend", () => {
      isDrawing = false;
      localStorage.setItem("canvasContents", canvas.toDataURL());
    });
  
    canvas.addEventListener("touchmove", (e) => {
      if (isDrawing) {
        const { x, y } = getCoordinates(e);
        drawLine(lastX, lastY, x, y);
        lastX = x;
        lastY = y;
      }
    });
  
    window.addEventListener("load", () => {
      const savedCanvas = localStorage.getItem("canvasContents");
      if (savedCanvas) {
        const img = new Image();
        img.onload = function () {
          ctx.drawImage(img, 0, 0);
        };
        img.src = savedCanvas;
      }
    });
  
    colorPicker.addEventListener("change", (e) => {
      ctx.strokeStyle = e.target.value;
      localStorage.setItem("textColor", e.target.value);
    });
  
    canvasColor.addEventListener("change", (e) => {
      ctx.fillStyle = e.target.value;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      localStorage.setItem("backgroundColor", e.target.value);
    });
  
    clearButton.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    saveButton.addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = "signature.png";
      link.href = canvas.toDataURL();
      link.click();
      localStorage.setItem("canvasContents", canvas.toDataURL());
    });
  
    retrieveButton.addEventListener('click', () => {
      const savedCanvas = localStorage.getItem('canvasContents');
      if (savedCanvas) {
          const img = new Image();
          img.onload = function() {
              ctx.clearRect(0, 0, canvas.width, canvas.height); 
              ctx.drawImage(img, 0, 0); 
          };
          img.src = savedCanvas;
      }
  });
  
  
    fontPicker.addEventListener("change", (e) => {
      ctx.lineWidth = e.target.value;
    });
  });
  