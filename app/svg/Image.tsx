export default function ImageSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="sphereGradient" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#aaff00">
            <animate
              attributeName="stop-color"
              values="#aaff00;#55ff00;#33cc00;#003300;#aaff00"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="70%" stopColor="#33cc00">
            <animate
              attributeName="stop-color"
              values="#33cc00;#229900;#116600;#001100;#33cc00"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#000000">
            <animate
              attributeName="stop-color"
              values="#000000;#003300;#000000"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="40" fill="url(#sphereGradient)">
        <animate
          attributeName="r"
          values="40;42;40"
          dur="2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        />
      </circle>
    </svg>
  );
}
