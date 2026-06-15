(function initOperonHeroSwirl() {
  if (window.__operonHeroSwirlInit) return;
  window.__operonHeroSwirlInit = true;

  var declarePI =
    "#define TWO_PI 6.28318530718\n" +
    "#define PI 3.14159265358979323846\n";

  var proceduralHash11 =
    "  float hash11(float p) {\n" +
    "    p = fract(p * 0.3183099) + 0.1;\n" +
    "    p *= p + 19.19;\n" +
    "    return fract(p * p);\n" +
    "  }\n";

  var proceduralHash21 =
    "  float hash21(vec2 p) {\n" +
    "    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;\n" +
    "    p += dot(p, p + 19.19);\n" +
    "    return fract(p.x * p.y);\n" +
    "  }\n";

  var simplexNoise =
    "vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }\n" +
    "float snoise(vec2 v) {\n" +
    "  const vec4 C = vec4(0.211324865405187, 0.366025403784439,\n" +
    "    -0.577350269189626, 0.024390243902439);\n" +
    "  vec2 i = floor(v + dot(v, C.yy));\n" +
    "  vec2 x0 = v - i + dot(i, C.xx);\n" +
    "  vec2 i1;\n" +
    "  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n" +
    "  vec4 x12 = x0.xyxy + C.xxzz;\n" +
    "  x12.xy -= i1;\n" +
    "  i = mod(i, 289.0);\n" +
    "  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))\n" +
    "    + i.x + vec3(0.0, i1.x, 1.0));\n" +
    "  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),\n" +
    "      dot(x12.zw, x12.zw)), 0.0);\n" +
    "  m = m * m;\n" +
    "  m = m * m;\n" +
    "  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n" +
    "  vec3 h = abs(x) - 0.5;\n" +
    "  vec3 ox = floor(x + 0.5);\n" +
    "  vec3 a0 = x - ox;\n" +
    "  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);\n" +
    "  vec3 g;\n" +
    "  g.x = a0.x * x0.x + h.x * x0.y;\n" +
    "  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n" +
    "  return 130.0 * dot(m, g);\n" +
    "}\n";

  var vertexShaderSource =
    "#version 300 es\n" +
    "precision mediump float;\n" +
    "\n" +
    "layout(location = 0) in vec4 a_position;\n" +
    "\n" +
    "void main() {\n" +
    "  gl_Position = a_position;\n" +
    "}\n";

  var fragmentShaderSource =
    "#version 300 es\n" +
    "precision mediump float;\n" +
    "\n" +
    "uniform float u_time;\n" +
    "uniform vec2 u_resolution;\n" +
    "uniform vec4 u_colorBack;\n" +
    "uniform vec4 u_colorFront;\n" +
    "uniform float u_shape;\n" +
    "uniform float u_type;\n" +
    "uniform float u_pxSize;\n" +
    "\n" +
    "out vec4 fragColor;\n" +
    "\n" +
    simplexNoise +
    declarePI +
    proceduralHash11 +
    proceduralHash21 +
    "\n" +
    "float getSimplexNoise(vec2 uv, float t) {\n" +
    "  float noise = .5 * snoise(uv - vec2(0., .3 * t));\n" +
    "  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));\n" +
    "  return noise;\n" +
    "}\n" +
    "\n" +
    "const int bayer2x2[4] = int[4](0, 2, 3, 1);\n" +
    "const int bayer4x4[16] = int[16](\n" +
    "  0,  8,  2, 10,\n" +
    " 12,  4, 14,  6,\n" +
    "  3, 11,  1,  9,\n" +
    " 15,  7, 13,  5\n" +
    ");\n" +
    "\n" +
    "const int bayer8x8[64] = int[64](\n" +
    "   0, 32,  8, 40,  2, 34, 10, 42,\n" +
    "  48, 16, 56, 24, 50, 18, 58, 26,\n" +
    "  12, 44,  4, 36, 14, 46,  6, 38,\n" +
    "  60, 28, 52, 20, 62, 30, 54, 22,\n" +
    "   3, 35, 11, 43,  1, 33,  9, 41,\n" +
    "  51, 19, 59, 27, 49, 17, 57, 25,\n" +
    "  15, 47,  7, 39, 13, 45,  5, 37,\n" +
    "  63, 31, 55, 23, 61, 29, 53, 21\n" +
    ");\n" +
    "\n" +
    "float getBayerValue(vec2 uv, int size) {\n" +
    "  ivec2 pos = ivec2(mod(uv, float(size)));\n" +
    "  int index = pos.y * size + pos.x;\n" +
    "\n" +
    "  if (size == 2) {\n" +
    "    return float(bayer2x2[index]) / 4.0;\n" +
    "  } else if (size == 4) {\n" +
    "    return float(bayer4x4[index]) / 16.0;\n" +
    "  } else if (size == 8) {\n" +
    "    return float(bayer8x8[index]) / 64.0;\n" +
    "  }\n" +
    "  return 0.0;\n" +
    "}\n" +
    "\n" +
    "void main() {\n" +
    "  float t = .5 * u_time;\n" +
    "  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\n" +
    "  uv -= .5;\n" +
    "\n" +
    "  float pxSize = u_pxSize;\n" +
    "  vec2 pxSizeUv = gl_FragCoord.xy;\n" +
    "  pxSizeUv -= .5 * u_resolution;\n" +
    "  pxSizeUv /= pxSize;\n" +
    "  vec2 pixelizedUv = floor(pxSizeUv) * pxSize / u_resolution.xy;\n" +
    "  pixelizedUv += .5;\n" +
    "  pixelizedUv -= .5;\n" +
    "\n" +
    "  vec2 shape_uv = pixelizedUv;\n" +
    "  vec2 dithering_uv = pxSizeUv;\n" +
    "  vec2 ditheringNoise_uv = uv * u_resolution;\n" +
    "\n" +
    "  float shape = 0.;\n" +
    "  if (u_shape < 1.5) {\n" +
    "    shape_uv *= .001;\n" +
    "    shape = 0.5 + 0.5 * getSimplexNoise(shape_uv, t);\n" +
    "    shape = smoothstep(0.3, 0.9, shape);\n" +
    "  } else if (u_shape < 2.5) {\n" +
    "    shape_uv *= .003;\n" +
    "    for (float i = 1.0; i < 6.0; i++) {\n" +
    "      shape_uv.x += 0.6 / i * cos(i * 2.5 * shape_uv.y + t);\n" +
    "      shape_uv.y += 0.6 / i * cos(i * 1.5 * shape_uv.x + t);\n" +
    "    }\n" +
    "    shape = .15 / abs(sin(t - shape_uv.y - shape_uv.x));\n" +
    "    shape = smoothstep(0.02, 1., shape);\n" +
    "  } else if (u_shape < 3.5) {\n" +
    "    shape_uv *= .05;\n" +
    "    float stripeIdx = floor(2. * shape_uv.x / TWO_PI);\n" +
    "    float rand = hash11(stripeIdx * 10.);\n" +
    "    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);\n" +
    "    shape = sin(shape_uv.x) * cos(shape_uv.y - 5. * rand * t);\n" +
    "    shape = pow(abs(shape), 6.);\n" +
    "  } else if (u_shape < 4.5) {\n" +
    "    shape_uv *= 4.;\n" +
    "    float wave = cos(.5 * shape_uv.x - 2. * t) * sin(1.5 * shape_uv.x + t) * (.75 + .25 * cos(3. * t));\n" +
    "    shape = 1. - smoothstep(-1., 1., shape_uv.y + wave);\n" +
    "  } else if (u_shape < 5.5) {\n" +
    "    float dist = length(shape_uv);\n" +
    "    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;\n" +
    "    shape = waves;\n" +
    "  } else if (u_shape < 6.5) {\n" +
    "    float l = length(shape_uv);\n" +
    "    float angle = 6. * atan(shape_uv.y, shape_uv.x) + 4. * t;\n" +
    "    float twist = 1.2;\n" +
    "    float offset = pow(l, -twist) + angle / TWO_PI;\n" +
    "    float mid = smoothstep(0., 1., pow(l, twist));\n" +
    "    shape = mix(0., fract(offset), mid);\n" +
    "  } else {\n" +
    "    shape_uv *= 2.;\n" +
    "    float d = 1. - pow(length(shape_uv), 2.);\n" +
    "    vec3 pos = vec3(shape_uv, sqrt(d));\n" +
    "    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));\n" +
    "    shape = .5 + .5 * dot(lightPos, pos);\n" +
    "    shape *= step(0., d);\n" +
    "  }\n" +
    "\n" +
    "  int type = int(floor(u_type));\n" +
    "  float dithering = 0.0;\n" +
    "\n" +
    "  switch (type) {\n" +
    "    case 1: {\n" +
    "      dithering = step(hash21(ditheringNoise_uv), shape);\n" +
    "    } break;\n" +
    "    case 2:\n" +
    "      dithering = getBayerValue(dithering_uv, 2);\n" +
    "      break;\n" +
    "    case 3:\n" +
    "      dithering = getBayerValue(dithering_uv, 4);\n" +
    "      break;\n" +
    "    default:\n" +
    "      dithering = getBayerValue(dithering_uv, 8);\n" +
    "      break;\n" +
    "  }\n" +
    "\n" +
    "  dithering -= .5;\n" +
    "  float res = step(.5, shape + dithering);\n" +
    "\n" +
    "  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;\n" +
    "  float fgOpacity = u_colorFront.a;\n" +
    "  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;\n" +
    "  float bgOpacity = u_colorBack.a;\n" +
    "\n" +
    "  vec3 color = fgColor * res;\n" +
    "  float opacity = fgOpacity * res;\n" +
    "\n" +
    "  color += bgColor * (1. - opacity);\n" +
    "  opacity += bgOpacity * (1. - opacity);\n" +
    "\n" +
    "  fragColor = vec4(color, opacity);\n" +
    "}\n";

  var DEFAULT_CONFIG = {
    colorBack: "#F6F2F0",
    colorFront: "#460C39",
    shape: 6,
    type: 3,
    pxSize: 4,
    speed: 0.9,
  };

  function hexToRgba(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [0, 0, 0, 1];
    return [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
      1,
    ];
  }

  function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Operon hero swirl shader compile error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram(gl, vertexSource, fragmentSource) {
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return null;

    var program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Operon hero swirl program link error:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  function initSwirlCanvas(canvas, config) {
    var parent = canvas.parentElement;
    if (!parent) return null;

    var gl = canvas.getContext("webgl2");
    if (!gl) {
      console.error("WebGL2 not supported for Operon hero swirl");
      return null;
    }

    var program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) return null;

    var uniforms = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_colorBack: gl.getUniformLocation(program, "u_colorBack"),
      u_colorFront: gl.getUniformLocation(program, "u_colorFront"),
      u_shape: gl.getUniformLocation(program, "u_shape"),
      u_type: gl.getUniformLocation(program, "u_type"),
      u_pxSize: gl.getUniformLocation(program, "u_pxSize"),
    };

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    var size = { width: 1, height: 1 };
    var startTime = Date.now();
    var animationId = 0;

    function resize() {
      var nextWidth = Math.max(1, Math.round(parent.clientWidth));
      var nextHeight = Math.max(1, Math.round(parent.clientHeight));
      if (size.width === nextWidth && size.height === nextHeight) return;
      size.width = nextWidth;
      size.height = nextHeight;
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      gl.viewport(0, 0, nextWidth, nextHeight);
    }

    function render() {
      var currentTime = (Date.now() - startTime) * 0.001 * config.speed;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      if (uniforms.u_time) gl.uniform1f(uniforms.u_time, currentTime);
      if (uniforms.u_resolution) gl.uniform2f(uniforms.u_resolution, size.width, size.height);
      if (uniforms.u_colorBack) gl.uniform4fv(uniforms.u_colorBack, hexToRgba(config.colorBack));
      if (uniforms.u_colorFront) gl.uniform4fv(uniforms.u_colorFront, hexToRgba(config.colorFront));
      if (uniforms.u_shape) gl.uniform1f(uniforms.u_shape, config.shape);
      if (uniforms.u_type) gl.uniform1f(uniforms.u_type, config.type);
      if (uniforms.u_pxSize) gl.uniform1f(uniforms.u_pxSize, config.pxSize);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (config.speed !== 0) {
        animationId = requestAnimationFrame(render);
      }
    }

    resize();
    var resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    if (config.speed !== 0) {
      animationId = requestAnimationFrame(render);
    } else {
      render();
    }

    return {
      destroy: function () {
        if (animationId) cancelAnimationFrame(animationId);
        resizeObserver.disconnect();
        gl.deleteProgram(program);
      },
    };
  }

  var instances = [];

  document.querySelectorAll(".operon-ascii-hero .operon-hero-swirl canvas").forEach(function (canvas) {
    var instance = initSwirlCanvas(canvas, DEFAULT_CONFIG);
    if (instance) instances.push(instance);
  });

  window.addEventListener("beforeunload", function () {
    instances.forEach(function (instance) {
      instance.destroy();
    });
  });
})();
