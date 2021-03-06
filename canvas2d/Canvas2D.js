var Canvas2D = /** @class */ (function () {
    function Canvas2D(canvas) {
        this.context = canvas.getContext('2d');
    }
    Canvas2D.prototype.drawText = function (text) {
        if (this.context !== null) {
            this.context.save();
            //让要绘制的文本居中对齐
            this.context.textBaseline = 'middle';
            this.context.textAlign = 'center';
            //计算canvas的中心坐标
            var centerX = this.context.canvas.width * 0.5;
            var centerY = this.context.canvas.height * 0.5;
            //红色填充
            this.context.fillStyle = 'red';
            //调用文字填充命令
            this.context.fillText(text, centerX, centerY);
            //绿色描边
            this.context.strokeStyle = 'green';
            //调用文字描边命令
            this.context.strokeText(text, centerX, centerY);
            //将上面context中的textAlign, extBaseLine, fillStyle, strokeStyle状态恢复到初始化状态
            this.context.restore();
        }
    };
    return Canvas2D;
}());
export { Canvas2D };
