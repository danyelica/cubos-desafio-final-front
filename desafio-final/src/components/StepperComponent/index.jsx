import CheckIcon from "../../assets/small-check-icon.svg";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import "./style.css";

const StepperIcon = styled("div")(({ theme, ownerState }) => ({
  color: "#0E8750",
  display: "flex",
  height: 22,
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active
    ? {
        backgroundColor: "#0E8750",
        width: "32px",
        height: "32px",

        borderRadius: "50%",
      }
    : ownerState.completed
    ? ""
    : {
        backgroundColor: "#ffffff",
        width: "32px",
        height: "32px",
        padding: "10px",
        border: "solid 1px #0E8750",
        borderRadius: "50%",
      }),
  "& .StepperIcon-completed": {
    color: "#ffffff",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    padding: "8px",
    zIndex: 1,
    fontSize: 14,
    backgroundColor: "#0E8750",
  },
  "& .StepperIcon-circle": {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: ownerState.active ? "#ffffff" : "#0E8750",
  },
}));

function handleStepperIcon(props) {
  const { active, completed } = props;

  return (
    <StepperIcon ownerState={{ active, completed }}>
      {completed ? (
        <div className='StepperIcon-completed'>
          <img src={CheckIcon} />
        </div>
      ) : (
        <div className='StepperIcon-circle' />
      )}
    </StepperIcon>
  );
}

const steps = [
  {
    label: "Cadastre-se",
    description: "Por favor, escreva seu nome e e-mail",
  },
  {
    label: "Escolha uma senha",
    description: "Escolha uma senha segura",
  },
  {
    label: "Cadastro realizado com sucesso",
    description: "E-mail e senha cadastrados com sucesso",
  },
];

function StepperComponent({ activeStep }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        padding: "50px",
        backgroundColor: "#F0F0F5",
      }}
    >
      <Stepper
        activeStep={activeStep}
        orientation='vertical'
        sx={{ minWidth: "300px" }}
      >
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={handleStepperIcon}
              sx={{ padding: 0 }}
            >
              <div className='label__text'>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    color: "rgb(14, 135, 80)",
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    marginLeft: "25px",
                  }}
                >
                  {step.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    fontFamily: "Nunito",
                    color: "#3F3F55",
                    fontWeight: 600,
                    lineHeight: "130%",
                    marginLeft: "25px",
                  }}
                >
                  {step.description}
                </Typography>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default StepperComponent;
