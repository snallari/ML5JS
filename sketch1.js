let mobilenet;
let puffin;

function modelReady(){
    console.log('model is ready');
    mobilenet.predict(puffin, gotresults);
}

function  gotresults(error, results){
if(error){
    console.error(error);
}else{
    console.log(results)
    let label = results[0].label;
    let prob = results[0].confidence;
    textSize(64);
    createP(label);
    createP(prob);
}
}

function imageReady(){
    image(puffin, 0, 0, width, height);
}

function setup(){
    createCanvas(640, 640);
    puffin = createImg('images/rose.jpg', imageReady);
    puffin.hide();
    background(0);
    mobilenet= ml5.imageClassifier('MobileNet', modelReady);
}