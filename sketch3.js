let mobilenet;
let video;
let label ;
let daddyButton, mummyButton, samiButton, saiButton, shrutiButton, trainButton;
function modelReady() {
    console.log('model is ready');
}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    } else {
       label=results[0].label;
        document.getElementById('labelling').innerHTML = label;

        classifier.classify(gotresults);
        console.log(results);
    }
}

function videoReady() {
    console.log('video ready');
}

function setup() {
    createCanvas(640, 640);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', video, modelReady);
    classifier = mobilenet.classification(video, videoReady)
    getPersons(daddyButton, 'a');
    getPersons(mummyButton, 'b');
    getPersons(samiButton, 'c');
    getPersons(saiButton, 'd');
    getPersons(shrutiButton, 'e');

    trainButton = createButton('train');
    trainButton.mousePressed(function () {
        classifier.train(whileTraining)
    })
}

function getPersons(button, name) {
    button = createButton(name);
    button.mousePressed(function () {
        classifier.addImage(name);
    });
}

function draw() {
    label = ''
    background(0);
    image(video, 0, 0, 640, 640);
    fill(255);
    textSize(16);
    text(label, 10, height - 30);
}

function whileTraining(loss) {
    if (loss === null) {
        console.log("Training Complete");
        classifier.classify(gotresults);
        console.log("label",gotresults[0].label)
    } else {
        console.log(loss);
    }

}