class Playground {
    constructor(){
        this.simulation = new Simulation();
        this.mousePos = Vector2.Zero();
    }

    update(dt){
        this.simulation.update(0.25);

    }

    draw(){
        this.simulation.draw();

    }

    onMouseMove(position){
        this.mousePos = position;
    }

    onMouseDown(button){
        console.log("Mouse button Pressed: "+button + " type: " + typeof button)
        if(button == 0){
            this.simulation.spawn = !this.simulation.spawn;
        }
    }

    onMiddleMouseBtnDown(button){
        console.log("Rotation Toggled!");
        this.simulation.rotate = !this.simulation.rotate;
        
    }

    onMouseUp(button){
        console.log("Mouse botton released: "+button)
    }

    keyBoardBtnDown(event){
        switch (event.key.toLowerCase()) {
            case 's':
                console.log("S key pressed");
                // Your code for when S is pressed
                break;
            case 'p':
                console.log("P key pressed");
                // Your code for when A is pressed
                break;
            case 'v':
                console.log("V key pressed");
                // Your code for when D is pressed
                break;
            default:
                // Optionally handle other keys
                console.log(`Key ${event.key} pressed`);
                break;
        }
    }
}