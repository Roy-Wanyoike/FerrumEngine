"""RoyCSS Part 6: Image Hover Effects
Category: image-hover | displayType: image
"""

image_hover_effects = [
    # 1. Image Zoom In
    ("Image Zoom In", "rc-img-zoom-in", "image-hover", "image", """\
.rc-img-zoom-in {
  overflow: hidden;
  position: relative;
}
.rc-img-zoom-in img {
  transition: transform 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.rc-img-zoom-in:hover img {
  transform: scale(1.1);
}"""),

    # 2. Image Zoom Out
    ("Image Zoom Out", "rc-img-zoom-out", "image-hover", "image", """\
.rc-img-zoom-out {
  overflow: hidden;
  position: relative;
}
.rc-img-zoom-out img {
  transition: transform 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
}
.rc-img-zoom-out:hover img {
  transform: scale(1);
}"""),

    # 3. Image Pan Right
    ("Image Pan Right", "rc-img-pan-right", "image-hover", "image", """\
.rc-img-pan-right {
  overflow: hidden;
  position: relative;
}
.rc-img-pan-right img {
  transition: transform 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.15) translateX(-5%);
}
.rc-img-pan-right:hover img {
  transform: scale(1.15) translateX(5%);
}"""),

    # 4. Image Pan Left
    ("Image Pan Left", "rc-img-pan-left", "image-hover", "image", """\
.rc-img-pan-left {
  overflow: hidden;
  position: relative;
}
.rc-img-pan-left img {
  transition: transform 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.15) translateX(5%);
}
.rc-img-pan-left:hover img {
  transform: scale(1.15) translateX(-5%);
}"""),

    # 5. Image Blur Reveal
    ("Image Blur Reveal", "rc-img-blur-reveal", "image-hover", "image", """\
.rc-img-blur-reveal {
  overflow: hidden;
  position: relative;
}
.rc-img-blur-reveal img {
  transition: filter 0.5s ease, transform 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px);
  transform: scale(1.05);
}
.rc-img-blur-reveal:hover img {
  filter: blur(0);
  transform: scale(1);
}"""),

    # 6. Image Grayscale
    ("Image Grayscale", "rc-img-grayscale", "image-hover", "image", """\
.rc-img-grayscale {
  overflow: hidden;
  position: relative;
}
.rc-img-grayscale img {
  transition: filter 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
}
.rc-img-grayscale:hover img {
  filter: grayscale(0%);
}"""),

    # 7. Image Sepia
    ("Image Sepia", "rc-img-sepia", "image-hover", "image", """\
.rc-img-sepia {
  overflow: hidden;
  position: relative;
}
.rc-img-sepia img {
  transition: filter 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(100%);
}
.rc-img-sepia:hover img {
  filter: sepia(0%);
}"""),

    # 8. Image Brightness
    ("Image Brightness", "rc-img-brightness", "image-hover", "image", """\
.rc-img-brightness {
  overflow: hidden;
  position: relative;
}
.rc-img-brightness img {
  transition: filter 0.4s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}
.rc-img-brightness:hover img {
  filter: brightness(1.2);
}"""),

    # 9. Image Contrast
    ("Image Contrast", "rc-img-contrast", "image-hover", "image", """\
.rc-img-contrast {
  overflow: hidden;
  position: relative;
}
.rc-img-contrast img {
  transition: filter 0.4s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(0.7) brightness(0.9);
}
.rc-img-contrast:hover img {
  filter: contrast(1.2) brightness(1);
}"""),

    # 10. Image Rotate Zoom
    ("Image Rotate Zoom", "rc-img-rotate-zoom", "image-hover", "image", """\
.rc-img-rotate-zoom {
  overflow: hidden;
  position: relative;
}
.rc-img-rotate-zoom img {
  transition: transform 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.rc-img-rotate-zoom:hover img {
  transform: scale(1.1) rotate(3deg);
}"""),

    # 11. Image Overlay Slide Up
    ("Image Overlay Slide Up", "rc-img-overlay-up", "image-hover", "image", """\
.rc-img-overlay-up {
  overflow: hidden;
  position: relative;
}
.rc-img-overlay-up img {
  transition: transform 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.rc-img-overlay-up:hover img {
  transform: scale(1.05);
}
.rc-img-overlay-up::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 60%);
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.rc-img-overlay-up:hover::after {
  opacity: 1;
  transform: translateY(0);
}"""),

    # 12. Image Overlay Fade
    ("Image Overlay Fade", "rc-img-overlay-fade", "image-hover", "image", """\
.rc-img-overlay-fade {
  overflow: hidden;
  position: relative;
}
.rc-img-overlay-fade img {
  transition: filter 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.rc-img-overlay-fade:hover img {
  filter: brightness(0.7);
}
.rc-img-overlay-fade::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.rc-img-overlay-fade:hover::after {
  opacity: 1;
}"""),

    # 13. Image Split Reveal
    ("Image Split Reveal", "rc-img-split-reveal", "image-hover", "image", """\
.rc-img-split-reveal {
  overflow: hidden;
  position: relative;
}
.rc-img-split-reveal img {
  transition: clip-path 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: inset(0 0 0 0);
}
.rc-img-split-reveal:hover img {
  clip-path: inset(0 50% 0 50%);
}
.rc-img-split-reveal::after {
  content: attr(data-label);
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.4s ease 0.15s;
}
.rc-img-split-reveal:hover::after {
  opacity: 1;
}"""),

    # 14. Image Shutter
    ("Image Shutter", "rc-img-shutter", "image-hover", "image", """\
.rc-img-shutter {
  overflow: hidden;
  position: relative;
}
.rc-img-shutter img {
  transition: clip-path 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: inset(0 0 0 0);
}
.rc-img-shutter:hover img {
  clip-path: inset(48% 48% 48% 48%);
}
.rc-img-shutter::before,
.rc-img-shutter::after {
  content: '';
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1;
  transition: transform 0.5s ease;
}
.rc-img-shutter::before {
  left: 0;
  transform: translateX(-100%);
}
.rc-img-shutter::after {
  content: '';
  right: 0;
  left: auto;
  transform: translateX(100%);
}
.rc-img-shutter:hover::before {
  transform: translateX(0);
}
.rc-img-shutter:hover::after {
  transform: translateX(0);
}"""),

    # 15. Image Circle Reveal
    ("Image Circle Reveal", "rc-img-circle-reveal", "image-hover", "image", """\
.rc-img-circle-reveal {
  overflow: hidden;
  position: relative;
}
.rc-img-circle-reveal img {
  transition: clip-path 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.1);
  clip-path: circle(0% at 50% 50%);
}
.rc-img-circle-reveal:hover img {
  clip-path: circle(75% at 50% 50%);
  filter: grayscale(0%) contrast(1);
}
.rc-img-circle-reveal::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: opacity 0.4s ease;
  pointer-events: none;
}
.rc-img-circle-reveal:hover::after {
  opacity: 0;
}"""),

    # 16. Image Tilt 3D
    ("Image Tilt 3D", "rc-img-tilt-3d", "image-hover", "image", """\
.rc-img-tilt-3d {
  overflow: hidden;
  position: relative;
  perspective: 800px;
}
.rc-img-tilt-3d img {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: rotateX(0) rotateY(0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.rc-img-tilt-3d:hover img {
  transform: rotateX(-3deg) rotateY(3deg) scale(1.03);
  box-shadow: 8px 12px 28px rgba(0, 0, 0, 0.35);
}"""),
]