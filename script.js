let move_speed = 3,
  grativy = 0.5;
let img = document.getElementById("rocket-2");
let rocket = document.querySelector(".rocket");

// getting rocket element properties
let rocket_props = rocket.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector(".background").getBoundingClientRect();

let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");

let game_state = "Start";
img.style.display = "none";
message.classList.add("messageStyle");

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && game_state != "Play") {
    document.querySelectorAll(".pipe_sprite").forEach((e) => {
      e.remove();
    });
    img.style.display = "block";
    rocket.style.top = "40vh";
    game_state = "Play";
    message.innerHTML = "";
    score_title.innerHTML = "Score : ";
    score_val.innerHTML = "0";
    message.classList.remove("messageStyle");
    play();
  }
});

function play() {
  function move() {
    if (game_state != "Play") return;

    let pipe_sprite = document.querySelectorAll(".pipe_sprite");
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getBoundingClientRect();
      rocket_props = rocket.getBoundingClientRect();

      if (pipe_sprite_props.right <= 0) {
        element.remove();
      } else {
        if (
          rocket_props.left <
            pipe_sprite_props.left + pipe_sprite_props.width &&
          rocket_props.left + rocket_props.width > pipe_sprite_props.left &&
          rocket_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
          rocket_props.top + rocket_props.height > pipe_sprite_props.top
        ) {
          game_state = "End";
          message.innerHTML =
            "Game Over".fontcolor("red") + "<br>Press Enter To Restart";
          message.classList.add("messageStyle");
          img.style.display = "none";
          sound_die.play();
          return;
        } else {
          if (
            pipe_sprite_props.right < rocket_props.left &&
            pipe_sprite_props.right + move_speed >= rocket_props.left &&
            element.increase_score == "1"
          ) {
            score_val.innerHTML = +score_val.innerHTML + 1;
            sound_point.play();
          }
          element.style.left = pipe_sprite_props.left - move_speed + "px";
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let rocket_dy = 0;
  function apply_gravity() {
    if (game_state != "Play") return;
    rocket_dy = rocket_dy + grativy;
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp" || e.key == " ") {
        img.src = "rocket-2.png";
        rocket_dy = -7.6;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key == "ArrowUp" || e.key == " ") {
        img.src = "rocket.png";
      }
    });

    if (rocket_props.top <= 0 || rocket_props.bottom >= background.bottom) {
      game_state = "End";
      message.style.left = "28vw";
      window.location.reload();
      message.classList.remove("messageStyle");
      return;
    }
    rocket.style.top = rocket_props.top + rocket_dy + "px";
    rocket_props = rocket.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;

  let pipe_gap = 40;

  function create_pipe() {
    if (game_state != "Play") return;

    if (pipe_seperation > 115) {
      pipe_seperation = 0;

      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      let pipe_sprite_inv = document.createElement("div");
      pipe_sprite_inv.className = "pipe_sprite";
      pipe_sprite_inv.style.top = pipe_posi - 70 + "vh";
      pipe_sprite_inv.style.left = "100vw";

      document.body.appendChild(pipe_sprite_inv);
      let pipe_sprite = document.createElement("div");
      pipe_sprite.className = "pipe_sprite";
      pipe_sprite.style.top = pipe_posi + pipe_gap + "vh";
      pipe_sprite.style.left = "100vw";
      pipe_sprite.increase_score = "1";

      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
