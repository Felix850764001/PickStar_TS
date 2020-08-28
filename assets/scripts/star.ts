const {ccclass, property} = cc._decorator;
import { Game } from './game';

@ccclass
export default class Star extends cc.Component {

    @property(cc.Integer) private pickRadius: number = 0;

    private game: Game = null;
    private timer: number = 0;
    private deadTime: number = 0;

    // protected onLoad(){
    //     this.timer = 0;
    // }

    public init(game: Game, time: number){
        this.game = game;
        this.deadTime = time;
    }

    private getDistance(){
        let playPos = this.game.player.getPosition();
        let dis = playPos.sub(this.node.getPosition()).mag();
        return dis;
    }

    private onPicked(){
        this.game.spawnNewStar();
        this.game.gainScore();
        this.node.destroy();
    }

    protected update(dt: number){
        if(this.getDistance() < this.pickRadius){
            this.onPicked();
        }
        this.timer += dt;
        //实现渐隐效果
        this.node.opacity = 255*(1- this.timer/this.deadTime);
    }
}
