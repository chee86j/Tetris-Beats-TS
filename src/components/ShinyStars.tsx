import React from "react";
import Particles from "react-tsparticles";

interface ShinyStarsProps {
  children: React.ReactNode;
}

const ShinyStars: React.FC<ShinyStarsProps> = ({ children }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Particles
        params={{
          particles: {
            number: {
              value: 150,
            },
            size: {
              value: 3,
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "star",
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
            },
            opacity: {
              value: 0.5,
            },
          },
          interactivity: {
            detectsOn: "window",
            events: {
              onhover: {
                enable: false,
                mode: "repulse",
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none", // to prevent particles from blocking interactions
        }}
      />
      {children}
    </div>
  );
};

export default ShinyStars;
