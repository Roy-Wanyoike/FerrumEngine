import type { InteractiveLesson } from "./types";

export const LESSONS: InteractiveLesson[] = [
  {
    id: "first-effect",
    title: "Your First Effect",
    description: "Apply a fade-in animation to an element",
    difficulty: "beginner",
    category: "Getting Started",
    explanation: `
      <h3 class="text-lg font-semibold text-white mb-3">Welcome to FerrumEngine!</h3>
      <p class="text-zinc-300 mb-4">Every great journey starts with a single step. In this lesson, you'll apply your first FerrumEngine effect — a smooth fade-in animation.</p>
      <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
        <p class="text-purple-300 text-sm font-medium mb-1">💡 Key Concept</p>
        <p class="text-zinc-300 text-sm">FerrumEngine effects are applied via CSS classes. Simply add the class to any HTML element and the animation plays automatically.</p>
      </div>
      <p class="text-zinc-300 mb-4">Your task: Add the <code class="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">rc-fade-in</code> class to the div element in the starter code. Watch it come alive!</p>
      <h4 class="text-white font-medium mb-2">What you'll learn:</h4>
      <ul class="space-y-1 text-zinc-400 text-sm list-disc list-inside">
        <li>How FerrumEngine CSS classes work</li>
        <li>The fade-in animation effect</li>
        <li>Zero-JS animation philosophy</li>
      </ul>
    `,
    starterCode: `<div class="container">
  <!-- Add the rc-fade-in class to make this fade in -->
  <div class="box">
    <h1>Hello, Ferrum!</h1>
    <p>Your first animated element</p>
  </div>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #1a1a2e;
    color: #e2e8f0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .box {
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 2.5rem;
    border-radius: 16px;
    text-align: center;
    color: white;
    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  }
  .box h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
  .box p { opacity: 0.8; font-size: 0.9rem; }
</style>`,
    solutionCode: `<div class="container">
  <div class="box rc-fade-in">
    <h1>Hello, Ferrum!</h1>
    <p>Your first animated element</p>
  </div>
</div>

<style>
  @keyframes rc-fade-in {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .rc-fade-in {
    animation: rc-fade-in 0.6s ease-out forwards;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #1a1a2e;
    color: #e2e8f0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .box {
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 2.5rem;
    border-radius: 16px;
    text-align: center;
    color: white;
    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  }
  .box h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
  .box p { opacity: 0.8; font-size: 0.9rem; }
</style>`,
    hint: "Add 'rc-fade-in' to the class attribute of the div that contains the box. The @keyframes animation will handle the rest!",
    concepts: ["CSS classes", "Keyframe animations", "Zero-JS approach"],
  },
  {
    id: "hover-transform",
    title: "Hover Transform",
    description: "Create a scale-up hover effect on a card",
    difficulty: "beginner",
    category: "Hover Effects",
    explanation: `
      <h3 class="text-lg font-semibold text-white mb-3">Hover Effects 101</h3>
      <p class="text-zinc-300 mb-4">Hover effects are the bread and butter of interactive UI. They give users immediate feedback and make your interface feel alive.</p>
      <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
        <p class="text-purple-300 text-sm font-medium mb-1">💡 Key Concept</p>
        <p class="text-zinc-300 text-sm">CSS <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">transform</code> combined with <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">transition</code> creates smooth hover effects. Use <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">scale()</code> to grow elements.</p>
      </div>
      <p class="text-zinc-300 mb-4">Your task: Write CSS to make the card scale up and add a glow shadow on hover. Use the <code class="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">.card:hover</code> selector.</p>
      <h4 class="text-white font-medium mb-2">What you'll learn:</h4>
      <ul class="space-y-1 text-zinc-400 text-sm list-disc list-inside">
        <li>CSS transition property</li>
        <li>Transform: scale()</li>
        <li>Box-shadow for glow effects</li>
      </ul>
    `,
    starterCode: `<div class="card">
  <h2>Hover Me!</h2>
  <p>I react to your cursor</p>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #1a1a2e;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .card {
    background: linear-gradient(135deg, #1e293b, #334155);
    border: 1px solid #475569;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    color: #e2e8f0;
    /* Add transition here */
    cursor: pointer;
  }
  /* Add your :hover styles here */
</style>`,
    solutionCode: `<div class="card">
  <h2>Hover Me!</h2>
  <p>I react to your cursor</p>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #1a1a2e;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .card {
    background: linear-gradient(135deg, #1e293b, #334155);
    border: 1px solid #475569;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    color: #e2e8f0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  .card:hover {
    transform: scale(1.08);
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.4),
                0 0 80px rgba(168, 85, 247, 0.15);
    border-color: rgba(168, 85, 247, 0.5);
  }
</style>`,
    hint: "Add 'transition: transform 0.3s ease, box-shadow 0.3s ease;' to .card, then write a .card:hover rule with transform: scale(1.08) and a purple box-shadow.",
    concepts: ["CSS transitions", "Transform scale", "Box-shadow glow"],
  },
  {
    id: "staggered-entrance",
    title: "Staggered Entrance",
    description: "Animate multiple elements in sequence",
    difficulty: "intermediate",
    category: "Entrance Animations",
    explanation: `
      <h3 class="text-lg font-semibold text-white mb-3">Staggered Animations</h3>
      <p class="text-zinc-300 mb-4">Staggering creates a waterfall effect where elements animate one after another, producing a polished, choreographed feel.</p>
      <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
        <p class="text-purple-300 text-sm font-medium mb-1">💡 Key Concept</p>
        <p class="text-zinc-300 text-sm">Use <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">animation-delay</code> with increasing values for each element. Combine with <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">animation-fill-mode: both</code> to keep elements hidden before their delay.</p>
      </div>
      <p class="text-zinc-300 mb-4">Your task: Make three cards fade in one after another with 0.15s delay between each. Use <code class="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">nth-child</code> selectors for different delays.</p>
      <h4 class="text-white font-medium mb-2">What you'll learn:</h4>
      <ul class="space-y-1 text-zinc-400 text-sm list-disc list-inside">
        <li>Animation-delay for staggering</li>
        <li>Nth-child selectors</li>
        <li>Fill-mode: both for pre-animation state</li>
      </ul>
    `,
    starterCode: `<div class="container">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #1a1a2e;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .container {
    display: flex;
    gap: 16px;
  }
  .card {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    border: 1px solid #334155;
    padding: 2rem 2.5rem;
    border-radius: 12px;
    color: #e2e8f0;
    font-weight: 600;
    /* Add animation properties here */
  }
  /* Add staggered delays with nth-child */
</style>`,
    solutionCode: `<div class="container">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #1a1a2e;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .container {
    display: flex;
    gap: 16px;
  }
  @keyframes stagger-fade {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .card {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    border: 1px solid #334155;
    padding: 2rem 2.5rem;
    border-radius: 12px;
    color: #e2e8f0;
    font-weight: 600;
    animation: stagger-fade 0.5s ease both;
  }
  .card:nth-child(1) { animation-delay: 0s; }
  .card:nth-child(2) { animation-delay: 0.15s; }
  .card:nth-child(3) { animation-delay: 0.3s; }
</style>`,
    hint: "Define a @keyframes animation for fade + translateY. Apply it to .card with fill-mode: both. Use .card:nth-child(2) { animation-delay: 0.15s } and .card:nth-child(3) { animation-delay: 0.3s }.",
    concepts: ["Animation-delay", "nth-child", "Fill-mode both"],
  },
  {
    id: "glass-morphism",
    title: "Glass Morphism Card",
    description: "Build a frosted glass card with backdrop-filter",
    difficulty: "intermediate",
    category: "Getting Started",
    explanation: `
      <h3 class="text-lg font-semibold text-white mb-3">Glass Morphism</h3>
      <p class="text-zinc-300 mb-4">Glass morphism is a modern design trend that creates frosted glass effects. It uses <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">backdrop-filter: blur()</code> to blur whatever is behind the element.</p>
      <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
        <p class="text-purple-300 text-sm font-medium mb-1">💡 Key Concept</p>
        <p class="text-zinc-300 text-sm">The magic trio: <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">background: rgba()</code> for translucency, <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">backdrop-filter: blur()</code> for the frosted effect, and a subtle <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">border</code> to define edges.</p>
      </div>
      <p class="text-zinc-300 mb-4">Your task: Create a glass card that floats over a colorful background. Use backdrop-filter to achieve the frosted look.</p>
      <h4 class="text-white font-medium mb-2">What you'll learn:</h4>
      <ul class="space-y-1 text-zinc-400 text-sm list-disc list-inside">
        <li>Backdrop-filter blur</li>
        <li>RGBA backgrounds</li>
        <li>Border for glass edges</li>
      </ul>
    `,
    starterCode: `<div class="bg-shapes">
  <!-- Colorful background circles -->
  <div class="circle c1"></div>
  <div class="circle c2"></div>
  <div class="circle c3"></div>
  
  <div class="glass-card">
    <h2>Glass Card</h2>
    <p>Make me see-through!</p>
  </div>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #1a1a2e;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bg-shapes {
    position: relative;
    width: 400px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .circle {
    position: absolute;
    border-radius: 50%;
  }
  .c1 { width: 200px; height: 200px; background: #a855f7; top: -30px; left: -30px; opacity: 0.6; }
  .c2 { width: 150px; height: 150px; background: #ec4899; bottom: -20px; right: -20px; opacity: 0.6; }
  .c3 { width: 120px; height: 120px; background: #06b6d4; top: 50%; right: 20%; opacity: 0.5; }
  
  .glass-card {
    position: relative;
    padding: 2rem;
    border-radius: 16px;
    color: white;
    text-align: center;
    /* Add glass effect styles here */
  }
</style>`,
    solutionCode: `<div class="bg-shapes">
  <div class="circle c1"></div>
  <div class="circle c2"></div>
  <div class="circle c3"></div>
  
  <div class="glass-card">
    <h2>Glass Card</h2>
    <p>I can see right through!</p>
  </div>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #1a1a2e;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bg-shapes {
    position: relative;
    width: 400px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .circle {
    position: absolute;
    border-radius: 50%;
  }
  .c1 { width: 200px; height: 200px; background: #a855f7; top: -30px; left: -30px; opacity: 0.6; }
  .c2 { width: 150px; height: 150px; background: #ec4899; bottom: -20px; right: -20px; opacity: 0.6; }
  .c3 { width: 120px; height: 120px; background: #06b6d4; top: 50%; right: 20%; opacity: 0.5; }
  
  .glass-card {
    position: relative;
    padding: 2rem;
    border-radius: 16px;
    color: white;
    text-align: center;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
</style>`,
    hint: "Set background: rgba(255, 255, 255, 0.08), backdrop-filter: blur(20px), and border: 1px solid rgba(255, 255, 255, 0.15) on the .glass-card class.",
    concepts: ["Backdrop-filter blur", "RGBA transparency", "Glass morphism"],
  },
  {
    id: "text-reveal",
    title: "Text Reveal Animation",
    description: "Animated text clip-path reveal effect",
    difficulty: "intermediate",
    category: "Entrance Animations",
    explanation: `
      <h3 class="text-lg font-semibold text-white mb-3">Text Reveal with Clip-Path</h3>
      <p class="text-zinc-300 mb-4">Clip-path animations create dramatic reveal effects by gradually uncovering content. This technique is widely used in modern landing pages.</p>
      <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
        <p class="text-purple-300 text-sm font-medium mb-1">💡 Key Concept</p>
        <p class="text-zinc-300 text-sm">The <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">clip-path: inset()</code> function clips elements to a rectangle. Animating from <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">inset(0 100% 0 0)</code> to <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">inset(0)</code> reveals text from left to right.</p>
      </div>
      <p class="text-zinc-300 mb-4">Your task: Create a text reveal animation using clip-path. The heading should sweep in from left to right.</p>
      <h4 class="text-white font-medium mb-2">What you'll learn:</h4>
      <ul class="space-y-1 text-zinc-400 text-sm list-disc list-inside">
        <li>Clip-path inset()</li>
        <li>Animating clip-path</li>
        <li>Dramatic text reveals</li>
      </ul>
    `,
    starterCode: `<div class="container">
  <h1 class="reveal-text">Hello World</h1>
  <p class="reveal-text delay-1">This text should reveal too</p>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #0a0a0a;
    color: #e2e8f0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .container { text-align: center; }
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #a855f7, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: 1.1rem;
    color: #94a3b8;
    margin-top: 0.5rem;
  }
  /* Add reveal animation here */
</style>`,
    solutionCode: `<div class="container">
  <h1 class="reveal-text">Hello World</h1>
  <p class="reveal-text delay-1">This text reveals too</p>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #0a0a0a;
    color: #e2e8f0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .container { text-align: center; }
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #a855f7, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: 1.1rem;
    color: #94a3b8;
    margin-top: 0.5rem;
  }
  @keyframes reveal {
    0% { clip-path: inset(0 100% 0 0); }
    100% { clip-path: inset(0 0 0 0); }
  }
  .reveal-text {
    animation: reveal 0.8s ease-out both;
  }
  .delay-1 {
    animation-delay: 0.3s;
  }
</style>`,
    hint: "Use @keyframes with clip-path: inset(0 100% 0 0) at 0% and clip-path: inset(0) at 100%. Apply to .reveal-text with animation-fill-mode: both.",
    concepts: ["Clip-path inset", "Text gradients", "Reveal animations"],
  },
  {
    id: "neon-glow",
    title: "Neon Glow Button",
    description: "Create a neon-styled glowing button",
    difficulty: "intermediate",
    category: "Hover Effects",
    explanation: `
      <h3 class="text-lg font-semibold text-white mb-3">Neon Glow Effects</h3>
      <p class="text-zinc-300 mb-4">Neon effects combine colored text with matching box-shadows to create a glowing, electric feel. This is perfect for CTAs and interactive elements.</p>
      <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
        <p class="text-purple-300 text-sm font-medium mb-1">💡 Key Concept</p>
        <p class="text-zinc-300 text-sm">Layer multiple <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">box-shadow</code> values with increasing spread and decreasing opacity for a realistic glow. On hover, intensify the shadows and add <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">text-shadow</code>.</p>
      </div>
      <p class="text-zinc-300 mb-4">Your task: Style the button with a neon glow that intensifies on hover. Choose a vibrant color — cyan, green, or pink!</p>
      <h4 class="text-white font-medium mb-2">What you'll learn:</h4>
      <ul class="space-y-1 text-zinc-400 text-sm list-disc list-inside">
        <li>Layered box-shadows</li>
        <li>Text-shadow glow</li>
        <li>Hover state intensification</li>
      </ul>
    `,
    starterCode: `<div class="container">
  <button class="neon-btn">
    Click Me
  </button>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #0a0a0a;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .neon-btn {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 14px 40px;
    border-radius: 8px;
    cursor: pointer;
    /* Add neon glow styles here */
  }
  /* Add hover state */
</style>`,
    solutionCode: `<div class="container">
  <button class="neon-btn">
    Click Me
  </button>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #0a0a0a;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .neon-btn {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 14px 40px;
    border-radius: 8px;
    cursor: pointer;
    background: transparent;
    color: #06b6d4;
    border: 2px solid #06b6d4;
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.3),
                0 0 30px rgba(6, 182, 212, 0.1),
                inset 0 0 10px rgba(6, 182, 212, 0.1);
    text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
    transition: all 0.3s ease;
  }
  .neon-btn:hover {
    background: rgba(6, 182, 212, 0.1);
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.5),
                0 0 60px rgba(6, 182, 212, 0.2),
                0 0 100px rgba(6, 182, 212, 0.1),
                inset 0 0 20px rgba(6, 182, 212, 0.15);
    text-shadow: 0 0 20px rgba(6, 182, 212, 0.8);
  }
</style>`,
    hint: "Set color and border to cyan (#06b6d4), then layer 3 box-shadows with different spread values and rgba opacity. Intify on hover with larger spreads.",
    concepts: ["Layered box-shadows", "Text-shadow", "Neon aesthetic"],
  },
  {
    id: "parallax-scroll",
    title: "Parallax Scroll Effect",
    description: "Background parallax movement on scroll",
    difficulty: "advanced",
    category: "Advanced Techniques",
    explanation: `
      <h3 class="text-lg font-semibold text-white mb-3">Parallax Scrolling</h3>
      <p class="text-zinc-300 mb-4">Parallax creates depth by moving background elements at different speeds than foreground content. This creates an immersive 3D-like effect.</p>
      <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
        <p class="text-purple-300 text-sm font-medium mb-1">💡 Key Concept</p>
        <p class="text-zinc-300 text-sm">In pure CSS parallax, use <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">perspective</code> on the container and <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">translateZ</code> with different values on child layers. Elements with larger translateZ scroll faster.</p>
      </div>
      <p class="text-zinc-300 mb-4">Your task: Create a parallax container where background shapes move at a different speed than the foreground text.</p>
      <h4 class="text-white font-medium mb-2">What you'll learn:</h4>
      <ul class="space-y-1 text-zinc-400 text-sm list-disc list-inside">
        <li>CSS perspective</li>
        <li>TranslateZ for parallax layers</li>
        <li>Overflow handling for parallax containers</li>
      </ul>
    `,
    starterCode: `<div class="parallax-container">
  <div class="bg-layer">
    <div class="shape s1"></div>
    <div class="shape s2"></div>
    <div class="shape s3"></div>
  </div>
  <div class="content">
    <h1>Parallax Effect</h1>
    <p>Scroll to see the magic</p>
  </div>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #0a0a0a;
    min-height: 200vh;
    color: #e2e8f0;
  }
  .parallax-container {
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bg-layer {
    position: absolute;
    inset: 0;
  }
  .shape {
    position: absolute;
    border-radius: 50%;
  }
  .s1 { width: 300px; height: 300px; background: rgba(168, 85, 247, 0.3); top: 10%; left: 10%; }
  .s2 { width: 200px; height: 200px; background: rgba(236, 72, 153, 0.3); bottom: 10%; right: 15%; }
  .s3 { width: 150px; height: 150px; background: rgba(6, 182, 212, 0.3); top: 40%; left: 60%; }
  .content {
    position: relative;
    text-align: center;
    z-index: 10;
  }
  h1 { font-size: 3rem; font-weight: 800; }
  p { font-size: 1.1rem; color: #94a3b8; margin-top: 0.5rem; }
  /* Add parallax CSS here */
</style>`,
    solutionCode: `<div class="parallax-container">
  <div class="bg-layer">
    <div class="shape s1"></div>
    <div class="shape s2"></div>
    <div class="shape s3"></div>
  </div>
  <div class="content">
    <h1>Parallax Effect</h1>
    <p>Scroll to see the magic</p>
  </div>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #0a0a0a;
    min-height: 200vh;
    color: #e2e8f0;
  }
  .parallax-container {
    height: 100vh;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1px;
  }
  .bg-layer {
    position: absolute;
    inset: -50px;
    transform: translateZ(-2px) scale(3);
    z-index: -1;
  }
  .shape {
    position: absolute;
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }
  .s1 { width: 300px; height: 300px; background: rgba(168, 85, 247, 0.3); top: 10%; left: 10%; }
  .s2 { width: 200px; height: 200px; background: rgba(236, 72, 153, 0.3); bottom: 10%; right: 15%; animation-delay: -2s; }
  .s3 { width: 150px; height: 150px; background: rgba(6, 182, 212, 0.3); top: 40%; left: 60%; animation-delay: -4s; }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
  }
  .content {
    position: relative;
    text-align: center;
    z-index: 10;
    transform: translateZ(0);
  }
  h1 { font-size: 3rem; font-weight: 800; }
  p { font-size: 1.1rem; color: #94a3b8; margin-top: 0.5rem; }
</style>`,
    hint: "Add 'perspective: 1px' to the container. Use 'transform: translateZ(-2px) scale(3)' on the background layer to push it back and scale it up. The content stays at translateZ(0).",
    concepts: ["CSS perspective", "TranslateZ", "Parallax layers"],
  },
  {
    id: "loading-spinners",
    title: "Loading Spinner Collection",
    description: "Compare different loading animation styles",
    difficulty: "advanced",
    category: "Advanced Techniques",
    explanation: `
      <h3 class="text-lg font-semibold text-white mb-3">Loading Spinners</h3>
      <p class="text-zinc-300 mb-4">Loading animations communicate progress and keep users engaged. Different spinner styles suit different brand aesthetics.</p>
      <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
        <p class="text-purple-300 text-sm font-medium mb-1">💡 Key Concept</p>
        <p class="text-zinc-300 text-sm">Spinners use <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">@keyframes</code> with <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">rotate()</code> and <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">border-color</code> tricks. Use <code class="bg-zinc-800 text-emerald-400 px-1 rounded text-xs">border-top-color: transparent</code> for the classic arc spinner look.</p>
      </div>
      <p class="text-zinc-300 mb-4">Your task: Create at least 3 different loading spinner styles displayed side by side.</p>
      <h4 class="text-white font-medium mb-2">What you'll learn:</h4>
      <ul class="space-y-1 text-zinc-400 text-sm list-disc list-inside">
        <li>Rotation keyframes</li>
        <li>Border color tricks</li>
        <li>Pulse and bounce animations</li>
      </ul>
    `,
    starterCode: `<div class="container">
  <div class="spinner-group">
    <div class="spinner-wrapper">
      <div class="spinner spinner-1"></div>
      <span>Arc Spinner</span>
    </div>
    <div class="spinner-wrapper">
      <div class="spinner spinner-2"></div>
      <span>Dual Ring</span>
    </div>
    <div class="spinner-wrapper">
      <div class="spinner spinner-3"></div>
      <span>Pulse Dots</span>
    </div>
  </div>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #0a0a0a;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .container { text-align: center; }
  .spinner-group {
    display: flex;
    gap: 3rem;
  }
  .spinner-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .spinner-wrapper span {
    color: #94a3b8;
    font-size: 0.85rem;
  }
  .spinner {
    /* Base spinner styles */
  }
  /* Add your spinner animations */
</style>`,
    solutionCode: `<div class="container">
  <div class="spinner-group">
    <div class="spinner-wrapper">
      <div class="spinner spinner-1"></div>
      <span>Arc Spinner</span>
    </div>
    <div class="spinner-wrapper">
      <div class="spinner spinner-2"></div>
      <span>Dual Ring</span>
    </div>
    <div class="spinner-wrapper">
      <div class="spinner spinner-3"></div>
      <span>Pulse Dots</span>
    </div>
  </div>
</div>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #0a0a0a;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .container { text-align: center; }
  .spinner-group {
    display: flex;
    gap: 3rem;
  }
  .spinner-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .spinner-wrapper span {
    color: #94a3b8;
    font-size: 0.85rem;
  }
  
  /* Arc Spinner */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .spinner-1 {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(168, 85, 247, 0.2);
    border-top-color: #a855f7;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  /* Dual Ring */
  @keyframes spin-reverse {
    to { transform: rotate(-360deg); }
  }
  .spinner-2 {
    width: 48px;
    height: 48px;
    position: relative;
    animation: spin 1.2s linear infinite;
  }
  .spinner-2::before, .spinner-2::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 3px solid transparent;
  }
  .spinner-2::before {
    border-top-color: #ec4899;
    border-bottom-color: #ec4899;
  }
  .spinner-2::after {
    border-left-color: #06b6d4;
    border-right-color: #06b6d4;
    animation: spin-reverse 0.8s linear infinite;
    inset: 6px;
  }
  
  /* Pulse Dots */
  .spinner-3 {
    display: flex;
    gap: 6px;
    width: 48px;
    justify-content: center;
  }
  .spinner-3::before, .spinner-3::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #a855f7;
    animation: pulse 1.2s ease-in-out infinite;
  }
  .spinner-3::after { animation-delay: 0.2s; }
  .spinner-3 span { animation: pulse 1.2s ease-in-out 0.4s infinite; }
  @keyframes pulse {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }
</style>`,
    hint: "Spinner 1: border + border-top-color transparent + rotate. Spinner 2: ::before/::after pseudo-elements with different borders and counter-rotation. Spinner 3: Use dots with pulse animation and staggered delays.",
    concepts: ["Rotation animations", "Pseudo-elements", "Animation staggering"],
  },
];
