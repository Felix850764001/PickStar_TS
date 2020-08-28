const {ccclass, property} = cc._decorator;

@ccclass
export class Game extends cc.Component {

    @property(cc.Prefab)
    private starPrefab: cc.Prefab = null;
    //星星产生时间
    @property(cc.Integer)
    private maxDuration = 0;
    @property(cc.Integer)
    private minDuration = 0;
    //地面节点
    @property(cc.Node)
    private groundNode: cc.Node = null;
    @property(cc.Node)
    public player: cc.Node = null;
    @property(cc.Label)
    private scoreLabel: cc.Label = null;

    private groundY: number;
    public timer: number;
    public starDuration: number;
    private score: number;

    protected onLoad() {
        //获取地面y坐标
        this.groundY = this.groundNode.y;
        //初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        //生成新星星
        this.spawnNewStar();
        //初始化计分
        this.score = 0;
    }

    //生成一个新星星
    public spawnNewStar(){
        let newStar = cc.instantiate(this.starPrefab);
        newStar.parent = this.node;
        //将game组件传入star实例中
        newStar.getComponent('star').init(this);
        newStar.setPosition(this.getNewStarPosition());
        this.starDuration = this.minDuration + Math.random()*(this.maxDuration - this.minDuration);
        this.timer = 0;
    }

    //随机生成星星的位置
    public getNewStarPosition(){
        //根据地面高度和主角跳跃高度，随机生成一个Y
        let randY = this.groundY + Math.random()*this.player.getComponent('player').jumpHeight + 50;
        //根据屏幕宽度 随机生成一个randX
        let randX = Math.random() * this.node.width;
        return cc.v2(randX, randY);
    }

    //得分
    public gainScore(){
        this.score += 1;
        this.scoreLabel.string = 'score: '+ this.score;
    }

    //gg
    private gameOver(){
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }

    protected update(dt: number){
        this.timer += dt;
        //超时，游戏结束
        if(this.timer > this.maxDuration){
            this.gameOver();
        }
    }
}
