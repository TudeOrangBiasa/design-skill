// hero-shader.js — animated mesh-gradient hero background for the landing.
// GLSL adapted from paper.design's static-mesh-gradient (Apache-2.0, github.com/paper-design/shaders).
// Runs zero-dependency WebGL2; falls back to the CSS dot-grid if unavailable.
(function () {
  var canvas = document.getElementById('hero-shader');
  if (!canvas) return;
  var gl = canvas.getContext('webgl2', { antialias: false, alpha: true });
  if (!gl) { canvas.style.display = 'none'; return; }

  var VERT = '#version 300 es\nprecision mediump float;\nlayout(location=0) in vec4 a_position;\nuniform vec2 u_resolution;\nout vec2 v_objectUV;\nvoid main(){\n  float aspect = u_resolution.x / max(u_resolution.y, 1.0);\n  v_objectUV = a_position.xy * vec2(max(aspect, 1.0), max(1.0 / aspect, 1.0));\n  gl_Position = vec4(a_position.xy, 0.0, 1.0);\n}\n';

  var FRAG = '#version 300 es\nprecision mediump float;\nuniform vec4 u_colors[10];\nuniform float u_colorsCount;\nuniform float u_positions;\nuniform float u_waveX;\nuniform float u_waveXShift;\nuniform float u_waveY;\nuniform float u_waveYShift;\nuniform float u_mixing;\nuniform float u_grainMixer;\nuniform float u_grainOverlay;\nin vec2 v_objectUV;\nout vec4 fragColor;\n'
    + 'const float TWO_PI = 6.28318530718;\n'
    + 'float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }\n'
    + 'vec2 rotate(vec2 v, float a){ float c = cos(a); float s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }\n'
    + 'float valueNoise(vec2 st){ vec2 i = floor(st); vec2 f = fract(st); float a = hash21(i); float b = hash21(i + vec2(1.0, 0.0)); float c = hash21(i + vec2(0.0, 1.0)); float d = hash21(i + vec2(1.0, 1.0)); vec2 u = f * f * (3.0 - 2.0 * f); float x1 = mix(a, b, u.x); float x2 = mix(c, d, u.x); return mix(x1, x2, u.y); }\n'
    + 'float noise(vec2 n, vec2 seedOffset){ return valueNoise(n + seedOffset); }\n'
    + 'vec2 getPosition(int i, float t){ float a = float(i) * .37; float b = .6 + mod(float(i), 3.) * .3; float c = .8 + mod(float(i + 1), 4.) * 0.25; float x = sin(t * b + a); float y = cos(t * c + a * 1.5); return .5 + .5 * vec2(x, y); }\n'
    + 'void main(){ vec2 uv = v_objectUV; uv += .5; vec2 grainUV = uv * 1000.; float grain = noise(grainUV, vec2(0.)); float mixerGrain = .4 * u_grainMixer * (grain - .5); float radius = smoothstep(0., 1., length(uv - .5)); float center = 1. - radius; for (float i = 1.; i <= 2.; i++) { uv.x += u_waveX * center / i * cos(TWO_PI * u_waveXShift + i * 2. * smoothstep(.0, 1., uv.y)); uv.y += u_waveY * center / i * cos(TWO_PI * u_waveYShift + i * 2. * smoothstep(.0, 1., uv.x)); } vec3 color = vec3(0.); float opacity = 0.; float totalWeight = 0.; float positionSeed = 25. + .33 * u_positions; for (int i = 0; i < 10; i++) { if (i >= int(u_colorsCount)) break; vec2 pos = getPosition(i, positionSeed) + mixerGrain; float dist = length(uv - pos); vec3 colorFraction = u_colors[i].rgb * u_colors[i].a; float opacityFraction = u_colors[i].a; float mixing = pow(u_mixing, .7); float power = mix(2., 1., mixing); dist = pow(dist, power); float w = 1. / (dist + 1e-3); float baseSharpness = mix(.0, 8., clamp(w, 0., 1.)); float sharpness = mix(baseSharpness, 1., mixing); w = pow(w, sharpness); color += colorFraction * w; opacity += opacityFraction * w; totalWeight += w; } color /= max(1e-4, totalWeight); opacity /= max(1e-4, totalWeight); float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.)); grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5); grainOverlay = pow(grainOverlay, 1.3); float grainOverlayV = grainOverlay * 2. - 1.; vec3 grainOverlayColor = vec3(step(0., grainOverlayV)); float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV); grainOverlayStrength = pow(grainOverlayStrength, .8); color = mix(color, grainOverlayColor, .35 * grainOverlayStrength); opacity += .5 * grainOverlayStrength; opacity = clamp(opacity, 0., 1.); fragColor = vec4(color, opacity); }\n';

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('hero shader compile failed', gl.getShaderInfoLog(s));
      canvas.style.display = 'none';
      return null;
    }
    return s;
  }
  var vs = compile(gl.VERTEX_SHADER, VERT);
  var fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;
  var prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.style.display = 'none'; return; }
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var u = {};
  ['u_resolution', 'u_colors', 'u_colorsCount', 'u_positions', 'u_waveX', 'u_waveXShift', 'u_waveY', 'u_waveYShift', 'u_mixing', 'u_grainMixer', 'u_grainOverlay'].forEach(function (n) { u[n] = gl.getUniformLocation(prog, n); });

  // Palette: paper, warm white, soft beige, ink tint, one lime accent (low alpha)
  var colors = [
    [0.992, 0.992, 0.988, 1.0],   // paper
    [0.965, 0.953, 0.925, 0.9],   // beige
    [0.714, 0.949, 0.180, 0.35],  // lime accent
    [0.078, 0.071, 0.059, 0.28],  // ink tint
    [0.925, 0.886, 0.812, 0.9],   // warm cream
  ];
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.max(1, w * dpr); canvas.height = Math.max(1, h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.u_resolution, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  var t0 = performance.now();
  var rafId = 0;
  function frame(now) {
    var t = (now - t0) / 1000;
    var slow = reduceMotion ? 0 : t * 0.05;
    gl.uniform4fv(u.u_colors, new Float32Array(colors.flat()));
    gl.uniform1f(u.u_colorsCount, colors.length);
    gl.uniform1f(u.u_positions, reduceMotion ? 0 : Math.sin(t * 0.07) * 30);
    gl.uniform1f(u.u_waveX, reduceMotion ? 0 : 0.12 + 0.05 * Math.sin(t * 0.11));
    gl.uniform1f(u.u_waveXShift, slow);
    gl.uniform1f(u.u_waveY, reduceMotion ? 0 : 0.10 + 0.04 * Math.cos(t * 0.09));
    gl.uniform1f(u.u_waveYShift, slow * 1.4);
    gl.uniform1f(u.u_mixing, 0.8);
    gl.uniform1f(u.u_grainMixer, 0.35);
    gl.uniform1f(u.u_grainOverlay, 0.5);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduceMotion) rafId = requestAnimationFrame(frame);
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { cancelAnimationFrame(rafId); }
    else if (!reduceMotion) { rafId = requestAnimationFrame(frame); }
  });
  rafId = requestAnimationFrame(frame);
})();
