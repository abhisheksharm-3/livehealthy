import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import React from "react";
import {
  RiHeart2Fill,
  RiLightbulbFlashFill,
  RiTeamFill,
} from "@remixicon/react";

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem]"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};

const AboutScreen = () => {
  return (
    <div className="h-screen flex flex-col justify-between overflow-hidden">
      <NavbarComponent />
      <div className="container mx-auto px-4 py-12 overflow-scroll scrollbar-hide">
        <h1 className="text-4xl font-bold mb-8 text-center">
          About Our Website
        </h1>
        <div className="">
          <p className="text-lg mb-6 text-center">
            Welcome to our website! We're thrilled to have you here. Let's dive
            into what we're all about. Hover on the Cards Below.
          </p>
          <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 mx-auto px-8">
            <Card
              title="Our website was created as a part of a machine learning assignment.
            We're passionate about leveraging technology to solve real-world
            problems, and this project provided us with the perfect opportunity
            to do just that."
              icon={<RiHeart2Fill />}
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-emerald-900"
                dotSize={2}
              />
            </Card>
            <Card
              title="Our website provides a platform for water analysis. Using machine
            learning techniques, we've developed a backend hosted on Flask and
            trained using XGBoost to analyze the potability of water samples."
              icon={<RiLightbulbFlashFill />}
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-black"
                colors={[
                  [236, 72, 153],
                  [232, 121, 249],
                ]}
                dotSize={2}
              />
              {/* Radial gradient for the cute fade */}
              <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
            </Card>
            <Card
              title="We're on a mission to make water analysis more accessible and
            reliable. Whether you're a student, researcher, or just someone
            curious about water quality, we invite you to explore our website
            and join us on this journey."
              icon={<RiTeamFill />}
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-sky-600"
                colors={[[125, 211, 252]]}
                dotSize={2}
              />
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutScreen;
