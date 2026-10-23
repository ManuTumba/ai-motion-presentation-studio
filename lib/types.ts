export type Scene = {
  id: string;
  title: string;
  subtitle: string;
  duration: number;
  style: "cinematic" | "minimal" | "futuristic";
  animation: "fade" | "slide" | "zoom" | "pulse";
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
};

export type PresentationPlan = {
  title: string;
  audience: string;
  tone: string;
  duration: number;
  scenes: Scene[];
};
