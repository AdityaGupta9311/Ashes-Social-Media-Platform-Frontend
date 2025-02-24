import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "./PopularUserCard";
import { Card } from "@mui/material";

const popularUser = [1, 1, 1, 1, 1];
const HomeRight = () => {
  return (
    <div>
      <SearchUser />

      <div className="py-5">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p className="text-xs font-semibold opacity-95">View All</p>
        </div>
        <div>
          {popularUser.map((items) => (
            <PopularUserCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
