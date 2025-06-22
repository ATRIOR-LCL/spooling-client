import React from 'react';

interface ConfettiProps {
  play: boolean;
  x?: number;
  y?: number;
}

interface ConfettiState {
  particles: Particle[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
}

export class Confetti extends React.Component<ConfettiProps, ConfettiState> {
  private canvasRef = React.createRef<HTMLCanvasElement>();
  private animationFrameId = 0;

  constructor(props: ConfettiProps) {
    super(props);
    this.state = { particles: [] };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeCanvas);
    this.resizeCanvas();
    // 如果初始状态就是要播放，则立即启动
    if (this.props.play) {
      this.launchConfetti();
    }
  }

  componentDidUpdate(prevProps: ConfettiProps) {
    if (!prevProps.play && this.props.play) {
      this.launchConfetti();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCanvas);
    cancelAnimationFrame(this.animationFrameId);
  }

  resizeCanvas = () => {
    const canvas = this.canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  launchConfetti = () => {
    const colors = ['#FFC107', '#FF5722', '#4CAF50', '#03A9F4', '#E91E63'];
    const particles: Particle[] = [];

    const originX = this.props.x ?? window.innerWidth - 50;
    const originY = this.props.y ?? window.innerHeight - 50;

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: originX,
        y: originY,
        vx: -Math.random() * 8 - 2, // 向左（负值）
        vy: -Math.random() * 8 - 2, // 向上（负值）
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: Math.random() * 8 + 4,
        height: Math.random() * 2 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
      });
    }

    this.setState({ particles }, this.animateParticles);
  };

  animateParticles = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const particles = this.state.particles.map((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // gravity
      p.alpha -= 0.01;
      p.rotation += p.rotationSpeed;
      return p;
    }).filter(p => p.alpha > 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      ctx.restore();
    });

    if (particles.length > 0) {
      this.setState({ particles });
      this.animationFrameId = requestAnimationFrame(this.animateParticles);
    }
  };

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    );
  }
}
