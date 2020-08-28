const {ccclass, property} = cc._decorator;
import { Game } from './game';

@ccclass
export default class Star extends cc.Component {

    @property(cc.Integer) private pickRadius: number = 0;

    private game: Game = null;

    public init(game: Game){
        this.game = game;
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
    }
}
