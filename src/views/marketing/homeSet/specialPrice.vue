<template>
  <div id="app">
    <canvas ref="bubbleCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    <button @click="generateBubbleWithImage">生成带图气泡</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bubbles: [],
      bubbleImages: [
        'https://p26-passport.byteacctimg.com/img/user-avatar/a500a744a80b0c10abe9e536c4f854ac~50x50.awebp',
        'https://p26-passport.byteacctimg.com/img/user-avatar/a500a744a80b0c10abe9e536c4f854ac~50x50.awebp', // 更多图片链接...
      ],
      canvasWidth: 800,
      canvasHeight: 600,
      animationId: null,
    };
  },
  methods: {
    generateBubbleWithImage() {
      const canvas = this.$refs.bubbleCanvas;
      const ctx = canvas.getContext('2d');

      // 随机选择一张图片
      const randomImageIndex = Math.floor(Math.random() * this.bubbleImages.length);
      const imageUrl = this.bubbleImages[randomImageIndex];

      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const bubble = this.createNewBubble(image);
        this.bubbles.push(bubble);
        this.startAnimation(ctx);
      };
    },

  

    startAnimation(ctx) {
      if (this.animationId) {
        window.cancelAnimationFrame(this.animationId);
      }

      this.drawScene(ctx);
      this.animationId = window.requestAnimationFrame(() => this.startAnimation(ctx));
    },
 
    createNewBubble(image) {
    const bubble = {
      x: Math.random() * (this.canvasWidth - image.width),
      y: this.canvasHeight / 2, // 初始位置设置在屏幕中央附近
      vx: (Math.random() - 0.5) * 1,
      vy: -(Math.random() * 5 + 5), // 初始垂直速度向下抛出
      radius: Math.max(image.width, image.height) / 2 + 20,
      img: image,
      gravity: 0.1,
      elasticity: 0.8,
    };

    return bubble;
  },

  drawScene(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 更新每个气泡并处理弹跳效果
    this.bubbles.forEach((bubble) => {
      bubble.vy += bubble.gravity; // 加上重力影响
      bubble.x += bubble.vx * 0.05;
      bubble.y += bubble.vy;

      // 边界碰撞处理
      if (bubble.x < bubble.radius || bubble.x > ctx.canvas.width - bubble.radius) {
        bubble.vx *= -bubble.elasticity;
      }
      if (bubble.y < bubble.radius || bubble.y > ctx.canvas.height - bubble.radius) {
        bubble.vy = -(bubble.vy * bubble.elasticity); // 弹性碰撞，反弹后速度反向并减小
      }

      // 绘制气泡背景
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
      ctx.fill();

      // 绘制气泡中的图片
      ctx.drawImage(
        bubble.img,
        bubble.x - bubble.radius + (bubble.radius - bubble.img.width / 2),
        bubble.y - bubble.radius + (bubble.radius - bubble.img.height / 2),
        bubble.img.width,
        bubble.img.height,
      );
    });
  },


    // drawScene(ctx) {
    //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //   // 更新和绘制每个气泡
    //   this.bubbles.forEach((bubble) => {
    //     bubble.y += bubble.vy;
    //     bubble.vy += 0.1; // 模拟重力加速度

    //     // 边界碰撞处理
    //     if (bubble.y > this.canvasHeight + bubble.radius) {
    //       bubble.y = -bubble.radius; // 回到顶部
    //       bubble.x = Math.random() * (this.canvasWidth - bubble.radius * 2); // 重新随机位置
    //     }

    //     // 绘制气泡背景
    //     ctx.beginPath();
    //     ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    //     ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    //     ctx.fill();

    //     // 绘制气泡中的图片
    //     ctx.drawImage(
    //       bubble.img,
    //       bubble.x - bubble.radius + (bubble.radius - bubble.img.width / 2),
    //       bubble.y - bubble.radius + (bubble.radius - bubble.img.height / 2),
    //       bubble.img.width,
    //       bubble.img.height,
    //     );
    //   });
    // },
  },
  mounted() {
    // 如果需要立即显示图片，可以在此处直接调用 generateBubbleWithImage 方法
    // this.generateBubbleWithImage();
  },
};
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>