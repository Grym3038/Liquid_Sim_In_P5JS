class FluidHashGrid{
    constructor(cellSize){
        this.cellSize = cellSize;
        this.hashMap = new Map();
        this.hashMapSize = 10000000;
        this.prime1 = 6614058611;
        this.prime2 = 7528850467;
        this.particles = [];
    }

    initialize(particles){
        this.particles = particles;

    }

    clearGrid(){
        this.hashMap.clear();
    }




    getGridHashFromPos(position){
        let x = parseInt(position.x / this.cellSize);
        let y = parseInt(position.y / this.cellSize);

        return this.cellIndexToHash(x, y);
    }

    cellIndexToHash(x, y){
        let hash = (x * this.prime1 ^ y * this.prime2) % this.hashMapSize;
        return hash
    }

    mapParticlesToCell(){
        for(let i=0; i< this.particles.length; i++){
            let position = this.particles[i].position;
            let hash = this.getGridHashFromPos(position);

            let entries = this.hashMap.get(hash);
            if(entries == null){
                let newArray = [this.particles[i]];
                this.hashMap.set(hash, newArray);
            }else{
                entries.push(this.particles[i]);
            }
        }
    }

    getContentOfCell(id){
        let content = this.hashMap.get(id);
        if(content == null){
            return [];
        }else {
            return content;
        }
    }

}