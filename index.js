const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Maze{
    constructor(totalColumns,totalRows,boxSize,x,y){
        this.totalRows = totalRows;
        this.totalColumns = totalColumns;
        this.boxSize = boxSize;
        this.beginX = x;
        this.beginY = y;

        this.unocuppied = [];

        this.boxes = [];
        this.beginBox;

        this.functionCall = [];

        this.drawBoxes();
        this.startPath();
    }

    drawBoxes(){
        for(var r=0; r<this.totalRows-1; r++){
            this.boxes.push([]);
            this.unocuppied.push([]);
            for(var c=0; c<this.totalColumns-1; c++){
                this.boxes[r].push(new Box([(c*this.boxSize)+this.beginX,(r*this.boxSize)+this.beginY],[((c+1)*this.boxSize)+this.beginX,(r*this.boxSize)+this.beginY],[(c*this.boxSize)+this.beginX,((r+1)*this.boxSize)+this.beginY],[((c+1)*this.boxSize)+this.beginX,((r+1)*this.boxSize)+this.beginY],this.totalColumns,this.totalRows,this.boxSize,this.beginX,this.beginY,c,r));
                this.unocuppied[r].push(1);
            }
        }
    }

    startPath(){
        this.beginBox = this.boxes[this.totalRows-2][Math.floor(Math.random()*(this.totalColumns-5)+2)];
        this.beginBox.filled[3] = 0;
        this.beginBox.drawLine(this.beginBox.BL,this.beginBox.BR,'white');

        this.drawPath(this.beginBox,0,0,'up');
    }

    drawPath(currBox,turns,openNum,direction){
        this.functionCall.splice(0,1);

        if(!currBox.occupied){

            currBox.occupied = true;
            this.unocuppied[currBox.r].splice(currBox.c,1,0);

            var openNum = openNum;
            var splitProb = 0.25;
            var endProb = 0.10*openNum;
            var splits = [0,0];
            var end = false;

            if(turns < 5){
                for(var i=0;i<2;i++){
                    if(Math.random()<splitProb){
                        splits[i] = 1;
                        openNum++;
                    }
                }
                if(Math.random()<endProb){
                    end = true;
                }
            }
            else{
                end = true;
            }



            if(direction == 'up'){
                if(end){
                    currBox.drawLine(currBox.TL,currBox.TR,'black');
                    currBox.filled[0] = 1;
                    if(currBox.r > 0){
                        this.boxes[currBox.r-1][currBox.c].filled[2] = 1;
                    }
                }

                if(splits[0] == 0){
                    currBox.drawLine(currBox.TL,currBox.BL,'black');
                    currBox.filled[3] = 1;
                    if(currBox.c > 0){
                        this.boxes[currBox.r][currBox.c-1].filled[1] = 1;
                    }
                }
                if(splits[1] == 0){
                    currBox.drawLine(currBox.TR,currBox.BR,'black');
                    currBox.filled[1] = 1;  
                    if(currBox.c < this.totalColumns-2){
                        this.boxes[currBox.r][currBox.c+1].filled[3] = 1;
                    }
                }

                if(splits[0] == 1){
                    if(currBox.filled[3] == 0){
                        this.functionCall.push([this.boxes[currBox.r][currBox.c-1],0,0,'left']);
                    }
                }

                if(splits[1] == 1){
                    if(currBox.filled[1] == 0){
                        this.functionCall.push([this.boxes[currBox.r][currBox.c+1],0,0,'right']);    
                    }
                }

                if(!end){
                    if(currBox.filled[0] == 0){
                        this.functionCall.push([this.boxes[currBox.r-1][currBox.c],turns+1,openNum,'up']);
                    }
                }

            }

            if(direction == 'down'){
                if(end){
                    currBox.drawLine(currBox.BL,currBox.BR,'black');
                    currBox.filled[2] = 1;
                    if(this.r < this.totalRows-2){
                        this.boxes[currBox.r+1][currBox.c].filled[0] = 1;          
                    }
                }

                if(splits[0] == 0){
                    currBox.drawLine(currBox.TL,currBox.BL,'black');
                    currBox.filled[3] = 1;
                    if(currBox.c > 0){
                        this.boxes[currBox.r][currBox.c-1].filled[1] = 1;
                    }
                }
                if(splits[1] == 0){
                    currBox.drawLine(currBox.TR,currBox.BR,'black');
                    currBox.filled[1] = 1;  
                    if(currBox.c < this.totalColumns-2){
                        this.boxes[currBox.r][currBox.c+1].filled[3] = 1;
                    }
                }

                if(splits[0] == 1){
                    if(currBox.filled[3] == 0){
                        this.functionCall.push([this.boxes[currBox.r][currBox.c-1],0,0,'left']);
                    }
                }

                if(splits[1] == 1){
                    if(currBox.filled[1] == 0){
                        this.functionCall.push([this.boxes[currBox.r][currBox.c+1],0,0,'right']);    
                    }
                }

                if(!end){
                    if(currBox.filled[2] == 0){
                        this.functionCall.push([this.boxes[currBox.r+1][currBox.c],turns+1,openNum,'down']);
                    }
                }
            }

            if(direction == 'left'){
                if(end){
                    currBox.drawLine(currBox.TL,currBox.BL,'black');
                    currBox.filled[3] = 1;
                    if(currBox.c > 0){
                        this.boxes[currBox.r][currBox.c-1].filled[1] = 1;
                    }
                }

                if(splits[0] == 0){
                    currBox.drawLine(currBox.TL,currBox.TR,'black');
                    currBox.filled[0] = 1;
                    if(currBox.r > 0){
                        this.boxes[currBox.r-1][currBox.c].filled[2] = 1;
                    }
                }
                if(splits[1] == 0){
                    currBox.drawLine(currBox.BL,currBox.BR,'black');
                    currBox.filled[2] = 1;  
                    if(this.r < this.totalRows-2){
                        this.boxes[currBox.r+1][currBox.c].filled[0] = 1;          
                    }
                }

                if(splits[0] == 1){
                    if(currBox.filled[0] == 0){
                        this.functionCall.push([this.boxes[currBox.r-1][currBox.c],0,0,'up']);
                    }
                }

                if(splits[1] == 1){
                    if(currBox.filled[2] == 0){
                        this.functionCall.push([this.boxes[currBox.r+1][currBox.c],0,0,'down']);
                    }
                }

                if(!end){
                    if(currBox.filled[3] == 0){
                        this.functionCall.push([this.boxes[currBox.r][currBox.c-1],turns+1,openNum,'left']);
                    }
                }
            }

            if(direction == 'right'){
                if(end){
                    currBox.drawLine(currBox.TR,currBox.BR,'black');
                    currBox.filled[1] = 1;
                    if(currBox.c < this.totalColumns-2){
                        this.boxes[currBox.r][currBox.c+1].filled[3] = 1;
                    }
                }

                if(splits[0] == 0){
                    currBox.drawLine(currBox.TL,currBox.TR,'black');
                    currBox.filled[0] = 1;
                    if(currBox.r > 0){
                        this.boxes[currBox.r-1][currBox.c].filled[2] = 1;
                    }
                }
                if(splits[1] == 0){
                    currBox.drawLine(currBox.BL,currBox.BR,'black');
                    currBox.filled[2] = 1;  
                    if(this.r < this.totalRows-2){
                        this.boxes[currBox.r+1][currBox.c].filled[0] = 1;          
                    }
                }

                if(splits[0] == 1){
                    if(currBox.filled[0] == 0){
                        this.functionCall.push([this.boxes[currBox.r-1][currBox.c],0,0,'up']);
                    }
                }

                if(splits[1] == 1){
                    if(currBox.filled[2] == 0){
                        this.functionCall.push([this.boxes[currBox.r+1][currBox.c],0,0,'down']);
                    }
                }

                if(!end){
                    if(currBox.filled[1] == 0){
                        this.functionCall.push([this.boxes[currBox.r][currBox.c+1],turns+1,openNum,'right']);
                    }
                }
            }
        }

        if(this.functionCall.length>0){
            var holder = this;
            setTimeout(function(){
                holder.drawPath(holder.functionCall[0][0],holder.functionCall[0][1],holder.functionCall[0][2],holder.functionCall[0][3]);
            });
        }

        else{            
            var boxes = this.remainingSpots();
            if(boxes == false){
                this.endMaze();
            }

            else{
                var emptyBox = boxes[0];
                var filledBox = boxes[1];
                var direction = boxes[2];
                
                this.createNewPath(emptyBox,filledBox,direction);
            }
            
            
        }

    }

    endMaze(){
        this.endBox = this.boxes[0][Math.floor(Math.random()*(this.totalColumns-2))];
        this.endBox.filled[0] = 0;
        this.endBox.drawLine(this.endBox.TL,this.endBox.TR,'white');
    }

    createNewPath(emptyBox,filledBox,direction){
        if(direction == 'up'){
            filledBox.drawLine(filledBox.TL,filledBox.TR,'white');
            filledBox.filled[0] = 0;
            emptyBox.filled[2] = 0;
            this.drawPath(emptyBox,0,0,direction);
        }
        if(direction == 'down'){
            filledBox.drawLine(filledBox.BL,filledBox.BR,'white');
            filledBox.filled[2] = 0;
            emptyBox.filled[0] = 0;
            this.drawPath(emptyBox,0,0,direction);   
        }
        if(direction == 'left'){
            filledBox.drawLine(filledBox.TL,filledBox.BL,'white');
            filledBox.filled[3] = 0;
            emptyBox.filled[1] = 0;
            this.drawPath(emptyBox,0,0,direction);
        }
        if(direction == 'right'){
            filledBox.drawLine(filledBox.TR,filledBox.BR,'white');
            filledBox.filled[1] = 0;
            emptyBox.filled[3] = 0;
            this.drawPath(emptyBox,0,0,direction);
        }
    }

    remainingSpots(){
        for(var r = 0; r<this.totalRows-1; r++){
            for(var c = 0; c<this.totalColumns-1; c++){
                if(this.unocuppied[r][c] == 1){
                    var change = Math.random();
                    if(change > 0.5){
                        if(c > 0 && this.unocuppied[r][c-1] == 0){
                            return [this.boxes[r][c],this.boxes[r][c-1],'right'];
                        }
                        if(c < this.totalColumns-2 && this.unocuppied[r][c+1] == 0){
                            return [this.boxes[r][c],this.boxes[r][c+1],'left'];
                        }
                        if(r > 0 && this.unocuppied[r-1][c] == 0){
                            return [this.boxes[r][c],this.boxes[r-1][c],'down'];
                        }
                        if(r < this.totalRows-2 && this.unocuppied[r+1][c] == 0){
                            return [this.boxes[r][c],this.boxes[r+1][c],'up'];
                        }
                    }
                    else{
                        if(r > 0 && this.unocuppied[r-1][c] == 0){
                            return [this.boxes[r][c],this.boxes[r-1][c],'down'];
                        }
                        if(r < this.totalRows-2 && this.unocuppied[r+1][c] == 0){
                            return [this.boxes[r][c],this.boxes[r+1][c],'up'];
                        }
                        if(c > 0 && this.unocuppied[r][c-1] == 0){
                            return [this.boxes[r][c],this.boxes[r][c-1],'right'];
                        }
                        if(c < this.totalColumns-2 && this.unocuppied[r][c+1] == 0){
                            return [this.boxes[r][c],this.boxes[r][c+1],'left'];
                        }
                    }
                }
            }
        }
        return false;
    }
}

class Box{
    constructor(TL,TR,BL,BR,totalColumns,totalRows,boxSize,beginX,beginY,c,r){
        //TopLeft,TopRight,BottomLeft,BottomRight
        this.TL = TL;
        this.TR = TR;
        this.BL = BL;
        this.BR = BR;
        
        this.r = r;
        this.c = c;

        this.occupied = false;

        this.totalColumns = totalColumns;
        this.totalRows = totalRows;
        this.boxSize = boxSize;
        this.beginX = beginX;
        this.beginY = beginY;

        this.points = [this.TL,this.TR,this.BR,this.BL];

        //Sides Clockwise starting at Top Left->Top Right
        this.filled = [0,0,0,0];

        this.checkBorder()
    }

    checkBorder(){
        if(this.TL[0] == this.beginX){
            this.filled[3] = 1;
            this.drawLine(this.TL,this.BL,'black');
        }
        if(this.TL[1] == this.beginY){
            this.filled[0] = 1;
            this.drawLine(this.TL,this.TR,'black');
        }
        if(this.TR[0] == ((this.totalColumns-1)*this.boxSize)+this.beginX){
            this.filled[1] = 1;
            this.drawLine(this.TR,this.BR,'black');
        }
        if(this.BL[1] == ((this.totalRows-1)*this.boxSize)+this.beginY){
            this.filled[2] = 1;
            this.drawLine(this.BL,this.BR,'black');
        }
    }

    drawLine(pt1,pt2,color){
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pt1[0],pt1[1]);
        ctx.lineTo(pt2[0],pt2[1]);
        ctx.closePath();
        ctx.stroke();
    }
}

new Maze(50,50,14,10,10);

