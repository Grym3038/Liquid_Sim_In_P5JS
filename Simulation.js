class Simulation{
    constructor(){
        this.particles = [];
        
        this.AMMOUNT_PARTICLES = 2000;
        this.VELOCITY_DAMPING = 1;
        this.GRAVITY = new Vector2(0, 1);
        this.REST_DENSITY = 20;
        this.K_NEAR = 3;
        this.K = .25;
        this.INTERACTION_RADIUS = 25;

        this.fluidHashGrid = new FluidHashGrid(this.INTERACTION_RADIUS);
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


                this.particles.push(particle);
            }
        }
        }


    circleTrackMouse(mousePos){
        DrawUtils.strokePoint(mousePos, this.INTERACTION_RADIUS, "#ffffff")
    }

    neighbourSearch(){
        this.fluidHashGrid.clearGrid();
        this.fluidHashGrid.mapParticlesToCell();
    }

    neighbourSearchByMouse(mousePos){
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
            if(distanceSquared < this.INTERACTION_RADIUS*this.INTERACTION_RADIUS){
                particle.color="orange";
            }

        }
    }

    update(dt){
        this.applyGravity(dt);
        this.predictPositions(dt);
        this.neighbourSearch();

        this.doubleDensityRelaxation(dt);

        // this.circleTrackMouse(mousePos);

        this.worldBounds();

        this.computeNextVelocity(dt);

    }

    doubleDensityRelaxation(dt){
        for(let i=0; i< this.particles.length; i++){
            let density = 0;
            let densityNear = 0;
            let neighbors = this.fluidHashGrid.getNeighborOfParticleIdx(i);
            let particleA = this.particles[i];
            
            for(let j=0; j< neighbors.length; j++){
                let particleB = neighbors[j];
                if(particleA == particleB){
                    continue;
                }

                let rij = Sub(particleB.position, particleA.position);
                let q = rij.Length() / this.INTERACTION_RADIUS;

                if(q < 1.0){
                    density += Math.pow(1-q, 2);
                    densityNear += Math.pow(1-q, 3);
                }
            }

            let pressure = this.K * (density - this.REST_DENSITY);
            let pressureNear = this.K_NEAR * densityNear;
            let particleADisplacement = Vector2.Zero();

            for(let j=0; j< neighbors.length; j++){
                let particleB = neighbors[j];
                if(particleA == particleB){
                    continue;
                }

                let rij = Sub(particleB.position, particleA.position);
                let q = rij.Length() / this.INTERACTION_RADIUS;

                if(q < 1.0){
                    rij.Normalize();
                    let displacementTerm = Math.pow(dt, 2) * 
                        (pressure * (1-q) + pressureNear * Math.pow(1-q, 2));
                    let D = Scale(rij, displacementTerm);

                    particleB.position = Add(particleB.position, Scale(D, 0.5));
                    particleADisplacement = Sub(particleADisplacement, Scale(D, 0.5));
                }
            }
            particleA.position = Add(particleA.position, particleADisplacement);

        }
    }

    
    applyGravity(dt){
        for(let i=0; i< this.particles.length; i++){
            this.particles[i].velocity = Add(this.particles[i].velocity, Scale(this.GRAVITY, dt));
        }
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
            let prevPos = this.particles[i].prevPosition;



            if(pos.x < 0 ){
                this.particles[i].position.x = 0;
                this.particles[i].prevPosition.x = 0;

            }
            if(pos.x > canvas.width ){
                this.particles[i].position.x = canvas.width-1;
                this.particles[i].prevPosition.x = canvas.width-1;
            }
            if(pos.y < 0 ){
                this.particles[i].position.y = 0;
                this.particles[i].prevPosition.y = 0;
            }
            if(pos.y > canvas.height ){
                this.particles[i].position.y = canvas.height-1;
                this.particles[i].prevPosition.y = canvas.height-1;
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