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
        console.log("Mouse button Pressed: "+button)
    }

    onMouseUp(button){
        console.log("Mouse botton released: "+button)
    }

}