import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  addUser,
  updateuser,
  deleteuser,
} from "../Redux/dataSlice";

function ListVideo() {
  const [idEdit, setidEdit] = useState(false);
  const [newname, setNewname] = useState("");
  const [newid, setNewid] = useState(0);
  const [newtime, setNewtime] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.datas);

  


  useEffect(() => {
    const savedText = localStorage.getItem("localName");
    const savedTime = localStorage.getItem("localTime");
    if (savedText && savedTime) {
      setNewname(savedText);
      setNewtime(savedTime)
    }
  }, []);

  // Save text to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("localName", newname);
    localStorage.setItem("localTime", newtime);
  }, [newname, newtime]);

  // ******************************* LIST FUNCTION ******************************************************

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // async function list() {
  //   try {
  //     const result = await apiCall("/listdata", "GET");
  //     setData(result);
  //   } catch (error) {
  //     alert("data is not fetching....");
  //   }
  // }

  // useEffect(() => {
  //   setData(state);
  // }, [state]);

  // ****************************** ADD FUNCTION ******************************************************
  const add = () => {
    dispatch(addUser({ newid, newname, newtime })).then(() => {
      dispatch(getUser());
    });
    setNewname("");
    setNewtime("");
  };
  // async function add() {
  //   try {
  //     await apiCall("/addvideo", "POST", { name: newname, time: newtime });
  //     list();
  //     setNewname("");
  //     setNewtime("");
  //   } catch {
  //     alert("Failed to add video...");
  //   }
  // }

  // ************************** UPDATE FUNCTION ******************************************************

  const update = () => {
    dispatch(updateuser({ newid, newname, newtime })).then(() => {
      dispatch(getUser());
    });

    setNewname("");
    setNewtime("");
  };

  // async function update() {
  //   try {
  //     await apiCall("/updatevideo", "PUT", {
  //       id: newid,
  //       name: newname,
  //       time: newtime,
  //     });
  //     list();
  //     setNewname("");
  //     setNewtime("");
  //   } catch {
  //     alert("Failed to update video...");
  //   }
  // }

  // *************************** DELETE FUNCTION ****************************************************** 

  const deleteItem = (id) => {
    dispatch(deleteuser({ id })).then(() => {
      dispatch(getUser());
    });
  };

  // async function deleteItem(id) {
  //   try {
  //     await apiCall("/deletevideo", "DELETE", { id: id });
  //     setData((prev) => prev.filter((item) => item.id !== id));
  //   } catch {
  //     alert("Failed to delete video...");
  //   }
  // }

  // **************************** EDIT & SAVE FUNCTION ******************************************************

  const edit = (id) => {
    setidEdit(true);
    const dt = data.find((item) => item.id === id);
    if (dt !== undefined) {
      setNewid(id);
      setNewname(dt.name);
      setNewtime(dt.time);
    }
  };

  const save = () => {
    // handlesubmit;
    if (idEdit) {
      update();
    } else {
      add();
    }
  };

  // ******************************** UI ****************************************************

  return (
    <>
      <div className="flex justify-center items-center mt-9 flex-col gap-6 p-3 w-[100%]">
        
        <h1 className="text-5xl flex justify-center mb-5">VIDEO LIST</h1>
        <div className="flex gap-4">
          <input
            className=" border-2 p-2"
            type="text"
            value={newname}
            onChange={(e) => setNewname(e.target.value)}
            placeholder="enter name"
          />
          <input
            className=" border-2 p-2"
            type="text"
            value={newtime}
            onChange={(e) => setNewtime(e.target.value)}
            placeholder="enter time"
          />
          <button
            className={`py-1 px-2  text-white rounded-md ${
              idEdit ? "bg-green-500" : "bg-blue-600"
            }`}
            onClick={() => save()}
          >
            {idEdit ? "Save" : "Add"}
          </button>
        </div>
        {/* </form> */}

        {data.map((item) => (
          <div
            className="flex gap-4 bg-pink-500 p-3 rounded-md w-[50%] justify-around items-center"
            key={item.id}
          >
            <p>{item.id}</p>
            <p className="bg-pink-500"> {item.name} </p>
            <p className="bg-pink-500"> {item.time} </p>
            <div className="flex gap-3">
              <button
                className="py-1 px-2 bg-red-600 text-white rounded-md cursor-pointer"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
              <button
                className="py-1 px-2 bg-blue-800 text-white rounded-md cursor-pointer"
                onClick={() => edit(item.id)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListVideo;
