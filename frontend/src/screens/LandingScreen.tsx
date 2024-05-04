import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { Button } from "@nextui-org/react";
import { RiRunLine } from "@remixicon/react";
import { Link } from "react-router-dom";
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
              Crunch Numbers, Not Just Abs.<br /> See Where You Stand!
            </div>
            <Link to="/analyse">
              <Button
                size="lg"
                color="primary"
                variant="shadow"
                className="tracking-wider text-lg"
                startContent={<RiRunLine />}
              >
                Crunch My Numbers
              </Button>
            </Link>
          </div>
        </motion.h1>
      </LampContainer>
    </div>
  );
};

export default LandingScreen;
