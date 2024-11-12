import { Grid, Card } from "@mui/material";
import React from "react";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";

const Authentication = () => {
  return (
    <Grid container>
      <Grid className="h-screen overflow-hidden" item xs={7}>
        <img
          className="w-full h-full"
          src="https://img.freepik.com/free-vector/hand-drawn-flat-design-connecting-people-infographic_52683-76904.jpg"
          alt="images"
        />
      </Grid>
      <Grid item xs={5}>
        <div className="px-20 flex flex-col justify-center h-full">
          <Card className="card p-8">
            <div className="flex flex-col items-center mb-5 space-y-1">
              <h1 className="logo text-center">Ashes</h1>
              <p className="text-center text-sm w-[70&]">
                Connecting Lives, Sharing Stories: Your Social World, Your Way
              </p>
            </div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              </Routes>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default Authentication;
