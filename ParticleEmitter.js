class ParticleEmitter{
    constructor(position, direction, size, spawnInterval, amount, velocity){
        this.position = position;
        this.direction = direction;
        this.size = size;
        this.spawnInterval = spawnInterval;
        this.amount = amount;
        this.velocity = velocity;

        this.time = 0;
    }

    spawn(dt, particles){
        let offset = (this.size * 2) / this.amount;
        this.time +=dt;

        if(this.time > this.spawnInterval){
            this.time = 0;
            for(let i=0; i<this.amount; i++){
                let normal = this.direction.GetNormal();
                normal.Normalize();
                let plane = Scale(normal, -this.size);
                let planeStart = Add(this.position, plane);
                let pos = Add(planeStart, Scale(normal, offset * i));

                let particle = new Particle(pos);
                let normalizedDir = this.direction.Cpy();
                normalizedDir.Normalize();

                particle.velocity = Scale(normalizedDir, this.velocity);
                particles.push(particle);
            }
        }

    }

    rotate(angleInRadians){
        const cosAngle = Math.cos(angleInRadians);
        const sinAngle = Math.sin(angleInRadians);
        const rotatedX = this.direction.x * cosAngle - this.direction.y * sinAngle;
        const rotatedY = this.direction.x * sinAngle + this.direction.y * cosAngle;
        this.direction.x = rotatedX;
        this.direction.y = rotatedY;
    }

    move(delta){
        this.position = Add(this.position, delta);
    }

    draw(){
        let dir = this.direction.Cpy();
        dir.Normalize();
        DrawUtils.drawLine(this.position, Add(this.position, Scale(dir, 20)), "rgba(255, 255, 255, 0.4)", 1)
        
        let normal = dir.GetNormal();
        let plane = Scale(normal, -this.size);
        let planeStart = Add(this.position, plane);
        let planeEnd = Sub(this.position, plane);

        DrawUtils.drawLine(planeStart, planeEnd, "orange");
        let offset = (this.size * 2) / this.amount;
        for(let i=0; i<this.amount; i++){
            let circlePos = Add(planeStart, Scale(normal, offset * i));
            DrawUtils.drawPoint(circlePos, 5, "orange")

        }


    }

}