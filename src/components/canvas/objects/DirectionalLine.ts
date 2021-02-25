import { fabric } from 'fabric';

const DirectionalLine = fabric.util.createClass(fabric.Line, {
  type: 'directionalLine',
  superType: 'drawing',
  initialize(points: any, options: any) {
    if (!points) {
      const { x1, x2, y1, y2 } = options;
      points = [x1, y1, x2, y2];
    }
    options = options || {};
    this.callSuper('initialize', points, options);
  },
  _render(ctx: CanvasRenderingContext2D) {
    this.callSuper('_render', ctx);
    ctx.save();
    const xDiff = this.x2 - this.x1;
    const yDiff = this.y2 - this.y1;
    const angle = Math.atan2(yDiff, xDiff) - (Math.PI / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    // Move 10px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, 10);
    ctx.lineTo(-10, -10);
    ctx.closePath();
    ctx.fillStyle = this.stroke;
    ctx.fill();
    ctx.restore();
  },
});

DirectionalLine.fromObject = (options: any, callback: any) => {
  const { x1, x2, y1, y2 } = options;
  return callback(new DirectionalLine([x1, y1, x2, y2], options));
};

// @ts-ignore
window.fabric.DirectionalLine = DirectionalLine;

export default DirectionalLine;