left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
var song = "";
score_left = 0;
score_right = 0;

function preload() {
    song = loadSound('music.mp3');
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modalloaded);
    posenet.on('pose', gotPoses);
}
function modalloaded() {
    console.log("posenet is initialized");
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill("#00FFFF");
    stroke("#50C878");

    if (score_left >= 0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        InNumberLeftWristY = Number(left_wrist_y);
        remove_decimal = floor(InNumberLeftWristY);
        volume = abs(remove_decimal - 500 / 500); // this expression is here because the minimum value is 0 and the maximum is 1
        console.log(remove_decimal);
    }
    if (score_right >= 0.2) {
        circle(right_wrist_x, right_wrist_y, 20);

        if (right_wrist_y > 0 && right_wrist_y <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if (right_wrist_y > 100 && right_wrist_y <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if (right_wrist_y > 200 && score_right <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if (right_wrist_y > 300 && right_wrist_y < - 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if (right_wrist_y > 400 && right_wrist_y <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_left = results[0].pose.keypoints[9].score;
        score_right = results[0].pose.keypoints[10].score;

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("left wrist x= " + left_wrist_x + "left wrist y= " + left_wrist_y);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("right wrist x= " + right_wrist_x + "right wrist y= " + right_wrist_y);
    }
}