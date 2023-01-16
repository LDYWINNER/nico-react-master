import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background: linear-gradient(135deg, #e09, #d0e);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 0 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 300px 300px;
  gap: 15px;
  max-width: 890px;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Circle = styled(motion.div)`
  background-color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled(motion.span)`
  cursor: pointer;
  padding: 10px;
  margin-top: 50px;
  border-radius: 5px;
  color: white;
  background-color: white;
  font-weight: 600;
  font-size: 18px;
  position: absolute;
  bottom: 75px;
`;

const Overlay = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;

const BigBox = styled(motion.div)`
  background-color: white;
  width: 400px;
  height: 300px;
  border-radius: 10px;
`;

const buttonVariants = {
  zero: {
    color: "#0052D4",
    transform: "scale(1)"
  },
  one: {
    color: "#ff6a00",
    transform: "scale(1.2)"
  }
};

const boxVariants = {
  initial: (i: number) => ({
    scale: 1,
    x: 0,
    y: 0
  }),
  hover: (i: number) => ({
    scale: 1.1,
    y: i ? -15 : 15,
    x: i ? -20 : 20
  })
};

const overlayVariants = {
  hidden: {
    backgroundColor: "rgba(0, 0, 0, 0.0)"
  },
  visible: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [selectedBox, setSelectedBox] = useState<null | string>(null);
  const onToggleClick = () => {
    setIndex((prev) => (prev === 1 ? 0 : 1));
  };
  const onClickBox = (i: null | string) => {
    setSelectedBox(i);
  };
  return (
    <Wrapper>
      <Grid>
        <Box
          onClick={() => onClickBox("1")}
          layoutId="1"
          variants={boxVariants}
          custom={1}
          initial="initial"
          whileHover="hover"
        />
        <Box>{index === 0 ? <Circle layoutId="circle" /> : null}</Box>
        <Box>{index === 1 ? <Circle layoutId="circle" /> : null}</Box>
        <Box
          onClick={() => onClickBox("0")}
          variants={boxVariants}
          custom={0}
          layoutId="0"
          initial="initial"
          whileHover="hover"
        />
      </Grid>
      <Button
        animate={index === 1 ? "one" : "zero"}
        variants={buttonVariants}
        initial="zero"
        onClick={onToggleClick}
      >
        Switch
      </Button>
      <AnimatePresence>
        {selectedBox ? (
          <Overlay
            variants={overlayVariants}
            animate="visible"
            exit="hidden"
            onClick={() => onClickBox(null)}
          >
            <BigBox layoutId={selectedBox}></BigBox>
          </Overlay>
        ) : (
          ""
        )}
      </AnimatePresence>
    </Wrapper>
  );
}
