import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { Button } from "@nextui-org/react";
import { RiDropLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "@/constants/testimonials";
const LandingScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-around">
      <LampContainer className="flex flex-col items-center justify-around">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center">
              <img src="/Images/logo.png" className="w-[50%]"/>
              Size Matters<br /> Check Your Stats!
            </div>
            <Link to="/analyse">
              <Button
                size="lg"
                color="primary"
                variant="shadow"
                className="tracking-wider text-lg"
                startContent={<RiDropLine />}
              >
                Dive In & Analyze Now
              </Button>
            </Link>
          </div>
        </motion.h1>
      </LampContainer>
      <InfiniteMovingCards
      className="translate-y-72 lg:translate-y-44 lg:translate-x-32"
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
};

export default LandingScreen;
