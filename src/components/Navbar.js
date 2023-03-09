import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { taskslist,error } = useSelector((state) => state.tasks);
  console.log(taskslist);
  return (
    <>
      <h1 className="text-center my-4 text-primary">Project Management</h1>
      <p className="text-center lead">{`Currently ${taskslist.length} task(s) pending`}</p>
      {error !== "" ? (
        <h1 className="text-center text-danger">{error}</h1>
      ) : null}
    </>
  );
};

export default Navbar;
