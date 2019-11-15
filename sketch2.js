let mobilenet;
let video;

function modelReady(){
    console.log('model is ready');
    mobilenet.predict(video, gotresults);
}

function  gotresults(error, results){
if(error){
    console.error(error);
}else{
    console.log(results)
    let label = results[0].label;
    let prob = results[0].confidence;
    background(0)
    textSize(64);
    text(label, 10, height-100);
    createP(label);
    mobilenet.predict(gotresults);
}
}

function imageReady(){
    image(puffin, 0, 0, width, height);
}

function setup(){
    createCanvas(640, 640);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet= ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw(){
    image(video, 0,0);
}