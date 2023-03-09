import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import MyVerticallyCenteredModal from "./UpdateTask";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedTask,
  removeTaskList,
  getTasksFromServer,
  deleteTaskInServer,
} from "../slices/taskSlice";

const TasksList = () => {
  const { taskslist } = useSelector((state) => state.tasks);
  console.log(taskslist);
  const dispatch = useDispatch();

  const updateTask = (task) => {
    console.log("update Task");
    setModalShow(true);
    dispatch(setSelectedTask(task));
  };

  const deleteTask = (task) => {
    dispatch(deleteTaskInServer())
      .unwrap()
      .then(() => {
        dispatch(removeTaskList(task));
      });
  };

  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);

  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskslist &&
            taskslist.map((task, index) => {
              return (
                <tr className="text-center" key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="mx-3"
                      onClick={() => updateTask(task)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button variant="primary">
                      <i
                        className="bi bi-trash3"
                        onClick={() => deleteTask(task)}
                      ></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default TasksList;
