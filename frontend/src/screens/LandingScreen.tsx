import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { Button } from "@nextui-org/react";
import { RiDropLine } from "@remixicon/react";
import { Link } from "react-router-dom";
const LandingScreen = () => {
  return (
    <div className="h-screen w-screen">
      <LampContainer>
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
              <img src="/Images/logo.png" className="w-[70%]"/>
              Discover Your Water's Quality
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
    </div>
  );
};

export default LandingScreen;
