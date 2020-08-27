const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    //跳跃高度
    @property(cc.Integer) private jumpHeight: number = 0;
    //跳跃时间
    @property(cc.Integer) private jumpDuration: number = 0;
    //移动速度
    @property(cc.Integer) private moveSpeed: number = 0;
    //加速度
    @property(cc.Integer) private accel: number = 0;

    private accLeft: boolean = false;
    private accRight: boolean = false;
    private jumpAction: cc.Action = null;
    private xSpeed: number = 0;

    protected onLoad(){
        //初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        //初始化加速度
        this.accLeft = false;
        this.accRight = false;
        //自动跳跃
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
    }

    private onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
        }
    }
    private onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
        }
    }

    //实现自动跳跃
    private setJumpAction(){
        let jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        let jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    }

    protected update(dt: number){
        //实时更新速度
        if(this.accLeft){
            this.xSpeed -= this.accel*dt;
        } else if(this.accRight){
            this.xSpeed += this.accel*dt;
        }
        //限制最大速度不超过moveSpeed
        if(this.xSpeed > this.moveSpeed){
            this.xSpeed = this.moveSpeed;
        }
        //限制player在屏幕内活动
        if(this.node.x > (this.node.parent.width - this.node.width)/2){
            this.node.x = (this.node.parent.width - this.node.width)/2;
            this.xSpeed = 0;
        } else if(this.node.x < -(this.node.parent.width - this.node.width)/2){
            this.node.x = -(this.node.parent.width - this.node.width)/2;
            this.xSpeed = 0;
        }
        this.node.x += dt*this.xSpeed;
    }
}
