$(document).ready(function () {
  let imgs = ["cherry", "grapes", "heart", "lemon", "orange", "seven"];
  imgs.forEach((ele, index) => {
    imgs[index] = "images/" + ele + ".png";
  });

  function ranImg(imgs) {
    let ran = Math.floor(imgs.length * Math.random());
    return imgs[ran];
  }

  function spin(index) {
    let img = ranImg(imgs);
    $("#img-" + index).attr("src", img);
  }
  function animation() {
    let time1 = setInterval(function () {
      $("#win-p").text("Spinning...");
      spin(0);
    }, 100);
    let time2 = setInterval(function () {
      spin(1);
    }, 100);
    let time3 = setInterval(function () {
      spin(2);
    }, 100);

    setTimeout(() => {
      clearInterval(time1);
    }, 1000);
    setTimeout(() => {
      clearInterval(time2);
    }, 2000);
    setTimeout(() => {
      clearInterval(time3);
      winCheck();
    }, 3000);
  }
  function winCheck() {
    let img1 = $("#img-0").attr("src");
    let img2 = $("#img-1").attr("src");
    let img3 = $("#img-2").attr("src");

    let win = img1 == img2 && img1 === img3;

    if (win) {
      $("#win-p")
        .text("Congradulations! You won!")
        .css("color", "red")
        .fadeTo(100, 0.1)
        .fadeTo(200, 1.0);
      //prize money
      $("#money").html(
        parseInt($("#money").html()) + parseInt($("#bet").html()) * 15
      );
    } else {
      if (parseInt($("#money").html()) === 0) {
        $("#win-p")
          .text("You lost all your money!")
          .css("color", "red")
          .fadeTo(100, 0.1)
          .fadeTo(200, 1.0);
      } else {
        $("#win-p")
          .text("You lost, spin again.")
          .css("color", "red")
          .fadeTo(100, 0.1)
          .fadeTo(200, 1.0);
      }
    }
  }

  $("#spin").click(function () {
    if (parseInt($("#bet").html()) <= parseInt($("#money").html())) {
      // Subtract bet
      $("#money").html(
        parseInt($("#money").html() - parseInt($("#bet").html()))
      );
      animation();
    } else {
      $("#win-p")
        .text(
          "Invalid bet amount, you do not have enough money to bet " +
            parseInt($("#bet").html()) +
            "$"
        )
        .css("color", "red")
        .fadeTo(100, 0.1)
        .fadeTo(200, 1.0);
    }
  });

  // Increment and decrease bet amount
  $("#minus").click(function () {
    if (parseInt($("#bet").html()) > 0) {
      $("#bet").html($("#bet").html() - 1);
    }
  });
  $("#plus").click(function () {
    if (parseInt($("#bet").html()) < parseInt($("#money").html())) {
      $("#bet").html(parseInt($("#bet").html()) + 1);
    }
  });
  $("#user").click(function () { 
    $('#modalForm').modal('show');
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  });
});
