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
            
        }
    }

    onMiddleMouseBtnDown(button){
        console.log("Rotation Toggled!");
        
    }

    onMouseUp(button){
        console.log("Mouse botton released: "+button)
    }

    keyBoardBtnDown(event){
        switch (event.key.toLowerCase()) {
            case 's':
                console.log(`Key ${event.key} pressed`);
                this.simulation.spawnBool = !this.simulation.spawnBool;
                break;
            case 'p':
                console.log(`Key ${event.key} pressed`);

                this.simulation.plasticBool = !this.simulation.plasticBool;
                break;
            case 'v':
                console.log(`Key ${event.key} pressed`);

                this.simulation.viscosityBool = !this.simulation.viscosityBool;
                break;
            case 'r':
                console.log(`Key ${event.key} pressed`);
                
                this.simulation.rotateBool = !this.simulation.rotateBool;
                break;
            default:
                // Optionally handle other keys
                console.log(`Key ${event.key} pressed`);
                break;
        }
    }
}