class Simulation{
    constructor(){
        this.particles = [];
        this.fluidHashGrid = new FluidHashGrid(25);
        this.AMMOUNT_PARTICLES = 500;
        this.VELOCITY_DAMPING = 1;
        
        this.instantiateParticles();
        this.fluidHashGrid.initialize(this.particles);
    }

    instantiateParticles(){
        let offsetBetweenParticles = 10;
        let offsetAllParticles = new Vector2(550, 100);
        let xParticles = Math.sqrt(this.AMMOUNT_PARTICLES);
        let yParticles = xParticles;

        for(let x=0; x< xParticles; x++){
            for(let y=0; y< yParticles; y++){
                let position = new Vector2(
                    x*offsetBetweenParticles + offsetAllParticles.x, 
                    y*offsetBetweenParticles + offsetAllParticles.y);

                let particle = new Particle(position);
                particle.velocity = Scale(new Vector2(-0.5 + Math.random(), -0.5 + Math.random()), 200);


                this.particles.push(particle);
            }
        }
        }


    circleTrackMouse(mousePos){
        DrawUtils.strokePoint(mousePos, 25, "#ffffff")
    }

    neighbourSearch(mousePos){
        this.fluidHashGrid.clearGrid();
        this.fluidHashGrid.mapParticlesToCell();

        this.particles[0].position = mousePos.Cpy();

        let contentOfCell = this.fluidHashGrid.getNeighborOfParticleIdx(0);


        for(let i=0; i<this.particles.length; i++){
            this.particles[i].color="#28b0ff";
        }
        for(let i=0; i<contentOfCell.length; i++){
            let particle = contentOfCell[i];
            let direction = Sub(particle.position, mousePos);
            let distanceSquared = direction.Length2();
            if(distanceSquared < 25*25){
                particle.color="orange";
            }

        }
    }

    update(dt, mousePos){
        this.circleTrackMouse(mousePos);

        this.neighbourSearch(mousePos);
        // this.predictPositions(dt);
        // this.computeNextVelocity(dt);

        this.worldBounds();
    }

    predictPositions(dt){
        for(let i=0; i< this.particles.length; i++){
            this.particles[i].prevPosition = this.particles[i].position.Cpy();
            let positionDelta = Scale(this.particles[i].velocity, dt * this.VELOCITY_DAMPING);
            this.particles[i].position = Add(this.particles[i].position, positionDelta);
        }
    }

    computeNextVelocity(dt){
        for(let i=0; i< this.particles.length; i++){
            let velocity = Scale(Sub(this.particles[i].position, this.particles[i].prevPosition), 1.0 / dt);
            this.particles[i].velocity = velocity;

        }
    }

    worldBounds(){
        for(let i=0; i< this.particles.length; i++){
            let pos = this.particles[i].position;
            if(pos.x < 0 ){
                this.particles[i].velocity.x *= -1;
            }
            if(pos.x > canvas.width ){
                this.particles[i].velocity.x *= -1;
            }
            if(pos.y < 0 ){
                this.particles[i].velocity.y *= -1;
            }
            if(pos.y > canvas.height ){
                this.particles[i].velocity.y *= -1;
            }
        }

    }

    draw(){
        for(let i=0; i< this.particles.length; i++){
            let position = this.particles[i].position;
            let color = this.particles[i].color;
            DrawUtils.drawPoint(position, 5, color);
        }
    }

}