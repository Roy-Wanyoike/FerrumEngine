import type { VFXOriginalEffect } from './types';

export const originalVFXEffects: VFXOriginalEffect[] = [
  // ═══════════════════════════════════════════════════════════════════
  //  NATURE (12 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'coral-growth',
    category: 'Nature',
    description:
      'Branching organic structures emerge from anchor points and grow outward in fractal polyp formations, simulating how reef-building corals extend their calcium carbonate skeletons over time.',
    useCases: [
      'Loading indicators that organically fill space',
      'Portfolio galleries where thumbnails sprout from a central point',
      'Navigation menus that branch out on hover',
      'Data tree visualizations with organic growth animations',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Animation should pause when reduced-motion is preferred. Growth patterns must not obscure interactive children.',
    recommendedTokens: [
      '--ferrum-coral-color',
      '--ferrum-coral-branch-count',
      '--ferrum-coral-growth-duration',
      '--ferrum-coral-branch-angle',
      '--ferrum-coral-thickness',
    ],
    requiresJS: true,
    jsRequirement:
      'Generates procedural branch positions and angles via recursive algorithm; passes CSS custom properties per branch.',
  },
  {
    name: 'mycelium-network',
    category: 'Nature',
    description:
      'A subterranean fungal network of thin, translucent hyphae threads spreads across the surface, connecting nutrient nodes with organic, probabilistic pathways that pulse faintly.',
    useCases: [
      'Social network graph backgrounds',
      'Knowledge base connection visualizations',
      'Team collaboration dashboards showing linked contributors',
      'Decentralized app architecture diagrams',
    ],
    strategy: 'svg-filter',
    performanceCost: 2,
    a11yNotes:
      'Network lines must be purely decorative. Ensure sufficient contrast between lines and any overlaid text.',
    recommendedTokens: [
      '--ferrum-hyphae-color',
      '--ferrum-hyphae-width',
      '--ferrum-node-color',
      '--ferrum-node-radius',
      '--ferrum-network-density',
      '--ferrum-pulse-speed',
    ],
  },
  {
    name: 'bioluminescence',
    category: 'Nature',
    description:
      'Mimics the deep-sea creature glow where elements emit an ethereal, pulsing light from within. The luminescence intensifies and fades in organic rhythms, with a soft halo bleeding into surrounding darkness.',
    useCases: [
      'Dark-mode dashboard accent indicators',
      'Underwater or night-themed landing page hero sections',
      'Notification badges that pulse to attract attention',
      'Interactive art installations on the web',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Glow must not reduce text contrast below 4.5:1. Respect reduced-motion by making pulsing static.',
    recommendedTokens: [
      '--ferrum-bio-glow-color',
      '--ferrum-bio-glow-radius',
      '--ferrum-bio-pulse-duration',
      '--ferrum-bio-glow-intensity',
      '--ferrum-bio-halo-spread',
    ],
  },
  {
    name: 'erosion',
    category: 'Nature',
    description:
      'The element surface progressively wears away as if subjected to wind or water erosion, revealing a textured underlayer beneath. Grain and turbulence patterns determine erosion paths.',
    useCases: [
      'Transition effects between page sections',
      'Vintage or weathered aesthetic overlays',
      'Timed content reveals in storytelling interfaces',
      'Gamified progress indicators showing material wear',
    ],
    strategy: 'mask',
    performanceCost: 2,
    a11yNotes:
      'Erosion must not remove or obscure actionable elements. Text revealed beneath must maintain contrast.',
    recommendedTokens: [
      '--ferrum-erosion-amount',
      '--ferrum-erosion-speed',
      '--ferrum-erosion-grain-size',
      '--ferrum-erosion-pattern',
      '--ferrum-erosion-underlayer-color',
    ],
  },
  {
    name: 'moss-growth',
    category: 'Nature',
    description:
      'Organic green fuzz gradually colonizes the surface starting from edges and crevices, spreading inward with varied density. Each moss clump has subtle height variation and color variation between species tones.',
    useCases: [
      'Sustainability or eco-product landing pages',
      'Park and nature reserve website accents',
      'Gamification progress that "overgrows" completed sections',
      'Botanical or gardening app decorative borders',
    ],
    strategy: 'mask',
    performanceCost: 1,
    a11yNotes:
      'Moss overlay must not obscure text readability. Provide fallback flat-color backgrounds at high density.',
    recommendedTokens: [
      '--ferrum-moss-color',
      '--ferrum-moss-density',
      '--ferrum-moss-spread-speed',
      '--ferrum-moss-height-variation',
      '--ferrum-moss-species-tone',
    ],
  },
  {
    name: 'crystallization',
    category: 'Nature',
    description:
      'Ice crystal formations nucleate from seed points and grow in hexagonal dendritic patterns across the surface. Each crystal facet catches light differently, creating a sparkling, frozen texture.',
    useCases: [
      'Winter-themed promotional banners',
      'Product launch "freeze frame" transitions',
      'Data storage or cloud infrastructure visual metaphors',
      'Premium beverage or cosmetics packaging animations',
    ],
    strategy: 'svg-filter',
    performanceCost: 2,
    a11yNotes:
      'Crystal patterns should be decorative only. Sparking effects must not trigger photosensitive seizures.',
    recommendedTokens: [
      '--ferrum-crystal-color',
      '--ferrum-crystal-branch-length',
      '--ferrum-crystal-nucleation-count',
      '--ferrum-crystal-growth-rate',
      '--ferrum-crystal-facet-shine',
    ],
  },
  {
    name: 'sap-flow',
    category: 'Nature',
    description:
      'Channels of viscous, amber liquid rise through the element as if traveling through xylem vessels. The flow follows vertical paths with slight organic meandering and occasional branching.',
    useCases: [
      'Energy or resource flow indicators in dashboards',
      'Organic progress bars with living-movement feel',
      'Tree or plant-themed website accents',
      'Brewery or syrup product page animations',
    ],
    strategy: 'gradient',
    performanceCost: 1,
    a11yNotes:
      'Moving gradients must respect reduced-motion. Sap channels should not interfere with click targets.',
    recommendedTokens: [
      '--ferrum-sap-color',
      '--ferrum-sap-viscosity',
      '--ferrum-sap-flow-rate',
      '--ferrum-sap-channel-width',
      '--ferrum-sap-branch-probability',
    ],
  },
  {
    name: 'tectonic-drift',
    category: 'Nature',
    description:
      'The surface fractures into large polygonal plates that slowly shift, rotate, and press against each other. Subtle elevation changes at plate boundaries create mountain-ridge-like edge highlights.',
    useCases: [
      'Geographic or mapping application transitions',
      'Data segmentation visualization showing shifting categories',
      'Creative agency portfolio with "earth-moving" section breaks',
      'Geology or earth-science educational interfaces',
    ],
    strategy: 'clip-path',
    performanceCost: 2,
    a11yNotes:
      'Plate movement must not displace interactive elements. Text on shifting plates needs stable contrast.',
    recommendedTokens: [
      '--ferrum-plate-count',
      '--ferrum-plate-drift-speed',
      '--ferrum-plate-boundary-color',
      '--ferrum-plate-elevation-delta',
      '--ferrum-plate-rotation-range',
    ],
  },
  {
    name: 'aurora-veil',
    category: 'Nature',
    description:
      'Translucent curtains of color shimmer across the surface in flowing, ribbon-like bands. Colors shift between greens, pinks, and violets with a soft, atmospheric glow that moves with fluid dynamics.',
    useCases: [
      'Nordic or Arctic-themed landing page hero sections',
      'Music festival or creative event website backgrounds',
      'Ambient mode for media player interfaces',
      'Atmospheric overlay for photography portfolios',
    ],
    strategy: 'backdrop-filter',
    performanceCost: 2,
    a11yNotes:
      'Aurora colors must not reduce underlying text contrast. Provide high-contrast content layer above.',
    recommendedTokens: [
      '--ferrum-aurora-color-a',
      '--ferrum-aurora-color-b',
      '--ferrum-aurora-curtain-count',
      '--ferrum-aurora-flow-speed',
      '--ferrum-aurora-opacity',
      '--ferrum-aurora-blur-radius',
    ],
  },
  {
    name: 'desert-ripple',
    category: 'Nature',
    description:
      'Wavelike ridges form across the surface simulating wind-sculpted sand dunes. Parallel sine-wave patterns create a rhythmic texture with directional shadow on the lee side of each ripple.',
    useCases: [
      'Desert or travel-themed website backgrounds',
      'Minimalist texture overlays for luxury branding',
      'Audio visualization that maps waveforms to sand patterns',
      'Architectural portfolio backgrounds with arid aesthetics',
    ],
    strategy: 'gradient',
    performanceCost: 0,
    a11yNotes:
      'Ripple contrast must remain subtle. Text overlaid needs sufficient contrast against sand tones.',
    recommendedTokens: [
      '--ferrum-sand-color',
      '--ferrum-ripple-wavelength',
      '--ferrum-ripple-amplitude',
      '--ferrum-ripple-direction',
      '--ferrum-shadow-intensity',
    ],
  },
  {
    name: 'tide-pool',
    category: 'Nature',
    description:
      'A shallow layer of translucent water periodically fills and drains across the surface, revealing and concealing content beneath like a real tide pool. Small reflective highlights ripple across the water surface.',
    useCases: [
      'Coastal or marine conservation websites',
      'Interactive storytelling with reveal/conceal mechanics',
      'Spa or wellness brand ambient backgrounds',
      'Children\'s educational interfaces about marine life',
    ],
    strategy: 'mask',
    performanceCost: 1,
    a11yNotes:
      'Content hidden by tide must be accessible via other means. Water fill animation must respect reduced-motion.',
    recommendedTokens: [
      '--ferrum-water-color',
      '--ferrum-tide-cycle-duration',
      '--ferrum-water-opacity',
      '--ferrum-ripple-density',
      '--ferrum-pool-depth',
    ],
  },
  {
    name: 'pollen-drift',
    category: 'Nature',
    description:
      'Tiny luminous particles float across the surface in gentle, stochastic drift patterns. Particles vary in size and opacity, with subtle depth-of-field blur creating a sense of air and light.',
    useCases: [
      'Spring or floral-themed marketing pages',
      'Ambient particle layer for meditation apps',
      'Light, airy background for editorial content',
      'Allergy or botanical science informational interfaces',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 1,
    a11yNotes:
      'Particles must be purely decorative and not obscure interactive elements. Limit particle count for low-vision users.',
    recommendedTokens: [
      '--ferrum-pollen-color',
      '--ferrum-particle-count',
      '--ferrum-particle-size-range',
      '--ferrum-drift-speed',
      '--ferrum-particle-opacity',
    ],
    requiresJS: true,
    jsRequirement:
      'Animates particle positions along perlin-noise-based drift paths using requestAnimationFrame.',
  },

  // ═══════════════════════════════════════════════════════════════════
  //  PHYSICS (10 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'inertia',
    category: 'Physics',
    description:
      'After a user interaction ends, the element continues moving with decaying momentum as if it has mass. The over-scroll or over-drag slides to a stop with realistic friction, simulating Newton\'s first law.',
    useCases: [
      'Carousel or slider components with momentum scrolling',
      'Draggable card interfaces with realistic throw physics',
      'Scrollable panels in dashboard widgets',
      'Swipe-to-dismiss gesture feedback',
    ],
    strategy: 'transform',
    performanceCost: 1,
    a11yNotes:
      'Ensure focus remains on the element after inertial movement completes. Do not move focus targets unpredictably.',
    recommendedTokens: [
      '--ferrum-inertia-mass',
      '--ferrum-inertia-friction',
      '--ferrum-inertia-decay-rate',
      '--ferrum-inertia-max-velocity',
    ],
    requiresJS: true,
    jsRequirement:
      'Tracks velocity at pointer release, applies exponential decay to transform via requestAnimationFrame until velocity drops below threshold.',
  },
  {
    name: 'tension',
    category: 'Physics',
    description:
      'The element surface appears to stretch and thin under an applied force, with deformation radiating from the interaction point. Texture density decreases in the stretched zone while edges show stress-line highlights.',
    useCases: [
      'Rubber-band scroll indicators on mobile layouts',
      'Elastic button press feedback',
      'Interactive maps with stretchy zoom regions',
      'Physics simulation game UI elements',
    ],
    strategy: 'transform',
    performanceCost: 1,
    a11yNotes:
      'Deformation must not make text illegible. Ensure interactive targets remain hittable during stretch.',
    recommendedTokens: [
      '--ferrum-tension-stiffness',
      '--ferrum-tension-max-stretch',
      '--ferrum-tension-snap-back-easing',
      '--ferrum-tension-stress-color',
      '--ferrum-tension-radius',
    ],
  },
  {
    name: 'compression',
    category: 'Physics',
    description:
      'The element visually compresses inward from all directions when activated, as if squeezed by uniform pressure. Material appears denser at the compressed boundary with subtle bulging at unconstrained edges.',
    useCases: [
      'Button press feedback with tactile depth',
      'Accordion or collapsible section transitions',
      'Modal dialog entrance animations',
      'Gamified "squash" interaction feedback',
    ],
    strategy: 'transform',
    performanceCost: 0,
    a11yNotes:
      'Compressed text must remain legible. Animation duration should be brief to avoid disorienting users.',
    recommendedTokens: [
      '--ferrum-compression-ratio',
      '--ferrum-compression-duration',
      '--ferrum-compression-easing',
      '--ferrum-compression-bulge-amount',
    ],
  },
  {
    name: 'resonance',
    category: 'Physics',
    description:
      'Sympathetic vibration visualization where the element oscillates at increasing amplitude when reaching its natural frequency. Harmonic overtones appear as secondary, smaller oscillation patterns layered on the primary wave.',
    useCases: [
      'Audio visualizer nodes tuned to specific frequencies',
      'Loading indicators that "warm up" to full oscillation',
      'Interactive sound design tool interfaces',
      'Scientific demonstration of harmonic motion',
    ],
    strategy: 'pure-css',
    performanceCost: 1,
    a11yNotes:
      'Oscillation amplitude must be clamped to prevent vestibular discomfort. Respect reduced-motion by showing static state.',
    recommendedTokens: [
      '--ferrum-resonance-frequency',
      '--ferrum-resonance-amplitude',
      '--ferrum-resonance-damping',
      '--ferrum-harmonic-count',
      '--ferrum-resonance-color',
    ],
  },
  {
    name: 'cavitation',
    category: 'Physics',
    description:
      'Vapor bubbles rapidly form and collapse in a boiling pattern across the surface, creating localized flash points of light at each implosion. The effect simulates the violent phase change in high-pressure fluid dynamics.',
    useCases: [
      'High-energy action game UI transitions',
      'Performance monitoring dashboards for critical metrics',
      'Scientific simulation of fluid dynamics',
      'Intense loading or processing state indicators',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Rapid flashing implosion points must be limited to avoid photosensitive triggers. Provide static fallback.',
    recommendedTokens: [
      '--ferrum-cavitation-rate',
      '--ferrum-cavitation-bubble-size',
      '--ferrum-cavitation-flash-color',
      '--ferrum-cavitation-intensity',
      '--ferrum-cavitation-field-density',
    ],
    requiresJS: true,
    jsRequirement:
      'Spawns bubble elements at random positions with scale-in/collapse animations; removes DOM nodes after implosion.',
  },
  {
    name: 'magnetic-field-lines',
    category: 'Physics',
    description:
      'Invisible field lines become visible as they arc from pole to pole, curving through space according to dipole field equations. Lines are denser near the poles and fan out at the equator, with directional flow indicators.',
    useCases: [
      'Data relationship visualizations showing attraction/repulsion',
      'Magnet or electromagnetic product page animations',
      'Educational physics interfaces for field theory',
      'AI model attention or weight visualization',
    ],
    strategy: 'svg-filter',
    performanceCost: 2,
    a11yNotes:
      'Field lines are decorative. Ensure any interactive elements overlaid remain accessible and keyboard-navigable.',
    recommendedTokens: [
      '--ferrum-field-color',
      '--ferrum-field-line-count',
      '--ferrum-field-pole-spacing',
      '--ferrum-field-line-width',
      '--ferrum-field-flow-speed',
    ],
  },
  {
    name: 'sonar-pulse',
    category: 'Physics',
    description:
      'Concentric rings expand outward from a central point at regular intervals, simulating acoustic wave propagation through a medium. Ring amplitude decays with distance following inverse-square law falloff.',
    useCases: [
      'Audio playback or microphone input indicators',
      'Proximity detection visualization in IoT dashboards',
      'Search or discovery feature "ping" feedback',
      'Radar or scanning UI patterns in security interfaces',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Expanding rings must not obscure content beyond brief flash. Respect reduced-motion with single static ring.',
    recommendedTokens: [
      '--ferrum-sonar-color',
      '--ferrum-sonar-ring-spacing',
      '--ferrum-sonar-decay-rate',
      '--ferrum-sonar-pulse-interval',
      '--ferrum-sonar-max-radius',
    ],
  },
  {
    name: 'thermocline',
    category: 'Physics',
    description:
      'A visible boundary layer separates two thermal zones with distinct visual temperatures. The boundary undulates slowly, and convection currents visible as swirling flows on each side of the interface.',
    useCases: [
      'Climate or weather data visualization dashboards',
      'Temperature mapping overlays in scientific apps',
      'Hot/cold content segregation in comparison interfaces',
      'Environmental monitoring system displays',
    ],
    strategy: 'gradient',
    performanceCost: 1,
    a11yNotes:
      'Thermal color differences must not be the sole means of conveying information. Use labels and patterns as well.',
    recommendedTokens: [
      '--ferrum-therm-warm-color',
      '--ferrum-therm-cool-color',
      '--ferrum-therm-boundary-wave',
      '--ferrum-therm-convection-speed',
      '--ferrum-therm-transition-width',
    ],
  },
  {
    name: 'vortex-shedding',
    category: 'Physics',
    description:
      'Alternating vortices detach from the downstream edges of an element in a Von Kármán vortex street pattern. Each swirl rotates in opposite directions and dissipates as it drifts downstream.',
    useCases: [
      'Fluid dynamics simulation interfaces',
      'Wind or airflow visualization for engineering tools',
      'Loading states with mesmerizing flow patterns',
      'Creative portfolio backgrounds with scientific elegance',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Vortex motion must be subtle enough to avoid vestibular discomfort. Provide static fallback for motion sensitivity.',
    recommendedTokens: [
      '--ferrum-vortex-color',
      '--ferrum-vortex-shed-frequency',
      '--ferrum-vortex-size',
      '--ferrum-vortex-drift-speed',
      '--ferrum-vortex-decay-distance',
    ],
    requiresJS: true,
    jsRequirement:
      'Calculates vortex spawn timing and drift trajectory; applies CSS transforms for rotation and translation.',
  },
  {
    name: 'superconducting-flow',
    category: 'Physics',
    description:
      'Energy currents flow along the element surface with zero visual resistance — perfectly smooth, unbroken streams of light that loop continuously without decay. The effect suggests frictionless electron movement in a superconductor.',
    useCases: [
      'High-performance infrastructure or SaaS status indicators',
      'Energy monitoring dashboard accents',
      'Futuristic UI chrome for sci-fi themed applications',
      'Premium "unlimited" tier feature indicators',
    ],
    strategy: 'gradient',
    performanceCost: 1,
    a11yNotes:
      'Flowing light streams must not reduce text legibility. Ensure adequate contrast with content layers.',
    recommendedTokens: [
      '--ferrum-superconductor-color',
      '--ferrum-flow-path-count',
      '--ferrum-flow-speed',
      '--ferrum-flow-width',
      '--ferrum-flow-glow-intensity',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  //  OPTICS (10 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'caustics',
    category: 'Optics',
    description:
      'Complex, shifting light patterns appear across the surface as if light is refracting through a wavy water surface above. Bright curved lines and focal points dance in organic patterns characteristic of underwater light.',
    useCases: [
      'Pool or water-themed website hero sections',
      'Bathroom or kitchen tile product showcases',
      'Ambient background for relaxation or meditation apps',
      'Aquarium or marine exhibit digital signage',
    ],
    strategy: 'backdrop-filter',
    performanceCost: 3,
    a11yNotes:
      'Caustic patterns must be purely decorative with sufficient content contrast. Respect reduced-motion with static pattern.',
    recommendedTokens: [
      '--ferrum-caustics-intensity',
      '--ferrum-caustics-scale',
      '--ferrum-caustics-speed',
      '--ferrum-caustics-color',
      '--ferrum-caustics-blur',
    ],
  },
  {
    name: 'prismatic-split',
    category: 'Optics',
    description:
      'White light entering from one edge of the element fans out into a full visible spectrum rainbow, dispersed at increasing angles. The split light creates overlapping color bands with additive blending at intersections.',
    useCases: [
      'Creative portfolio or design tool interfaces',
      'Pride or diversity-themed event websites',
      'Optics or photography education platforms',
      'Product launches emphasizing color or light',
    ],
    strategy: 'gradient',
    performanceCost: 0,
    a11yNotes:
      'Spectrum colors must not reduce text contrast. Ensure color-blind users can distinguish content boundaries.',
    recommendedTokens: [
      '--ferrum-prism-source-angle',
      '--ferrum-prism-dispersion-spread',
      '--ferrum-prism-intensity',
      '--ferrum-prism-blend-mode',
      '--ferrum-prism-band-width',
    ],
  },
  {
    name: 'polarization',
    category: 'Optics',
    description:
      'The surface color shifts dramatically depending on the viewing angle or cursor position, simulating how polarized light reveals hidden colors in birefringent materials. Creates an iridescent, angle-dependent color wash.',
    useCases: [
      'Holographic security or authentication UI elements',
      'Premium product card hover effects',
      'Optical filter or lens product pages',
      'Creative typography with angle-reactive color',
    ],
    strategy: 'gradient',
    performanceCost: 1,
    a11yNotes:
      'Color shifts must not be the only means of conveying state. Ensure text remains readable at all angles.',
    recommendedTokens: [
      '--ferrum-polarization-color-a',
      '--ferrum-polarization-color-b',
      '--ferrum-polarization-color-c',
      '--ferrum-polarization-sensitivity',
      '--ferrum-polarization-blend-angle',
    ],
    requiresJS: true,
    jsRequirement:
      'Tracks mouse or device orientation to compute angle, updates CSS custom property for gradient rotation.',
  },
  {
    name: 'diffraction',
    category: 'Optics',
    description:
      'Light bending around the element edges creates alternating bright and dark interference fringes. The fringe spacing narrows toward the edge and widens with distance, following the single-slit diffraction envelope pattern.',
    useCases: [
      'Science or optics education platforms',
      'Futuristic UI borders with wave-interference aesthetics',
      'Light-themed product page decorative frames',
      'Physics simulation tool interfaces',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Fringe patterns must not reduce edge contrast for interactive elements. Keep decorative borders subtle.',
    recommendedTokens: [
      '--ferrum-diffraction-color',
      '--ferrum-diffraction-fringe-spacing',
      '--ferrum-diffraction-intensity',
      '--ferrum-diffraction-edge-falloff',
      '--ferrum-diffraction-band-count',
    ],
  },
  {
    name: 'fresnel-glow',
    category: 'Optics',
    description:
      'Edge-dependent reflection intensity makes the element\'s border glow brighter at grazing angles while the center remains transparent. Simulates the Fresnel equations governing reflectivity at oblique incidence.',
    useCases: [
      'Glassmorphism card borders with physically-based edges',
      'Vehicle or product configurator previews',
      '3D-adjacent UI elements needing depth cues',
      'Premium modal or dialog borders',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Edge glow must not distract from centered content. Ensure sufficient inner contrast for readability.',
    recommendedTokens: [
      '--ferrum-fresnel-edge-color',
      '--ferrum-fresnel-center-opacity',
      '--ferrum-fresnel-edge-intensity',
      '--ferrum-fresnel-spread',
      '--ferrum-fresnel-blur',
    ],
  },
  {
    name: 'chromatic-aberration',
    category: 'Optics',
    description:
      'RGB color channels are slightly offset at the edges of the element, creating subtle color fringing like a misaligned camera lens. The offset increases with distance from the optical center, producing a distinctive optical defect aesthetic.',
    useCases: [
      'Retro or lo-fi themed creative websites',
      'Photography portfolio overlays with lens-defect aesthetics',
      'Glitch or cyberpunk UI design systems',
      'Error or warning state indicators with optical distortion',
    ],
    strategy: 'filter',
    performanceCost: 1,
    a11yNotes:
      'Color channel separation must not make text unreadable. Keep offset subtle for body text areas.',
    recommendedTokens: [
      '--ferrum-aberration-offset-x',
      '--ferrum-aberration-offset-y',
      '--ferrum-aberration-intensity',
      '--ferrum-aberration-falloff',
      '--ferrum-aberration-edge-only',
    ],
  },
  {
    name: 'moire-interference',
    category: 'Optics',
    description:
      'Two overlapping fine-grain patterns create hypnotic interference bands that shift and flow as the patterns move relative to each other. The moiré pattern reveals large-scale structures from microscopic periodic details.',
    useCases: [
      'Textile or fabric industry website backgrounds',
      'Op-art inspired creative installations',
      'Print or screen resolution demonstration tools',
      'Security pattern overlays for sensitive content areas',
    ],
    strategy: 'backdrop-filter',
    performanceCost: 2,
    a11yNotes:
      'Interference patterns can cause visual discomfort at high contrast. Provide intensity controls and respect reduced-motion.',
    recommendedTokens: [
      '--ferrum-moire-pattern-a',
      '--ferrum-moire-pattern-b',
      '--ferrum-moire-scale',
      '--ferrum-moire-speed',
      '--ferrum-moire-contrast',
    ],
  },
  {
    name: 'light-pipe',
    category: 'Optics',
    description:
      'Light enters the element at one point and travels along its surface through total internal reflection, visible as a bright core with dim glow bleeding outward. The light bounces at precise angles following fiber optic principles.',
    useCases: [
      'Fiber optic or telecommunications product pages',
      'Data transmission flow visualization in network dashboards',
      'Futuristic circuit-board or PCB design interfaces',
      'Lighting product configurators',
    ],
    strategy: 'gradient',
    performanceCost: 1,
    a11yNotes:
      'Traveling light must not compete with content for attention. Use subtle opacity for text-adjacent pipes.',
    recommendedTokens: [
      '--ferrum-pipe-color',
      '--ferrum-pipe-core-width',
      '--ferrum-pipe-glow-spread',
      '--ferrum-pipe-bounce-angle',
      '--ferrum-pipe-travel-speed',
    ],
  },
  {
    name: 'birefringence',
    category: 'Optics',
    description:
      'The surface displays two overlapping, slightly offset versions of background content in different colors, simulating double refraction through a calcite crystal. The offset direction rotates as the viewing angle changes.',
    useCases: [
      'Crystal or mineral product showcase pages',
      'Science museum interactive exhibits',
      'Optical phenomena educational platforms',
      'Artistic photo overlays with prismatic doubling',
    ],
    strategy: 'filter',
    performanceCost: 2,
    a11yNotes:
      'Double images must not impair readability. Offset should be small and blurred for content areas.',
    recommendedTokens: [
      '--ferrum-biref-offset',
      '--ferrum-biref-color-a',
      '--ferrum-biref-color-b',
      '--ferrum-biref-rotation-speed',
      '--ferrum-biref-blend-mode',
    ],
    requiresJS: true,
    jsRequirement:
      'Tracks cursor position to compute birefringence angle offset, applies as CSS filter hue-rotate per layer.',
  },
  {
    name: 'tyndall-scattering',
    category: 'Optics',
    description:
      'A visible light beam crosses through a hazy medium within the element, making the beam path visible through particle scattering. Dust motes and haze particles shimmer along the beam, simulating the Tyndall effect in colloidal solutions.',
    useCases: [
      'Atmospheric or moody photography portfolio backgrounds',
      'Mystery or thriller themed website accents',
      'Spotlight or featured content highlight beams',
      'Dust or air quality monitoring dashboards',
    ],
    strategy: 'backdrop-filter',
    performanceCost: 2,
    a11yNotes:
      'Beam visibility must not reduce surrounding content contrast. Ensure beam is subtle in text-heavy areas.',
    recommendedTokens: [
      '--ferrum-tyndall-beam-color',
      '--ferrum-tyndall-beam-width',
      '--ferrum-tyndall-beam-angle',
      '--ferrum-tyndall-haze-density',
      '--ferrum-tyndall-particle-shimmer',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  //  MATERIALS SCIENCE (10 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'graphene-lattice',
    category: 'Materials Science',
    description:
      'A perfect hexagonal carbon atom lattice is rendered at molecular scale, with each node representing a carbon atom connected by single and double bonds. The lattice subtly deforms under interaction, showing material flexibility.',
    useCases: [
      'Nanotechnology or advanced materials research platforms',
      'Tech startup hero sections emphasizing cutting-edge innovation',
      'Scientific poster or paper figure backgrounds',
      'Material science education interactive diagrams',
    ],
    strategy: 'svg-filter',
    performanceCost: 2,
    a11yNotes:
      'Lattice lines are decorative. Ensure any overlaid text maintains 4.5:1 contrast against the dark lattice.',
    recommendedTokens: [
      '--ferrum-graphene-node-color',
      '--ferrum-graphene-bond-color',
      '--ferrum-graphene-cell-size',
      '--ferrum-graphene-deformation-amount',
      '--ferrum-graphene-bond-width',
    ],
  },
  {
    name: 'aerogel',
    category: 'Materials Science',
    description:
      'The element appears as an ultra-light, ghostly translucent solid with a faint blue cast. Light scatters diffusely through the nanoporous structure, creating a smoke-like solid that seems to weigh nothing yet has defined form.',
    useCases: [
      'Insulation or thermal product page backgrounds',
      'Futuristic lightweight design aesthetic for tech brands',
      'Scientific visualization of porous nanostructures',
      'Ethereal card backgrounds for minimalist layouts',
    ],
    strategy: 'backdrop-filter',
    performanceCost: 1,
    a11yNotes:
      'Translucency must not reduce text contrast below WCAG AA. Provide opaque content overlay option.',
    recommendedTokens: [
      '--ferrum-aerogel-tint',
      '--ferrum-aerogel-opacity',
      '--ferrum-aerogel-scatter-intensity',
      '--ferrum-aerogel-pore-visibility',
      '--ferrum-aerogel-blue-cast',
    ],
  },
  {
    name: 'photonic-crystal',
    category: 'Materials Science',
    description:
      'Structural color emerges from a periodic microstructure pattern rather than pigments. The surface shimmers with iridescent colors that shift based on viewing angle, simulating how butterfly wings and opals produce color.',
    useCases: [
      'Biomimicry or bio-inspiration themed websites',
      'Opal or gemstone product showcase pages',
      'Color science or optics education platforms',
      'Premium branding elements with living color shifts',
    ],
    strategy: 'gradient',
    performanceCost: 1,
    a11yNotes:
      'Color-shifting backgrounds need overlaid content with sufficient static contrast. Do not rely on color shifts alone.',
    recommendedTokens: [
      '--ferrum-photonic-period',
      '--ferrum-photonic-base-hue',
      '--ferrum-photonic-iridescence-range',
      '--ferrum-photonic-pattern-type',
      '--ferrum-photonic-intensity',
    ],
    requiresJS: true,
    jsRequirement:
      'Computes viewing angle from cursor position to shift gradient hue offset dynamically.',
  },
  {
    name: 'smart-glass',
    category: 'Materials Science',
    description:
      'The element transitions between opaque and transparent states with an electric-current activation metaphor. The transition reveals a crystalline pattern during the switching phase, mimicking electrochromic glass technology.',
    useCases: [
      'Privacy toggle UI components for settings panels',
      'Content reveal transitions in storytelling interfaces',
      'Smart home or IoT dashboard control panels',
      'Conference room or workspace booking system indicators',
    ],
    strategy: 'pure-css',
    performanceCost: 0,
    a11yNotes:
      'Transition timing must be perceivable. Ensure content in transparent state meets contrast requirements.',
    recommendedTokens: [
      '--ferrum-smart-glass-opaque-color',
      '--ferrum-smart-glass-clear-delay',
      '--ferrum-smart-glass-crystal-pattern',
      '--ferrum-smart-glass-transition-duration',
      '--ferrum-smart-glass-tint-when-clear',
    ],
  },
  {
    name: 'carbon-fiber-weave',
    category: 'Materials Science',
    description:
      'A tight, repeating 2x2 twill weave pattern creates the distinctive diagonal ridges of carbon fiber composite. The pattern has subtle directional sheen that shifts with perspective, conveying high-strength lightweight material aesthetics.',
    useCases: [
      'Automotive or aerospace product page accents',
      'Performance sports equipment branding',
      'Technical or engineering portfolio backgrounds',
      'Racing or motorsport themed UI components',
    ],
    strategy: 'gradient',
    performanceCost: 0,
    a11yNotes:
      'Weave pattern must be subtle enough not to distract from content. Avoid high-contrast weave on text areas.',
    recommendedTokens: [
      '--ferrum-carbon-base-color',
      '--ferrum-carbon-weave-scale',
      '--ferrum-carbon-sheen-angle',
      '--ferrum-carbon-ridgeline-color',
      '--ferrum-carbon-gloss-intensity',
    ],
  },
  {
    name: 'metallic-glass',
    category: 'Materials Science',
    description:
      'An amorphous metal surface with no crystalline grain boundaries, producing a perfectly smooth, mirror-like finish with unusual depth. The surface reflects with a subtly darker tone than polished crystal metal, conveying atomic disorder.',
    useCases: [
      'Premium watch or jewelry product pages',
      'Futuristic device or gadget showcase interfaces',
      'Materials engineering research visualization',
      'High-end consumer electronics configurators',
    ],
    strategy: 'gradient',
    performanceCost: 0,
    a11yNotes:
      'Mirror-like reflections can reduce content legibility. Use frosted or tinted variant for text-bearing surfaces.',
    recommendedTokens: [
      '--ferrum-metallic-glass-color',
      '--ferrum-metallic-glass-reflectivity',
      '--ferrum-metallic-glass-depth',
      '--ferrum-metallic-glass-tint',
      '--ferrum-metallic-glass-roughness',
    ],
  },
  {
    name: 'shape-memory',
    category: 'Materials Science',
    description:
      'The element deforms when interacted with but slowly returns to its original shape when the interaction ends, simulating a nitinol shape-memory alloy. The recovery animation shows a "remembered" form reasserting itself.',
    useCases: [
      'Form reset or undo interaction feedback',
      'Interactive demo of self-repairing materials',
      'Settings that "snap back" to defaults on cancel',
      'Playful button or toggle components with personality',
    ],
    strategy: 'transform',
    performanceCost: 1,
    a11yNotes:
      'Shape recovery must not displace focus rings. Ensure ARIA state updates before visual recovery begins.',
    recommendedTokens: [
      '--ferrum-memory-deform-amount',
      '--ferrum-memory-recovery-speed',
      '--ferrum-memory-recovery-easing',
      '--ferrum-memory-original-shape',
      '--ferrum-memory-elasticity',
    ],
  },
  {
    name: 'self-healing',
    category: 'Materials Science',
    description:
      'Cracks that appear on the surface during stress slowly knit themselves back together, with the damaged edges drawing toward each other and fusing. A subtle warmth glow accompanies the healing, simulating polymer chain reconnection.',
    useCases: [
      'Error recovery state indicators in applications',
      'Health or wellness app progress visuals',
      'Data integrity monitoring dashboards',
      'Gamified "repair" mechanics in achievement systems',
    ],
    strategy: 'mask',
    performanceCost: 2,
    a11yNotes:
      'Crack patterns must not be mistaken for actual damage indicators. Ensure healing animation is clearly decorative.',
    recommendedTokens: [
      '--ferrum-heal-crack-color',
      '--ferrum-heal-repair-duration',
      '--ferrum-heal-glow-color',
      '--ferrum-heal-warmth-spread',
      '--ferrum-heal-crack-density',
    ],
  },
  {
    name: 'perovskite-shimmer',
    category: 'Materials Science',
    description:
      'A thin-film surface exhibits rapid, shimmering color shifts as light interferes across multiple nanoscale layers. The effect is more vivid and dynamic than standard iridescence, with a characteristic metallic rainbow flash.',
    useCases: [
      'Solar energy product or clean-tech landing pages',
      'Next-generation display technology showcases',
      'Materials science research publication figures',
      'Futuristic energy-themed dashboard accents',
    ],
    strategy: 'gradient',
    performanceCost: 1,
    a11yNotes:
      'Rapid color shifts must respect reduced-motion. Ensure overlaid content uses sufficient contrast.',
    recommendedTokens: [
      '--ferrum-perovskite-layer-count',
      '--ferrum-perovskite-shimmer-speed',
      '--ferrum-perovskite-base-color',
      '--ferrum-perovskite-interference-intensity',
      '--ferrum-perovskite-film-thickness',
    ],
  },
  {
    name: 'hydrophobic',
    category: 'Materials Science',
    description:
      'Water droplets bead up and roll off the surface at high contact angles, leaving no trace. The surface texture creates a lotus-leaf effect where liquid forms near-perfect spheres that dart away from any tilt or interaction.',
    useCases: [
      'Waterproof or outdoor gear product pages',
      'Weather app rain visualization overlays',
      'Cleaning or hygiene product marketing sites',
      'Nano-coating or surface treatment technology demos',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Droplet animations must not obscure interactive elements. Ensure touch targets remain accessible beneath droplets.',
    recommendedTokens: [
      '--ferrum-hydro-droplet-color',
      '--ferrum-hydro-contact-angle',
      '--ferrum-hydro-roll-off-speed',
      '--ferrum-hydro-surface-tension',
      '--ferrum-hydro-bead-size',
    ],
    requiresJS: true,
    jsRequirement:
      'Simulates droplet physics with gravity, surface tension, and roll-off on tilted surfaces via requestAnimationFrame.',
  },

  // ═══════════════════════════════════════════════════════════════════
  //  ARCHITECTURE (8 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'parametric-facade',
    category: 'Architecture',
    description:
      'A dynamically generated architectural surface composed of panels whose size, angle, and opacity are driven by parametric equations. The facade breathes and shifts as parameters change, creating a living building envelope.',
    useCases: [
      'Architecture firm portfolio hero sections',
      'Generative design tool preview panels',
      'Urban planning or smart city dashboard backgrounds',
      'Creative agency websites with computational design aesthetics',
    ],
    strategy: 'clip-path',
    performanceCost: 2,
    a11yNotes:
      'Panel motion must be subtle for text-bearing surfaces. Ensure content remains readable across parametric states.',
    recommendedTokens: [
      '--ferrum-facade-panel-count-x',
      '--ferrum-facade-panel-count-y',
      '--ferrum-facade-wave-function',
      '--ferrum-facade-panel-color',
      '--ferrum-facade-rotation-range',
    ],
    requiresJS: true,
    jsRequirement:
      'Evaluates parametric functions per panel to compute clip-path polygon points and opacity values.',
  },
  {
    name: 'stained-glass',
    category: 'Architecture',
    description:
      'The surface is divided into organic lead-line segments filled with rich, translucent color. Light appears to pass through from behind, creating colored illumination on the content layer with dark mortar lines separating each pane.',
    useCases: [
      'Church or cathedral event websites',
      'Artisan or craftsman product showcases',
      'Heritage or historical institution digital experiences',
      'Color theory education interactive tools',
    ],
    strategy: 'clip-path',
    performanceCost: 1,
    a11yNotes:
      'Colored segments must not reduce text contrast below 4.5:1. Lead lines should not divide interactive controls.',
    recommendedTokens: [
      '--ferrum-glass-lead-color',
      '--ferrum-glass-lead-width',
      '--ferrum-glass-palette',
      '--ferrum-glass-light-intensity',
      '--ferrum-glass-pattern-complexity',
    ],
  },
  {
    name: 'brutalist-concrete',
    category: 'Architecture',
    description:
      'Raw, honest material texture with visible aggregate particles embedded in a gray cement matrix. Surface has slight pitting, form-line impressions, and color variation that convey the monumental weight of Brutalist architecture.',
    useCases: [
      'Architecture or urban photography portfolios',
      'Construction or engineering firm websites',
      'Editorial layouts with bold, heavy typography',
      'Museum or gallery exhibition page backgrounds',
    ],
    strategy: 'filter',
    performanceCost: 0,
    a11yNotes:
      'Textured backgrounds need high-contrast content overlays. Ensure aggregate pattern does not impair readability.',
    recommendedTokens: [
      '--ferrum-concrete-base-color',
      '--ferrum-concrete-aggregate-size',
      '--ferrum-concrete-pit-density',
      '--ferrum-concrete-form-line-visible',
      '--ferrum-concrete-color-variation',
    ],
  },
  {
    name: 'gothic-ribbed-vault',
    category: 'Architecture',
    description:
      'Pointed arch ribs intersect across the surface forming a vaulted ceiling pattern. Ribs meet at keystones with decorative bosses, and the spaces between ribs (spandrels) are filled with deeper color, creating vertical lift and sacred geometry.',
    useCases: [
      'Gothic or medieval themed event websites',
      'Historic preservation or heritage organization pages',
      'Choir or classical music performance platforms',
      'Religious or spiritual community digital spaces',
    ],
    strategy: 'svg-filter',
    performanceCost: 1,
    a11yNotes:
      'Vault ribs are decorative. Content in spandrel areas must maintain sufficient contrast against fill color.',
    recommendedTokens: [
      '--ferrum-vault-rib-color',
      '--ferrum-vault-spandrel-color',
      '--ferrum-vault-arch-pointedness',
      '--ferrum-vault-boss-size',
      '--ferrum-vault-intersection-count',
    ],
  },
  {
    name: 'tensegrity',
    category: 'Architecture',
    description:
      'Floating compression members appear to hover in space, connected by visible tension cables under strain. The structural illusion creates an impossible architecture where solid elements seem to defy gravity through balanced forces.',
    useCases: [
      'Structural engineering portfolio highlights',
      'Physics or architecture education platforms',
      'Minimalist design system hero sections',
      'Innovation or R&D department landing pages',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Floating elements must not confuse spatial navigation. Ensure content hierarchy is clear despite visual tension.',
    recommendedTokens: [
      '--ferrum-tensegrity-strut-color',
      '--ferrum-tensegrity-cable-color',
      '--ferrum-tensegrity-strut-size',
      '--ferrum-tensegrity-cable-tension',
      '--ferrum-tensegrity-hover-float',
    ],
  },
  {
    name: 'deconstructivist-twist',
    category: 'Architecture',
    description:
      'The element appears to be a rigid form that has been torqued or sheared, with surfaces at conflicting angles creating dynamic tension. Planes intersect at unexpected angles, evoking the fragmented geometry of Zaha Hadid or Frank Gehry.',
    useCases: [
      'Avant-garde fashion or design brand websites',
      'Architecture school or program showcases',
      'Art gallery or contemporary museum digital experiences',
      'Experimental music or performance art event pages',
    ],
    strategy: 'transform',
    performanceCost: 1,
    a11yNotes:
      'Twisted geometry must not make content unreadable. Provide readable content layer that counteracts visual distortion.',
    recommendedTokens: [
      '--ferrum-decon-twist-angle',
      '--ferrum-decon-shear-amount',
      '--ferrum-decon-plane-count',
      '--ferrum-decon-intersection-color',
      '--ferrum-decon-depth-offset',
    ],
  },
  {
    name: 'biophilic-lattice',
    category: 'Architecture',
    description:
      'An organic, nature-inspired screen or brise-soleil pattern based on Voronoi tessellation. The lattice has irregular cell sizes mimicking natural leaf venation or dragonfly wing patterns, filtering light and view in biomimetic fashion.',
    useCases: [
      'Sustainable architecture project showcases',
      'Wellness or biophilic design product pages',
      'Green building certification or LEED dashboards',
      'Nature-positive brand website accents',
    ],
    strategy: 'mask',
    performanceCost: 1,
    a11yNotes:
      'Lattice holes must not be so large that content falls through. Ensure text and interactive targets are not bisected.',
    recommendedTokens: [
      '--ferrum-biophilic-cell-count',
      '--ferrum-biophilic-lattice-color',
      '--ferrum-biophilic-opening-ratio',
      '--ferrum-biophilic-border-width',
      '--ferrum-biophilic-randomness',
    ],
  },
  {
    name: 'kinetic-facade',
    category: 'Architecture',
    description:
      'Individual panels across the surface rotate or flip independently, creating a wave-like ripple of motion across the facade. Each panel reacts to a simulated wind or light stimulus, producing mesmerizing collective motion from simple individual rules.',
    useCases: [
      'Smart building or IoT dashboard visualizations',
      'Responsive design showcase animations',
      'Architectural visualization portfolio pieces',
      'Interactive art installation web companions',
    ],
    strategy: 'transform',
    performanceCost: 2,
    a11yNotes:
      'Panel flipping must respect reduced-motion. Ensure content visibility is not compromised during panel movement.',
    recommendedTokens: [
      '--ferrum-kinetic-panel-count',
      '--ferrum-kinetic-flip-range',
      '--ferrum-kinetic-wave-speed',
      '--ferrum-kinetic-stimulus-type',
      '--ferrum-kinetic-panel-color',
    ],
    requiresJS: true,
    jsRequirement:
      'Simulates wind wave propagation across panel grid, updates per-panel CSS transform rotation via custom properties.',
  },

  // ═══════════════════════════════════════════════════════════════════
  //  SPACE (8 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'wormhole',
    category: 'Space',
    description:
      'A tunnel-like distortion warps the center of the element as if spacetime is folding through itself. Stars and light streak along curved paths toward the singularity point, creating a gravitational lensing effect that bends the visible background.',
    useCases: [
      'Page transition effects for sci-fi themed applications',
      'Portal or navigation element metaphors',
      'VR or AR application loading screens',
      'Space exploration game UI backgrounds',
    ],
    strategy: 'filter',
    performanceCost: 3,
    a11yNotes:
      'Strong distortion may cause motion sickness. Provide reduced-motion fallback with static glow. Limit animation duration.',
    recommendedTokens: [
      '--ferrum-wormhole-depth',
      '--ferrum-wormhole-twist',
      '--ferrum-wormhole-edge-color',
      '--ferrum-wormhole-lensing-strength',
      '--ferrum-wormhole-star-streak-speed',
    ],
  },
  {
    name: 'singularity',
    category: 'Space',
    description:
      'A point of infinite visual density at the center absorbs all surrounding light and color into an inescapable void. An accretion ring of bright, Doppler-shifted material orbits the dark center with one side bluer and brighter than the other.',
    useCases: [
      'Error or "dead end" page visuals',
      'Data deletion or permanent action confirmations',
      'Cosmology or astrophysics educational platforms',
      'Dark mode "black hole" aesthetic hero sections',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Central void must not hide critical content. Accretion ring brightness must not impair surrounding readability.',
    recommendedTokens: [
      '--ferrum-singularity-void-size',
      '--ferrum-singularity-accretion-color',
      '--ferrum-singularity-doppler-shift',
      '--ferrum-singularity-orbit-speed',
      '--ferrum-singularity-gravity-radius',
    ],
  },
  {
    name: 'accretion-disk',
    category: 'Space',
    description:
      'A flattened, elliptical disk of superheated matter spirals inward with differential rotation — inner material orbits faster than outer. The disk glows with temperature-graded color from red at the edge to white-hot near the center.',
    useCases: [
      'Loading or processing state animations with cosmic theming',
      'Data funnel or pipeline visualization',
      'Astrophysics research presentation backgrounds',
      'Space game orbital mechanics visualization',
    ],
    strategy: 'gradient',
    performanceCost: 1,
    a11yNotes:
      'Spiraling motion must respect reduced-motion preferences. Ensure text overlays have opaque backing for contrast.',
    recommendedTokens: [
      '--ferrum-disk-inner-color',
      '--ferrum-disk-outer-color',
      '--ferrum-disk-rotation-differential',
      '--ferrum-disk-tilt-angle',
      '--ferrum-disk-spiral-arm-count',
    ],
  },
  {
    name: 'nebula-birth',
    category: 'Space',
    description:
      'Volumetric clouds of gas and dust collapse inward from diffuse wisps into denser, brighter cores. The collapsing gas shows temperature-graded coloration — cool reds and oranges at the edges transitioning to hot blues and whites at stellar nursery cores.',
    useCases: [
      'Creative project or startup launch "birth" animations',
      'Generative art background for cosmic themed sites',
      'Star formation education interactive visuals',
      'Music visualizer background with cosmic aesthetics',
    ],
    strategy: 'backdrop-filter',
    performanceCost: 3,
    a11yNotes:
      'Cloud motion must be subtle. Provide static fallback. Do not use rapid, high-contrast flashing near text.',
    recommendedTokens: [
      '--ferrum-nebula-cloud-count',
      '--ferrum-nebula-collapse-speed',
      '--ferrum-nebula-core-temperature-color',
      '--ferrum-nebula-edge-color',
      '--ferrum-nebula-density',
    ],
  },
  {
    name: 'solar-flare',
    category: 'Space',
    description:
      'A bright, active surface periodically erupts with looping plasma arcs that leap outward and curve back under magnetic forces. The flare produces a brief, intense flash followed by cooler, dimmer post-eruption glow.',
    useCases: [
      'High-energy notification or alert animations',
      'Content update or "breaking news" flash indicators',
      'Solar energy company website accents',
      'System health monitoring dashboard warning states',
    ],
    strategy: 'box-shadow',
    performanceCost: 2,
    a11yNotes:
      'Flare flashes must be brief and limited in frequency. Ensure flash effects do not trigger photosensitive seizures.',
    recommendedTokens: [
      '--ferrum-flare-intensity',
      '--ferrum-flare-loop-height',
      '--ferrum-flare-duration',
      '--ferrum-flare-color',
      '--ferrum-flare-cool-down-color',
    ],
  },
  {
    name: 'asteroid-field',
    category: 'Space',
    description:
      'Irregular rocky fragments of varying sizes tumble and drift across the surface in parallax depth layers. Each fragment has rough, cratered texture with directional lighting that shifts as rocks rotate, creating spatial depth.',
    useCases: [
      'Space game level select or map screens',
      'Obstacle course or challenge progression visuals',
      'Mining or resource extraction app backgrounds',
      'Cosmic themed loading screens with depth parallax',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Moving fragments must not obscure interactive elements. Respect reduced-motion with static parallax arrangement.',
    recommendedTokens: [
      '--ferrum-asteroid-count',
      '--ferrum-asteroid-size-range',
      '--ferrum-asteroid-drift-speed',
      '--ferrum-asteroid-parallax-depth',
      '--ferrum-asteroid-light-direction',
    ],
    requiresJS: true,
    jsRequirement:
      'Animates asteroid transforms with independent rotation and drift; uses transform: translateZ for parallax layers.',
  },
  {
    name: 'comet-tail',
    category: 'Space',
    description:
      'A bright nucleus trails two distinct tails — a straight ion tail pushed by solar wind and a curved dust tail following the orbital path. The tails fade and widen with distance from the head, creating a sweeping, dramatic streak.',
    useCases: [
      'Fast-moving notification or toast entry animations',
      'Cursor trail effects on interactive canvases',
      'Page scroll progress indicators with cosmic flair',
      'Particle trail accent for featured content',
    ],
    strategy: 'gradient',
    performanceCost: 1,
    a11yNotes:
      'Trail must not persist over content after the element passes. Ensure trailing motion is brief and non-obstructive.',
    recommendedTokens: [
      '--ferrum-comet-head-color',
      '--ferrum-comet-ion-tail-color',
      '--ferrum-comet-dust-tail-color',
      '--ferrum-comet-tail-length',
      '--ferrum-comet-travel-speed',
    ],
  },
  {
    name: 'cosmic-microwave',
    category: 'Space',
    description:
      'Faint, mottled temperature fluctuations fill the surface as a visualization of the cosmic microwave background radiation. Hot and cold spots are extremely subtle — just barely perceptible variations in a uniform field — representing the seeds of all structure.',
    useCases: [
      'Cosmology or astrophysics research platforms',
      'Big data texture backgrounds suggesting vast scale',
      'Subtle ambient texture for minimal design systems',
      'Scientific data visualization base layers',
    ],
    strategy: 'filter',
    performanceCost: 0,
    a11yNotes:
      'Fluctuations must be extremely subtle. Must not create visual noise that distracts from content.',
    recommendedTokens: [
      '--ferrum-cmb-base-color',
      '--ferrum-cmb-variation-intensity',
      '--ferrum-cmb-spot-size',
      '--ferrum-cmb-temperature-range',
      '--ferrum-cmb-grain-seed',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  //  BIOLOGY (8 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'cell-division',
    category: 'Biology',
    description:
      'The element undergoes mitosis: it elongates, a cleavage furrow forms at the center, and the element splits into two daughter elements that drift apart. Chromosome-like structures briefly visible during the split add biological authenticity.',
    useCases: [
      'Content duplication or cloning UI actions',
      'Split-screen or multi-panel layout transitions',
      'Biotech or pharmaceutical product page animations',
      'Educational mitosis simulation interfaces',
    ],
    strategy: 'transform',
    performanceCost: 1,
    a11yNotes:
      'Splitting animation must not leave interactive elements orphaned. Ensure focus follows primary content during division.',
    recommendedTokens: [
      '--ferrum-division-duration',
      '--ferrum-division-furrow-color',
      '--ferrum-division-daughter-distance',
      '--ferrum-division-chromosome-color',
      '--ferrum-division-membrane-color',
    ],
  },
  {
    name: 'dna-helix',
    category: 'Biology',
    description:
      'Two intertwined helical strands rotate around a central axis with cross-linking base pairs visible between them. The double helix rotates continuously, with base pair colors following the A-T/G-C pairing rules.',
    useCases: [
      'Genomics or bioinformatics dashboard backgrounds',
      'Biotech company hero section animations',
      'DNA testing or ancestry service product pages',
      'Molecular biology education platform visuals',
    ],
    strategy: 'svg-filter',
    performanceCost: 2,
    a11yNotes:
      'Rotating helix is decorative. Text overlaid must have opaque backing or sufficient contrast at all rotation phases.',
    recommendedTokens: [
      '--ferrum-dna-strand-a-color',
      '--ferrum-dna-strand-b-color',
      '--ferrum-dna-base-pair-colors',
      '--ferrum-dna-rotation-speed',
      '--ferrum-dna-helix-radius',
      '--ferrum-dna-pitch',
    ],
  },
  {
    name: 'neural-pathway',
    category: 'Biology',
    description:
      'Branching axon-like paths extend between node clusters, with electrical impulses traveling along the paths as brief, bright pulses. Synaptic connections flash at junctions when impulses arrive, simulating brain signal propagation.',
    useCases: [
      'Brain-computer interface or neurotech product pages',
      'Learning management system progress visualization',
      'AI or ML model architecture diagrams',
      'Cognitive science or psychology education platforms',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Pulse animations must not be the sole indicator of system state. Provide text labels for node states.',
    recommendedTokens: [
      '--ferrum-neural-path-color',
      '--ferrum-neural-pulse-color',
      '--ferrum-neural-node-color',
      '--ferrum-neural-synapse-flash-color',
      '--ferrum-neural-pulse-speed',
    ],
    requiresJS: true,
    jsRequirement:
      'Manages pulse timing along SVG paths using getPointAtLength; fires synaptic flash events at node intersections.',
  },
  {
    name: 'phagocytosis',
    category: 'Biology',
    description:
      'The element extends pseudopods outward to surround and engulf a target particle. The membrane wraps around the object, forming a phagosome that is drawn into the cell body with a satisfying absorption animation.',
    useCases: [
      'Drag-and-drop "collect" or "absorb" interactions',
      'Spam or junk filtering visual metaphors',
      'Antivirus or security scan animations',
      'Educational immunology simulation tools',
    ],
    strategy: 'transform',
    performanceCost: 1,
    a11yNotes:
      'Engulfing animation must have clear start and end states. Ensure absorbed content remains accessible via other means.',
    recommendedTokens: [
      '--ferrum-phago-pseudopod-speed',
      '--ferrum-phago-membrane-color',
      '--ferrum-phago-engulf-duration',
      '--ferrum-phago-target-highlight',
      '--ferrum-phago-absorption-easing',
    ],
  },
  {
    name: 'chloroplast-absorption',
    category: 'Biology',
    description:
      'Photon-like particles rain down and are absorbed by green, disk-shaped organelles. Each absorbed photon triggers a brief flash of chemical energy that flows through interconnected thylakoid membranes, visualizing photosynthesis.',
    useCases: [
      'Solar energy conversion efficiency visualizations',
      'Sustainability or carbon-neutral product dashboards',
      'Plant biology educational interactive tools',
      'Green energy analytics with biological metaphor',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Photon rain must be decorative. Ensure text remains readable and interactive targets are not obstructed.',
    recommendedTokens: [
      '--ferrum-chloro-organelle-color',
      '--ferrum-chloro-photon-color',
      '--ferrum-chloro-absorption-rate',
      '--ferrum-chloro-energy-flow-color',
      '--ferrum-chloro-thylakoid-count',
    ],
    requiresJS: true,
    jsRequirement:
      'Spawns photon particles and animates them into organelle targets; triggers CSS animation class on absorption event.',
  },
  {
    name: 'synapse-fire',
    category: 'Biology',
    description:
      'A synaptic cleft between two elements releases neurotransmitter particles that diffuse across the gap. When sufficient particles reach the receptor side, a cascading electrical impulse fires along the post-synaptic element.',
    useCases: [
      'Real-time collaboration "connection established" animations',
      'Notification delivery visualization across components',
      'Brain health or neuroscience research platforms',
      'Learning progress "breakthrough" moment celebrations',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Neurotransmitter particles are decorative. The cascade impulse should not move or obscure focused content.',
    recommendedTokens: [
      '--ferrum-synapse-cleft-width',
      '--ferrum-synapse-transmitter-color',
      '--ferrum-synapse-impulse-color',
      '--ferrum-synapse-fire-threshold',
      '--ferrum-synapse-diffusion-speed',
    ],
  },
  {
    name: 'bioluminescent-algae',
    category: 'Biology',
    description:
      'The surface of a dark, water-like medium erupts in scattered patches of blue-green bioluminescence when disturbed. Each disturbance point triggers a ripple of light that fades slowly, mimicking dinoflagellate glow waves at night.',
    useCases: [
      'Interactive dark-mode surfaces that respond to mouse movement',
      'Ocean conservation or marine biology websites',
      'Ambient interactive art installations on the web',
      'Night-time or dark-themed event page backgrounds',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Glow patches must not reduce contrast of overlaid text. Provide option to disable mouse-triggered animation.',
    recommendedTokens: [
      '--ferrum-algae-glow-color',
      '--ferrum-algae-disturb-radius',
      '--ferrum-algae-glow-duration',
      '--ferrum-algae-water-color',
      '--ferrum-algae-trigger-threshold',
    ],
    requiresJS: true,
    jsRequirement:
      'Tracks pointer movement to spawn glow patches with position-based CSS custom properties; manages fade-out lifecycle.',
  },
  {
    name: 'myosin-walk',
    category: 'Biology',
    description:
      'Tiny motor protein structures visibly "walk" along filament tracks with a characteristic two-step stride. Each step involves a power stroke that pulls the track, visually demonstrating molecular-scale mechanical work at cellular level.',
    useCases: [
      'Progress bars with molecular-motor metaphors',
      'Biomechanics or kinesiology education visuals',
      'Nanotechnology research showcase backgrounds',
      'Automated workflow or pipeline process animations',
    ],
    strategy: 'pure-css',
    performanceCost: 1,
    a11yNotes:
      'Walking motion should be subtle. Respect reduced-motion by showing static motor position on filament.',
    recommendedTokens: [
      '--ferrum-myosin-color',
      '--ferrum-filament-color',
      '--ferrum-myosin-stride-length',
      '--ferrum-myosin-step-duration',
      '--ferrum-myosin-power-stroke-easing',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  //  CHEMISTRY (6 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'combustion',
    category: 'Chemistry',
    description:
      'An ignition point triggers a rapid chain reaction of fire propagation across the surface. The flame front advances with realistic color gradients from white-hot core through yellow and orange to red tips, with turbulent upward convection.',
    useCases: [
      'Destructive action confirmation animations',
      'Fire or heat-themed game UI elements',
      'Energy consumption monitoring visualizations',
      'Action movie or entertainment website accents',
    ],
    strategy: 'filter',
    performanceCost: 2,
    a11yNotes:
      'Fire animations must not flash rapidly. Provide reduced-motion fallback. Ensure no content is permanently obscured by flames.',
    recommendedTokens: [
      '--ferrum-combustion-ignition-color',
      '--ferrum-combustion-flame-height',
      '--ferrum-combustion-spread-rate',
      '--ferrum-combustion-turbulence',
      '--ferrum-combustion-core-temperature-color',
    ],
  },
  {
    name: 'oxidation-patina',
    category: 'Chemistry',
    description:
      'The surface progressively develops an oxidized patina layer that grows from edges and exposed areas inward. The original metal color transforms through bronze and green stages, mimicking copper weathering or iron rusting over accelerated time.',
    useCases: [
      'Vintage or heritage brand product aging effects',
      'Time-based progress or staleness indicators',
      'Historical timeline visualization accents',
      'Metalworking or sculpture portfolio aesthetics',
    ],
    strategy: 'mask',
    performanceCost: 1,
    a11yNotes:
      'Patina overlay must not reduce text contrast. Color change alone should not convey critical state information.',
    recommendedTokens: [
      '--ferrum-patina-base-color',
      '--ferrum-patina-rust-color',
      '--ferrum-patina-verdigris-color',
      '--ferrum-patina-progress',
      '--ferrum-patina-grain-structure',
    ],
  },
  {
    name: 'electrolysis',
    category: 'Chemistry',
    description:
      'Bubbles of gas form at two electrode points and rise through the medium in distinct sizes — smaller, faster bubbles at the cathode and larger, slower bubbles at the anode. The electrolyte solution subtly shifts color between the poles.',
    useCases: [
      'Battery charging or energy storage visualizations',
      'Chemistry education interactive experiments',
      'Water treatment or purification process diagrams',
      'Electroplating or surface treatment product pages',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Bubbles must be decorative. Ensure interactive elements beneath bubble layer remain accessible.',
    recommendedTokens: [
      '--ferrum-electrolyte-color',
      '--ferrum-anode-bubble-size',
      '--ferrum-cathode-bubble-size',
      '--ferrum-bubble-rise-speed',
      '--ferrum-electrode-spacing',
    ],
    requiresJS: true,
    jsRequirement:
      'Spawns bubble elements at electrode positions, applies CSS float-up animation with random horizontal drift.',
  },
  {
    name: 'precipitate-form',
    category: 'Chemistry',
    description:
      'Dissolved particles suddenly nucleate and form a visible precipitate that sinks through the solution medium. Crystals grow in size as they descend, creating a visible gradient of concentration from top (clear) to bottom (dense).',
    useCases: [
      'Data aggregation or collection visual metaphors',
      'Chemistry lab simulation or virtual experiment UIs',
      'Filtering or sedimentation process dashboards',
      'Educational chemistry animation tools',
    ],
    strategy: 'mask',
    performanceCost: 1,
    a11yNotes:
      'Precipitate must not obscure content. Falling particles should be subtle and not cause visual distraction.',
    recommendedTokens: [
      '--ferrum-precipitate-color',
      '--ferrum-precipitate-crystal-size',
      '--ferrum-precipitate-sink-speed',
      '--ferrum-solution-clear-color',
      '--ferrum-nucleation-rate',
    ],
  },
  {
    name: 'exothermic-glow',
    category: 'Chemistry',
    description:
      'A chemical reaction releases energy visualized as an expanding thermal glow that radiates outward from the reaction center. The glow transitions from intense white to cooler colors as it dissipates, following real exothermic cooling curves.',
    useCases: [
      'System event or real-time activity pulse indicators',
      'Performance spike or load burst visualizations',
      'Chemical reaction demonstration educational tools',
      'Heat map or thermal monitoring dashboard accents',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Thermal glow must be brief and controlled. Ensure glow does not reduce contrast of adjacent UI elements.',
    recommendedTokens: [
      '--ferrum-exo-peak-color',
      '--ferrum-exo-cool-color',
      '--ferrum-exo-radius-growth',
      '--ferrum-exo-cooling-rate',
      '--ferrum-exo-intensity',
    ],
  },
  {
    name: 'phase-separation',
    category: 'Chemistry',
    description:
      'Two previously mixed liquids begin to demix, forming distinct phase domains that coalesce over time. Droplets of one phase form within the other, grow, and merge until a clear boundary separates the immiscible layers.',
    useCases: [
      'Data clustering or segmentation visualization',
      'Team or resource reallocation dashboards',
      'Material science research figures',
      'Content filtering or categorization animations',
    ],
    strategy: 'backdrop-filter',
    performanceCost: 2,
    a11yNotes:
      'Separating phases must not split interactive controls between layers. Ensure content remains in one coherent zone.',
    recommendedTokens: [
      '--ferrum-phase-a-color',
      '--ferrum-phase-b-color',
      '--ferrum-phase-boundary-color',
      '--ferrum-separation-speed',
      '--ferrum-coalescence-rate',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  //  MUSIC (5 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'waveform',
    category: 'Music',
    description:
      'An oscilloscope-style waveform traces across the surface in real time, showing the amplitude of a sound wave as a continuous line that oscillates above and below a center baseline. The wave shape varies from smooth sine to complex harmonic patterns.',
    useCases: [
      'Audio or podcast player interfaces',
      'Voice recording or communication app visualizers',
      'Sound design tool waveform displays',
      'Music production DAW web interfaces',
    ],
    strategy: 'clip-path',
    performanceCost: 1,
    a11yNotes:
      'Waveform animation should respect reduced-motion. Provide static waveform fallback for accessibility.',
    recommendedTokens: [
      '--ferrum-waveform-color',
      '--ferrum-waveform-amplitude',
      '--ferrum-waveform-frequency',
      '--ferrum-waveform-thickness',
      '--ferrum-waveform-smoothing',
    ],
    requiresJS: true,
    jsRequirement:
      'Generates waveform points from audio data using Web Audio API AnalyserNode; updates CSS clip-path polygon.',
  },
  {
    name: 'equalizer',
    category: 'Music',
    description:
      'Vertical frequency bars rise and fall in response to audio energy across the spectrum. Low frequencies produce tall, slow-moving bars on the left while high frequencies create short, rapid bars on the right, with peak hold indicators.',
    useCases: [
      'Music streaming app now-playing screens',
      'DJ or electronic music event websites',
      'Audio equipment or speaker product pages',
      'Podcast or radio broadcast platform accents',
    ],
    strategy: 'transform',
    performanceCost: 1,
    a11yNotes:
      'Bar animation must not flash at seizure-inducing rates. Respect reduced-motion with static bar heights.',
    recommendedTokens: [
      '--ferrum-eq-bar-color',
      '--ferrum-eq-peak-color',
      '--ferrum-eq-bar-count',
      '--ferrum-eq-min-height',
      '--ferrum-eq-peak-hold-duration',
    ],
    requiresJS: true,
    jsRequirement:
      'Maps frequency data from AnalyserNode to bar heights; manages peak hold decay timers per bar.',
  },
  {
    name: 'reverb-tail',
    category: 'Music',
    description:
      'An initial bright impulse decays into progressively softer, more diffuse echoes that spread outward and lose definition. The effect visualizes sound reflecting off virtual walls, with each echo fainter and wider than the last.',
    useCases: [
      'Post-interaction feedback that "rings out"',
      'Audio plugin or effect processor UI demos',
      'Acoustic treatment or studio product pages',
      'Notification echo or cascade animation system',
    ],
    strategy: 'filter',
    performanceCost: 1,
    a11yNotes:
      'Echo decay must be smooth and gradual. Avoid repeated bright flashes. Respect reduced-motion with single impulse.',
    recommendedTokens: [
      '--ferrum-reverb-impulse-color',
      '--ferrum-reverb-tail-color',
      '--ferrum-reverb-decay-time',
      '--ferrum-reverb-diffusion-amount',
      '--ferrum-reverb-reflection-count',
    ],
  },
  {
    name: 'vinyl-groove',
    category: 'Music',
    description:
      'Concentric spiral grooves are etched across the surface with microscopic variations that catch light differently, mimicking a vinyl record surface. A highlight sheen rotates around the center as if a stylus is tracking the groove.',
    useCases: [
      'Vinyl record store or collector app interfaces',
      'Retro or analog-themed music platform designs',
      'Audio engineering or mastering service pages',
      'Nostalgic brand identity elements for music brands',
    ],
    strategy: 'gradient',
    performanceCost: 0,
    a11yNotes:
      'Rotating sheen should be subtle. Ensure concentric groove pattern does not cause moiré discomfort.',
    recommendedTokens: [
      '--ferrum-vinyl-groove-color',
      '--ferrum-vinyl-label-color',
      '--ferrum-vinyl-sheen-intensity',
      '--ferrum-vinyl-rotation-speed',
      '--ferrum-vinyl-groove-spacing',
    ],
  },
  {
    name: 'string-harmonics',
    category: 'Music',
    description:
      'A vibrating string oscillates at its fundamental frequency with visible overtones creating standing wave patterns. Nodes appear stationary while antinodes show maximum displacement, visualizing the harmonic series of a plucked string.',
    useCases: [
      'String instrument tuner or learning app visuals',
      'Music theory education harmonic series demonstrations',
      'Acoustic instrument product page animations',
      'Sound wave physics interactive tools',
    ],
    strategy: 'pure-css',
    performanceCost: 1,
    a11yNotes:
      'String vibration should be smooth and sinusoidal. Avoid high-frequency oscillation that could cause discomfort.',
    recommendedTokens: [
      '--ferrum-string-color',
      '--ferrum-string-harmonic-number',
      '--ferrum-string-amplitude',
      '--ferrum-string-node-color',
      '--ferrum-string-vibration-damping',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  //  AUTOMOTIVE (5 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'aerodynamic-flow',
    category: 'Automotive',
    description:
      'Streamlines flow around the element shape as if it were a body moving through air. Lines compress and accelerate over convex surfaces while separating and forming turbulent eddies in the wake, visualizing computational fluid dynamics.',
    useCases: [
      'Automotive or aerospace product page backgrounds',
      'Wind tunnel simulation UI overlays',
      'Performance optimization dashboard metaphors',
      'Engineering or CFD tool web interfaces',
    ],
    strategy: 'svg-filter',
    performanceCost: 2,
    a11yNotes:
      'Streamlines are decorative. Ensure they do not create visual noise that distracts from interactive content.',
    recommendedTokens: [
      '--ferrum-aero-line-color',
      '--ferrum-aero-line-count',
      '--ferrum-aero-flow-speed',
      '--ferrum-aero-turbulence-intensity',
      '--ferrum-aero-wake-length',
    ],
  },
  {
    name: 'turbo-spool',
    category: 'Automotive',
    description:
      'A turbine wheel spins up from idle with increasing angular velocity, accompanied by a visible pressure buildup in the intake housing. The compressor wheel creates a vortex of air that intensifies as boost pressure rises to maximum.',
    useCases: [
      'Performance car configurator loading animations',
      'Turbocharger or performance parts product pages',
      'Speed or acceleration visualization in racing game HUDs',
      'Engine performance dashboard gauge accents',
    ],
    strategy: 'transform',
    performanceCost: 1,
    a11yNotes:
      'Turbine spin must respect reduced-motion. Avoid rapid spinning that could cause vestibular discomfort.',
    recommendedTokens: [
      '--ferrum-turbo-blade-color',
      '--ferrum-turbo-housing-color',
      '--ferrum-turbo-spool-up-time',
      '--ferrum-turbo-max-rpm',
      '--ferrum-turbo-vortex-intensity',
    ],
  },
  {
    name: 'brake-glow',
    category: 'Automotive',
    description:
      'Disc brake rotors heat up under braking force, transitioning from cool steel gray through amber to bright orange-red at peak temperature. Heat shimmer waves radiate from the disc surface, and the glow intensity corresponds to braking force.',
    useCases: [
      'Racing game deceleration or braking feedback',
      'Automotive brake system product showcases',
      'Performance analytics with thermal monitoring',
      'Vehicle diagnostics dashboard warning indicators',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Heat glow transitions should be gradual. Color shifts must not be the only indicator of braking state.',
    recommendedTokens: [
      '--ferrum-brake-cold-color',
      '--ferrum-brake-hot-color',
      '--ferrum-brake-heat-up-rate',
      '--ferrum-brake-cool-down-rate',
      '--ferrum-brake-shimmer-intensity',
    ],
  },
  {
    name: 'torque-twist',
    category: 'Automotive',
    description:
      'The element visually twists along its longitudinal axis as if subjected to engine torque. One end leads while the other lags, creating a visible torsional deformation in the chassis frame with stress color highlights at maximum twist.',
    useCases: [
      'Vehicle dynamics or chassis engineering visualizations',
      'Performance car spec comparison animations',
      'Mechanical engineering education platforms',
      'Torque measurement tool or dynamometer interfaces',
    ],
    strategy: 'transform',
    performanceCost: 1,
    a11yNotes:
      'Twist deformation must not make content unreadable. Limit twist angle for text-bearing surfaces.',
    recommendedTokens: [
      '--ferrum-torque-twist-angle',
      '--ferrum-torque-stress-color',
      '--ferrum-torque-ramp-up-time',
      '--ferrum-torque-release-easing',
      '--ferrum-torque-max-deformation',
    ],
  },
  {
    name: 'exhaust-haze',
    category: 'Automotive',
    description:
      'A translucent, heat-distorted haze emanates from one edge of the element, shimmering with thermal turbulence. The exhaust plume disperses and cools as it travels, shifting from warm tones to cool, transparent dissipation.',
    useCases: [
      'Industrial or manufacturing website atmospheric backgrounds',
      'Vehicle emissions or environmental data visualization',
      'Performance exhaust system product pages',
      'Retro or muscle car themed design accents',
    ],
    strategy: 'filter',
    performanceCost: 1,
    a11yNotes:
      'Haze must not significantly reduce content visibility. Ensure text contrast is maintained through the plume.',
    recommendedTokens: [
      '--ferrum-exhaust-temperature-color',
      '--ferrum-exhaust-dissipation-rate',
      '--ferrum-exhaust-haze-opacity',
      '--ferrum-exhaust-turbulence',
      '--ferrum-exhaust-plume-direction',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  //  LUXURY (5 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'silk-drape',
    category: 'Luxury',
    description:
      'The surface behaves as if draped in fine silk fabric, with soft, flowing folds that catch light at their ridges and fall into shadow in the valleys. The folds shift gently with simulated air movement, creating liquid fabric motion.',
    useCases: [
      'High-fashion or luxury brand website hero sections',
      'Premium hotel or resort booking interfaces',
      'Fine silk or textile product showcase pages',
      'Elegant event invitation or gala websites',
    ],
    strategy: 'gradient',
    performanceCost: 1,
    a11yNotes:
      'Fabric folds must not create deep shadows that obscure text. Maintain legible contrast across all fold states.',
    recommendedTokens: [
      '--ferrum-silk-color',
      '--ferrum-silk-sheen-intensity',
      '--ferrum-silk-fold-count',
      '--ferrum-silk-air-movement',
      '--ferrum-silk-shadow-depth',
    ],
  },
  {
    name: 'gold-leaf',
    category: 'Luxury',
    description:
      'Genuine gold leaf application effect with characteristic uneven coverage, tiny cracks, and edge lifting. The metallic surface catches light with warm gold reflections and shows the darker substrate through imperfections in the leaf.',
    useCases: [
      'Luxury goods or jewelry brand identity elements',
      'Premium membership or VIP status indicators',
      'Art auction or gallery website accents',
      'Heritage brand redesign with gilded aesthetics',
    ],
    strategy: 'gradient',
    performanceCost: 0,
    a11yNotes:
      'Gold leaf texture must be subtle on text areas. Ensure sufficient contrast between gold tones and text.',
    recommendedTokens: [
      '--ferrum-gold-leaf-color',
      '--ferrum-gold-leaf-crack-density',
      '--ferrum-gold-leaf-edge-lift',
      '--ferrum-gold-substrate-color',
      '--ferrum-gold-sheen-angle',
    ],
  },
  {
    name: 'diamond-brilliance',
    category: 'Luxury',
    description:
      'Light refracts through a faceted gem surface creating brilliant white flashes and dispersed spectral fire. The pattern of scintillation shifts as the viewing angle changes, mimicking the ideal cut diamond light return profile.',
    useCases: [
      'Jewelry or gemstone e-commerce product pages',
      'Luxury brand logo or watermark animations',
      'Wedding or engagement service website accents',
      'Premium loyalty reward visualization',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Brilliant flashes must be brief and controlled. Respect reduced-motion with static sparkle pattern.',
    recommendedTokens: [
      '--ferrum-diamond-body-color',
      '--ferrum-diamond-fire-color',
      '--ferrum-diamond-scintillation-rate',
      '--ferrum-diamond-facet-count',
      '--ferrum-diamond-brilliance-intensity',
    ],
    requiresJS: true,
    jsRequirement:
      'Tracks cursor angle to reposition scintillation flash points across the simulated facet surface.',
  },
  {
    name: 'marble-vein',
    category: 'Luxury',
    description:
      'Natural marble veining flows through the surface with organic, branching patterns in contrasting colors. The veins vary in width, opacity, and curvature, creating the unique geological fingerprint characteristic of luxury stone surfaces.',
    useCases: [
      'Luxury interior design or architecture firm websites',
      'Premium real estate property listing backgrounds',
      'High-end cosmetics or skincare brand aesthetics',
      'Museum or gallery exhibition digital environments',
    ],
    strategy: 'filter',
    performanceCost: 0,
    a11yNotes:
      'Vein contrast must not interfere with text legibility. Choose vein colors that complement content readability.',
    recommendedTokens: [
      '--ferrum-marble-base-color',
      '--ferrum-marble-vein-color',
      '--ferrum-marble-vein-width',
      '--ferrum-marble-vein-branching',
      '--ferrum-marble-grain-direction',
    ],
  },
  {
    name: 'champagne-effervescence',
    category: 'Luxury',
    description:
      'Fine streams of tiny bubbles rise through a golden-amber liquid in nucleation columns. Bubbles form at irregular points on the surface, accelerate upward, and pop at the top with brief, delicate sparkle releases.',
    useCases: [
      'Celebration or event website ambient backgrounds',
      'Champagne or sparkling wine product pages',
      'New Year or milestone achievement visual effects',
      'Premium dining or hospitality brand accents',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Bubbles must be decorative. Ensure content remains readable and interactive targets are not obstructed.',
    recommendedTokens: [
      '--ferrum-champagne-liquid-color',
      '--ferrum-bubble-color',
      '--ferrum-bubble-rise-speed',
      '--ferrum-nucleation-point-count',
      '--ferrum-pop-sparkle-color',
    ],
    requiresJS: true,
    jsRequirement:
      'Manages bubble lifecycle: spawn at nucleation points, animate rise, trigger pop sparkle, and clean up DOM nodes.',
  },

  // ═══════════════════════════════════════════════════════════════════
  //  GAMING UI (5 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'health-bar-glow',
    category: 'Gaming UI',
    description:
      'A health bar that transitions through glow states as value decreases — full health pulses with a soft white aura, mid-health emits a calm green glow, low health flickers with urgent amber, and critical health throbs with a red strobe that bleeds into the surrounding UI.',
    useCases: [
      'Game HUD health or stamina displays',
      'System resource monitoring dashboards',
      'Battery or charge level indicators with urgency states',
      'Gamified progress bars with emotional feedback',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Critical state strobe must be brief and not photosensitive-triggering. Color alone must not convey health state — use labels.',
    recommendedTokens: [
      '--ferrum-health-full-color',
      '--ferrum-health-mid-color',
      '--ferrum-health-low-color',
      '--ferrum-health-critical-color',
      '--ferrum-health-pulse-speed',
    ],
  },
  {
    name: 'xp-orb',
    category: 'Gaming UI',
    description:
      'A luminous experience point orb hovers with a gentle bobbing motion, trailing soft light particles. When collected, it accelerates toward the player with a magnetic attraction curve, bursts at the collection point, and adds a satisfying numerical increment popup.',
    useCases: [
      'RPG or adventure game XP collection feedback',
      'Gamified learning platform reward animations',
      'Achievement or badge unlock celebration effects',
      'Loyalty points or currency collection interfaces',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 1,
    a11yNotes:
      'Orb collection animation must not interfere with gameplay. Ensure motion is smooth and non-jarring.',
    recommendedTokens: [
      '--ferrum-orb-color',
      '--ferrum-orb-size',
      '--ferrum-orb-bob-speed',
      '--ferrum-orb-particle-trail-color',
      '--ferrum-orb-collection-burst-color',
    ],
    requiresJS: true,
    jsRequirement:
      'Computes magnetic attraction trajectory toward collection point, manages particle trail DOM lifecycle on collection.',
  },
  {
    name: 'shield-crack',
    category: 'Gaming UI',
    description:
      'A protective energy shield visually deteriorates under damage — first showing spiderweb stress patterns, then radial cracks propagating from impact points, and finally shattering into shards that fall away before the shield regenerates.',
    useCases: [
      'Game damage or defense state indicators',
      'Security or firewall status dashboard widgets',
      'Armor or protection equipment durability displays',
      'Gamified account security health visualization',
    ],
    strategy: 'mask',
    performanceCost: 2,
    a11yNotes:
      'Crack patterns must be clearly distinct from actual UI errors. Use labels and icons alongside visual state.',
    recommendedTokens: [
      '--ferrum-shield-color',
      '--ferrum-shield-crack-color',
      '--ferrum-shield-shatter-color',
      '--ferrum-shield-regen-speed',
      '--ferrum-shield-crack-density',
    ],
  },
  {
    name: 'loot-rarity-glow',
    category: 'Gaming UI',
    description:
      'Item borders emit a distinctive glow based on rarity tier — common items have no glow, uncommon shows a subtle green outline, rare pulses with blue, epic radiates purple, and legendary items blaze with a rotating golden fire border.',
    useCases: [
      'Game inventory or loot drop visual feedback',
      'E-commerce product tier or badge level indicators',
      'Collection or achievement rarity visualization',
      'Subscription or membership tier visual differentiation',
    ],
    strategy: 'box-shadow',
    performanceCost: 1,
    a11yNotes:
      'Color-coded glow must not be the only rarity indicator. Use text labels and icons as primary identifiers.',
    recommendedTokens: [
      '--ferrum-rarity-common-color',
      '--ferrum-rarity-uncommon-color',
      '--ferrum-rarity-rare-color',
      '--ferrum-rarity-epic-color',
      '--ferrum-rarity-legendary-color',
    ],
  },
  {
    name: 'damage-flicker',
    category: 'Gaming UI',
    description:
      'The entire element briefly flashes with a damage indicator color and slight position offset, then returns to normal with a settling wobble. A directional indicator shows the angle of incoming damage, adding spatial awareness to the hit feedback.',
    useCases: [
      'Game character or entity hit feedback',
      'Error or validation failure input indicators',
      'System intrusion or anomaly detection alerts',
      'Interactive battle or combat training interfaces',
    ],
    strategy: 'transform',
    performanceCost: 1,
    a11yNotes:
      'Damage flicker must be extremely brief. Limit flash frequency to prevent photosensitive reactions.',
    recommendedTokens: [
      '--ferrum-damage-flash-color',
      '--ferrum-damage-offset-amount',
      '--ferrum-damage-wobble-decay',
      '--ferrum-damage-direction-indicator-color',
      '--ferrum-damage-flash-duration',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  //  AI/ML (5 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'neural-activation',
    category: 'AI/ML',
    description:
      'Nodes in a neural network layer light up sequentially as a forward pass propagates through the network. Each node briefly glows when activated, with connection lines brightening to show weighted signal flow between layers.',
    useCases: [
      'ML model inference progress visualization',
      'AI-powered feature explanation interfaces',
      'Neural network architecture educational tools',
      'Deep learning framework documentation hero sections',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Activation glow must not be the only state indicator. Provide text descriptions of what each layer computes.',
    recommendedTokens: [
      '--ferrum-neural-node-size',
      '--ferrum-neural-active-color',
      '--ferrum-neural-inactive-color',
      '--ferrum-neural-connection-color',
      '--ferrum-neural-forward-pass-speed',
    ],
    requiresJS: true,
    jsRequirement:
      'Sequences activation events through network layers with configurable delay; updates node CSS classes per activation wave.',
  },
  {
    name: 'data-flow',
    category: 'AI/ML',
    description:
      'Structured data packets visually stream between processing nodes along defined paths. Each packet shows a brief glimpse of its content as it travels, with throughput rate visible as stream density and speed variations.',
    useCases: [
      'Data pipeline or ETL process visualization',
      'API request flow monitoring dashboards',
      'Microservice communication diagram animations',
      'Real-time data integration platform interfaces',
    ],
    strategy: 'hybrid-css-js',
    performanceCost: 2,
    a11yNotes:
      'Data packets must not obscure node labels. Ensure throughput visualization is accessible via text metrics too.',
    recommendedTokens: [
      '--ferrum-flow-packet-color',
      '--ferrum-flow-path-color',
      '--ferrum-flow-throughput-rate',
      '--ferrum-flow-packet-size',
      '--ferrum-flow-path-highlight-color',
    ],
    requiresJS: true,
    jsRequirement:
      'Manages packet lifecycle along SVG paths, spawns packets at intervals based on throughput config, removes after arrival.',
  },
  {
    name: 'gradient-descent',
    category: 'AI/ML',
    description:
      'A point navigates across a loss landscape represented as a 3D surface contour, taking visible steps that decrease in size as it converges toward a local minimum. The path traces behind it, showing the optimization trajectory with gradient arrows.',
    useCases: [
      'ML training progress or loss curve visualization',
      'Optimization algorithm comparison tool interfaces',
      'AI model performance monitoring dashboards',
      'Machine learning education interactive demos',
    ],
    strategy: 'svg-filter',
    performanceCost: 2,
    a11yNotes:
      'Contour visualization should have text labels for axis values. Ensure color scale has accessible legend.',
    recommendedTokens: [
      '--ferrum-descent-point-color',
      '--ferrum-descent-path-color',
      '--ferrum-descent-contour-color',
      '--ferrum-descent-step-size',
      '--ferrum-descent-learning-rate-visual',
    ],
  },
  {
    name: 'attention-map',
    category: 'AI/ML',
    description:
      'A transformer-style attention weight heatmap overlays the content, showing which input tokens are attending to which output tokens. The attention intensity is shown as color heat with connecting lines whose thickness represents weight magnitude.',
    useCases: [
      'LLM output explanation or interpretability tools',
      'NLP visualization and analysis dashboards',
      'AI transparency or explainable AI interfaces',
      'Text generation model comparison platforms',
    ],
    strategy: 'backdrop-filter',
    performanceCost: 2,
    a11yNotes:
      'Attention heatmaps must not obscure the underlying text. Provide toggle to show/hide overlay. Use patterns in addition to color.',
    recommendedTokens: [
      '--ferrum-attention-low-color',
      '--ferrum-attention-high-color',
      '--ferrum-attention-line-color',
      '--ferrum-attention-threshold',
      '--ferrum-attention-head-colors',
    ],
    requiresJS: true,
    jsRequirement:
      'Receives attention weight matrix from model output, computes DOM positions, renders connection lines and heatmap overlay.',
  },
  {
    name: 'latent-space-warp',
    category: 'AI/ML',
    description:
      'The surface distorts as if being viewed through a non-Euclidean latent space. Points on the surface are pulled toward cluster centers while the space between clusters stretches and thins, visualizing how a variational autoencoder compresses and organizes data.',
    useCases: [
      'Generative AI model exploration interfaces',
      'Latent space navigation or interpolation tools',
      'Dimensionality reduction visualization dashboards',
      'AI art generation concept explanation pages',
    ],
    strategy: 'filter',
    performanceCost: 3,
    a11yNotes:
      'Space distortion may cause motion sickness. Provide flat fallback. Limit animation duration and intensity.',
    recommendedTokens: [
      '--ferrum-latent-distortion-amount',
      '--ferrum-latent-cluster-count',
      '--ferrum-latent-warp-speed',
      '--ferrum-latent-interpolation-color',
      '--ferrum-latent-boundary-color',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  //  SCIENTIFIC VISUALIZATION (3 effects)
  // ═══════════════════════════════════════════════════════════════════

  {
    name: 'spectrogram',
    category: 'Scientific Visualization',
    description:
      'A time-frequency heatmap displays signal energy as color intensity across a scrolling timeline. Low frequencies anchor the bottom while high frequencies occupy the top, with spectral features appearing as horizontal bands or vertical chirps depending on the signal type.',
    useCases: [
      'Audio analysis or acoustic research tool interfaces',
      'Seismic data monitoring dashboards',
      'Radio frequency or signal intelligence displays',
      'Scientific instrument data visualization panels',
    ],
    strategy: 'canvas',
    performanceCost: 2,
    a11yNotes:
      'Color-only heatmaps need accessible legends with value labels. Provide sonification option for non-visual users.',
    recommendedTokens: [
      '--ferrum-spectrogram-color-scale',
      '--ferrum-spectrogram-time-window',
      '--ferrum-spectrogram-frequency-range',
      '--ferrum-spectrogram-scroll-speed',
      '--ferrum-spectrogram-resolution',
    ],
    requiresJS: true,
    jsRequirement:
      'Computes FFT of incoming signal data, maps magnitude to color scale, and paints time-scrolling canvas frames.',
  },
  {
    name: 'phase-diagram',
    category: 'Scientific Visualization',
    description:
      'A thermodynamic phase diagram displays distinct regions for solid, liquid, gas, and plasma states separated by boundary curves. A movable state point transitions between phases with visual morphing effects at each boundary crossing.',
    useCases: [
      'Chemistry or materials science education platforms',
      'Thermodynamics simulation tool interfaces',
      'State machine or workflow visualization metaphors',
      'Scientific research data presentation backgrounds',
    ],
    strategy: 'svg-filter',
    performanceCost: 1,
    a11yNotes:
      'Phase boundaries must be clearly labeled. Color alone should not distinguish phases — use patterns and labels.',
    recommendedTokens: [
      '--ferrum-phase-solid-color',
      '--ferrum-phase-liquid-color',
      '--ferrum-phase-gas-color',
      '--ferrum-phase-boundary-color',
      '--ferrum-phase-transition-speed',
    ],
  },
  {
    name: 'fluid-dynamics',
    category: 'Scientific Visualization',
    description:
      'A velocity field is rendered as animated streamlines that show flow direction, speed, and turbulence. Vortex regions show spiraling patterns while laminar regions display smooth, parallel lines, with speed encoded as line thickness and color.',
    useCases: [
      'CFD or fluid simulation result visualization',
      'Weather or ocean current mapping interfaces',
      'Engineering flow analysis dashboard panels',
      'Scientific computing or HPC project showcases',
    ],
    strategy: 'svg-filter',
    performanceCost: 3,
    a11yNotes:
      'Streamline density must not overwhelm screen readers. Provide data table alternative for flow values.',
    recommendedTokens: [
      '--ferrum-flow-slow-color',
      '--ferrum-flow-fast-color',
      '--ferrum-flow-line-width-range',
      '--ferrum-flow-turbulence-threshold',
      '--ferrum-flow-arrow-density',
    ],
    requiresJS: true,
    jsRequirement:
      'Generates streamline paths from velocity field data using Runge-Kutta integration; animates dash-offset for flow direction.',
  },
];